import DefectRow from './DefectRow';

export default function DefectTable({ defects }) {
  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
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
            <DefectRow key={defect.id} defect={defect} />
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
  );
}

const headerStyle = {
  padding: '10px 12px',
  fontWeight: 600,
  fontSize: 12,
  borderBottom: '1px solid var(--color-border)'
};