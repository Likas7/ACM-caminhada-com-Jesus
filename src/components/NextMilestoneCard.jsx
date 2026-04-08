import { useMemo } from 'react';
import { useApp } from '../context/useApp';
import { formatDistance } from '../data/storage';
import { milestones } from '../data/milestones';
import styles from './NextMilestoneCard.module.css';

export default function NextMilestoneCard() {
  const { state, setActiveModal } = useApp();

  const unit = state?.settings?.unit || 'km';

  // Find current (last unlocked) and next milestone
  const { current, next } = useMemo(() => {
    const unlocked = milestones.filter(m =>
      state?.unlockedMilestones?.includes(m.id)
    ).sort((a, b) => b.kmRequired - a.kmRequired);

    const curr = unlocked[0] || milestones[0];
    const nxt = milestones.find(m => m.kmRequired > (state?.totalKm || 0)) || null;

    return { current: curr, next: nxt };
  }, [state?.totalKm, state?.unlockedMilestones]);

  // Calculate intermediate progress
  const segmentProgress = useMemo(() => {
    if (!next || !state) return 100;
    const segStart = current.kmRequired;
    const segEnd = next.kmRequired;
    const segRange = segEnd - segStart;
    if (segRange <= 0) return 100;
    return Math.min(100, ((state.totalKm - segStart) / segRange) * 100);
  }, [state, current, next]);

  if (!state) return null;

  const isComplete = state.totalKm >= 360;

  return (
    <div className={styles.card}>
      {/* Current */}
      <div className={styles.currentSection} onClick={() => setActiveModal(current)}>
        <span className={styles.currentBadge}>{current.badge}</span>
        <div className={styles.currentInfo}>
          <span className={styles.currentLabel}>Marco atual</span>
          <span className={styles.currentName}>{current.name}</span>
        </div>
        <span className={styles.arrow}>→</span>
      </div>

      {/* Progress to next */}
      {next && !isComplete && (
        <>
          <div className={styles.progressRow}>
            <div className={styles.progressBarBg}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${segmentProgress}%` }}
              />
            </div>
            <span className={styles.progressPct}>{Math.round(segmentProgress)}%</span>
          </div>

          <div className={styles.nextSection}>
            <span className={styles.nextBadge}>{next.badge}</span>
            <div className={styles.nextInfo}>
              <span className={styles.nextLabel}>Próximo marco</span>
              <span className={styles.nextName}>{next.name}</span>
            </div>
            <span className={styles.nextKm}>
              {formatDistance(Math.max(0, next.kmRequired - state.totalKm), unit)}
            </span>
          </div>
        </>
      )}

      {isComplete && (
        <div className={styles.completeSection}>
          <span className={styles.completeEmoji}>🎉</span>
          <span className={styles.completeText}>Jornada completa — Jerusalém alcançada!</span>
        </div>
      )}
    </div>
  );
}
