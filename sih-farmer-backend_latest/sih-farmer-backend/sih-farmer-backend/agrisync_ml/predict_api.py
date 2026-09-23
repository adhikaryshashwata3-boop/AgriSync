from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="AgriSync ML Prediction API",
    description="Predicts procurement processing duration",
    version="1.0.0"
)


# ============================================================
# MODEL PATH
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = (
    BASE_DIR /
    "agrisync_processing_model.pkl"
)


# ============================================================
# LOAD MODEL
# ============================================================

try:

    model = joblib.load(MODEL_PATH)

    print("AgriSync ML model loaded successfully.")

except Exception as error:

    model = None

    print(
        "ERROR: Could not load ML model:",
        error
    )


# ============================================================
# REQUEST MODEL
# ============================================================

class PredictionRequest(BaseModel):

    mandi_id: str

    crop_type: str

    crop_category: str

    quantity_quintals: float

    slot_hour: int

    day_of_week: int

    month: int

    farmers_in_selected_slot: int

    active_queue_count: int


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():

    return {
        "success": True,
        "service": "AgriSync ML Prediction API",
        "status": "running"
    }


# ============================================================
# MODEL HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "success": True,
        "model_loaded": model is not None
    }


# ============================================================
# PREDICTION
# ============================================================

@app.post("/predict")
def predict(request: PredictionRequest):

    if model is None:

        raise HTTPException(
            status_code=500,
            detail="ML model is not loaded"
        )

    try:

        input_data = pd.DataFrame([
            {
                "mandi_id":
                    request.mandi_id,

                "crop_type":
                    request.crop_type,

                "crop_category":
                    request.crop_category,

                "quantity_quintals":
                    request.quantity_quintals,

                "slot_hour":
                    request.slot_hour,

                "day_of_week":
                    request.day_of_week,

                "month":
                    request.month,

                "farmers_in_selected_slot":
                    request.farmers_in_selected_slot,

                "active_queue_count":
                    request.active_queue_count
            }
        ])

        prediction = model.predict(
            input_data
        )[0]

        predicted_duration = max(
            1,
            round(float(prediction))
        )

        return {
            "success": True,

            "predicted_duration_mins":
                predicted_duration
        }

    except Exception as error:

        print(
            "PREDICTION ERROR:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Prediction failed"
        )