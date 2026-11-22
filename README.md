# 🔍 TruthLens – AI-Powered Fake News Detection Platform

<p align="center">
  <strong>Production-Grade NLP Platform for Real-Time Credibility Analysis using TF-IDF & Dual Machine Learning Architecture</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat-square&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Scikit--Learn-1.4+-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

---

## 📌 Executive Summary

**TruthLens** elevates academic Natural Language Processing (NLP) research into an enterprise-ready, portfolio-grade web platform. Utilizing statistical **TF-IDF (Term Frequency–Inverse Document Frequency)** feature extraction across 5,000 N-gram lexical features, TruthLens predicts whether news headlines or full articles exhibit characteristics of **Real Journalism** or **Fabricated Disinformation**.

The platform is backed by a modular **FastAPI** inference engine serving serialized **Scikit-learn** models (Logistic Regression & Multinomial Naive Bayes) and a high-performance **React + Vite** frontend styled with **Tailwind CSS**, subtle glassmorphism, Recharts analytics, and full dark/light theme switching.

---

## 🎯 Key Features

- **⚡ Instant Dual-Model Classification:** Run single-model inferences or evaluate news text simultaneously on both **Logistic Regression (99.07% test accuracy)** and **Multinomial Naive Bayes (95.01% test accuracy)** to observe model agreement vs divergence.
- **📊 Real Class Probability Distributions:** Displays authentic probability distributions (e.g. `98.4% Real` vs `1.6% Fake`) derived from Scikit-learn's `predict_proba()` — zero hardcoded or fabricated scores.
- **🔍 Explainable Lexical Signals:** Identifies and displays top weighted TF-IDF tokens present in the submitted text, shedding light on the lexical drivers behind the prediction.
- **⏱️ Sub-10ms Inference Latency:** High-throughput serialized pipeline returning full classification, confidence, feature counts, and metadata in single-digit milliseconds.
- **🧪 1-Click Test Presets:** Curated sample articles covering diplomatic declarations, exoplanet discoveries, fabricated conspiracy claims, and sensationalist political rumors.
- **💾 Local Storage History:** Search, filter by Real/Fake, re-run, copy, and export previous analysis sessions without requiring external databases.
- **📄 Report Generation:** Export formatted JSON analysis reports with full provenance metadata.
- **🌓 Theme Support:** Dark Navy (`#0B1020`) and Electric Blue (`#4F8CFF`) visual identity with smooth light mode toggling.

---

## 🏗️ Architecture & Technology Stack

```
                              ┌────────────────────────────────────────┐
                              │         User Browser / Client          │
                              └──────────────────┬─────────────────────┘
                                                 │
                                                 │ HTTPS / JSON
                                                 ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 TruthLens Frontend                                     │
│  React 18  •  Vite  •  Tailwind CSS  •  Lucide Icons  •  Recharts  •  Framer Motion    │
└────────────────────────────────────────────────┬───────────────────────────────────────┘
                                                 │
                                                 │ REST API (GET / POST)
                                                 ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              FastAPI Asynchronous Backend                              │
│                                                                                        │
│  ┌────────────────────────┐   ┌─────────────────────────┐   ┌───────────────────────┐  │
│  │    GET /health         │   │      POST /predict      │   │     POST /compare     │  │
│  └────────────────────────┘   └───────────┬─────────────┘   └───────────┬───────────┘  │
│                                           │                             │              │
│                                           ▼                             ▼              │
│                              ┌─────────────────────────┐   ┌─────────────────────────┐  │
│                              │   Preprocessing Engine  │   │  Prediction Service     │  │
│                              │   (Exact Regex Parity)  │   │  (Timing & Prob Engine) │  │
│                              └────────────┬────────────┘   └────────────┬────────────┘  │
│                                           │                             │              │
│                                           ▼                             ▼              │
│                              ┌───────────────────────────────────────────────────────┐  │
│                              │                  Serialized Artifacts                 │  │
│                              │  • tfidf_vectorizer.joblib (5,000 N-Grams)            │  │
│                              │  • logistic_regression_model.joblib (99.07% Acc)      │  │
│                              │  • naive_bayes_model.joblib (95.01% Acc)              │  │
│                              └───────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Technology Breakdown

| Component | Technology | Rationale |
|---|---|---|
| **Frontend Framework** | React 18 + Vite | Blazing fast HMR, optimized bundle chunking, sub-second production builds |
| **Styling & Icons** | Tailwind CSS + Lucide React | Clean dark navy (`#0B1020`) design, electric blue accents, responsive layout |
| **Data Visualization** | Recharts | Interactive class probability and benchmark comparative bar charts |
| **Backend Framework** | Python 3.11+ / FastAPI | High concurrency ASGI server, automated OpenAPI /docs, strict Pydantic schemas |
| **Machine Learning** | Scikit-learn + Joblib | Lightweight, reproducible inference pipelines serialized for cloud deployment |
| **Data Processing** | NumPy & Pandas | Clean text manipulation and feature matrix operations |

