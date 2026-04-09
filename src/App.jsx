import { useState } from 'react';
import { useApp } from './context/useApp';
import LoginScreen from './components/LoginScreen';
import Header from './components/Header';
import SnakeMap from './components/SnakeMap';
import AddKmPanel from './components/AddKmPanel';
import NextMilestoneCard from './components/NextMilestoneCard';
import DailyVerse from './components/DailyVerse';
import MilestoneList from './components/MilestoneList';
import RealMap from './components/RealMap';
import HistoryView from './components/HistoryView';
import InstallPrompt from './components/InstallPrompt';
import MilestoneModal from './components/MilestoneModal';
import Confetti from './components/Confetti';
import { ACMLogo } from './components/ACMLogo';
import Toast from './components/Toast';
import './App.css';

const TABS = [
  { id: 'map',     icon: '🗺️', label: 'Jornada' },
  { id: 'real',    icon: '🌍', label: 'Terra Santa' },
  { id: 'list',    icon: '📜', label: 'Marcos' },
  { id: 'history', icon: '📊', label: 'Histórico' },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="dashboard">
      <Header />

      {/* Tab switcher */}
      <nav className="tabs" role="tablist" aria-label="Navegação principal">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className="main-content" role="tabpanel">
        {/* Install PWA prompt */}
        <InstallPrompt />

        {activeTab === 'map' && (
          <>
            <AddKmPanel />
            <NextMilestoneCard />
            <DailyVerse />
            <SnakeMap />
          </>
        )}

        {activeTab === 'real' && (
          <>
            <AddKmPanel />
            <RealMap />
          </>
        )}

        {activeTab === 'list' && (
          <>
            <AddKmPanel />
            <MilestoneList />
          </>
        )}

        {activeTab === 'history' && (
          <HistoryView />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5, marginBottom: '16px' }}>
          <ACMLogo size={40} variant="color" />
        </div>
        <p>Caminhada com Jesus — Uma jornada de fé, um passo de cada vez</p>
        <p className="footer-sub">Missão Cristã da ACM Sorocaba · De Belém 🌟 a Jerusalém 👑 · 360 km</p>
      </footer>
    </div>
  );
}

export default function App() {
  const { isLoggedIn, showConfetti } = useApp();

  return (
    <>
      {isLoggedIn ? <Dashboard /> : <LoginScreen />}
      <MilestoneModal />
      <Confetti active={showConfetti} />
      <Toast />
    </>
  );
}
