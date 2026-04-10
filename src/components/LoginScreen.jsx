import { useState } from 'react';
import { useApp } from '../context/useApp';
import { ACMLogo } from './ACMLogo';
import { JOURNEY_DISTANCES } from '../data/storage';
import styles from './LoginScreen.module.css';

export default function LoginScreen() {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [selectedDistance, setSelectedDistance] = useState(360);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsAnimating(true);
    setTimeout(() => login(name.trim(), selectedDistance), 600);
  };

  const selectedJourney = JOURNEY_DISTANCES.find(d => d.id === selectedDistance);

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} />
      
      <div className={`${styles.content} ${isAnimating ? styles.exiting : ''}`}>
        {/* Cross */}
        <div className={styles.crossContainer}>
          <div className={styles.cross}>
            <div className={styles.crossVertical} />
            <div className={styles.crossHorizontal} />
          </div>
          <div className={styles.crossGlow} />
        </div>

        <h1 className={styles.title}>Caminhada<br/>com Jesus</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <ACMLogo size={80} variant="color" />
        </div>
        <p className={styles.subtitle}>
          Transforme seus passos em uma jornada espiritual<br/>
          pelos lugares onde Jesus viveu e ministrou
        </p>

        {/* Journey Distance Selector */}
        <div className={styles.journeySelector}>
          <p className={styles.selectorLabel}>Escolha sua jornada</p>
          <div className={styles.distanceOptions}>
            {JOURNEY_DISTANCES.map((distance) => (
              <button
                key={distance.id}
                type="button"
                className={`${styles.distanceOption} ${selectedDistance === distance.id ? styles.selected : ''}`}
                onClick={() => setSelectedDistance(distance.id)}
              >
                <span className={styles.distanceIcon}>{distance.icon}</span>
                <span className={styles.distanceValue}>{distance.id}</span>
                <span className={styles.distanceUnit}>km</span>
              </button>
            ))}
          </div>
          <p className={styles.selectedDescription}>
            {selectedJourney?.description}
          </p>
        </div>

        {/* Stats - dynamic based on selection */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{selectedDistance}</span>
            <span className={styles.statLabel}>quilômetros</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {selectedDistance === 90 ? '12' : selectedDistance === 180 ? '18' : '25'}
            </span>
            <span className={styles.statLabel}>marcos</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>jornada</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="login-name"
              placeholder="Seu nome de peregrino"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              autoFocus
              maxLength={30}
            />
            <div className={styles.inputBorder} />
          </div>
          <button 
            type="submit" 
            className={styles.button}
            disabled={!name.trim()}
          >
            <span>Iniciar Caminhada</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>

        <p className={styles.verse}>
          <em>"Eu sou o caminho, a verdade e a vida"</em><br/>
          <span>— João 14:6</span>
        </p>
      </div>
    </div>
  );
}
