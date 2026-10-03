import { useMemo } from 'react';
import Card from '../components/common/Card';
import CongestionHeatmap from '../components/map/CongestionHeatmap';
import DefectTable from '../components/table/DefectTable';
import useDefectData from '../hooks/useDefectData';

export default function Reports() {
  const { defects, loading, error } = useDefectData();

  const congestionPoints = useMemo(
    () => defects.filter((d) => d.type === 'traffic_congestion'),
    [defects]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card style={{ padding: 16 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>Traffic Congestion Heatmap</h2>
        <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: 13 }}>
          Density of congestion events reported by the fleet.
        </p>
        {error && (
          <p style={{ color: 'var(--color-status-red)', fontSize: 13 }}>
            Couldn&apos;t refresh data: {error}
          </p>
        )}
      </Card>

      <Card style={{ height: 420, padding: 8 }}>
        {loading ? (
          <p style={{ color: 'var(--color-text-secondary)', padding: 16 }}>Loading map...</p>
        ) : (
          <CongestionHeatmap points={congestionPoints} />
        )}
      </Card>

      <Card style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 16px 0' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Congestion Reports</h2>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          {loading ? (
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading defects...</p>
          ) : (
            <DefectTable defects={congestionPoints} />
          )}
        </div>
      </Card>
    </div>
  );
}
