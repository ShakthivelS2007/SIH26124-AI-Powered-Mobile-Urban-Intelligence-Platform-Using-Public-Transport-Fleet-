export const colors = {
  sidebarBg: '#14151a',
  sidebarText: '#b7b9c4',
  sidebarTextActive: '#ffffff',
  appBg: '#f4f5f7',
  surface: '#ffffff',
  border: '#e8e9ed',
  textPrimary: '#14151a',
  textSecondary: '#6b7280',
  green: '#16a34a',
  greenBg: '#e8f7ee',
  amber: '#f59e0b',
  amberBg: '#fef3e2',
  red: '#dc2626',
  redBg: '#fdecec'
};

// Maps each defect type to a status color + human label.
// Extend this as the detection model adds more classes.
export const defectTypeMeta = {
  pothole: { label: 'Pothole', color: colors.red, bg: colors.redBg },
  traffic_congestion: { label: 'Traffic Congestion', color: colors.amber, bg: colors.amberBg },
  waterlogging: { label: 'Waterlogging', color: colors.green, bg: colors.greenBg },
  sign: { label: 'Sign', color: '#7c3aed', bg: '#f1e9ff' },
  zebra_crossing: { label: 'Zebra Crossing', color: '#0891b2', bg: '#e0f7fa' },
  default: { label: 'Unknown', color: colors.textSecondary, bg: colors.border }
};

export function getDefectMeta(type) {
  return defectTypeMeta[type] || defectTypeMeta.default;
}

const CONDITION_LABELS = {
  'good condition': 'Good Condition',
  'blurred/faded/low detail': 'Blurred/Faded/Low Detail'
};

// Builds the display label for a defect, appending its condition in
// parentheses when present - e.g. "Sign (Good Condition)". Only signs
// currently carry a condition field, but this works for any type that
// does going forward.
export function getDefectDisplayLabel(defect) {
  const meta = getDefectMeta(defect.type);
  if (!defect.condition) return meta.label;
  const conditionLabel = CONDITION_LABELS[defect.condition] ?? defect.condition;
  return `${meta.label} (${conditionLabel})`;
}
