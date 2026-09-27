// src/components/map/CongestionHeatLayer.jsx
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

const HEAT_OPTIONS = {
  radius: 55,
  blur: 30,
  maxZoom: 17,
  minOpacity: 0.35,
  gradient: {
    0.2: 'green',
    0.5: 'yellow',
    0.8: 'orange',
    1.0: 'red'
  }
};

const PULSE_INTERVAL_MS = 1200;

export default function CongestionHeatLayer({ points }) {
  const map = useMap();
  const heatLayerRef = useRef(null);
  const baseDataRef = useRef([]);

  // Build/rebuild the heat layer whenever points change
  useEffect(() => {
    const data = points.map((p) => [
      p.lat,
      p.lng,
      p.intensity ?? p.vehicle_count ?? 1 // fallback weight if no explicit intensity
    ]);
    baseDataRef.current = data;

    const layer = L.heatLayer(data, HEAT_OPTIONS).addTo(map);
    heatLayerRef.current = layer;

    return () => {
      map.removeLayer(layer);
      heatLayerRef.current = null;
    };
  }, [map, points]);

  // Animate: gently oscillate each point's intensity so the blobs "breathe"
  useEffect(() => {
    if (baseDataRef.current.length === 0) return;

    let frame = 0;
    const intervalId = setInterval(() => {
      frame += 1;
      const layer = heatLayerRef.current;
      if (!layer) return;

      const animated = baseDataRef.current.map(([lat, lng, weight], i) => {
        const phase = frame * 0.4 + i; // offset per point so they don't pulse in sync
        const oscillation = 0.25 * Math.sin(phase);
        const newWeight = Math.max(0.2, weight + oscillation);
        return [lat, lng, newWeight];
      });

      layer.setLatLngs(animated);
    }, PULSE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [points]);

  return null;
}