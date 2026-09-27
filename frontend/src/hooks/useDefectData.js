import { useEffect, useRef, useState } from 'react';
import { sortByBusId } from '../utils/sortDefects';
import { reverseGeocodeBatch } from '../utils/reverseGeocode';
import { findNearestLandmarkBatch, formatLandmark } from '../utils/nearestLandmark';
import { DETECTIONS_ENDPOINT } from '../config';
import { useAutoVoice } from '../context/AutoVoiceContext';
import { queueSpeak, buildDefectSpeech, stopAutoVoice } from '../utils/textToSpeech';

const POLL_INTERVAL_MS = 3000;

function toImageBlobUrl(rawBase64) {
  if (!rawBase64) return null;

  if (rawBase64.startsWith('http') || rawBase64.startsWith('blob:')) return rawBase64;

  const base64Data = rawBase64.startsWith('data:')
    ? rawBase64.split(',')[1]
    : rawBase64;

  try {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.warn('Failed to convert image to Blob URL:', err.message);
    return null;
  }
}

function normalizeDetection(raw) {
  const typeMap = {
    congestion: 'traffic_congestion'
  };

  return {
    id: String(raw.id),
    bus_id: raw.bus_id,
    type: typeMap[raw.type] ?? raw.type,
    condition: raw.condition ?? null,
    lat: raw.latitude,
    lng: raw.longitude,
    timestamp: raw.created_at,
    confidence: raw.confidence ?? null,
    vehicle_count: raw.vehicle_count ?? null,
    img_url: toImageBlobUrl(raw.image_base64),
    location: raw.location ?? null,
    nearest_landmark: raw.nearest_landmark ?? null
  };
}

export default function useDefectData() {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seenIdsRef = useRef(new Set());
  const lastSeenIdRef = useRef(0);
  const isFirstFetchRef = useRef(true);
  const { isAutoVoiceOn } = useAutoVoice();
  const isAutoVoiceOnRef = useRef(isAutoVoiceOn);
  const hasRealDataRef = useRef(false);

  isAutoVoiceOnRef.current = isAutoVoiceOn;

  useEffect(() => {
    let cancelled = false;

      async function fetchDetections() {
      try {
        const url =
          lastSeenIdRef.current > 0
            ? `${DETECTIONS_ENDPOINT}?after_id=${lastSeenIdRef.current}`
            : DETECTIONS_ENDPOINT;

        const res = await fetch(url, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!res.ok) throw new Error(`Backend request failed (${res.status})`);
        const rawList = await res.json();

        const newOnes = rawList
          .filter((raw) => !seenIdsRef.current.has(String(raw.id)))
          .map(normalizeDetection);

        if (newOnes.length > 0) {
          newOnes.forEach((d) => seenIdsRef.current.add(d.id));
          const maxId = Math.max(...rawList.map((raw) => Number(raw.id)));
          if (maxId > lastSeenIdRef.current) lastSeenIdRef.current = maxId;
                              setDefects((current) => {
            const base = hasRealDataRef.current ? current : [];
            return sortByBusId([...base, ...newOnes]);
          });
          hasRealDataRef.current = true;

          if (isAutoVoiceOnRef.current && !isFirstFetchRef.current) {
            newOnes.forEach((d) => queueSpeak(buildDefectSpeech(d)));
          }
        }

        isFirstFetchRef.current = false;
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDetections();
    const intervalId = setInterval(fetchDetections, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);
    
  useEffect(() => {
    fetch('data/defects.json')
      .then((res) => res.json())
      .then((rawList) => {
        if (hasRealDataRef.current) return; // backend already answered first
        const placeholders = rawList.map((d) => ({
          id: String(d.id),
          bus_id: d.bus_id,
          type: d.type,
          condition: d.condition ?? null,
          lat: d.lat,
          lng: d.lng,
          timestamp: d.timestamp,
          confidence: d.confidence ?? null,
          vehicle_count: d.vehicle_count ?? null,
          img_url: d.img_url ?? null,
          location: d.location ?? null,
          nearest_landmark: d.nearest_landmark ?? null
        }));
        setDefects(sortByBusId(placeholders));
      })
      .catch(() => {
        // No placeholder file available — just wait for the backend.
      });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const needsLocation = defects.filter((d) => !d.location);
    if (needsLocation.length > 0) {
      reverseGeocodeBatch(needsLocation.map((d) => ({ lat: d.lat, lng: d.lng }))).then(
        (labels) => {
          if (cancelled) return;
          setDefects((current) =>
            sortByBusId(
              current.map((d) => {
                const idx = needsLocation.findIndex((n) => n.id === d.id);
                return idx === -1 || !labels[idx] ? d : { ...d, location: labels[idx] };
              })
            )
          );
        }
      );
    }

    const needsLandmark = defects.filter((d) => !d.nearest_landmark);
    if (needsLandmark.length > 0) {
      findNearestLandmarkBatch(needsLandmark.map((d) => ({ lat: d.lat, lng: d.lng }))).then(
        (landmarks) => {
          if (cancelled) return;
          setDefects((current) =>
            sortByBusId(
              current.map((d) => {
                const idx = needsLandmark.findIndex((n) => n.id === d.id);
                if (idx === -1) return d;
                const formatted = formatLandmark(landmarks[idx]);
                return formatted ? { ...d, nearest_landmark: formatted } : d;
              })
            )
          );
        }
      );
    }

    return () => {
      cancelled = true;
    };
  }, [defects]);
  
  useEffect(() => {
    if (!isAutoVoiceOn) {
      stopAutoVoice();
      return;
    }
    defects.forEach((d) => queueSpeak(buildDefectSpeech(d)));
  }, [isAutoVoiceOn]);

  return { defects, loading, error };
}