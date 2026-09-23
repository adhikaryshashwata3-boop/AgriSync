import pandas as pd
import numpy as np
from pathlib import Path

# ============================================================
# CONFIGURATION
# ============================================================

NUM_RECORDS = 6000

rng = np.random.default_rng(42)

# ============================================================
# CROPS
# ============================================================

procured_crops_by_category = {
    "food_grains": [
        "Rice / Paddy",
        "Wheat"
    ],

    "commercial_and_fibre": [
        "Cotton",
        "Sugarcane",
        "Jute"
    ],

    "coarse_cereals": [
        "Maize",
        "Bajra (Pearl Millet)",
        "Jowar (Sorghum)",
        "Ragi (Finger Millet)"
    ],

    "pulses": [
        "Gram (Chana)",
        "Arhar (Tur)",
        "Moong",
        "Urad"
    ],

    "oilseeds": [
        "Mustard / Rapeseed",
        "Groundnut",
        "Soybean"
    ]
}

crop_to_category = {
    crop: category
    for category, crops in procured_crops_by_category.items()
    for crop in crops
}

crops = list(crop_to_category.keys())

# ============================================================
# MANDIS
# ============================================================

mandis = [
    ("MD-KOL-001", "Ballygunge Agricultural Mandi"),
    ("MD-KOL-002", "Taratala Agricultural Mandi"),
    ("MD-KOL-003", "New Town Agricultural Mandi"),
    ("MD-HOW-001", "Howrah Agricultural Mandi"),
    ("MD-HOO-001", "Hooghly Agricultural Mandi"),
    ("MD-NAD-001", "Nadia Agricultural Mandi"),
    ("MD-BRD-001", "Burdwan Agricultural Mandi"),
    ("MD-MUR-001", "Murshidabad Agricultural Mandi"),
]

mandi_ids = [m[0] for m in mandis]

mandi_names = {
    mandi_id: mandi_name
    for mandi_id, mandi_name in mandis
}

# Different operational characteristics
mandi_factor = {
    "MD-KOL-001": 1.12,
    "MD-KOL-002": 1.25,
    "MD-KOL-003": 0.92,
    "MD-HOW-001": 1.05,
    "MD-HOO-001": 0.88,
    "MD-NAD-001": 0.96,
    "MD-BRD-001": 1.08,
    "MD-MUR-001": 0.90,
}

# ============================================================
# CROP PROCESSING BASE
# ============================================================

crop_base_duration = {
    "Rice / Paddy": 16,
    "Wheat": 15,
    "Cotton": 22,
    "Sugarcane": 28,
    "Jute": 21,
    "Maize": 17,
    "Bajra (Pearl Millet)": 16,
    "Jowar (Sorghum)": 17,
    "Ragi (Finger Millet)": 18,
    "Gram (Chana)": 16,
    "Arhar (Tur)": 18,
    "Moong": 14,
    "Urad": 15,
    "Mustard / Rapeseed": 17,
    "Groundnut": 20,
    "Soybean": 19,
}

# ============================================================
# DATE
# ============================================================

dates = pd.date_range(
    "2025-01-01",
    "2026-08-31",
    freq="D"
)

procurement_dates = rng.choice(
    dates,
    NUM_RECORDS
)

# ============================================================
# CROP SELECTION
# ============================================================

crop_probabilities = np.array([
    0.13,  # Rice
    0.12,  # Wheat
    0.07,  # Cotton
    0.07,  # Sugarcane
    0.04,  # Jute
    0.09,  # Maize
    0.055, # Bajra
    0.05,  # Jowar
    0.04,  # Ragi
    0.075, # Gram
    0.065, # Arhar
    0.055, # Moong
    0.05,  # Urad
    0.065, # Mustard
    0.065, # Groundnut
    0.065, # Soybean
])

crop_probabilities = (
    crop_probabilities /
    crop_probabilities.sum()
)

chosen_crops = rng.choice(
    crops,
    NUM_RECORDS,
    p=crop_probabilities
)

# ============================================================
# MANDI SELECTION
# ============================================================

chosen_mandis = rng.choice(
    mandi_ids,
    NUM_RECORDS
)

# ============================================================
# QUANTITY
# ============================================================

quantity_ranges = {
    "food_grains": (10, 80),
    "commercial_and_fibre": (15, 100),
    "coarse_cereals": (10, 70),
    "pulses": (5, 60),
    "oilseeds": (8, 70),
}

quantities = []

for crop in chosen_crops:

    category = crop_to_category[crop]

    low, high = quantity_ranges[category]

    quantity = rng.uniform(low, high)

    quantities.append(
        round(quantity, 2)
    )

# ============================================================
# TIME SLOTS
# ============================================================

slot_hours = rng.choice(
    [8, 9, 10, 11, 12, 13, 14, 15, 16],
    NUM_RECORDS,
    p=[
        0.07,
        0.11,
        0.16,
        0.16,
        0.12,
        0.10,
        0.10,
        0.10,
        0.08,
    ]
)

slot_minutes = rng.choice(
    [0, 30],
    NUM_RECORDS
)

slot_start = [
    f"{hour:02d}:{minute:02d}:00"
    for hour, minute
    in zip(slot_hours, slot_minutes)
]

slot_end_minutes = (
    slot_hours * 60
    + slot_minutes
    + 30
)

slot_end = [
    f"{minutes // 60:02d}:{minutes % 60:02d}:00"
    for minutes in slot_end_minutes
]