---

## 📊 Model Evaluation & Benchmarks

Both models were evaluated on an 80:20 stratified split of 44,689 news articles from the **ISOT Fake News Dataset**:

| Evaluation Metric | Multinomial Naive Bayes | Logistic Regression | Advantage |
|---|---:|---:|:---:|
| **Overall Accuracy** | 95.01% | **99.07%** | +4.06% |
| **Precision (Fake Class)** | 95.37% | **99.32%** | +3.95% |
| **Recall (Fake Class)** | 95.12% | **98.91%** | +3.79% |
| **F1-Score (Fake Class)** | 95.25% | **99.11%** | +3.86% |
| **Inference Time** | **~2.5 ms** | ~3.5 ms | Sub-5ms |

*Note: Reported benchmark results derived from held-out test split (8,938 records). Metrics for Precision, Recall, and F1 represent the Fake News class (Label 0).*

---

## 📂 Project Organization

```text
TruthLens/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # FastAPI application entrypoint & CORS
│   │   ├── routes/
│   │   │   └── prediction.py        # /predict, /compare, /health endpoints
│   │   ├── services/
│   │   │   └── prediction_service.py # Inference logic & top keyword extraction
│   │   ├── utils/
│   │   │   └── preprocessing.py     # Regex cleaning matching original notebook
│   │   └── models/
│   │       ├── tfidf_vectorizer.joblib
│   │       ├── logistic_regression_model.joblib
│   │       ├── naive_bayes_model.joblib
│   │       └── metrics.json
│   ├── requirements.txt             # Python production dependencies
│   ├── Dockerfile                   # Multi-stage production container
│   ├── Procfile                     # Deployment process definition
│   └── render.yaml                  # Render Infrastructure Blueprint
├── frontend/
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Hero, features, pipeline overview
│   │   │   ├── DashboardPage.jsx    # Real-time text detector & probability bars
│   │   │   ├── ComparisonPage.jsx   # Model benchmarks & interactive charts
│   │   │   ├── TechnologyPage.jsx   # Methodology, math, & limitations
│   │   │   └── HistoryPage.jsx      # Local storage session log
│   │   ├── layouts/
│   │   │   ├── Navbar.jsx           # Global header with API connection indicator
│   │   │   └── Footer.jsx           # Project credits & repository link
│   │   ├── services/
│   │   │   └── api.js               # API service layer
│   │   ├── data/
│   │   │   ├── sampleArticles.js    # Presets for 1-click testing
│   │   │   └── modelBenchmarks.js   # Benchmark metrics data
│   │   ├── hooks/
│   │   │   └── useLocalStorage.js   # Browser persistence
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json                  # SPA routing configuration for Vercel
├── scripts/
│   └── train_and_save_models.py     # Reproducible model training pipeline
├── repo/                            # Cloned original academic repository
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites

- **Python**: 3.10, 3.11, 3.12, or 3.13
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/TruthLens.git
cd TruthLens
```

---

### Step 2: Backend Setup & Execution

1. Create and activate a Python virtual environment:

