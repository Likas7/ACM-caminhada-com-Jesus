import { useMemo } from 'react';
import { useApp } from '../context/useApp';
import styles from './DailyVerse.module.css';

const dayOfYear = Math.floor(
  (Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
);

export default function DailyVerse() {
  const { state, milestones, setActiveModal } = useApp();

  const todayVerse = useMemo(() => {
    if (!state) return null;
    const unlocked = milestones.filter(m =>
      state.unlockedMilestones?.includes(m.id)
    );
    if (unlocked.length === 0) return milestones[0];
    // Pick a "random" but deterministic verse based on date
    return unlocked[dayOfYear % unlocked.length];
  }, [state, milestones]);

  if (!todayVerse) return null;

  return (
    <div
      className={styles.card}
      onClick={() => setActiveModal(todayVerse)}
      style={{ borderLeftColor: todayVerse.type === 'principal' ? 'var(--color-accent)' : 'var(--color-primary)' }}
    >
      <div className={styles.label}>
        <span>✨</span>
        <span>Versículo do Dia</span>
      </div>
      <blockquote className={styles.verse}>
        {todayVerse.verseText}
      </blockquote>
      <div className={styles.footer}>
        <span className={styles.badge}>{todayVerse.badge}</span>
        <span className={styles.name}>{todayVerse.name}</span>
        <span className={styles.ref}>{todayVerse.ref}</span>
      </div>
    </div>
  );
}
