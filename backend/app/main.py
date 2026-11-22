import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.prediction import router as prediction_router, PredictRequest, CompareRequest, health_check, predict_news, compare_models
from backend.app.services.prediction_service import prediction_service

app = FastAPI(
    title="TruthLens – AI Fake News Detection API",
    description="Production-grade API utilizing TF-IDF and supervised Machine Learning (Logistic Regression & Naive Bayes) to analyze news text authenticity.",
    version="1.0.0"
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://*.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(prediction_router)

# Direct root-level aliases for required endpoints
@app.get("/health", tags=["Root"])
def root_health():
    return health_check()

@app.post("/predict", tags=["Root"])
def root_predict(payload: PredictRequest):
    return predict_news(payload)

@app.post("/compare", tags=["Root"])
def root_compare(payload: CompareRequest):
    return compare_models(payload)

@app.get("/", tags=["Root"])
def root_info():
    return {
        "project": "TruthLens – Fake News Detection Platform",
        "status": "online",
        "models_ready": prediction_service.is_loaded,
        "docs_url": "/docs",
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "compare": "/compare",
            "metrics": "/api/metrics"
        }
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=port, reload=True)
