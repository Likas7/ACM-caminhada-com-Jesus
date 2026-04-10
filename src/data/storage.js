// ─── Storage Abstraction Layer ───
// Uses localStorage now, easily swappable for Supabase/Firebase later

const STORAGE_KEY = 'caminhada_com_jesus';

// Journey distance options
export const JOURNEY_DISTANCES = [
  { id: 90, name: 'Curta', description: '90 km - Caminhada light', icon: '🚶' },
  { id: 180, name: 'Média', description: '180 km - Metade da jornada', icon: '🏃' },
  { id: 360, name: 'Completa', description: '360 km - Belém a Jerusalém', icon: '鸽子' },
];

const defaultState = {
  userName: '',
  journeyDistance: 360, // Default to full journey
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

export function createUser(name, journeyDistance = 360) {
  const state = {
    ...defaultState,
    userName: name,
    journeyDistance,
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

export function getJourneyMilestones(allMilestones, journeyDistance) {
  return allMilestones.filter(m => m.kmRequired <= journeyDistance);
}

export function getJourneyTotal(journeyDistance) {
  return journeyDistance;
}

export function getRank(totalKm, journeyDistance = 360) {
  const threshold = journeyDistance * 0.833; // ~83% of journey
  if (totalKm >= threshold) return { title: 'Discípulo', emoji: '🛡️', level: 5 };
  if (totalKm >= journeyDistance * 0.666) return { title: 'Peregrino Fiel', emoji: '🧳', level: 4 };
  if (totalKm >= journeyDistance * 0.5) return { title: 'Seguidor', emoji: '🏃', level: 3 };
  if (totalKm >= journeyDistance * 0.166) return { title: 'Caminhante', emoji: '🚶', level: 2 };
  return { title: 'Iniciante', emoji: '🦶', level: 1 };
}
