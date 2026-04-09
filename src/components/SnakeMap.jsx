import { useMemo } from 'react';
import { useApp } from '../context/useApp';
import { milestones, MAP_COORDS, TOTAL_KM } from '../data/milestones';
import styles from './SnakeMap.module.css';

export default function SnakeMap() {
  const { state, setActiveModal } = useApp();

  const unlockedSet = useMemo(
    () => new Set(state?.unlockedMilestones || [1]),
    [state?.unlockedMilestones]
  );

  // Build snake path through all coordinates
  const pathD = useMemo(() => {
    if (MAP_COORDS.length === 0) return '';
    let d = `M ${MAP_COORDS[0][0]} ${MAP_COORDS[0][1]}`;
    for (let i = 1; i < MAP_COORDS.length; i++) {
      const [x, y] = MAP_COORDS[i];
      const [px, py] = MAP_COORDS[i - 1];
      // Use quadratic curves for smoother snake path
      const cx = (px + x) / 2;
      const cy = (py + y) / 2;
      d += ` Q ${px + (x - px) * 0.5} ${py} ${cx} ${cy}`;
    }
    // Finish to last point
    const last = MAP_COORDS[MAP_COORDS.length - 1];
    d += ` L ${last[0]} ${last[1]}`;
    return d;
  }, []);

  // Calculate progress path length percentage
  const progressPct = state ? Math.min(state.totalKm / TOTAL_KM, 1) : 0;

  // Get current milestone index for the "traveler" marker
  const currentIdx = useMemo(() => {
    if (!state) return 0;
    // Find the last unlocked milestone's index
    const unlocked = milestones
      .filter(m => unlockedSet.has(m.id))
      .sort((a, b) => b.kmRequired - a.kmRequired);
    if (unlocked.length === 0) return 0;
    return milestones.findIndex(m => m.id === unlocked[0].id);
  }, [unlockedSet, state]);

  const travelerPos = MAP_COORDS[Math.min(currentIdx, MAP_COORDS.length - 1)];

  return (
    <div className={styles.container}>
      <div className={styles.mapLabel}>
        <span className={styles.mapIcon}>🗺️</span>
        <span>Mapa da Jornada</span>
      </div>

      <svg
        viewBox="0 0 620 680"
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-primary-dark)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="activePathGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary-light)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Background path (full snake) */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#pathGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="12,8"
        />

        {/* Active/completed path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#activePathGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDashoffset={`${(1 - progressPct) * 2000}`}
          strokeDasharray="2000"
          className={styles.activePath}
        />

        {/* Milestone nodes */}
        {milestones.map((m, idx) => {
          const [x, y] = MAP_COORDS[idx] || [0, 0];
          const isUnlocked = unlockedSet.has(m.id);
          const isPrincipal = m.type === 'principal';
          const isCurrent = state?.currentMilestone === m.id;
          const r = isPrincipal ? 22 : 16;

          return (
            <g
              key={m.id}
              className={`${styles.node} ${isUnlocked ? styles.unlocked : styles.locked} ${isCurrent ? styles.current : ''}`}
              onClick={() => isUnlocked && setActiveModal(m)}
              style={{ cursor: isUnlocked ? 'pointer' : 'default' }}
            >
              {/* Glow for current */}
              {isCurrent && (
                <circle
                  cx={x} cy={y} r={r + 10}
                  fill="none"
                  stroke="var(--color-primary-light)"
                  strokeWidth="2"
                  opacity="0.3"
                  className={styles.currentGlow}
                />
              )}

              {/* Main circle */}
              <circle
                cx={x} cy={y} r={r}
                fill={isUnlocked
                  ? (isPrincipal ? 'var(--bg-card)' : 'var(--bg-card)')
                  : 'var(--state-locked)'
                }
                stroke={isUnlocked
                  ? (isPrincipal ? 'var(--color-accent)' : 'var(--color-primary)')
                  : 'var(--text-muted)'
                }
                strokeWidth={isPrincipal ? 2.5 : 1.5}
              />

              {/* Badge emoji */}
              <text
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isPrincipal ? 18 : 14}
                className={styles.badge}
                opacity={isUnlocked ? 1 : 0.3}
              >
                {isUnlocked ? m.badge : '🔒'}
              </text>

              {/* Label */}
              <text
                x={x}
                y={y + r + 14}
                textAnchor="middle"
                className={`${styles.label} ${isPrincipal ? styles.principalLabel : ''}`}
                opacity={isUnlocked ? 1 : 0.4}
              >
                {m.short}
              </text>

              {/* KM label */}
              {!isUnlocked && (
                <text
                  x={x}
                  y={y + r + 27}
                  textAnchor="middle"
                  className={styles.kmLabel}
                >
                  {m.kmRequired} km
                </text>
              )}
            </g>
          );
        })}

        {/* Traveler indicator */}
        {state && travelerPos && (
          <g className={styles.traveler}>
            <circle
              cx={travelerPos[0]}
              cy={travelerPos[1]}
              r="28"
              fill="none"
              stroke="var(--color-primary-light)"
              strokeWidth="1.5"
              opacity="0.4"
              className={styles.travelerPulse}
            />
            <circle
              cx={travelerPos[0]}
              cy={travelerPos[1]}
              r="5"
              fill="var(--color-primary)"
              filter="url(#glow)"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