# ============================================================
# DATE FEATURES
# ============================================================

procurement_series = pd.Series(
    procurement_dates
)

day_of_week = (
    procurement_series.dt.dayofweek.to_numpy()
)

month = (
    procurement_series.dt.month.to_numpy()
)

# ============================================================
# CROWD FEATURES
# ============================================================

season_factor = np.where(
    np.isin(month, [10, 11, 12, 1, 2]),
    1.15,
    1.0
)

slot_factor = np.where(
    np.isin(slot_hours, [9, 10, 11]),
    1.25,
    np.where(
        np.isin(slot_hours, [12, 13]),
        1.05,
        0.90
    )
)

base_crowd = (
    rng.poisson(
        5 * season_factor * slot_factor
    )
    + 1
)

farmers_in_selected_slot = np.clip(
    base_crowd
    + rng.integers(-2, 3, NUM_RECORDS),
    0,
    None
)

active_queue_count = np.clip(
    farmers_in_selected_slot
    + rng.poisson(
        3 * season_factor,
        NUM_RECORDS
    )
    - 1,
    0,
    None
)

# ============================================================
# SYNTHETIC TARGET
# ============================================================

base_duration = np.array([
    crop_base_duration[crop]
    for crop in chosen_crops
])

quantity_effect = (
    0.16 *
    np.array(quantities)
)

crowd_effect = (
    1.7 *
    farmers_in_selected_slot
    +
    0.55 *
    active_queue_count
)

time_effect = np.where(
    np.isin(slot_hours, [10, 11]),
    3.0,
    0.0
)

weekday_effect = np.where(
    day_of_week >= 5,
    1.5,
    0.0
)

mandi_effect = np.array([
    (mandi_factor[m] - 1) * 10
    for m in chosen_mandis
])

random_noise = rng.normal(
    0,
    3.5,
    NUM_RECORDS
)

actual_processing_duration = (
    base_duration
    + quantity_effect
    + crowd_effect
    + time_effect
    + weekday_effect
    + mandi_effect
    + random_noise
)

actual_processing_duration = np.clip(
    np.round(actual_processing_duration),
    8,
    120
).astype(int)

# ============================================================
# TIMESTAMPS
# ============================================================

arrival_times = []
completion_times = []
created_times = []

for i in range(NUM_RECORDS):

    date = pd.Timestamp(
        procurement_dates[i]
    )

    arrival_hour = int(
        np.clip(
            slot_hours[i]
            + rng.choice([0, 0, 0, 1]),
            6,
            22
        )
    )

    arrival_minute = (
        int(slot_minutes[i])
        +
        int(
            rng.choice(
                [0, 5, 10, 15]
            )
        )
    ) % 60

    arrival = (
        date
        +
        pd.Timedelta(
            hours=arrival_hour,
            minutes=arrival_minute
        )
    )

    completion = (
        arrival
        +
        pd.Timedelta(
            minutes=int(
                actual_processing_duration[i]
            )
        )
    )

    created = (
        arrival
        -
        pd.Timedelta(
            minutes=int(
                rng.integers(15, 240)
            )
        )
    )

    arrival_times.append(arrival)
    completion_times.append(completion)
    created_times.append(created)

# ============================================================
# FINAL DATAFRAME
# ============================================================

df = pd.DataFrame({

    "record_id": [
        f"SYN-{i+1:05d}"
        for i in range(NUM_RECORDS)
    ],

    "mandi_id": chosen_mandis,

    "mandi_name": [
        mandi_names[m]
        for m in chosen_mandis
    ],

    "crop_type": chosen_crops,

    "crop_category": [
        crop_to_category[c]
        for c in chosen_crops
    ],

    "quantity_quintals": quantities,

    "procurement_date":
        procurement_series.dt.strftime(
            "%Y-%m-%d"
        ),

    "slot_start": slot_start,

    "slot_end": slot_end,

    "slot_hour": slot_hours,

    "day_of_week": day_of_week,

    "month": month,

    "farmers_in_selected_slot":
        farmers_in_selected_slot,

    "active_queue_count":
        active_queue_count,

    "arrival_time": [
        x.strftime("%Y-%m-%d %H:%M:%S")
        for x in arrival_times
    ],

    "completion_time": [
        x.strftime("%Y-%m-%d %H:%M:%S")
        for x in completion_times
    ],

    "created_at": [
        x.strftime("%Y-%m-%d %H:%M:%S")
        for x in created_times
    ],

    "actual_processing_duration_mins":
        actual_processing_duration,
})

# ============================================================
# SAVE
# ============================================================

output_directory = Path("dataset")

output_directory.mkdir(
    exist_ok=True
)

output_file = (
    output_directory /
    "agrisync_synthetic_procurement_data.csv"
)

df.to_csv(
    output_file,
    index=False
)

# ============================================================
# REPORT
# ============================================================

print("\nDataset generated successfully!")
print("--------------------------------")
print(f"Records       : {len(df)}")
print(f"Crops         : {df['crop_type'].nunique()}")
print(f"Mandis        : {df['mandi_id'].nunique()}")
print(
    "Avg duration  :",
    round(
        df[
            "actual_processing_duration_mins"
        ].mean(),
        2
    ),
    "minutes"
)

print("\nCrop distribution:")
print(
    df["crop_type"]
    .value_counts()
)

print("\nSaved to:")
print(output_file)