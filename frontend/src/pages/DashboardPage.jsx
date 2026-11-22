import React, { useState } from 'react';
import { 
  Sparkles, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Sliders, 
  Layers, 
  Cpu, 
  Tag, 
  RotateCw,
  Info,
  ShieldCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { predictNews, compareModels } from '../services/api';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';

export default function DashboardPage({ history, setHistory }) {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('logistic_regression'); // 'logistic_regression' or 'naive_bayes'
  const [analysisMode, setAnalysisMode] = useState('single'); // 'single' or 'compare'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Character and word counts
  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Handle preset sample news click
  const handleSelectSample = (sample) => {
    setInputText(sample.text);
    setError(null);
  };

  // Handle Clear
  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  // Run Real Prediction
  const handleAnalyze = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setError('Please paste or type a news headline or article text to analyze.');
      return;
    }
    if (trimmed.length < 5) {
      setError('News text is too short. Please provide at least 5 characters for meaningful classification.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (analysisMode === 'compare') {
        const compResponse = await compareModels(trimmed);
        setResult({
          mode: 'compare',
          data: compResponse,
          timestamp: new Date().toISOString()
        });

        // Add to history
        const newHistoryItem = {
          id: Date.now().toString(),
          textSnippet: trimmed.slice(0, 100) + (trimmed.length > 100 ? '...' : ''),
          fullText: trimmed,
          mode: 'compare',
          prediction: compResponse.logistic_regression.prediction,
          confidence: compResponse.logistic_regression.confidence,
          model: 'Logistic Regression & Naive Bayes',
          agreement: compResponse.agreement,
          timestamp: new Date().toISOString()
        };
        setHistory([newHistoryItem, ...(history || []).slice(0, 49)]);

      } else {
        const predResponse = await predictNews(trimmed, selectedModel);
        setResult({
          mode: 'single',
          data: predResponse,
          timestamp: new Date().toISOString()
        });

        // Add to history
        const newHistoryItem = {
          id: Date.now().toString(),
          textSnippet: trimmed.slice(0, 100) + (trimmed.length > 100 ? '...' : ''),
          fullText: trimmed,
          mode: 'single',
          prediction: predResponse.prediction,
          confidence: predResponse.confidence,
          model: predResponse.model_used,
          is_real: predResponse.is_real,
          timestamp: new Date().toISOString()
        };
        setHistory([newHistoryItem, ...(history || []).slice(0, 49)]);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to the prediction backend. Ensure the FastAPI server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy results summary
  const handleCopyResult = () => {
    if (!result) return;
    let summary = '';
    if (result.mode === 'single') {
      const d = result.data;
      summary = `TruthLens AI Fake News Analysis:\nPrediction: ${d.prediction}\nConfidence: ${d.confidence}%\nModel: ${d.model_used}\nProbabilities: Real ${d.probabilities.real}% | Fake ${d.probabilities.fake}%\nLatency: ${d.processing_time_ms} ms\nInput Snippet: "${inputText.slice(0, 80)}..."`;
    } else {
      const lr = result.data.logistic_regression;
      const nb = result.data.naive_bayes;
      summary = `TruthLens Dual-Model Analysis:\nAgreement: ${result.data.agreement ? 'Both Models Agree' : 'Models Diverged'}\nLogistic Regression: ${lr.prediction} (${lr.confidence}%)\nNaive Bayes: ${nb.prediction} (${nb.confidence}%)\nInput Snippet: "${inputText.slice(0, 80)}..."`;
    }
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download analysis report
  const handleDownloadReport = () => {
    if (!result) return;
    const reportData = {
      platform: 'TruthLens – Fake News Detection Platform',
      analyzedAt: result.timestamp,
      inputText: inputText,
      analysis: result.data,
      methodology: {
        vectorizer: 'TF-IDF (5,000 features, ngram_range=(1,2))',
        benchmark_dataset: 'ISOT Fake News Dataset (44,689 articles)',
        disclaimer: 'This output is an automated Machine Learning estimate, not a verified factual determination.'
      }
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truthlens-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Header Title */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-semibold text-electric uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Real-Time Inference Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white text-slate-900 tracking-tight">
          News Credibility Analysis Dashboard
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl">
          Paste any complete news article or short headline below. TruthLens cleans the text, extracts 5,000 N-gram TF-IDF weights, and predicts whether it exhibits lexical characteristics of authentic or fabricated journalism.
        </p>
      </div>

      {/* Control Strip & Sample News Presets */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-300 dark:text-slate-300 text-slate-700">Quick Test Samples:</span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_ARTICLES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                  sample.type === 'real'
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60'
                    : 'bg-red-950/40 border-red-800/60 text-red-300 hover:bg-red-900/60'
                }`}
              >
                {sample.type === 'real' ? '✓ Real:' : '✗ Fake:'} {sample.title.slice(0, 32)}...
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Input Card */}
      <div className="p-6 rounded-2xl glass-panel space-y-5 shadow-xl">
        
        {/* Model Selection and Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-navy-800 dark:border-navy-800 border-slate-200">
          
          {/* Analysis Mode Switcher */}
          <div className="flex items-center space-x-2 bg-navy-900 dark:bg-navy-900 bg-slate-100 p-1 rounded-xl border border-navy-800 dark:border-navy-800 border-slate-200">
            <button
              onClick={() => setAnalysisMode('single')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                analysisMode === 'single'
                  ? 'bg-electric text-white shadow-sm'
                  : 'text-slate-400 hover:text-white dark:hover:text-white hover:text-slate-800'
              }`}
            >
              Single Model
            </button>
            <button
              onClick={() => setAnalysisMode('compare')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                analysisMode === 'compare'
                  ? 'bg-electric text-white shadow-sm'
                  : 'text-slate-400 hover:text-white dark:hover:text-white hover:text-slate-800'
              }`}
            >
              Dual Comparison
            </button>
          </div>

          {/* Individual Model Selector (Active if single mode) */}
          {analysisMode === 'single' ? (
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-400 flex items-center space-x-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>Active Classifier:</span>
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedModel('logistic_regression')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    selectedModel === 'logistic_regression'
                      ? 'bg-navy-800 dark:bg-navy-800 bg-white border-electric text-electric font-semibold shadow-sm'
                      : 'border-navy-700/80 dark:border-navy-700/80 border-slate-200 text-slate-400 hover:text-white'
                  }`}
                >
                  Logistic Regression (99.07%)
                </button>
                <button
                  onClick={() => setSelectedModel('naive_bayes')}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    selectedModel === 'naive_bayes'
                      ? 'bg-navy-800 dark:bg-navy-800 bg-white border-electric text-electric font-semibold shadow-sm'
                      : 'border-navy-700/80 dark:border-navy-700/80 border-slate-200 text-slate-400 hover:text-white'
                  }`}
                >
                  Naive Bayes (95.01%)
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-electric" />
              <span>Simultaneous evaluation across Logistic Regression & Naive Bayes</span>
            </div>
          )}

        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Paste a news headline or article here..."
            rows={8}
            className="w-full p-4 rounded-xl bg-navy-950/70 dark:bg-navy-950/70 bg-white border border-navy-800 dark:border-navy-800 border-slate-300 text-slate-100 dark:text-slate-100 text-slate-900 placeholder:text-slate-500 text-sm focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all resize-y"
          />
        </div>

        {/* Bottom Actions: Counter, Clear, Analyze */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          
          {/* Character & Word Count */}
          <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span>{charCount} characters</span>
            <span>•</span>
            <span>{wordCount} words</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={handleClear}
              disabled={!inputText && !result}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-navy-800 dark:hover:bg-navy-800 hover:bg-slate-100 border border-transparent hover:border-navy-700 transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isLoading || !inputText.trim()}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-electric to-blue-600 hover:from-electric-hover hover:to-blue-700 shadow-glow-electric disabled:opacity-50 disabled:pointer-events-none transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLoading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Linguistic Patterns...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze News</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-300 text-xs flex items-start space-x-3 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <div>
              <p className="font-semibold">Analysis Notice</p>
              <p className="text-red-300/90 mt-0.5">{error}</p>
            </div>
          </div>
        )}

      </div>

      {/* Prediction Results Display */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          
          {result.mode === 'single' ? (
            /* Single Model Result Card */
            <div className={`p-8 rounded-2xl glass-panel space-y-6 border-2 transition-all ${
              result.data.prediction === 'REAL'
                ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-transparent'
                : 'border-red-500/40 bg-gradient-to-b from-red-950/20 to-transparent'
            }`}>
              
              {/* Top Result Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy-800/80 dark:border-navy-800/80 border-slate-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    result.data.prediction === 'REAL'
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-glow-real'
                      : 'bg-red-500/20 text-red-400 shadow-glow-fake'
                  }`}>
                    {result.data.prediction === 'REAL' ? (
                      <ShieldCheck className="w-8 h-8" />
                    ) : (
                      <ShieldAlert className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs uppercase font-mono tracking-widest text-slate-400">Classification Outcome</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-navy-800 text-slate-300">
                        {result.data.model_used}
                      </span>
                    </div>
                    <div className="flex items-baseline space-x-3 mt-1">
                      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                        result.data.prediction === 'REAL' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {result.data.prediction === 'REAL' ? 'REAL NEWS' : 'FAKE NEWS'}
                      </h2>
                      <span className="text-lg font-bold font-mono text-slate-300">
                        {result.data.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyResult}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-navy-850 dark:bg-navy-850 bg-white border border-navy-700/80 dark:border-navy-700/80 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-700 hover:text-white transition-all shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-navy-850 dark:bg-navy-850 bg-white border border-navy-700/80 dark:border-navy-700/80 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-700 hover:text-white transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* Probability Distribution & Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                
                {/* Visual Probability Progress */}
                <div className="space-y-4 p-5 rounded-xl bg-navy-950/60 dark:bg-navy-950/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300 dark:text-slate-300 text-slate-700">Class Probability Distribution</span>
                    <span className="font-mono text-slate-400">{result.data.processing_time_ms} ms</span>
                  </div>

                  {/* Real Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                        <span>Real News Probability</span>
                      </span>
                      <span className="font-mono font-bold text-emerald-400">{result.data.probabilities.real}%</span>
                    </div>
                    <div className="w-full bg-navy-900 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-3 rounded-full transition-all duration-500 shadow-glow-real"
                        style={{ width: `${result.data.probabilities.real}%` }}
                      />
                    </div>
                  </div>

                  {/* Fake Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-red-400 font-semibold flex items-center space-x-1">
                        <span>Fake News Probability</span>
                      </span>
                      <span className="font-mono font-bold text-red-400">{result.data.probabilities.fake}%</span>
                    </div>
                    <div className="w-full bg-navy-900 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-red-500 h-3 rounded-full transition-all duration-500 shadow-glow-fake"
                        style={{ width: `${result.data.probabilities.fake}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Probabilities sum to 100% computed via Scikit-learn's predict_proba() on the transformed TF-IDF vector.
                  </p>
                </div>

                {/* Key Execution Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-navy-950/60 dark:bg-navy-950/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-electric" />
                      <span>Latency</span>
                    </div>
                    <p className="text-xl font-bold font-mono text-white dark:text-white text-slate-900">
                      {result.data.processing_time_ms} <span className="text-xs text-slate-400">ms</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950/60 dark:bg-navy-950/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Tag className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Vocabulary Hits</span>
                    </div>
                    <p className="text-xl font-bold font-mono text-white dark:text-white text-slate-900">
                      {result.data.matched_features_count} <span className="text-xs text-slate-400">tokens</span>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950/60 dark:bg-navy-950/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Test Benchmark</span>
                    </div>
                    <p className="text-xl font-bold font-mono text-white dark:text-white text-slate-900">
                      {result.data.reported_benchmark.accuracy_percent || 99.07}%
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-navy-950/60 dark:bg-navy-950/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200 space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>Classifier</span>
                    </div>
                    <p className="text-sm font-semibold truncate text-white dark:text-white text-slate-900 mt-1">
                      {result.data.model_used}
                    </p>
                  </div>
                </div>

              </div>

              {/* Matched Explainability Keywords */}
              {result.data.top_keywords && result.data.top_keywords.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">
                    <Tag className="w-3.5 h-3.5 text-electric" />
                    <span>Top Weighted TF-IDF N-Gram Tokens Detected:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.data.top_keywords.map((kw, i) => (
                      <div 
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-navy-900/90 dark:bg-navy-900/90 bg-slate-100 border border-navy-700/80 dark:border-navy-700/80 border-slate-300 flex items-center space-x-1.5"
                      >
                        <span className="text-white dark:text-white text-slate-800">{kw.term}</span>
                        <span className="text-[10px] text-electric font-semibold">({kw.weight})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formal Academic Disclaimer */}
              <div className="p-3.5 rounded-xl bg-navy-900/40 border border-navy-800/80 text-[11px] text-slate-400 flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-electric shrink-0 mt-0.5" />
                <span>
                  {result.data.disclaimer}
                </span>
              </div>

            </div>
          ) : (
            /* Dual Model Comparison Result Card */
            <div className="p-8 rounded-2xl glass-panel space-y-6 border border-electric/30">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy-800">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-slate-400">Dual Classifier Analysis</span>
                  <div className="flex items-center space-x-3 mt-1">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white text-slate-900">
                      {result.data.agreement ? 'Both Models Concur' : 'Models Diverged in Classification'}
                    </h2>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      result.data.agreement 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {result.data.agreement ? 'Consensus Reached' : 'Divergent Decision'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyResult}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-navy-850 dark:bg-navy-850 bg-white border border-navy-700/80 text-slate-300 hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-navy-850 dark:bg-navy-850 bg-white border border-navy-700/80 text-slate-300 hover:text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* Side-by-Side Model Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Logistic Regression Card */}
                <div className="p-5 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white dark:text-white text-slate-900 text-sm">Logistic Regression</h3>
                      <p className="text-[11px] text-slate-400">Reported Test Accuracy: 99.07%</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      result.data.logistic_regression.prediction === 'REAL'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.data.logistic_regression.prediction}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Confidence</span>
                      <span className="font-bold text-white dark:text-white text-slate-800">
                        {result.data.logistic_regression.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-navy-950 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          result.data.logistic_regression.prediction === 'REAL' ? 'bg-emerald-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${result.data.logistic_regression.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs space-y-1 text-slate-400 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span>Real Probability:</span>
                      <span className="text-emerald-400">{result.data.logistic_regression.probabilities.real}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fake Probability:</span>
                      <span className="text-red-400">{result.data.logistic_regression.probabilities.fake}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inference Latency:</span>
                      <span>{result.data.logistic_regression.processing_time_ms} ms</span>
                    </div>
                  </div>
                </div>

                {/* Multinomial Naive Bayes Card */}
                <div className="p-5 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white dark:text-white text-slate-900 text-sm">Multinomial Naive Bayes</h3>
                      <p className="text-[11px] text-slate-400">Reported Test Accuracy: 95.01%</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      result.data.naive_bayes.prediction === 'REAL'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {result.data.naive_bayes.prediction}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Confidence</span>
                      <span className="font-bold text-white dark:text-white text-slate-800">
                        {result.data.naive_bayes.confidence}%
                      </span>
                    </div>
                    <div className="w-full bg-navy-950 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          result.data.naive_bayes.prediction === 'REAL' ? 'bg-emerald-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${result.data.naive_bayes.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-xs space-y-1 text-slate-400 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span>Real Probability:</span>
                      <span className="text-emerald-400">{result.data.naive_bayes.probabilities.real}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fake Probability:</span>
                      <span className="text-red-400">{result.data.naive_bayes.probabilities.fake}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inference Latency:</span>
                      <span>{result.data.naive_bayes.processing_time_ms} ms</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
