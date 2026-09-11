import { Link, useNavigate } from 'react-router-dom';
import AmbientMapBackground from '../components/common/AmbientMapBackground';

function BusIcon(props) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="5" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function VisionIcon(props) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PinIcon(props) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CameraIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 10l6-3v10l-6-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ChipIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="6" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationPinIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function DispatchIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 3v3h6V3M8 12l2.5 2.5L16 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PIPELINE_STAGES = [
  {
    stage: 'STAGE 01',
    icon: CameraIcon,
    title: 'Optical Fleet Capture',
    description:
      'Dashcams mounted on regular municipal buses continuously record the carriageway during scheduled passenger routes.',
    footer: 'Hardware: 1080p HDR Dashcam'
  },
  {
    stage: 'STAGE 02',
    icon: ChipIcon,
    title: 'Edge Defect Detection',
    description:
      'An on-bus computer vision model scans each frame locally, flagging potholes, waterlogging, congestion and missing signage in real time.',
    footer: 'Model: YOLO-Edge Inference'
  },
  {
    stage: 'STAGE 03',
    icon: LocationPinIcon,
    title: 'GPS Geotagging',
    description:
      'Every detected defect is stamped with the bus\u2019s live coordinates, timestamp, and nearest landmark for precise location context.',
    footer: 'Precision: Live GPS + Reverse Geocoding'
  },
  {
    stage: 'STAGE 04',
    icon: DispatchIcon,
    title: 'Fleet Dashboard Routing',
    description:
      'Detections flow directly into the live dashboard, map, and reports view so municipal teams can review and prioritize repairs.',
    footer: 'Delivery: Live Dashboard Feed'
  }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#14161b' }}>
      <header
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          background: '#14161b',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <Link to="/" style={{ display: 'block' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>RoadWatch</div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)'
            }}
          >
            Fleet Defect Monitor
          </div>
        </Link>
      </header>

      <AmbientMapBackground minHeight="calc(100vh - 72px)">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '40px 20px',
            maxWidth: 820,
            margin: '0 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 28,
              color: 'rgba(255,255,255,0.35)',
              marginBottom: 24
            }}
          >
            <BusIcon />
            <VisionIcon />
            <PinIcon />
          </div>

          <h1
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.2,
              margin: '0 0 20px',
              color: '#ffffff'
            }}
          >
            Passive Roadway Intelligence from{' '}
            <span style={{ color: '#5b8def' }}>Active Transit Fleets</span>
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 620,
              margin: '0 0 32px'
            }}
          >
            Municipal bus dashcams continuously scan road conditions using on-edge computer
            vision, flagging potholes, waterlogging, missing signage and congestion in real
            time.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '16px 32px',
                fontSize: 17,
                fontWeight: 600,
                color: '#fff',
                background: '#2563eb',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate('/complaints')}
              style={{
                padding: '16px 32px',
                fontSize: 17,
                fontWeight: 600,
                color: '#ffffff',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 8,
                cursor: 'pointer'
              }}
            >
              Citizen Complaint Portal
            </button>
          </div>
        </div>
      </AmbientMapBackground>

      <section style={{ background: 'var(--color-app-bg)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              color: 'var(--color-brand-blue)',
              marginBottom: 16
            }}
          >
            End-to-End Operational Pipeline
          </span>

          <h2
            style={{
              fontSize: 40,
              fontWeight: 800,
              lineHeight: 1.25,
              color: 'var(--color-text-primary)',
              margin: '0 0 12px'
            }}
          >
            How Fleet Miles Transform into Road Intelligence
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: 680,
              margin: '0 auto 48px'
            }}
          >
            A four-stage pipeline connecting regular passenger transport routes directly to the
            municipal defect dashboard.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 20,
              textAlign: 'left'
            }}
          >
            {PIPELINE_STAGES.map(({ stage, icon: Icon, title, description, footer }) => (
              <div
                key={stage}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16
                  }}
                >
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--color-status-amber-bg)',
                      color: 'var(--color-brand-blue)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 0.4
                    }}
                  >
                    {stage}
                  </span>
                  <Icon style={{ color: 'var(--color-text-secondary)' }} />
                </div>

                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    margin: '0 0 8px'
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    margin: '0 0 16px',
                    flex: 1
                  }}
                >
                  {description}
                </p>

                <div
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: 12,
                    fontSize: 11,
                    fontFamily: 'monospace',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  {footer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AmbientMapBackground minHeight={640}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.04)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              color: '#5b8def',
              marginBottom: 16
            }}
          >
            Live Fleet Dashboard
          </span>

          <h2
            style={{
              fontSize: 40,
              fontWeight: 800,
              lineHeight: 1.25,
              color: '#ffffff',
              margin: '0 0 12px'
            }}
          >
            See Every Detected Defect in One Place
          </h2>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 620,
              margin: '0 auto 48px'
            }}
          >
            Live map, defect counts, and a searchable table sorted by bus — updated as new
            detections arrive from the fleet.
          </p>

          <div
            style={{
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4)'
            }}
          >
            <img
              src="/screenshots/dashboard-preview.png"
              alt="RoadWatch dashboard preview"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </AmbientMapBackground>
    </div>
  );
}