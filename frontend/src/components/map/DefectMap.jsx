import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import DefectMarker from './DefectMarker';

const DEFAULT_CENTER = [13.0827, 80.2707]; // Chennai
const DEFAULT_ZOOM = 12;

function FlyToTarget({ lat, lng, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize(); // container size may not be settled on first render
    const timer = setTimeout(() => {
      map.flyTo([lat, lng], zoom, { duration: 2 });
    }, 400); // brief pause so the zoomed-out view is seen first
    return () => clearTimeout(timer);
  }, [map, lat, lng, zoom]);

  return null;
}

export default function DefectMap({ defects, center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM, flyTo = null, flyToZoom = 17 }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flyTo && <FlyToTarget lat={flyTo[0]} lng={flyTo[1]} zoom={flyToZoom} />}
      {defects.map((defect) => (
        <DefectMarker key={defect.id} defect={defect} />
      ))}
    </MapContainer>
  );
}
