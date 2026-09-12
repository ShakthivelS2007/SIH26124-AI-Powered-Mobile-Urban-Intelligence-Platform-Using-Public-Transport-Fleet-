import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import useDefectData from '../hooks/useDefectData';

export default function DefectDetail() {
  const { id } = useParams();
  const { defects, loading } = useDefectData();
  const [imgFailed, setImgFailed] = useState(false);

  if (loading) {
    return <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>;
  }

  const defect = defects.find((d) => d.id === id);

  if (!defect) {
    return (
      <div>
        <p>Defect not found. It may have been removed from the data source.</p>
        <Link to="/">&larr; Back to Dashboard</Link>
      </div>
    );
  }

  const showImage = defect.img_url && !imgFailed;

  return (
    <div style={{ maxWidth: 640 }}>
      <Link to="/" style={{ color: 'var(--color-text-secondary)', fontSize: 13 }}>
        &larr; Back to Dashboard
      </Link>

      <Card style={{ marginTop: 16, overflow: 'hidden' }}>
        {showImage ? (
          <img
            src={defect.img_url}
            alt={`Detected ${defect.type}`}
            onError={() => setImgFailed(true)}
            style={{ width: '100%', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-app-bg)',
              color: 'var(--color-text-secondary)',
              fontSize: 13
            }}
          >
            {defect.img_url ? 'Snapshot failed to load' : 'No snapshot available'}
          </div>
        )}

        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <StatusBadge defect={defect} />
          </div>

          <DetailRow label="Bus ID" value={defect.bus_id} />
          <DetailRow label="Location" value={defect.location ?? '—'} />
          <DetailRow label="Nearest Landmark" value={defect.nearest_landmark ?? '—'} />
          <DetailRow label="Latitude" value={defect.lat} />
          <DetailRow label="Longitude" value={defect.lng} />
          <DetailRow label="Detected at" value={new Date(defect.timestamp).toLocaleString()} />
        </div>
      </Card>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid var(--color-border)',
        fontSize: 14
      }}
    >
      <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}