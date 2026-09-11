import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { colors } from '../../theme/tokens';

const DEFAULT_CENTER = [13.0827, 80.2707]; // Chennai
const DEFAULT_ZOOM = 12;

export default function CongestionHeatmap({ points }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <React.Fragment key={point.id}>
          <Circle
            center={[point.lat, point.lng]}
            radius={500}
            pathOptions={{
              color: colors.red,
              weight: 0,
              fillColor: colors.red,
              fillOpacity: 0.18
            }}
          />
          <Circle
            center={[point.lat, point.lng]}
            radius={200}
            pathOptions={{
              color: colors.red,
              weight: 2,
              fillColor: colors.red,
              fillOpacity: 0.55
            }}
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
}