import React from 'react';
import { ShieldCheck, Github, ExternalLink, Heart, AlertTriangle } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="mt-20 border-t border-navy-800/80 dark:border-navy-800/80 border-slate-200 bg-navy-950 dark:bg-navy-950 bg-slate-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-electric/20 border border-electric/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-electric" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white dark:text-white text-slate-900 font-sans">
                Truth<span className="text-electric">Lens</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              "See Beyond Headlines. Detect What's Real."
              An advanced Machine Learning platform utilizing statistical N-gram TF-IDF vectorization and dual supervised classifiers to predict news credibility.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-navy-850 dark:bg-navy-850 bg-white border border-navy-700/60 dark:border-navy-700/60 border-slate-300 text-slate-300 dark:text-slate-300 text-slate-700 hover:text-electric hover:border-electric/50 transition-all shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setActiveTab('landing')} className="text-slate-400 hover:text-electric transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="text-slate-400 hover:text-electric transition-colors">
                  News Detector Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('comparison')} className="text-slate-400 hover:text-electric transition-colors">
                  Model Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('technology')} className="text-slate-400 hover:text-electric transition-colors">
                  Architecture & Technology
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="text-slate-400 hover:text-electric transition-colors">
                  Analysis History
                </button>
              </li>
            </ul>
          </div>

          {/* Machine Learning Specs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Model Stack</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li>• Scikit-learn Logistic Regression (99.07% Acc)</li>
              <li>• Multinomial Naive Bayes (95.01% Acc)</li>
              <li>• TF-IDF N-Gram (5,000 Features)</li>
              <li>• FastAPI Asynchronous Backend</li>
              <li>• React 18 & Tailwind CSS</li>
              <li>• ISOT Benchmark (44,689 Articles)</li>
            </ul>
          </div>
        </div>

        {/* Academic / Disclaimer Callout */}
        <div className="p-4 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-amber-50/50 border border-navy-800 dark:border-navy-800 border-amber-200/60 text-xs text-slate-400 mb-8 flex items-start space-x-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300 dark:text-slate-300 text-slate-700">Important Disclaimer:</strong> TruthLens predictions represent statistical natural language pattern estimates trained on the ISOT benchmark dataset. A "Real" or "Fake" classification is an ML model evaluation and should not be considered an authoritative real-world fact verification.
          </p>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-navy-800/60 dark:border-navy-800/60 border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} TruthLens. Based on research by Aditya Saxena and team.</p>
          <p className="flex items-center space-x-1">
            <span>Production-engineered with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for portfolio, resume, and research.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
