import pandas as pd
from scipy.io import loadmat

data = loadmat("water_dataset/water_dataset.mat")

X_train = data["X_tr"][0]
Y_train = data["Y_tr"]

X_test = data["X_te"][0]
Y_test = data["Y_te"]

features = [
    "specific_conductance_max",
    "ph_max",
    "ph_min",
    "specific_conductance_min",
    "specific_conductance_mean",
    "dissolved_oxygen_max",
    "dissolved_oxygen_mean",
    "dissolved_oxygen_min",
    "temperature_mean",
    "temperature_min",
    "temperature_max"
]

rows = []

for i, sample in enumerate(X_train):
    for station in range(37):
        row = {}

        for j, feature in enumerate(features):
            row[feature] = sample[station, j]

        row["station_id"] = station + 1
        row["sample_index"] = i + 1
        row["target_ph_median"] = Y_train[station, i]
        row["split"] = "train"

        rows.append(row)

for i, sample in enumerate(X_test):
    for station in range(37):
        row = {}

        for j, feature in enumerate(features):
            row[feature] = sample[station, j]

        row["station_id"] = station + 1
        row["sample_index"] = i + 1
        row["target_ph_median"] = Y_test[station, i]
        row["split"] = "test"

        rows.append(row)

df = pd.DataFrame(rows)

df.to_csv("water_quality_prediction_dataset.csv", index=False)

print("Dataset created successfully")
print("Rows:", len(df))
print("Columns:", len(df.columns))
print(df.head())