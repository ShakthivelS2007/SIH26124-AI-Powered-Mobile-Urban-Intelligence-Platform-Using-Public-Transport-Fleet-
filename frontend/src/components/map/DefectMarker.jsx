import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import { getDefectMeta } from '../../theme/tokens';
import { buildDefectDivIcon } from './defectMarkerIcons';

export default function DefectMarker({ defect }) {
  const meta = getDefectMeta(defect.type);
  const icon = buildDefectDivIcon(L, defect.type, meta.color);

  return (
    <Marker position={[defect.lat, defect.lng]} icon={icon}>
      <Popup>
        <div style={{ fontSize: 13, lineHeight: 1.5 }}>
          <strong>{meta.label}</strong>
          <br />
          Bus: {defect.bus_id}
          <br />
          {new Date(defect.timestamp).toLocaleString()}
          <br />
          <Link to={`/defect/${defect.id}`}>View details &rarr;</Link>
        </div>
      </Popup>
    </Marker>
  );
}