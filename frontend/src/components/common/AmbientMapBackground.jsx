import { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const CHENNAI_CENTER = [13.0827, 80.2707];

// Reusable dot-matrix + ambient map background with a cursor-tracking glow
// and a subtle "pulled toward cursor" parallax on the map layer. Used for
// both the hero and the dashboard-preview section so they look identical.
export default function AmbientMapBackground({ children, minHeight = 500 }) {
  const wrapperRef = useRef(null);
  const mapLayerRef = useRef(null);

  function handleMouseMove(e) {
    const wrapper = wrapperRef.current;
    const mapLayer = mapLayerRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    wrapper.style.setProperty('--mx', `${x}px`);
    wrapper.style.setProperty('--my', `${y}px`);

    if (mapLayer) {
      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);
      const pull = 14;
      mapLayer.style.transform = `scale(1.06) translate(${-dx * pull}px, ${-dy * pull}px)`;
    }
  }

  function handleMouseLeave() {
    if (mapLayerRef.current) {
      mapLayerRef.current.style.transform = 'scale(1.06) translate(0px, 0px)';
    }
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="home-hero-wrapper"
      style={{ position: 'relative', minHeight }}
    >
      <div ref={mapLayerRef} className="home-map-layer">
        <MapContainer
          center={CHENNAI_CENTER}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>

      <div
        className="dot-grid-hero"
        style={{ minHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="dot-grid-content" style={{ width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}