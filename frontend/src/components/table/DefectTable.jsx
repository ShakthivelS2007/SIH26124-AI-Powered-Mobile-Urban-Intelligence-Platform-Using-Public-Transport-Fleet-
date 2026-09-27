import { useState } from 'react';
import DefectRow from './DefectRow';

export default function DefectTable({ defects }) {
  const [hoveredDefect, setHoveredDefect] = useState(null);

    return (
    <div>
      <div style={{ overflow: 'auto', maxHeight: 300 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>
              <th style={headerStyle}>Bus ID</th>
              <th style={headerStyle}>Defect Type</th>
              <th style={headerStyle}>Location</th>
              <th style={headerStyle}>Nearest Landmark</th>
              <th style={headerStyle}>Timestamp</th>
              <th style={{ ...headerStyle, textAlign: 'right' }}></th>
            </tr>
          </thead>
          <tbody>
            {defects.map((defect) => (
              <DefectRow key={defect.id} defect={defect} onHover={setHoveredDefect} />
            ))}
            {defects.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 20, color: 'var(--color-text-secondary)' }}>
                  No defects detected yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

            {/* Temporary: image preview on row hover */}
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid var(--color-border)'
        }}
      >
        {hoveredDefect ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {hoveredDefect.img_url ? (
              <img
                src={hoveredDefect.img_url}
                alt={`Detected ${hoveredDefect.type}`}
                style={{ width: 300, height: 250, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 300,
                  height: 250,
                  borderRadius: 6,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--color-app-bg)',
                  color: 'var(--color-text-secondary)',
                  fontSize: 12
                }}
              >
                No snapshot
              </div>
            )}
            <div style={{ fontSize: 13 }}>
              <div style={{ fontWeight: 700 }}>{hoveredDefect.bus_id}</div>
              <div style={{ color: 'var(--color-text-secondary)' }}>
                {hoveredDefect.location ?? '—'}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 300,
              height: 250,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-app-bg)',
              color: 'var(--color-text-secondary)',
              fontSize: 12
            }}
          >
            Hover a row
          </div>
        )}
      </div>
    </div>
  );
}

const headerStyle = {
  padding: '10px 12px',
  fontWeight: 600,
  fontSize: 12,
  borderBottom: '1px solid var(--color-border)'
};