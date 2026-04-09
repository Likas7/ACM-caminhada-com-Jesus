import { useEffect, useRef } from 'react';
import styles from './StravaSheet.module.css';

const DEVICES = [
  { icon: '⌚', label: 'Garmin' },
  { icon: '🍎', label: 'Apple' },
  { icon: '📱', label: 'Samsung' },
  { icon: '🏃', label: 'Polar' },
];

export default function StravaSheet({ open, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Strava — Em Breve">
        <div className={styles.handle} />

        {/* Icon */}
        <div className={styles.iconHero}>
          <div className={styles.iconCircle}>⚡</div>
        </div>

        {/* Label */}
        <p className={styles.label}>Strava · Sincronização</p>

        {/* Title */}
        <h2 className={styles.title}>Em Breve</h2>

        {/* Body */}
        <p className={styles.bodyText}>
          Em breve você poderá conectar sua conta Strava e importar automaticamente suas caminhadas e corridas para a jornada.
        </p>

        <p className={styles.subText}>
          Funciona com Garmin, Apple Watch, Samsung e todos os dispositivos que sincronizam com o Strava.
        </p>

        {/* Device chips */}
        <div className={styles.chips}>
          {DEVICES.map((d) => (
            <span key={d.label} className={styles.chip}>
              {d.icon} {d.label}
            </span>
          ))}
        </div>

        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
