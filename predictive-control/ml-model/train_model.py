import pandas as pd
import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

data = pd.read_csv("water_quality_prediction_dataset.csv")

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

train_data = data[data["split"] == "train"]
test_data = data[data["split"] == "test"]

X_train = train_data[features]
y_train = train_data["target_ph_median"]

X_test = test_data[features]
y_test = test_data["target_ph_median"]

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

prediction = model.predict(X_test)

mae = mean_absolute_error(y_test, prediction)
rmse = mean_squared_error(y_test, prediction) ** 0.5
r2 = r2_score(y_test, prediction)

print("Model trained successfully")
print("MAE:", mae)
print("RMSE:", rmse)
print("R2:", r2)

joblib.dump(model, "water_quality_model.pkl")

print("Model saved successfully")