import { useState } from 'react';
import { useApp } from '../context/useApp';
import { ACMLogo } from './ACMLogo';
import styles from './LoginScreen.module.css';

export default function LoginScreen() {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsAnimating(true);
    setTimeout(() => login(name.trim()), 600);
  };

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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <ACMLogo size={48} variant="white" />
        </div>
        <p className={styles.subtitle}>
          Transforme seus passos em uma jornada espiritual<br/>
          pelos lugares onde Jesus viveu e ministrou
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>360</span>
            <span className={styles.statLabel}>quilômetros</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>25</span>
            <span className={styles.statLabel}>marcos bíblicos</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>jornada sagrada</span>
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
