import json
from http.server import BaseHTTPRequestHandler, HTTPServer

import joblib
import numpy as np

model = joblib.load("water_quality_model.pkl")


class PredictionHandler(BaseHTTPRequestHandler):

    def do_POST(self):

        if self.path != "/predict":
            self.send_response(404)
            self.end_headers()
            return

        length = int(self.headers["Content-Length"])
        body = self.rfile.read(length)

        try:
            data = json.loads(body)

            values = [
                data["specificConductanceMax"],
                data["phMax"],
                data["phMin"],
                data["specificConductanceMin"],
                data["specificConductanceMean"],
                data["dissolvedOxygenMax"],
                data["dissolvedOxygenMean"],
                data["dissolvedOxygenMin"],
                data["temperatureMean"],
                data["temperatureMin"],
                data["temperatureMax"]
            ]

            print("Received values:", values)

            prediction = model.predict(np.array([values]))[0]

            print("Prediction:", prediction)

            response = {
                "predictedPh": float(prediction)
            }

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()

            self.wfile.write(json.dumps(response).encode())

        except Exception as e:

            print("Error:", e)

            self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.end_headers()

            response = {
                "error": str(e)
            }

            self.wfile.write(json.dumps(response).encode())


server = HTTPServer(("localhost", 5000), PredictionHandler)

print("Prediction API running on port 5000")

server.serve_forever()