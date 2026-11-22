import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  BarChart2, 
  CheckCircle2, 
  Layers, 
  Search, 
  Sliders, 
  FileText, 
  Github,
  Clock,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { COMPARISON_CHART_DATA, DATASET_STATS } from '../data/modelBenchmarks';

export default function LandingPage({ setActiveTab }) {
  return (
    <div className="space-y-24 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-electric/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 px-4">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-electric/10 border border-electric/30 text-electric shadow-glow-electric backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>AI-Powered Natural Language Classification</span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white dark:text-white text-slate-900 leading-[1.1]">
            See Beyond Headlines.<br />
            <span className="bg-gradient-to-r from-electric via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Detect What's Real.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 dark:text-slate-300 text-slate-600 leading-relaxed">
            TruthLens transforms academic NLP research into a production-grade machine learning platform. 
            Evaluate news articles against 5,000 N-gram lexical features with instant probability scoring across dual supervised classifiers.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-electric to-blue-600 hover:from-electric-hover hover:to-blue-700 shadow-glow-electric transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-150"
            >
              <Search className="w-4 h-4" />
              <span>Analyze News</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('technology');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-medium text-slate-200 dark:text-slate-200 text-slate-700 bg-navy-850/80 dark:bg-navy-850/80 bg-white/90 hover:bg-navy-800 dark:hover:bg-navy-800 hover:bg-slate-100 border border-navy-700/80 dark:border-navy-700/80 border-slate-300 transition-all shadow-sm"
            >
              <Cpu className="w-4 h-4 text-electric" />
              <span>Explore Technology</span>
            </button>
          </div>

          {/* Live Platform Highlights Banner */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl glass-panel text-left space-y-1">
              <span className="text-2xl font-bold font-mono text-emerald-400">99.07%</span>
              <p className="text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">Logistic Regression</p>
              <p className="text-[11px] text-slate-500">Reported test accuracy</p>
            </div>
            <div className="p-4 rounded-xl glass-panel text-left space-y-1">
              <span className="text-2xl font-bold font-mono text-electric">95.01%</span>
              <p className="text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">Naive Bayes</p>
              <p className="text-[11px] text-slate-500">Benchmark accuracy</p>
            </div>
            <div className="p-4 rounded-xl glass-panel text-left space-y-1">
              <span className="text-2xl font-bold font-mono text-white dark:text-white text-slate-800">44,689</span>
              <p className="text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">ISOT Dataset</p>
              <p className="text-[11px] text-slate-500">Verified articles trained</p>
            </div>
            <div className="p-4 rounded-xl glass-panel text-left space-y-1">
              <span className="text-2xl font-bold font-mono text-indigo-400">&lt;10 ms</span>
              <p className="text-xs font-semibold text-slate-300 dark:text-slate-300 text-slate-700">Inference Latency</p>
              <p className="text-[11px] text-slate-500">Optimized FastAPI pipeline</p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-electric">Engineered for Accuracy</h2>
          <h3 className="text-3xl font-extrabold text-white dark:text-white text-slate-900">
            Enterprise Machine Learning Architecture
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Combining statistical linguistic analysis with production-ready REST microservices for transparent classification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl glass-panel space-y-4 hover:border-electric/40 transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center text-electric group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white dark:text-white text-slate-900">Dual-Model Evaluation</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compare predictions between Logistic Regression (99.07% accuracy) and Multinomial Naive Bayes (95.01% accuracy) on any text to inspect algorithmic consensus.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-4 hover:border-electric/40 transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
              <Sliders className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white dark:text-white text-slate-900">5,000 N-Gram Features</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Extracts high-dimensional unigrams and bigrams using TF-IDF weighting, matching linguistic patterns against thousands of verified news publications.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-4 hover:border-electric/40 transition-all duration-200 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white dark:text-white text-slate-900">Explainable Signals</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Inspect top matched TF-IDF tokens that influenced the prediction, providing interpretable insight into the lexical signals behind the classification.
            </p>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-electric">System Pipeline</h2>
            <h3 className="text-3xl font-extrabold text-white dark:text-white text-slate-900">How TruthLens Works</h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              A 4-stage natural language processing pipeline executing in milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="relative space-y-3 p-5 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200">
              <div className="w-8 h-8 rounded-full bg-electric/20 text-electric font-mono font-bold text-sm flex items-center justify-center">
                01
              </div>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-base">Text Ingestion</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Accepts user input headline or long-form body text, measuring word count and validating length.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative space-y-3 p-5 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200">
              <div className="w-8 h-8 rounded-full bg-electric/20 text-electric font-mono font-bold text-sm flex items-center justify-center">
                02
              </div>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-base">Regex Cleaning</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Normalizes text: removes URLs, HTML tags, special symbols, and collapses whitespace identically to training.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative space-y-3 p-5 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200">
              <div className="w-8 h-8 rounded-full bg-electric/20 text-electric font-mono font-bold text-sm flex items-center justify-center">
                03
              </div>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-base">TF-IDF Vectorization</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transforms normalized text into a 5,000-dimensional sparse feature vector using learned inverse document frequencies.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative space-y-3 p-5 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 bg-slate-50 border border-navy-800/80 dark:border-navy-800/80 border-slate-200">
              <div className="w-8 h-8 rounded-full bg-electric/20 text-electric font-mono font-bold text-sm flex items-center justify-center">
                04
              </div>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-base">Inference & Confidence</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculates class probabilities with Scikit-learn models and returns REAL or FAKE classification with exact metrics.
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center space-x-2 text-sm font-semibold text-electric hover:text-electric-light transition-colors"
            >
              <span>Try with sample news articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Model Performance Overview Teaser */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-electric">Benchmarked Accuracy</span>
            <h3 className="text-3xl font-extrabold text-white dark:text-white text-slate-900 leading-tight">
              Rigorous Evaluation on the ISOT News Corpus
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trained and tested on 44,689 curated news stories using an 80:20 stratified split. 
              Logistic Regression reached 99.07% test accuracy, while Naive Bayes achieved 95.01%.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('comparison');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-navy-800 hover:bg-navy-700 border border-navy-700 transition-all"
              >
                <span>View Full Metrics Comparison</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl glass-panel space-y-5">
              <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                <span className="text-xs font-semibold text-slate-400">Model Metric</span>
                <div className="flex space-x-8 text-xs font-semibold">
                  <span className="text-electric">Logistic Regression</span>
                  <span className="text-slate-400">Naive Bayes</span>
                </div>
              </div>

              {COMPARISON_CHART_DATA.map((item) => (
                <div key={item.metric} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300 dark:text-slate-300 text-slate-700">{item.metric}</span>
                    <div className="flex space-x-12 font-mono">
                      <span className="text-emerald-400 font-bold">{item["Logistic Regression"]}%</span>
                      <span className="text-slate-400">{item["Naive Bayes"]}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-navy-950/80 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="bg-gradient-to-r from-electric to-emerald-400 h-2 rounded-full" 
                      style={{ width: `${item["Logistic Regression"]}%` }}
                    />
                  </div>
                </div>
              ))}

              <p className="text-[11px] text-slate-500 pt-2 italic">
                * Reported benchmark metrics calculated on unseen test set (8,938 samples). Metrics for precision, recall, and F1 represent the Fake News class (Label 0).
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
