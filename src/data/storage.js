// ─── Storage Abstraction Layer ───
// Uses localStorage now, easily swappable for Supabase/Firebase later

const STORAGE_KEY = 'caminhada_com_jesus';

const defaultState = {
  userName: '',
  totalKm: 0,
  unlockedMilestones: [1], // First milestone always unlocked
  currentMilestone: 1,
  history: [], // { date, km, milestone }
  settings: {
    unit: 'km', // 'km' | 'mi'
    darkMode: true,
  },
  createdAt: null,
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function createUser(name) {
  const state = {
    ...defaultState,
    userName: name,
    createdAt: new Date().toISOString(),
  };
  saveState(state);
  return state;
}

export function addKilometers(km) {
  const state = loadState();
  if (!state) return null;
  state.totalKm = Math.round((state.totalKm + km) * 100) / 100;
  state.history.push({
    date: new Date().toISOString(),
    km,
    totalAtTime: state.totalKm,
  });
  saveState(state);
  return state;
}

export function unlockMilestone(id) {
  const state = loadState();
  if (!state) return null;
  if (!state.unlockedMilestones.includes(id)) {
    state.unlockedMilestones.push(id);
    state.currentMilestone = id;
  }
  saveState(state);
  return state;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function convertToMiles(km) {
  return Math.round(km * 0.621371 * 100) / 100;
}

export function formatDistance(km, unit = 'km') {
  if (unit === 'mi') {
    return `${convertToMiles(km).toLocaleString('pt-BR')} mi`;
  }
  return `${km.toLocaleString('pt-BR')} km`;
}

export function getRank(totalKm) {
  if (totalKm >= 300) return { title: 'Discípulo', emoji: '🛡️', level: 5 };
  if (totalKm >= 200) return { title: 'Peregrino Fiel', emoji: '🧳', level: 4 };
  if (totalKm >= 100) return { title: 'Seguidor', emoji: '🏃', level: 3 };
  if (totalKm >= 30)  return { title: 'Caminhante', emoji: '🚶', level: 2 };
  return { title: 'Iniciante', emoji: '🦶', level: 1 };
}
