import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  ShieldAlert, 
  Copy, 
  Check, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function HistoryPage({ history, setHistory, setActiveTab }) {
  const [copiedId, setCopiedId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'real', 'fake'

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local analysis history?')) {
      setHistory([]);
    }
  };

  const handleCopySnippet = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truthlens-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredHistory = (history || []).filter((item) => {
    if (filter === 'real') return item.prediction === 'REAL';
    if (filter === 'fake') return item.prediction === 'FAKE';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-electric uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Persisted Local Storage</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white dark:text-white text-slate-900 tracking-tight mt-1">
            Analysis Session History
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Persisted locally in your browser. TruthLens does not store queries on a remote database.
          </p>
        </div>

        {/* Action Buttons */}
        {history && history.length > 0 && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-navy-850 dark:bg-navy-850 bg-white border border-navy-700/80 dark:border-navy-700/80 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-700 hover:text-white shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleClearHistory}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Chips */}
      {history && history.length > 0 && (
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              filter === 'all'
                ? 'bg-electric text-white border-electric'
                : 'border-navy-800 text-slate-400 hover:text-white'
            }`}
          >
            All ({history.length})
          </button>
          <button
            onClick={() => setFilter('real')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              filter === 'real'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'border-navy-800 text-slate-400 hover:text-white'
            }`}
          >
            Real News ({history.filter(h => h.prediction === 'REAL').length})
          </button>
          <button
            onClick={() => setFilter('fake')}
            className={`px-3 py-1 rounded-lg border transition-all ${
              filter === 'fake'
                ? 'bg-red-600 text-white border-red-500'
                : 'border-navy-800 text-slate-400 hover:text-white'
            }`}
          >
            Fake News ({history.filter(h => h.prediction === 'FAKE').length})
          </button>
        </div>
      )}

      {/* History Items or Empty State */}
      {!history || history.length === 0 ? (
        <div className="p-12 rounded-2xl glass-panel text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-navy-800/80 border border-navy-700 flex items-center justify-center mx-auto text-slate-400">
            <History className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white dark:text-white text-slate-900 text-base">No Analysis History Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Any headlines or articles you analyze will automatically appear here with their prediction and confidence scores.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-electric hover:bg-electric-hover shadow-glow-electric transition-all"
          >
            <span>Analyze Your First Article</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl glass-panel hover:border-navy-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                    item.prediction === 'REAL'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {item.prediction}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-300 dark:text-slate-300 text-slate-700">
                    {item.confidence}% Confidence
                  </span>
                  <span className="text-[11px] text-slate-500">•</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.model}
                  </span>
                </div>

                <p className="text-sm font-medium text-white dark:text-white text-slate-800 line-clamp-2">
                  "{item.textSnippet}"
                </p>

                <p className="text-[10px] text-slate-500 font-mono">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleCopySnippet(item.id, item.fullText || item.textSnippet)}
                  className="p-2 rounded-lg bg-navy-900 border border-navy-800 text-slate-400 hover:text-white hover:border-navy-700 transition-all text-xs flex items-center space-x-1"
                  title="Copy full text"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
