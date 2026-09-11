import { MapContainer, TileLayer } from 'react-leaflet';
import CongestionHeatLayer from './CongestionHeatLayer';

const DEFAULT_CENTER = [13.0827, 80.2707]; // Chennai
const DEFAULT_ZOOM = 12;

export default function CongestionHeatmap({ points }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CongestionHeatLayer points={points} />
    </MapContainer>
  );
}
