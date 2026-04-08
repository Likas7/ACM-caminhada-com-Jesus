import { useMemo } from 'react';
import { useApp } from '../context/useApp';
import { formatDistance } from '../data/storage';
import styles from './MilestoneList.module.css';

export default function MilestoneList() {
  const { state, milestones, setActiveModal } = useApp();

  const unlockedSet = useMemo(
    () => new Set(state?.unlockedMilestones || [1]),
    [state?.unlockedMilestones]
  );

  const unit = state?.settings?.unit || 'km';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>📜</span>
        <h3 className={styles.title}>Marcos da Jornada</h3>
        <span className={styles.count}>
          {state?.unlockedMilestones?.length || 1} / {milestones.length}
        </span>
      </div>

      <div className={styles.list}>
        {milestones.map((m) => {
          const isUnlocked = unlockedSet.has(m.id);
          const isCurrent = state?.currentMilestone === m.id;
          const isPrincipal = m.type === 'principal';

          return (
            <button
              key={m.id}
              className={`${styles.item} ${isUnlocked ? styles.unlocked : styles.locked} ${isCurrent ? styles.current : ''} ${isPrincipal ? styles.principal : ''}`}
              onClick={() => isUnlocked && setActiveModal(m)}
              disabled={!isUnlocked}
            >
              <div className={styles.itemLeft}>
                <span className={styles.itemBadge}>
                  {isUnlocked ? m.badge : '🔒'}
                </span>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{m.name}</span>
                  <span className={styles.itemRef}>{m.ref}</span>
                </div>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.itemKm}>
                  {formatDistance(m.kmRequired, unit)}
                </span>
                {isPrincipal && isUnlocked && (
                  <span className={styles.principalTag}>⭐</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
