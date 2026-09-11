import { useMemo } from 'react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import DefectMap from '../components/map/DefectMap';
import DefectLegend from '../components/map/DefectLegend';
import DefectTable from '../components/table/DefectTable';
import useDefectData from '../hooks/useDefectData';
import { useBusIdSearch } from '../context/SearchContext';
import { colors } from '../theme/tokens';

function isSameDay(isoTimestamp, reference) {
  const d = new Date(isoTimestamp);
  return (
    d.getFullYear() === reference.getFullYear() &&
    d.getMonth() === reference.getMonth() &&
    d.getDate() === reference.getDate()
  );
}

export default function Dashboard() {
  const { defects, loading, error } = useDefectData();
  const { busIdQuery } = useBusIdSearch();

  // Dashboard only covers pothole / waterlogging / future defect types.
  // Traffic congestion has its own heatmap view on the Reports page.
  const roadDefects = useMemo(
    () => defects.filter((d) => d.type !== 'traffic_congestion'),
    [defects]
  );

  const searchedDefects = useMemo(() => {
    const query = busIdQuery.trim().toLowerCase();
    if (!query) return roadDefects;
    return roadDefects.filter((d) => d.bus_id.toLowerCase().includes(query));
  }, [roadDefects, busIdQuery]);

  const today = new Date();
  const detectedToday = roadDefects.filter((d) => isSameDay(d.timestamp, today)).length;
  const potholeCount = roadDefects.filter((d) => d.type === 'pothole').length;
  const waterloggingCount = roadDefects.filter((d) => d.type === 'waterlogging').length;

  const legendTypes = useMemo(
    () => [...new Set(roadDefects.map((d) => d.type))],
    [roadDefects]
  );

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          color: '#2563eb'
        }}
      >
        Automated Civic Infrastructure Sensing
      </span>
    </div>

    <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 12px' }}>Fleet AI Defect Telemetry Hub</h1>

    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 'var(--radius-pill)',
        background: '#eef2ff',
        fontFamily: 'monospace',
        fontSize: 13,
        color: 'var(--color-text-primary)'
      }}
    >
      <span>📷 Bus Cam (Snapshot)</span>
      <span>→</span>
      <span>🧠 Edge YOLO</span>
      <span>→</span>
      <span>📍 GeoJSON Telemetry</span>
      <span>→</span>
      <span>📡 Municipal Dispatch</span>
    </div>
  </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <StatCard label="Defects Detected Today" value={detectedToday} subtext="Across all buses" />
        <StatCard
          label="Potholes Detected"
          value={potholeCount}
          accentColor={colors.red}
          accentBg={colors.redBg}
          live
        />
        <StatCard
          label="Waterlogging Detected"
          value={waterloggingCount}
          accentColor={colors.green}
          accentBg={colors.greenBg}
        />
      </div>

      <Card style={{ height: 420, padding: 8 }}>
        <DefectMap defects={searchedDefects} />
      </Card>

      <Card style={{ padding: 16 }}>
        <DefectLegend types={legendTypes} />
      </Card>

      <Card style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 16px 0' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Detected Defects</h2>
          {error && (
            <p style={{ color: 'var(--color-status-red)', fontSize: 13 }}>
              Couldn&apos;t refresh data: {error}
            </p>
          )}
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          {loading ? (
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading defects...</p>
          ) : (
            <DefectTable defects={searchedDefects} />
          )}
        </div>
      </Card>
    </div>
  );
}