```bash
# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows PowerShell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Start the FastAPI server:

```bash
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at:
- Interactive Swagger UI: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/health`

---

### Step 3: Frontend Setup & Execution

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install Node dependencies:

```bash
npm install
```

3. Launch Vite development server:

```bash
npm run dev
```

The frontend will be running at `http://localhost:5173`. 
*(Vite proxies API calls to `http://127.0.0.1:8000` automatically during local development).*

---

## 📡 API Specification

### 1. Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "TruthLens AI Fake News Detection API",
  "models_ready": true
}
```

---

### 2. Single Model Prediction

```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "The government announced a new education policy to improve learning opportunities for students.",
  "model": "logistic_regression"
}
```

**Response:**
```json
{
  "prediction": "FAKE",
  "is_real": false,
  "confidence": 69.64,
  "model_used": "Logistic Regression",
  "model_id": "logistic_regression",
  "probabilities": {
    "fake": 69.64,
    "real": 30.36,
    "raw_fake": 0.6964,
    "raw_real": 0.3036
  },
  "processing_time_ms": 3.82,
  "matched_features_count": 11,
  "top_keywords": [
    { "term": "improve", "weight": 0.471 },
    { "term": "education", "weight": 0.4272 },
    { "term": "students", "weight": 0.4224 }
  ],
  "reported_benchmark": {
    "accuracy_percent": 99.07,
    "precision_percent": 99.32,
    "recall_percent": 98.91,
    "f1_percent": 99.11
  },
  "disclaimer": "This is a statistical Machine Learning estimate based on trained lexical patterns, not guaranteed factual verification."
}
```

---

### 3. Dual-Model Comparison

```http
POST /compare
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Astronomers discovered water vapor in the atmosphere of distant exoplanet using space telescope."
}
```

**Response:**
```json
{
  "agreement": true,
  "logistic_regression": {
    "prediction": "REAL",
    "confidence": 98.42,
    "probabilities": { "fake": 1.58, "real": 98.42 }
  },
  "naive_bayes": {
    "prediction": "REAL",
    "confidence": 88.15,
    "probabilities": { "fake": 11.85, "real": 88.15 }
  },
  "benchmark_comparison": { ... }
}
```

---

## 🌐 Production Deployment

### Frontend (Vercel)

1. Push your project to GitHub.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select your repository.
3. Set the **Root Directory** to `frontend`.
4. Add the environment variable:
   - `VITE_API_URL`: URL of your deployed backend (e.g. `https://truthlens-api.onrender.com`).
5. Click **Deploy**. Vercel will detect `vercel.json` and configure SPA routing automatically.

### Backend (Render / Railway)

#### Deploying on Render:
1. Create a **New Web Service** on [Render](https://render.com) connected to your repository.
2. Configure settings:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r backend/requirements.txt`
   - **Start Command:** `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`
   - **Health Check Path:** `/health`
3. Click **Deploy Web Service**.

Alternatively, use the included `backend/Dockerfile` for one-click deployment on Railway, AWS ECS, Google Cloud Run, or Fly.io.

---

## ⚠️ Dataset Bias & Known Limitations

- **Lexical Pattern Reliance:** TF-IDF captures lexical frequencies and n-gram correlations rather than verified ground-truth factuality.
- **Publisher Cues:** The ISOT true news dataset predominantly originates from Reuters, which frequently includes datelines (`WASHINGTON (Reuters) - `). This stylistic signature can be learned by models.
- **Temporal Shift:** The dataset reflects news events from 2016–2017. Emerging geopolitical developments or terminology may receive lower vocabulary matches.
- **Sarcasm and Satire:** Highly nuanced satirical commentary or parody news may be misclassified if using formal vocabulary.

---

## 🤝 Attribution & Credits

- Original Machine Learning Implementation: [AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF](https://github.com/AdityaSaxena06/FAKE-NEWS-DETECTION-USING-TF-IDF) by Aditya Saxena and team.
- Dataset: Information Security and Object Technology (ISOT) Research Lab, University of Victoria.

---

<p align="center">
  <strong>Built with Python, Scikit-learn, FastAPI, React & Tailwind CSS</strong>
</p>
