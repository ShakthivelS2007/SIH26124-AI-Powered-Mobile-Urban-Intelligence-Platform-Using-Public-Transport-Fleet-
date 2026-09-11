import { MapContainer, TileLayer } from 'react-leaflet';
import DefectMarker from './DefectMarker';

const DEFAULT_CENTER = [13.0827, 80.2707]; // Chennai
const DEFAULT_ZOOM = 12;

export default function DefectMap({ defects }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {defects.map((defect) => (
        <DefectMarker key={defect.id} defect={defect} />
      ))}
    </MapContainer>
  );
}
