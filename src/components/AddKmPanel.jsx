import { useState } from 'react';
import { useApp } from '../context/useApp';
import { formatDistance } from '../data/storage';
import StravaSheet from './StravaSheet';
import styles from './AddKmPanel.module.css';

export default function AddKmPanel() {
  const { state, addKm, showToast } = useApp();
  const [customKm, setCustomKm] = useState('');
  const [stravaOpen, setStravaOpen] = useState(false);

  if (!state) return null;

  const unit = state.settings?.unit || 'km';
  const remaining = Math.max(0, 360 - state.totalKm);

  const handleAdd = (km) => {
    if (km <= 0) return;
    const actual = Math.min(km, remaining);
    addKm(actual);
    showToast(`+${formatDistance(actual, unit)} adicionados! 🚶`);
    setCustomKm('');
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(customKm);
    if (isNaN(val) || val <= 0) return;
    handleAdd(val);
  };

  const isComplete = state.totalKm >= 360;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>🚶</span>
          <div>
            <h3 className={styles.title}>Registrar Caminhada</h3>
            <p className={styles.subtitle}>
              {isComplete 
                ? '🎉 Jornada completa!' 
                : `Faltam ${formatDistance(remaining, unit)}`
              }
            </p>
          </div>
        </div>
      </div>

      {!isComplete && (
        <div className={styles.body}>
          <form onSubmit={handleCustomSubmit} className={styles.customForm}>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max={remaining}
              placeholder={`Km percorridos`}
              value={customKm}
              onChange={(e) => setCustomKm(e.target.value)}
              className={styles.customInput}
            />
            <button type="submit" className={styles.customSubmit} disabled={!customKm}>
              Registrar
            </button>
          </form>

          {/* ── Strava divider + button ── */}
          <div className={styles.stravaDivider} />

          <button
            type="button"
            className={styles.stravaBtn}
            onClick={() => setStravaOpen(true)}
          >
            <div className={styles.stravaBtnLeft}>
              <span className={styles.stravaIcon}>⚡</span>
              <div>
                <span className={styles.stravaTitle}>Sincronizar com Strava</span>
                <span className={styles.stravaSub}>Importar atividades automaticamente</span>
              </div>
            </div>
            <span className={styles.stravaBadge}>EM BREVE</span>
          </button>
        </div>
      )}

      <StravaSheet open={stravaOpen} onClose={() => setStravaOpen(false)} />
    </div>
  );
}
