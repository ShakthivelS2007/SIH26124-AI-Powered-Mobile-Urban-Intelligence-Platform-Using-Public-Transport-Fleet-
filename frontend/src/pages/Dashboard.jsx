import { useMemo } from 'react';
import Card from '../components/common/Card';
import DefectMap from '../components/map/DefectMap';
import DefectLegend from '../components/map/DefectLegend';
import DefectTable from '../components/table/DefectTable';
import { useDefectDataContext } from '../context/DefectDataContext';
import { useBusIdSearch } from '../context/SearchContext';
import IconStatCard from '../components/common/IconStatCard';
import {
  CarIcon,
  PedestrianIcon,
  CrashIcon,
  AlertIcon,
  PotholeIcon,
  WaterloggingIcon
} from '../components/common/StatIcons';

function isSameDay(isoTimestamp, reference) {
  const d = new Date(isoTimestamp);
  return (
    d.getFullYear() === reference.getFullYear() &&
    d.getMonth() === reference.getMonth() &&
    d.getDate() === reference.getDate()
  );
}

export default function Dashboard() {
  const { defects, loading, error } = useDefectDataContext();
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
  const congestionCount = defects.filter((d) => d.type === 'traffic_congestion').length;

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

  </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <IconStatCard
          icon={<AlertIcon />}
          color="#2563eb"
          label="Defects Detected Today"
          value={detectedToday}
        />
        <IconStatCard
          icon={<PotholeIcon />}
          color="#dc2626"
          label="Potholes Detected"
          value={potholeCount}
        />
        <IconStatCard
          icon={<WaterloggingIcon />}
          color="#16a34a"
          label="Waterlogging Detected"
          value={waterloggingCount}
        />
        <IconStatCard
          icon={<CarIcon />}
          color="#f7ef05"
          label="Traffic Congestion"
          value={congestionCount}
        />
        <IconStatCard
          icon={<PedestrianIcon />}
          color="#169fe4"
          label="Pedestrian Risk"
          placeholder
        />
        <IconStatCard
          icon={<CrashIcon />}
          color="#7c3aed"
          label="Incidents (Hit & Run)"
          placeholder
        />
      </div>

            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ height: 580, padding: 8 }}>
            <DefectMap defects={searchedDefects} />
          </Card>

          <Card style={{ padding: 16 }}>
            <DefectLegend types={legendTypes} />
          </Card>
        </div>

        <Card style={{ flex: 1, minWidth: 320, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 16px 0' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Detected Defects</h2>
            {flase && error && (
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
    </div>
  );
}
