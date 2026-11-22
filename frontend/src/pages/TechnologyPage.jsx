import React from 'react';
import { 
  Cpu, 
  Layers, 
  Workflow, 
  Filter, 
  Binary, 
  Database, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Code
} from 'lucide-react';
import { DATASET_STATS } from '../data/modelBenchmarks';

export default function TechnologyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-electric uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Natural Language Processing Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white text-slate-900 tracking-tight">
          How TruthLens Detects Fake News
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          An in-depth look into the mathematical foundations, preprocessing transformations, machine learning pipelines, and dataset limitations powering the platform.
        </p>
      </div>

      {/* End-to-End Architecture Diagram Flowchart */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 text-slate-700">
          <Workflow className="w-4 h-4 text-electric" />
          <span>End-to-End Prediction Pipeline Architecture</span>
        </div>

        <div className="p-8 rounded-3xl glass-panel space-y-8 overflow-x-auto">
          <div className="min-w-[700px] flex items-center justify-between gap-4">
            
            {/* Box 1 */}
            <div className="flex-1 p-5 rounded-2xl bg-navy-950/80 dark:bg-navy-950/80 bg-white border border-navy-800 dark:border-navy-800 border-slate-300 text-center space-y-2 shadow-sm">
              <span className="text-[10px] font-mono text-electric font-bold uppercase px-2 py-0.5 rounded bg-electric/10">Input</span>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-sm">Raw News Text</h4>
              <p className="text-[11px] text-slate-400">Headline + Body content ingested from user</p>
            </div>

            <ArrowRight className="w-5 h-5 text-electric shrink-0" />

            {/* Box 2 */}
            <div className="flex-1 p-5 rounded-2xl bg-navy-950/80 dark:bg-navy-950/80 bg-white border border-navy-800 dark:border-navy-800 border-slate-300 text-center space-y-2 shadow-sm">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase px-2 py-0.5 rounded bg-purple-500/10">Preprocessing</span>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-sm">Regex Cleaning</h4>
              <p className="text-[11px] text-slate-400">Lowercasing, URL/HTML removal, punctuation strip</p>
            </div>

            <ArrowRight className="w-5 h-5 text-electric shrink-0" />

            {/* Box 3 */}
            <div className="flex-1 p-5 rounded-2xl bg-navy-950/80 dark:bg-navy-950/80 bg-white border border-navy-800 dark:border-navy-800 border-slate-300 text-center space-y-2 shadow-sm">
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10">Vectorization</span>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-sm">TF-IDF Matrix</h4>
              <p className="text-[11px] text-slate-400">5,000 Unigrams & Bigrams with sublinear scaling</p>
            </div>

            <ArrowRight className="w-5 h-5 text-electric shrink-0" />

            {/* Box 4 */}
            <div className="flex-1 p-5 rounded-2xl bg-navy-950/80 dark:bg-navy-950/80 bg-white border border-navy-800 dark:border-navy-800 border-slate-300 text-center space-y-2 shadow-sm">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10">Model Inference</span>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-sm">LR / Naive Bayes</h4>
              <p className="text-[11px] text-slate-400">Calculates class log-loss and predict_proba()</p>
            </div>

            <ArrowRight className="w-5 h-5 text-electric shrink-0" />

            {/* Box 5 */}
            <div className="flex-1 p-5 rounded-2xl bg-gradient-to-tr from-emerald-950/40 to-navy-900 border border-emerald-500/40 text-center space-y-2 shadow-sm">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20">Output</span>
              <h4 className="font-bold text-white dark:text-white text-slate-900 text-sm">REAL / FAKE</h4>
              <p className="text-[11px] text-slate-400">Confidence score + Matched keyword weights</p>
            </div>

          </div>
        </div>
      </section>

      {/* Deep Dives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Section 1: What is Fake News Detection? */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center space-x-2 text-electric">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-bold text-lg text-white dark:text-white text-slate-900">What is Fake News Detection in NLP?</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            In modern Natural Language Processing (NLP), fake news detection is framed as a supervised binary text classification task. Rather than checking external real-time fact databases, machine learning algorithms analyze lexical stylistic markers, emotional hyperbole, clickbait grammatical structures, and vocabulary distributions that statistically differentiate fabricated stories from professional editorial standards.
          </p>
        </div>

        {/* Section 2: TF-IDF Explained */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Binary className="w-5 h-5" />
            <h3 className="font-bold text-lg text-white dark:text-white text-slate-900">TF-IDF Vectorization</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Term Frequency–Inverse Document Frequency (TF-IDF)</strong> quantifies the relative importance of words across a document corpus:
          </p>
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 font-mono text-xs text-slate-300">
            TF-IDF(t, d, D) = TF(t, d) × log(N / (DF(t) + 1))
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Words that occur ubiquitously (e.g. "the", "said") receive low IDF weights, while domain-defining words (e.g. "spokesman", "whistleblower", "unanimous") receive high discriminative weight. Using N-gram range (1, 2) enables the model to capture bigram phrases like "white house" and "unverified source".
          </p>
        </div>

        {/* Section 3: Multinomial Naive Bayes */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center space-x-2 text-blue-400">
            <Layers className="w-5 h-5" />
            <h3 className="font-bold text-lg text-white dark:text-white text-slate-900">Multinomial Naive Bayes</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multinomial Naive Bayes applies Bayes' Theorem under the naive assumption that all word occurrences are conditionally independent given the class label:
          </p>
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 font-mono text-xs text-slate-300">
            P(C | X) ∝ P(C) ∏ P(x_i | C)
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            It calculates the posterior probability of an article belonging to Class 0 (Fake) or Class 1 (Real) by taking the sum of the log probabilities of its extracted TF-IDF tokens. It runs in under 3 milliseconds, achieving 95.01% test accuracy.
          </p>
        </div>

        {/* Section 4: Logistic Regression */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold text-lg text-white dark:text-white text-slate-900">Logistic Regression</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Logistic Regression is a discriminative linear model that maps linear feature combinations onto the [0, 1] interval via the standard sigmoid activation function:
          </p>
          <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 font-mono text-xs text-slate-300">
            P(Y=1 | X) = 1 / (1 + e^-(w^T X + b))
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            During training, L2-regularized logistic regression adjusts weights <em>w</em> to minimize binary cross-entropy loss. Unlike Naive Bayes, it captures negative evidence and correlates feature weights simultaneously, achieving a superior 99.07% test accuracy.
          </p>
        </div>

      </div>

      {/* Text Preprocessing Pipeline Details */}
      <div className="p-8 rounded-2xl glass-panel space-y-5">
        <div className="flex items-center space-x-2 text-purple-400">
          <Filter className="w-5 h-5" />
          <h3 className="font-bold text-xl text-white dark:text-white text-slate-900">Strict Preprocessing Parity</h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The FastAPI backend executes the exact text transformation pipeline defined in the original notebook to preserve 100% mathematical parity:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5 font-mono text-xs">
            <span className="text-electric font-semibold">1. Lowercasing</span>
            <p className="text-slate-400 text-[11px] font-sans">Normalizes all uppercase headlines to match vocabulary tokens.</p>
          </div>
          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5 font-mono text-xs">
            <span className="text-purple-400 font-semibold">2. URL & HTML Strip</span>
            <p className="text-slate-400 text-[11px] font-sans">Eliminates web domains (http\S+|www\S+) and HTML tags (&lt;.*?&gt;).</p>
          </div>
          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5 font-mono text-xs">
            <span className="text-indigo-400 font-semibold">3. Non-Alphanumeric</span>
            <p className="text-slate-400 text-[11px] font-sans">Replaces punctuation and symbols ([^a-zA-Z0-9\s]) with whitespace.</p>
          </div>
          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1.5 font-mono text-xs">
            <span className="text-emerald-400 font-semibold">4. Whitespace Strip</span>
            <p className="text-slate-400 text-[11px] font-sans">Collapses consecutive spaces (\s+) into a single space and trims edges.</p>
          </div>
        </div>
      </div>

      {/* Dataset Provenance & Critical Limitations */}
      <div className="p-8 rounded-2xl glass-panel space-y-6 border border-amber-500/30 bg-gradient-to-b from-amber-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="font-bold text-xl text-white dark:text-white text-slate-900">Dataset Provenance & Known Model Limitations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 dark:text-slate-200 text-slate-800 text-sm">ISOT Dataset Details</h4>
            <ul className="space-y-2">
              <li>• Sourced from the University of Victoria Information Security and Object Technology (ISOT) Lab.</li>
              <li>• Real news articles (21,417) collected directly from Reuters.com.</li>
              <li>• Fake news articles (23,481) collected from unreliable outlets flagged by PolitiFact and Wikipedia.</li>
              <li>• Total clean dataset: 44,689 articles with 80:20 stratified training/testing partitioning.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 dark:text-slate-200 text-slate-800 text-sm">Critical Limitations to Consider</h4>
            <ul className="space-y-2">
              <li>• <strong>Publisher Cue Bias:</strong> Real articles originating from Reuters often included location tag headers (e.g. "WASHINGTON (Reuters) - "), which models can inadvertently memorize.</li>
              <li>• <strong>Temporal Drift:</strong> Articles reflect political events from 2016–2017; emerging contemporary topics may have low TF-IDF vocabulary overlap.</li>
              <li>• <strong>Lack of External Ground Truth:</strong> The model evaluates writing style and lexical word frequencies rather than consulting dynamic live facts. Sarcasm or satire can be misclassified.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
