import { useState, useCallback, useMemo } from 'react';
import { AppContext } from './AppContext.js';
import { loadState, saveState, createUser, addKilometers, resetProgress, JOURNEY_DISTANCES, getJourneyMilestones } from '../data/storage';
import { milestones as allMilestones, TOTAL_KM } from '../data/milestones';

export function AppProvider({ children }) {
  const [state, setState] = useState(() => loadState());
  const [activeModal, setActiveModal] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const journeyDistance = state?.journeyDistance || 360;
  
  const milestones = useMemo(() => {
    return getJourneyMilestones(allMilestones, journeyDistance);
  }, [journeyDistance]);

  const totalJourneyKm = journeyDistance;

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }, []);

  const login = useCallback((name, journeyDistance = 360) => {
    const newState = createUser(name, journeyDistance);
    setState(newState);
  }, []);

  const addKm = useCallback((km) => {
    const updated = addKilometers(km);
    if (!updated) return;

    const journeyMilestones = getJourneyMilestones(allMilestones, updated.journeyDistance || 360);
    
    const newlyUnlocked = journeyMilestones.filter(
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
    totalJourneyKm,
    isLoggedIn: !!state,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
