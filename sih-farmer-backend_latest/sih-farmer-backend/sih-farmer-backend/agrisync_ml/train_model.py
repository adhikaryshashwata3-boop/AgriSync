import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

# ============================================================
# 1. LOAD DATASET
# ============================================================

DATASET_PATH = "dataset/agrisync_synthetic_procurement_data.csv"

df = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully")
print("Records:", len(df))


# ============================================================
# 2. FEATURES AND TARGET
# ============================================================

features = [
    "mandi_id",
    "crop_type",
    "crop_category",
    "quantity_quintals",
    "slot_hour",
    "day_of_week",
    "month",
    "farmers_in_selected_slot",
    "active_queue_count"
]

target = "actual_processing_duration_mins"


X = df[features]
y = df[target]


# ============================================================
# 3. TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

print("\nTraining records:", len(X_train))
print("Testing records :", len(X_test))


# ============================================================
# 4. CATEGORICAL FEATURES
# ============================================================

categorical_features = [
    "mandi_id",
    "crop_type",
    "crop_category"
]

numeric_features = [
    "quantity_quintals",
    "slot_hour",
    "day_of_week",
    "month",
    "farmers_in_selected_slot",
    "active_queue_count"
]


# ============================================================
# 5. PREPROCESSING
# ============================================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features
        ),

        (
            "numeric",
            "passthrough",
            numeric_features
        )
    ]
)


# ============================================================
# 6. REGRESSION MODEL
# ============================================================

model = RandomForestRegressor(
    n_estimators=200,
    max_depth=18,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)


# ============================================================
# 7. COMPLETE PIPELINE
# ============================================================

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model)
    ]
)


# ============================================================
# 8. TRAIN
# ============================================================

print("\nTraining model...")

pipeline.fit(
    X_train,
    y_train
)

print("Training completed!")


# ============================================================
# 9. PREDICTION
# ============================================================

predictions = pipeline.predict(X_test)


# ============================================================
# 10. EVALUATION
# ============================================================

mae = mean_absolute_error(
    y_test,
    predictions
)

rmse = np.sqrt(
    mean_squared_error(
        y_test,
        predictions
    )
)

r2 = r2_score(
    y_test,
    predictions
)


print("\n==============================")
print("MODEL EVALUATION")
print("==============================")

print(
    f"MAE  : {mae:.2f} minutes"
)

print(
    f"RMSE : {rmse:.2f} minutes"
)

print(
    f"R²   : {r2:.4f}"
)


# ============================================================
# 11. SAMPLE PREDICTIONS
# ============================================================

comparison = pd.DataFrame({
    "Actual": y_test.values[:10],
    "Predicted": np.round(
        predictions[:10],
        2
    )
})

print("\nSample predictions:")
print(comparison)


# ============================================================
# 12. SAVE MODEL
# ============================================================

MODEL_PATH = "agrisync_processing_model.pkl"

joblib.dump(
    pipeline,
    MODEL_PATH
)

print("\nModel saved successfully:")
print(MODEL_PATH)