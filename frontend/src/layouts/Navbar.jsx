import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  History, 
  Github, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Sparkles,
  Activity
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode, backendStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'News Analysis', icon: Sparkles },
    { id: 'comparison', label: 'Model Benchmarks', icon: BarChart3 },
    { id: 'technology', label: 'Technology & Architecture', icon: Cpu },
    { id: 'history', label: 'History', icon: History },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-navy-950/80 dark:bg-navy-950/80 bg-white/80 border-b border-navy-800/80 dark:border-navy-800/80 border-slate-200 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('landing')}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electric via-blue-600 to-indigo-500 p-0.5 shadow-glow-electric transition-transform group-hover:scale-105 duration-200">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-electric transition-colors group-hover:text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white dark:text-white text-slate-900 font-sans">
                Truth<span className="text-electric">Lens</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-electric/10 border border-electric/30 text-electric">
                AI NLP
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">Production Fake News Classifier</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-electric/15 text-electric border border-electric/30 shadow-sm'
                    : 'text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:bg-navy-800/60 dark:hover:bg-navy-800/60 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-electric' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Backend Status, GitHub, Dark Mode Toggle */}
        <div className="flex items-center space-x-3">
          
          {/* Live Backend Connection Indicator */}
          <div 
            title={backendStatus === 'online' ? 'Backend API connected (FastAPI)' : 'Connecting to API...'}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-navy-850 dark:bg-navy-850 bg-slate-100 border border-navy-700/60 dark:border-navy-700/60 border-slate-200"
          >
            <span className={`w-2 h-2 rounded-full ${backendStatus === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-[11px] text-slate-400">
              {backendStatus === 'online' ? 'API Online' : 'Connecting'}
            </span>
          </div>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:bg-navy-800/70 dark:hover:bg-navy-800/70 hover:bg-slate-100 border border-transparent hover:border-navy-700 transition-all"
            title="View original GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-300 dark:text-slate-300 text-slate-600 hover:text-white dark:hover:text-white hover:bg-navy-800/70 dark:hover:bg-navy-800/70 hover:bg-slate-100 border border-transparent hover:border-navy-700 transition-all"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-navy-950/95 dark:bg-navy-950/95 bg-white/95 border-b border-navy-800 dark:border-navy-800 border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-electric/20 text-electric font-semibold'
                    : 'text-slate-300 dark:text-slate-300 text-slate-700 hover:bg-navy-800 dark:hover:bg-navy-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
