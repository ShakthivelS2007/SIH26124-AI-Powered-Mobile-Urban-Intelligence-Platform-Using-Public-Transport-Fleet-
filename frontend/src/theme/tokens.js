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
  sign: { label: 'Sign (Good Condition)', color: '#7c3aed', bg: '#f1e9ff' },
  sign_damaged: { label: 'Sign (Damaged)', color: '#0441f6', bg: '#ececfd' },
  zebra_crossing: { label: 'Zebra Crossing', color: '#0891b2', bg: '#e0f7fa' },
  default: { label: 'Unknown', color: colors.textSecondary, bg: colors.border }
};

export function getDefectMeta(type) {
  return defectTypeMeta[type] || defectTypeMeta.default;
}