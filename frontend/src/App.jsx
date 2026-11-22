import React, { useState, useEffect } from 'react';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ComparisonPage from './pages/ComparisonPage';
import TechnologyPage from './pages/TechnologyPage';
import HistoryPage from './pages/HistoryPage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { checkHealth } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [darkMode, setDarkMode] = useLocalStorage('truthlens_darkmode', true);
  const [history, setHistory] = useLocalStorage('truthlens_history', []);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Sync dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [darkMode]);

  // Periodic health check
  useEffect(() => {
    let isMounted = true;
    const testApi = async () => {
      try {
        const res = await checkHealth();
        if (isMounted) {
          if (res && res.status === 'healthy') {
            setBackendStatus('online');
          } else {
            setBackendStatus('offline');
          }
        }
      } catch (e) {
        if (isMounted) setBackendStatus('offline');
      }
    };

    testApi();
    const interval = setInterval(testApi, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        backendStatus={backendStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && <DashboardPage history={history} setHistory={setHistory} />}
        {activeTab === 'comparison' && <ComparisonPage />}
        {activeTab === 'technology' && <TechnologyPage />}
        {activeTab === 'history' && <HistoryPage history={history} setHistory={setHistory} setActiveTab={setActiveTab} />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
