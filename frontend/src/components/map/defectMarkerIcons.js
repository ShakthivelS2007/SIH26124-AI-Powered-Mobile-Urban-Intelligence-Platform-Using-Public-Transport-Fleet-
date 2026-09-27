// Inline SVG glyphs shown inside each map pin, matched to defect type.
const glyphs = {
  pothole: '<path d="M12 3.5 2 20.5h20L12 3.5Z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10v4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17.5" r="1" fill="#fff"/>',
  traffic_congestion: '<path d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2A2 2 0 0 1 19.5 8l1.5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="2.5" y="13" width="19" height="5.5" rx="1.5" stroke="#fff" stroke-width="1.8"/><circle cx="7" cy="18.5" r="1.6" fill="#fff"/><circle cx="17" cy="18.5" r="1.6" fill="#fff"/>',
  waterlogging: '<path d="M12 3s5.5 6.4 5.5 10.2a5.5 5.5 0 1 1-11 0C6.5 9.4 12 3 12 3Z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>',
  sign: '<rect x="5" y="4" width="14" height="14" rx="2" stroke="#fff" stroke-width="1.8"/><path d="M12 8v5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="#fff"/>',
  sign_damaged: '<rect x="5" y="4" width="14" height="14" rx="2" stroke="#fff" stroke-width="1.8" stroke-dasharray="3 2"/><path d="M9 9l6 6M15 9l-6 6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  zebra_crossing: '<circle cx="12" cy="5.5" r="2" fill="#fff"/><path d="M12 8v6l-3 7M12 14l3 7M9 11l-2 3M15 11l2 3" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  default: '<circle cx="12" cy="12" r="4" fill="#fff"/>'
};

export function buildDefectDivIcon(L, type, color) {
  const glyph = glyphs[type] ?? glyphs.default;
  const html = `
    <div style="
      width: 34px; height: 34px;
      background: ${color};
      border: 2px solid #ffffff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 5px rgba(0,0,0,0.35);
      display: flex; align-items: center; justify-content: center;
    ">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="transform: rotate(45deg)">
        ${glyph}
      </svg>
    </div>`;

  return L.divIcon({
    html,
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32]
  });
}