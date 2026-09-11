import { CircleMarker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { getDefectMeta } from '../../theme/tokens';

export default function DefectMarker({ defect }) {
  const meta = getDefectMeta(defect.type);

  return (
    <CircleMarker
      center={[defect.lat, defect.lng]}
      radius={9}
      pathOptions={{
        color: '#ffffff',
        weight: 2,
        fillColor: meta.color,
        fillOpacity: 1
      }}
    >
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
    </CircleMarker>
  );
}
