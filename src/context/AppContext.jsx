import { useState, useCallback } from 'react';
import { AppContext } from './AppContext.js';
import { loadState, saveState, createUser, addKilometers, resetProgress } from '../data/storage';
import { milestones } from '../data/milestones';

export function AppProvider({ children }) {
  const [state, setState] = useState(() => loadState());
  const [activeModal, setActiveModal] = useState(null); // milestone object or null
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }, []);

  const login = useCallback((name) => {
    const newState = createUser(name);
    setState(newState);
  }, []);

  const addKm = useCallback((km) => {
    const updated = addKilometers(km);
    if (!updated) return;

    // Check for newly unlocked milestones after adding km
    const newlyUnlocked = milestones.filter(
      m => m.kmRequired <= updated.totalKm && !updated.unlockedMilestones.includes(m.id)
    );

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(m => {
        if (!updated.unlockedMilestones.includes(m.id)) {
          updated.unlockedMilestones = [...updated.unlockedMilestones, m.id];
        }
      });
      const latest = newlyUnlocked[newlyUnlocked.length - 1];
      updated.currentMilestone = latest.id;
      saveState(updated);
      setShowConfetti(true);
      showToast(`🎉 Novo marco desbloqueado: ${latest.name}!`);
      setTimeout(() => setShowConfetti(false), 4000);
    }

    setState({ ...updated });
  }, [showToast]);

  const logout = useCallback(() => {
    resetProgress();
    setState(null);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    if (!state) return;
    const updated = { ...state, settings: { ...state.settings, ...newSettings } };
    saveState(updated);
    setState(updated);
  }, [state]);

  const value = {
    state,
    login,
    addKm,
    logout,
    updateSettings,
    activeModal,
    setActiveModal,
    showConfetti,
    toastMessage,
    showToast,
    milestones,
    isLoggedIn: !!state,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
