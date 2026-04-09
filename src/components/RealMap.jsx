import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useApp } from '../context/useApp';
import { milestones } from '../data/milestones';
import styles from './RealMap.module.css';

// Custom marker icons
function createIcon(emoji, size = 28) {
  return L.divIcon({
    html: `<div style="font-size:${size}px;text-align:center;line-height:1">${emoji}</div>`,
    className: 'custom-marker',
    iconSize: [size + 4, size + 4],
    iconAnchor: [(size + 4) / 2, (size + 4) / 2],
  });
}

const LOCKED_ICON = createIcon('🔒', 18);

export default function RealMap() {
  const { state, setActiveModal } = useApp();

  const unlockedSet = useMemo(
    () => new Set(state?.unlockedMilestones || [1]),
    [state?.unlockedMilestones]
  );

  // Polyline connecting all milestones
  const pathPositions = useMemo(
    () => milestones.map(m => [m.lat, m.lng]),
    []
  );

  // Center on the last unlocked milestone
  const center = useMemo(() => {
    if (!state) return [32.0, 35.3];
    const unlocked = milestones.filter(m => unlockedSet.has(m.id));
    const last = unlocked[unlocked.length - 1];
    return last ? [last.lat, last.lng] : [32.0, 35.3];
  }, [state, unlockedSet]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>🌍</span>
        <h3 className={styles.title}>Terra Santa — Mapa Real</h3>
      </div>

      <div className={styles.mapWrapper}>
        <MapContainer
          center={center}
          zoom={8}
          scrollWheelZoom={true}
          className={styles.map}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {/* Path line */}
          <Polyline
            positions={pathPositions}
            pathOptions={{
              color: 'var(--color-primary)',
              weight: 2,
              opacity: 0.3,
              dashArray: '6,6',
            }}
          />

          {/* Milestone markers */}
          {milestones.map((m) => {
            const isUnlocked = unlockedSet.has(m.id);
            const icon = isUnlocked ? createIcon(m.badge) : LOCKED_ICON;

            return (
              <Marker
                key={m.id}
                position={[m.lat, m.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    if (isUnlocked) setActiveModal(m);
                  },
                }}
              >
                <Popup>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                      {isUnlocked ? m.badge : '🔒'}
                    </div>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {m.name}
                    </strong>
                    <br />
                    <small style={{ color: 'var(--text-muted)' }}>
                      {isUnlocked ? m.ref : `${m.kmRequired} km para desbloquear`}
                    </small>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
