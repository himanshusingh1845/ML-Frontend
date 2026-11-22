from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from backend.app.services.prediction_service import prediction_service

router = APIRouter(prefix="/api", tags=["Prediction"])

class PredictRequest(BaseModel):
    text: str = Field(..., min_length=5, max_length=50000, description="The news headline or article text to analyze.")
    model: Optional[str] = Field("logistic_regression", description="Model choice: 'logistic_regression' or 'naive_bayes'.")

class CompareRequest(BaseModel):
    text: str = Field(..., min_length=5, max_length=50000, description="The news text to evaluate across all models.")

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TruthLens AI Fake News Detection API",
        "models_ready": prediction_service.is_loaded
    }

@router.get("/metrics")
def get_metrics():
    return prediction_service.get_metadata()

@router.post("/predict")
def predict_news(payload: PredictRequest):
    try:
        result = prediction_service.predict(payload.text, model_type=payload.model)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=503, detail=str(re))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failure: {str(e)}")

@router.post("/compare")
def compare_models(payload: CompareRequest):
    try:
        result = prediction_service.compare(payload.text)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except RuntimeError as re:
        raise HTTPException(status_code=503, detail=str(re))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failure: {str(e)}")
