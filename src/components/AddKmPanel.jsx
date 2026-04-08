import { useState } from 'react';
import { useApp } from '../context/useApp';
import { formatDistance } from '../data/storage';
import styles from './AddKmPanel.module.css';

const QUICK_VALUES = [1, 2, 3, 5, 10];

export default function AddKmPanel() {
  const { state, addKm, showToast } = useApp();
  const [customKm, setCustomKm] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  if (!state) return null;

  const unit = state.settings?.unit || 'km';
  const remaining = Math.max(0, 360 - state.totalKm);

  const handleAdd = (km) => {
    if (km <= 0) return;
    const actual = Math.min(km, remaining);
    addKm(actual);
    showToast(`+${formatDistance(actual, unit)} adicionados! 🚶`);
    setCustomKm('');
    setShowCustom(false);
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
          <div className={styles.quickButtons}>
            {QUICK_VALUES.map(v => (
              <button
                key={v}
                className={styles.quickBtn}
                onClick={() => handleAdd(v)}
              >
                +{v} km
              </button>
            ))}
            <button
              className={`${styles.quickBtn} ${styles.customToggle}`}
              onClick={() => setShowCustom(!showCustom)}
            >
              ✏️
            </button>
          </div>

          {showCustom && (
            <form onSubmit={handleCustomSubmit} className={styles.customForm}>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max={remaining}
                placeholder="Km percorridos"
                value={customKm}
                onChange={(e) => setCustomKm(e.target.value)}
                className={styles.customInput}
                autoFocus
              />
              <button type="submit" className={styles.customSubmit} disabled={!customKm}>
                Adicionar
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
