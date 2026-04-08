import { useEffect, useRef } from 'react';
import { useApp } from '../context/useApp';
import { formatDistance } from '../data/storage';
import styles from './MilestoneModal.module.css';

export default function MilestoneModal() {
  const { activeModal: milestone, setActiveModal, state } = useApp();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (milestone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [milestone]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setActiveModal]);

  if (!milestone) return null;

  const unit = state?.settings?.unit || 'km';
  const isPrincipal = milestone.type === 'principal';
  const paragraphs = milestone.narrative.split('\n\n');

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={(e) => {
      if (e.target === overlayRef.current) setActiveModal(null);
    }}>
      <div className={styles.modal} ref={contentRef}>
        {/* Close button */}
        <button className={styles.closeBtn} onClick={() => setActiveModal(null)} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Hero section */}
        <div className={`${styles.hero} ${isPrincipal ? styles.heroPrincipal : ''}`}>
          <span className={styles.badge}>{milestone.badge}</span>
          <div className={styles.badgeTag}>{milestone.badgeLabel}</div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.typeTag}>
              {isPrincipal ? '⭐ Marco Principal' : '📍 Marco Intermediário'}
            </span>
            <span className={styles.kmTag}>
              {formatDistance(milestone.kmRequired, unit)}
            </span>
          </div>

          <h2 className={styles.title}>{milestone.name}</h2>

          <div className={styles.refBox}>
            <span className={styles.refIcon}>📖</span>
            <span className={styles.refText}>{milestone.ref}</span>
          </div>

          {/* Verse */}
          <blockquote className={styles.verse}>
            {milestone.verseText}
          </blockquote>

          {/* Narrative */}
          <div className={styles.narrative}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Geographic Note */}
          <div className={styles.geoBox}>
            <div className={styles.geoHeader}>
              <span>🌍</span>
              <span>Nota Geográfica</span>
            </div>
            <p className={styles.geoText}>{milestone.geographicNote}</p>
          </div>

          {/* Reflection */}
          <div className={styles.reflectionBox}>
            <div className={styles.reflectionHeader}>
              <span>💭</span>
              <span>Para Reflexão</span>
            </div>
            <p className={styles.reflectionText}>{milestone.reflection}</p>
          </div>

          {/* Map link */}
          <a
            href={`https://www.google.com/maps?q=${milestone.lat},${milestone.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Ver no Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
