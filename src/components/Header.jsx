import { useState } from 'react';
import { useApp } from '../context/useApp';
import { getRank, formatDistance } from '../data/storage';
import styles from './Header.module.css';

export default function Header() {
  const { state, logout, updateSettings } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  
  if (!state) return null;

  const rank = getRank(state.totalKm);
  const unit = state.settings?.unit || 'km';
  const progress = Math.min((state.totalKm / 360) * 100, 100);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.crossIcon}>✝</div>
          <div className={styles.brand}>
            <h1 className={styles.title}>Caminhada com Jesus</h1>
            <p className={styles.greeting}>
              {rank.emoji} {state.userName} · <span className={styles.rankLabel}>{rank.title}</span>
            </p>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.kmBadge}>
            <span className={styles.kmValue}>{formatDistance(state.totalKm, unit)}</span>
            <span className={styles.kmLabel}>/ {formatDistance(360, unit)}</span>
          </div>
          <button
            className={styles.settingsBtn}
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Configurações"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      {/* Settings dropdown */}
      {showSettings && (
        <div className={styles.settingsPanel}>
          <div className={styles.settingsOverlay} onClick={() => setShowSettings(false)} />
          <div className={styles.settingsContent}>
            <h3>Configurações</h3>
            
            <div className={styles.settingRow}>
              <span>Unidade de distância</span>
              <div className={styles.toggle}>
                <button
                  className={`${styles.toggleBtn} ${unit === 'km' ? styles.active : ''}`}
                  onClick={() => updateSettings({ unit: 'km' })}
                >
                  KM
                </button>
                <button
                  className={`${styles.toggleBtn} ${unit === 'mi' ? styles.active : ''}`}
                  onClick={() => updateSettings({ unit: 'mi' })}
                >
                  Miles
                </button>
              </div>
            </div>

            <div className={styles.dangerZone}>
              <p className={styles.dangerLabel}>⚠️ Zona de Perigo</p>
              <button className={styles.resetBtn} onClick={() => {
                if (confirm('Tem certeza? Todo o progresso será perdido.')) {
                  logout();
                }
              }}>
                Resetar Jornada
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
