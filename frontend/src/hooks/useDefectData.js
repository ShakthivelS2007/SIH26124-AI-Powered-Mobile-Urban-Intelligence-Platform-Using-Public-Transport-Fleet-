import { useEffect, useRef, useState } from 'react';
import { sortByBusId } from '../utils/sortDefects';
import { reverseGeocodeBatch } from '../utils/reverseGeocode';
import { findNearestLandmarkBatch, formatLandmark } from '../utils/nearestLandmark';
import { DETECTIONS_ENDPOINT } from '../config';
import { useAutoVoice } from '../context/AutoVoiceContext';
import { queueSpeak, buildDefectSpeech } from '../utils/textToSpeech';

const POLL_INTERVAL_MS = 3000;

function toImageDataUrl(rawBase64) {
  if (!rawBase64) return null;
  if (rawBase64.startsWith('data:')) return rawBase64; // already a data URL
  return `data:image/jpeg;base64,${rawBase64}`;
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
    img_url: toImageDataUrl(raw.image_base64),
    location: raw.location ?? null,
    nearest_landmark: raw.nearest_landmark ?? null
  };
}

export default function useDefectData() {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seenIdsRef = useRef(new Set());
  const geocodeInFlightRef = useRef(false);
  const landmarkInFlightRef = useRef(false);
  const isFirstFetchRef = useRef(true);
  const { isAutoVoiceOn } = useAutoVoice();
  const isAutoVoiceOnRef = useRef(isAutoVoiceOn);
  isAutoVoiceOnRef.current = isAutoVoiceOn;

  // Polls the backend for new detections and appends them.
  useEffect(() => {
    let cancelled = false;

    async function fetchDetections() {
      try {
        const res = await fetch(DETECTIONS_ENDPOINT, {
          headers: { 'ngrok-skip-browser-warning': 'true' }
        });
        if (!res.ok) throw new Error(`Backend request failed (${res.status})`);
        const rawList = await res.json();

        const newOnes = rawList
          .filter((raw) => !seenIdsRef.current.has(String(raw.id)))
          .map(normalizeDetection);

        if (newOnes.length > 0) {
          newOnes.forEach((d) => seenIdsRef.current.add(d.id));
          setDefects((current) => sortByBusId([...current, ...newOnes]));

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

  // Backfills location/landmark for whatever is currently missing them,
  // re-sweeping the FULL list (not just newly-arrived items) every time
  // `defects` changes. This guarantees nothing gets permanently skipped
  // just because a batch was already in flight when it arrived.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defects]);

  return { defects, loading, error };
}