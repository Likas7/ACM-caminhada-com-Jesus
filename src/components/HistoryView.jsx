import { useMemo } from 'react';
import { useApp } from '../context/useApp';
import { formatDistance, getRank } from '../data/storage';
import { milestones } from '../data/milestones';
import styles from './HistoryView.module.css';

export default function HistoryView() {
  const { state } = useApp();

  const unit = state?.settings?.unit || 'km';
  const history = useMemo(() => state?.history || [], [state?.history]);
  const rank = state ? getRank(state.totalKm) : null;

  // ─── Statistics ───
  const stats = useMemo(() => {
    if (!state || history.length === 0) return null;

    const totalDays = new Set(
      history.map(h => new Date(h.date).toLocaleDateString('pt-BR'))
    ).size;

    const totalKm = state.totalKm;
    const avgPerDay = totalDays > 0 ? Math.round((totalKm / totalDays) * 10) / 10 : 0;

    // Current streak (consecutive days)
    const daysSorted = [...new Set(
      history.map(h => new Date(h.date).toDateString())
    )].sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const today = new Date();
    for (let i = 0; i < daysSorted.length; i++) {
      const expected = new Date(today);
      expected.setDate(expected.getDate() - i);
      if (new Date(daysSorted[i]).toDateString() === expected.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    // Best single walk
    const bestWalk = history.reduce((max, h) => h.km > max ? h.km : max, 0);

    // Progress percentage
    const progress = Math.min((totalKm / 360) * 100, 100);

    // Milestones achieved
    const achieved = state.unlockedMilestones?.length || 1;

    return { totalDays, avgPerDay, streak, bestWalk, progress, achieved };
  }, [history, state]);

  // ─── Group history by date ───
  const groupedHistory = useMemo(() => {
    const groups = {};
    const sorted = [...history].reverse(); // newest first
    sorted.forEach(h => {
      const dateKey = new Date(h.date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(h);
    });
    return Object.entries(groups).slice(0, 30); // max 30 groups
  }, [history]);

  // ─── Next milestone ───
  const nextMilestone = useMemo(() => {
    return milestones.find(m => m.kmRequired > (state?.totalKm || 0)) || null;
  }, [state?.totalKm]);

  if (!state) return null;

  return (
    <div className={styles.container}>
      {/* ── Stats Cards ── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statEmoji}>📊</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{formatDistance(state.totalKm, unit)}</span>
            <span className={styles.statLabel}>Total percorrido</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statEmoji}>{rank.emoji}</div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{rank.title}</span>
            <span className={styles.statLabel}>Nível {rank.level}/5</span>
          </div>
        </div>

        {stats && (
          <>
            <div className={styles.statCard}>
              <div className={styles.statEmoji}>📅</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.totalDays}</span>
                <span className={styles.statLabel}>Dias ativos</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statEmoji}>⚡</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{formatDistance(stats.avgPerDay, unit)}</span>
                <span className={styles.statLabel}>Média/dia</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statEmoji}>🔥</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stats.streak} {stats.streak === 1 ? 'dia' : 'dias'}</span>
                <span className={styles.statLabel}>Sequência atual</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statEmoji}>🏅</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{formatDistance(stats.bestWalk, unit)}</span>
                <span className={styles.statLabel}>Melhor caminhada</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Progress Ring ── */}
      <div className={styles.progressSection}>
        <div className={styles.ringContainer}>
          <svg viewBox="0 0 120 120" className={styles.ring}>
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="6"
            />
            <circle
              cx="60" cy="60" r="52"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(stats?.progress || 0) * 3.267} 326.7`}
              transform="rotate(-90 60 60)"
              className={styles.ringProgress}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-primary-light)" />
                <stop offset="100%" stopColor="var(--color-primary)" />
              </linearGradient>
            </defs>
            <text x="60" y="55" textAnchor="middle" className={styles.ringPct}>
              {Math.round(stats?.progress || 0)}%
            </text>
            <text x="60" y="72" textAnchor="middle" className={styles.ringLabel}>
              concluído
            </text>
          </svg>
        </div>

        <div className={styles.progressInfo}>
          <p className={styles.progressTitle}>Progresso da Jornada</p>
          <p className={styles.progressDetail}>
            {formatDistance(state.totalKm, unit)} de {formatDistance(360, unit)}
          </p>
          <p className={styles.progressMilestones}>
            ⭐ {state.unlockedMilestones?.length || 1} de 25 marcos desbloqueados
          </p>
        </div>
      </div>

      {/* ── Next Milestone ── */}
      {nextMilestone && (
        <div className={styles.nextCard}>
          <div className={styles.nextHeader}>
            <span>🎯</span>
            <span className={styles.nextTitle}>Próximo Marco</span>
          </div>
          <div className={styles.nextBody}>
            <span className={styles.nextBadge}>{nextMilestone.badge}</span>
            <div className={styles.nextInfo}>
              <span className={styles.nextName}>{nextMilestone.name}</span>
              <span className={styles.nextRef}>{nextMilestone.ref}</span>
            </div>
            <div className={styles.nextKm}>
              <span className={styles.nextRemaining}>
                {formatDistance(Math.max(0, nextMilestone.kmRequired - state.totalKm), unit)}
              </span>
              <span className={styles.nextRemainingLabel}>restantes</span>
            </div>
          </div>
          <div className={styles.nextProgress}>
            <div
              className={styles.nextProgressFill}
              style={{
                width: `${Math.min(100, ((state.totalKm - (milestones.find(m => m.kmRequired < nextMilestone.kmRequired && state.unlockedMilestones?.includes(m.id))?.kmRequired || 0)) / (nextMilestone.kmRequired - (milestones.find(m => m.kmRequired < nextMilestone.kmRequired && state.unlockedMilestones?.includes(m.id))?.kmRequired || 0))) * 100)}%`
              }}
            />
          </div>
        </div>
      )}

      {/* ── Rank Progress ── */}
      <div className={styles.rankCard}>
        <div className={styles.rankHeader}>
          <span>🏆</span>
          <span className={styles.rankTitle}>Evolução de Rank</span>
        </div>
        <div className={styles.rankLevels}>
          {[
            { emoji: '🦶', label: 'Iniciante', km: 0 },
            { emoji: '🚶', label: 'Caminhante', km: 30 },
            { emoji: '🏃', label: 'Seguidor', km: 100 },
            { emoji: '🧳', label: 'Peregrino', km: 200 },
            { emoji: '🛡️', label: 'Discípulo', km: 300 },
          ].map((r, i) => (
            <div key={i} className={`${styles.rankLevel} ${state.totalKm >= r.km ? styles.rankAchieved : ''}`}>
              <span className={styles.rankEmoji}>{r.emoji}</span>
              <span className={styles.rankLevelLabel}>{r.label}</span>
              <span className={styles.rankKm}>{r.km} km</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── History Log ── */}
      <div className={styles.historyCard}>
        <div className={styles.historyHeader}>
          <span>📋</span>
          <span className={styles.historyTitle}>Registro de Caminhadas</span>
          <span className={styles.historyCount}>{history.length} registros</span>
        </div>

        {history.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🚶</span>
            <p>Nenhuma caminhada registrada ainda.</p>
            <p className={styles.emptyHint}>Use os botões de km na aba Jornada para começar!</p>
          </div>
        ) : (
          <div className={styles.historyList}>
            {groupedHistory.map(([dateLabel, entries]) => (
              <div key={dateLabel} className={styles.historyGroup}>
                <div className={styles.historyDate}>{dateLabel}</div>
                {entries.map((entry, i) => (
                  <div key={i} className={styles.historyEntry}>
                    <div className={styles.entryDot} />
                    <div className={styles.entryInfo}>
                      <span className={styles.entryKm}>+{formatDistance(entry.km, unit)}</span>
                      <span className={styles.entryTime}>
                        {new Date(entry.date).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <span className={styles.entryTotal}>
                      Total: {formatDistance(entry.totalAtTime, unit)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
