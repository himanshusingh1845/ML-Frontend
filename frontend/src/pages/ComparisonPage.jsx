import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Info, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  HelpCircle 
} from 'lucide-react';
import { BENCHMARK_METRICS, COMPARISON_CHART_DATA, DATASET_STATS } from '../data/modelBenchmarks';

export default function ComparisonPage() {
  const [activeMetricTab, setActiveMetricTab] = useState('all');

  const lr = BENCHMARK_METRICS.logistic_regression;
  const nb = BENCHMARK_METRICS.naive_bayes;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-electric uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Evaluation Metrics & Model Benchmarks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white text-slate-900 tracking-tight">
          Multinomial Naive Bayes vs Logistic Regression
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Both algorithms were trained and evaluated on identical 80:20 stratified splits of the ISOT Fake News Dataset (44,689 articles). Below is the comprehensive empirical performance comparison reported in the project evaluation.
        </p>
      </div>

      {/* Reported Results Caution Banner */}
      <div className="p-4 rounded-xl bg-navy-850 dark:bg-navy-850 bg-amber-50/70 border border-navy-700/80 dark:border-navy-700/80 border-amber-200 text-xs text-slate-300 dark:text-slate-300 text-slate-700 flex items-start space-x-3 shadow-sm">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white dark:text-white text-slate-900">Benchmark Notice:</strong> These metrics reflect evaluated performance on the held-out test split of 8,938 news articles from the ISOT dataset. Precision, Recall, and F1-score are calculated specifically for the Fake News class (Label 0). These figures represent reported experimental test results rather than guaranteed classification accuracy on arbitrary real-world news sources.
        </p>
      </div>

      {/* Side-by-Side High-Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Logistic Regression Card */}
        <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30 space-y-5 bg-gradient-to-b from-emerald-950/10 to-transparent">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold">Highest Performer</span>
              <h2 className="text-xl font-bold text-white dark:text-white text-slate-900">Logistic Regression</h2>
              <p className="text-xs text-slate-400 mt-0.5">{lr.type}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              99.07% Accuracy
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
              <p className="text-lg font-bold text-emerald-400">99.07%</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Precision</span>
              <p className="text-lg font-bold text-emerald-400">99.32%</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Recall</span>
              <p className="text-lg font-bold text-emerald-400">98.91%</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">F1-Score</span>
              <p className="text-lg font-bold text-emerald-400">99.11%</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-navy-800/80">
            <span className="text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">Key Strengths in News Classification:</span>
            <ul className="space-y-1 text-xs text-slate-400">
              {lr.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Multinomial Naive Bayes Card */}
        <div className="p-6 rounded-2xl glass-panel border border-electric/30 space-y-5 bg-gradient-to-b from-blue-950/10 to-transparent">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase text-electric font-semibold">Baseline Classifier</span>
              <h2 className="text-xl font-bold text-white dark:text-white text-slate-900">Multinomial Naive Bayes</h2>
              <p className="text-xs text-slate-400 mt-0.5">{nb.type}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-electric/20 text-electric text-xs font-bold border border-electric/30">
              95.01% Accuracy
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Accuracy</span>
              <p className="text-lg font-bold text-electric">95.01%</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Precision</span>
              <p className="text-lg font-bold text-electric">95.37%</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Recall</span>
              <p className="text-lg font-bold text-electric">95.12%</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 bg-white border border-navy-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">F1-Score</span>
              <p className="text-lg font-bold text-electric">95.25%</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-navy-800/80">
            <span className="text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">Key Strengths in News Classification:</span>
            <ul className="space-y-1 text-xs text-slate-400">
              {nb.strengths.map((s, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Interactive Recharts Comparison Bar Chart */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white dark:text-white text-slate-900">
              Visual Metric Comparison (0% – 100%)
            </h3>
            <p className="text-xs text-slate-400">
              Comparative benchmark score across all 4 standard evaluation metrics.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-emerald-400" />
              <span className="text-slate-300 dark:text-slate-300 text-slate-700">Logistic Regression</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-electric" />
              <span className="text-slate-300 dark:text-slate-300 text-slate-700">Naive Bayes</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={COMPARISON_CHART_DATA}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E294B" opacity={0.6} />
              <XAxis dataKey="metric" stroke="#94A3B8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94A3B8" domain={[90, 100]} fontSize={12} unit="%" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0E152B', 
                  borderColor: '#2D3B6B', 
                  borderRadius: '0.75rem', 
                  color: '#F8FAFC',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey="Logistic Regression" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Naive Bayes" fill="#4F8CFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comprehensive Comparison Table */}
      <div className="p-6 rounded-2xl glass-panel space-y-4 overflow-x-auto">
        <h3 className="text-lg font-bold text-white dark:text-white text-slate-900">
          Detailed Evaluation Report Table
        </h3>
        
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-navy-800 text-slate-400 font-mono">
              <th className="py-3 px-4 font-semibold uppercase">Classification Model</th>
              <th className="py-3 px-4 font-semibold uppercase">Accuracy</th>
              <th className="py-3 px-4 font-semibold uppercase">Precision (Fake)</th>
              <th className="py-3 px-4 font-semibold uppercase">Recall (Fake)</th>
              <th className="py-3 px-4 font-semibold uppercase">F1-Score</th>
              <th className="py-3 px-4 font-semibold uppercase">Training Paradigm</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800/60 font-mono">
            <tr className="hover:bg-navy-900/40">
              <td className="py-3.5 px-4 font-sans font-bold text-white dark:text-white text-slate-900 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Logistic Regression</span>
              </td>
              <td className="py-3.5 px-4 font-bold text-emerald-400">99.07%</td>
              <td className="py-3.5 px-4 text-emerald-400">99.32%</td>
              <td className="py-3.5 px-4 text-emerald-400">98.91%</td>
              <td className="py-3.5 px-4 text-emerald-400">99.11%</td>
              <td className="py-3.5 px-4 font-sans text-slate-300">Discriminative / Log-loss</td>
            </tr>
            <tr className="hover:bg-navy-900/40">
              <td className="py-3.5 px-4 font-sans font-bold text-white dark:text-white text-slate-900 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-electric" />
                <span>Multinomial Naive Bayes</span>
              </td>
              <td className="py-3.5 px-4 font-bold text-electric">95.01%</td>
              <td className="py-3.5 px-4 text-electric">95.37%</td>
              <td className="py-3.5 px-4 text-electric">95.12%</td>
              <td className="py-3.5 px-4 text-electric">95.25%</td>
              <td className="py-3.5 px-4 font-sans text-slate-300">Generative / Word Likelihoods</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Algorithmic Analysis: Why Logistic Regression Outperformed Naive Bayes */}
      <div className="p-8 rounded-2xl glass-panel space-y-5">
        <h3 className="text-xl font-bold text-white dark:text-white text-slate-900">
          Algorithmic Analysis & Experimental Observations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 dark:text-slate-200 text-slate-800 text-sm">
              1. Conditional Independence vs Feature Weights
            </h4>
            <p>
              Multinomial Naive Bayes assumes that all 5,000 TF-IDF features are conditionally independent given the class label. In journalistic writing, words strongly correlate with collocated context (e.g., phrases like "unnamed military source" or "breaking report"). Logistic Regression does not make this independence assumption; it directly fits continuous weights across all features to optimize separation.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 dark:text-slate-200 text-slate-800 text-sm">
              2. Discriminative Optimization Objective
            </h4>
            <p>
              Logistic Regression optimizes class log-likelihood P(Y|X) directly via gradient descent, penalizing misclassified samples near the decision boundary. This results in significantly fewer false positives (99.32% precision), whereas Naive Bayes models the joint probability P(X, Y), which can be biased by high document frequencies of neutral stopwords.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
