import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("dashboard");
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>Predictive Control</h2>
          <p>Water Quality System</p>
        </div>


        <nav className="sidebar-menu">

          {/* Dashboard */}

          <button
            className={
              page === "dashboard"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </button>


          {/* Prediction */}

          <button
            className={
              page === "prediction"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("prediction")}
          >
            💧 Prediction
          </button>


          {/* Prediction History */}

          <button
            className={
              page === "history"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("history")}
          >
            📋 Prediction History
          </button>


          {/* Analytics */}

          <button
            className={
              page === "analytics"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("analytics")}
          >
            📊 Analytics
          </button>


          {/* Profile */}

          <button
            className={
              page === "profile"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("profile")}
          >
            👤 Profile
          </button>


          {/* Settings */}

          <button
            className={
              page === "settings"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("settings")}
          >
            ⚙️ Settings
          </button>


          {/* Admin */}

          <button
            className={
              page === "admin"
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage("admin")}
          >
            🛠️ Admin
          </button>

        </nav>


        {/* Logged-in User */}

        <div className="sidebar-user">
          <p>Logged in as</p>
          <strong>{user.username}</strong>
        </div>

      </aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">

        {page === "dashboard" && (
          <Dashboard
            user={user}
            onPrediction={() => setPage("prediction")}
          />
        )}


        {page === "prediction" && (
          <PredictionPage user={user} />
        )}


        {page === "history" && (
          <PredictionHistoryPage />
        )}


        {page === "analytics" && (
          <AnalyticsPage />
        )}


        {page === "profile" && (
          <ProfilePage user={user} />
        )}


        {page === "settings" && (
          <SettingsPage
            user={user}
            onLogout={handleLogout}
          />
        )}

        {page === "admin" && <AdminPage />}

      </main>

    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ user, onPrediction }) {

  return (

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome, {user.username}
          </h1>

          <p>
            Data-driven predictive control for water quality monitoring.
          </p>

        </div>


        <img
          className="dashboard-image"
          src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=900&q=80"
          alt="Water quality"
        />

      </div>


      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            💧
          </div>

          <h3>
            Water Quality
          </h3>

          <p>
            Enter water quality parameters and generate a prediction.
          </p>

          <button onClick={onPrediction}>
            Start Prediction
          </button>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            🤖
          </div>

          <h3>
            Machine Learning
          </h3>

          <p>
            Prediction is generated using the trained Random Forest model.
          </p>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            🔗
          </div>

          <h3>
            System Integration
          </h3>

          <p>
            React, Spring Boot and Python work together through APIs.
          </p>

        </div>

      </div>


      <div className="project-info">

        <h2>
          Project Overview
        </h2>

        <p>
          This system provides a simple interface for entering
          water quality parameters and generating a machine
          learning based prediction.
        </p>


        <div className="technology-list">

          <span>React.js</span>
          <span>Spring Boot</span>
          <span>Python</span>
          <span>Random Forest</span>
          <span>MySQL</span>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PREDICTION PAGE
========================================================= */

function PredictionPage({ user }) {

  const [formData, setFormData] = useState({

    specificConductanceMax: "",
    phMax: "",
    phMin: "",
    specificConductanceMin: "",
    specificConductanceMean: "",
    dissolvedOxygenMax: "",
    dissolvedOxygenMean: "",
    dissolvedOxygenMin: "",
    temperatureMean: "",
    temperatureMin: "",
    temperatureMax: ""

  });


  const [result, setResult] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handlePredict = async (e) => {

    e.preventDefault();

    setResult("");
    setError("");


    try {

      const response = await fetch(
        "http://localhost:8080/api/prediction",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(
            Object.fromEntries(
              Object.entries(formData).map(
                ([key, value]) => [
                  key,
                  Number(value)
                ]
              )
            )
          )
        }
      );


      const data = await response.json();


      if (data.predictedPh !== undefined) {

        setResult(data.predictedPh);

      } else {

        setError(
          data.error || "Prediction failed"
        );

      }

    } catch (err) {

      setError(
        "Unable to connect to prediction service"
      );

    }

  };


  return (

    <div className="prediction-page">

      <div className="project-header">

        <div className="header-content">

          <h1>
            Water Quality Prediction
          </h1>

          <p>
            Data-driven water quality monitoring using machine learning
          </p>

          <span>
            Welcome, {user.username}
          </span>

        </div>


        <img
          className="water-image"
          src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=900&q=80"
          alt="Water quality monitoring"
        />

      </div>


      <div className="prediction-section">

        <h2>
          Water Quality Parameters
        </h2>

        <p className="section-description">
          Enter the required water quality measurements
          to generate a prediction.
        </p>


        <form
          onSubmit={handlePredict}
          className="form-container"
        >

          <div className="form-grid">

            <div className="input-group">

              <label>
                Specific Conductance Max
              </label>

              <input
                type="number"
                step="any"
                name="specificConductanceMax"
                value={formData.specificConductanceMax}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                pH Max
              </label>

              <input
                type="number"
                step="any"
                name="phMax"
                value={formData.phMax}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                pH Min
              </label>

              <input
                type="number"
                step="any"
                name="phMin"
                value={formData.phMin}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Specific Conductance Min
              </label>

              <input
                type="number"
                step="any"
                name="specificConductanceMin"
                value={formData.specificConductanceMin}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Specific Conductance Mean
              </label>

              <input
                type="number"
                step="any"
                name="specificConductanceMean"
                value={formData.specificConductanceMean}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Dissolved Oxygen Max
              </label>

              <input
                type="number"
                step="any"
                name="dissolvedOxygenMax"
                value={formData.dissolvedOxygenMax}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Dissolved Oxygen Mean
              </label>

              <input
                type="number"
                step="any"
                name="dissolvedOxygenMean"
                value={formData.dissolvedOxygenMean}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Dissolved Oxygen Min
              </label>

              <input
                type="number"
                step="any"
                name="dissolvedOxygenMin"
                value={formData.dissolvedOxygenMin}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Temperature Mean
              </label>

              <input
                type="number"
                step="any"
                name="temperatureMean"
                value={formData.temperatureMean}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Temperature Min
              </label>

              <input
                type="number"
                step="any"
                name="temperatureMin"
                value={formData.temperatureMin}
                onChange={handleChange}
                required
              />

            </div>


            <div className="input-group">

              <label>
                Temperature Max
              </label>

              <input
                type="number"
                step="any"
                name="temperatureMax"
                value={formData.temperatureMax}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          <button
            type="submit"
            className="predict-button"
          >
            Predict Water Quality
          </button>


          {result !== "" && (

            <div className="result">

              <span>
                Predicted Value
              </span>

              <strong>
                {Number(result).toFixed(4)}
              </strong>

            </div>

          )}


          {error && (

            <div className="error">
              {error}
            </div>

          )}

        </form>

      </div>

    </div>

  );
}


/* =========================================================
   PREDICTION HISTORY
========================================================= */

function PredictionHistoryPage() {

  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const loadHistory = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/prediction-history"
      );


      if (!response.ok) {

        throw new Error(
          "Failed to load history"
        );

      }


      const data = await response.json();

      setHistory(data);

      setError("");

    } catch (err) {

      setError(
        "Unable to load prediction history"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadHistory();

  }, []);


  return (

    <div className="history-page">

      <div className="history-header">

        <div>

          <h1>
            Prediction History
          </h1>

          <p>
            Previous water quality predictions
          </p>

        </div>

      </div>


      {loading && (

        <div className="history-message">

          Loading prediction history...

        </div>

      )}


      {error && (

        <div className="error">
          {error}
        </div>

      )}


      {!loading &&
        !error &&
        history.length === 0 && (

          <div className="history-message">

            No prediction history available.

          </div>

        )}


      {!loading &&
        !error &&
        history.length > 0 && (

          <div className="history-table-container">

            <table className="history-table">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>pH Max</th>
                  <th>pH Min</th>
                  <th>Conductance Max</th>
                  <th>Oxygen Max</th>
                  <th>Temperature Max</th>
                  <th>Predicted Value</th>

                </tr>

              </thead>


              <tbody>

                {history.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.id}
                    </td>

                    <td>
                      {item.phMax}
                    </td>

                    <td>
                      {item.phMin}
                    </td>

                    <td>
                      {item.specificConductanceMax}
                    </td>

                    <td>
                      {item.dissolvedOxygenMax}
                    </td>

                    <td>
                      {item.temperatureMax}
                    </td>

                    <td className="prediction-value">

                      {Number(
                        item.predictedValue
                      ).toFixed(4)}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

    </div>

  );
}


/* =========================================================
   ANALYTICS PAGE
========================================================= */

function AnalyticsPage() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const response = await fetch(
          "http://localhost:8080/api/prediction-history"
        );


        if (!response.ok) {

          throw new Error(
            "Failed to load analytics"
          );

        }


        const data = await response.json();

        setHistory(data);

        setError("");

      } catch (err) {

        setError(
          "Unable to load analytics data"
        );

      } finally {

        setLoading(false);

      }

    };


    loadAnalytics();

  }, []);


  const totalPredictions = history.length;


  const predictedValues = history
    .map((item) => Number(item.predictedValue))
    .filter((value) => !isNaN(value));


  const averagePrediction =
    predictedValues.length > 0
      ? predictedValues.reduce(
          (sum, value) => sum + value,
          0
        ) / predictedValues.length
      : 0;


  const highestPrediction =
    predictedValues.length > 0
      ? Math.max(...predictedValues)
      : 0;


  const lowestPrediction =
    predictedValues.length > 0
      ? Math.min(...predictedValues)
      : 0;


  if (loading) {

    return (

      <div className="analytics-page">

        <div className="analytics-header">

          <h1>
            Analytics
          </h1>

          <p>
            Prediction summary and statistics
          </p>

        </div>


        <div className="analytics-message">

          Loading analytics...

        </div>

      </div>

    );

  }


  if (error) {

    return (

      <div className="analytics-page">

        <div className="analytics-header">

          <h1>
            Analytics
          </h1>

          <p>
            Prediction summary and statistics
          </p>

        </div>


        <div className="error">
          {error}
        </div>

      </div>

    );

  }


  return (

    <div className="analytics-page">

      <div className="analytics-header">

        <h1>
          Analytics
        </h1>

        <p>
          Prediction summary and statistics
        </p>

      </div>


      <div className="analytics-cards">

        <div className="analytics-card">

          <div className="analytics-icon">
            📊
          </div>

          <span>
            Total Predictions
          </span>

          <strong>
            {totalPredictions}
          </strong>

        </div>


        <div className="analytics-card">

          <div className="analytics-icon">
            📈
          </div>

          <span>
            Average Prediction
          </span>

          <strong>
            {averagePrediction.toFixed(4)}
          </strong>

        </div>


        <div className="analytics-card">

          <div className="analytics-icon">
            ⬆️
          </div>

          <span>
            Highest Prediction
          </span>

          <strong>
            {highestPrediction.toFixed(4)}
          </strong>

        </div>


        <div className="analytics-card">

          <div className="analytics-icon">
            ⬇️
          </div>

          <span>
            Lowest Prediction
          </span>

          <strong>
            {lowestPrediction.toFixed(4)}
          </strong>

        </div>

      </div>


      <div className="analytics-section">

        <h2>
          Recent Predictions
        </h2>


        {history.length === 0 ? (

          <div className="analytics-message">

            No prediction data available.

          </div>

        ) : (

          <div className="analytics-list">

            {history
              .slice(-5)
              .reverse()
              .map((item) => (

                <div
                  className="analytics-row"
                  key={item.id}
                >

                  <span>
                    Prediction #{item.id}
                  </span>

                  <strong>
                    {Number(
                      item.predictedValue
                    ).toFixed(4)}
                  </strong>

                </div>

              ))}

          </div>

        )}

      </div>

    </div>

  );
}


/* =========================================================
   ADMIN PAGE
========================================================= */

function AdminPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAdminData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/prediction-history"
      );

      if (!response.ok) {
        throw new Error("Failed to load admin data");
      }

      const data = await response.json();

      setHistory(data);
      setError("");
    } catch (err) {
      setError("Unable to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const predictedValues = history
    .map((item) => Number(item.predictedValue))
    .filter((value) => !isNaN(value));

  const totalPredictions = history.length;

  const averagePrediction =
    predictedValues.length > 0
      ? predictedValues.reduce(
          (sum, value) => sum + value,
          0
        ) / predictedValues.length
      : 0;

  const highestPrediction =
    predictedValues.length > 0
      ? Math.max(...predictedValues)
      : 0;

  const lowestPrediction =
    predictedValues.length > 0
      ? Math.min(...predictedValues)
      : 0;

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Panel</h1>
            <p>Prediction system administration</p>
          </div>
        </div>

        <div className="admin-message">
          Loading admin data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Panel</h1>
            <p>Prediction system administration</p>
          </div>
        </div>

        <div className="error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p>
            Manage and monitor prediction records
          </p>
        </div>

        <button
          className="admin-refresh-button"
          onClick={loadAdminData}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="admin-cards">

        <div className="admin-card">
          <div className="admin-icon">📊</div>
          <span>Total Predictions</span>
          <strong>{totalPredictions}</strong>
        </div>

        <div className="admin-card">
          <div className="admin-icon">📈</div>
          <span>Average Prediction</span>
          <strong>
            {averagePrediction.toFixed(4)}
          </strong>
        </div>

        <div className="admin-card">
          <div className="admin-icon">⬆️</div>
          <span>Highest Prediction</span>
          <strong>
            {highestPrediction.toFixed(4)}
          </strong>
        </div>

        <div className="admin-card">
          <div className="admin-icon">⬇️</div>
          <span>Lowest Prediction</span>
          <strong>
            {lowestPrediction.toFixed(4)}
          </strong>
        </div>

      </div>

      <div className="admin-section">

        <h2>Prediction Records</h2>

        {history.length === 0 ? (
          <div className="admin-message">
            No prediction records available.
          </div>
        ) : (
          <div className="admin-table-container">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>pH Max</th>
                  <th>pH Min</th>
                  <th>Conductance Max</th>
                  <th>Oxygen Max</th>
                  <th>Temperature Max</th>
                  <th>Predicted Value</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>

                    <td>{item.id}</td>
                    <td>{item.phMax}</td>
                    <td>{item.phMin}</td>
                    <td>{item.specificConductanceMax}</td>
                    <td>{item.dissolvedOxygenMax}</td>
                    <td>{item.temperatureMax}</td>

                    <td className="admin-prediction">
                      {Number(
                        item.predictedValue
                      ).toFixed(4)}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}


/* =========================================================
   PROFILE PAGE
========================================================= */

function ProfilePage({ user }) {

  return (

    <div className="profile-page">

      <div className="profile-header">

        <h1>
          My Profile
        </h1>

        <p>
          Logged-in user information
        </p>

      </div>


      <div className="profile-card">

        <div className="profile-icon">
          👤
        </div>


        <h2>
          {user.username}
        </h2>


        <p className="profile-role">
          Project User
        </p>


        <div className="profile-details">

          <div>

            <span>
              Username
            </span>

            <strong>
              {user.username}
            </strong>

          </div>


          <div>

            <span>
              Application
            </span>

            <strong>
              Water Quality Prediction
            </strong>

          </div>


          <div>

            <span>
              System
            </span>

            <strong>
              Data-Driven Predictive Control
            </strong>

          </div>

        </div>

      </div>

    </div>

  );
}


/* =========================================================
   SETTINGS PAGE
========================================================= */

function SettingsPage({ user, onLogout }) {

  return (

    <div className="settings-page">

      {/* Header */}

      <div className="settings-header">

        <h1>
          Settings
        </h1>

        <p>
          Application and system information
        </p>

      </div>


      {/* User Information */}

      <div className="settings-section">

        <h2>
          User Information
        </h2>


        <div className="settings-item">

          <div>

            <span>
              Logged in user
            </span>

            <strong>
              {user.username}
            </strong>

          </div>


          <div className="settings-status">
            Active
          </div>

        </div>

      </div>


      {/* System Information */}

      <div className="settings-section">

        <h2>
          System Information
        </h2>


        <div className="settings-item">

          <div>

            <span>
              Frontend
            </span>

            <strong>
              React.js
            </strong>

          </div>


          <div className="settings-status">
            Ready
          </div>

        </div>


        <div className="settings-item">

          <div>

            <span>
              Backend
            </span>

            <strong>
              Spring Boot
            </strong>

          </div>


          <div className="settings-status">
            Ready
          </div>

        </div>


        <div className="settings-item">

          <div>

            <span>
              Prediction Service
            </span>

            <strong>
              Python
            </strong>

          </div>


          <div className="settings-status">
            Ready
          </div>

        </div>


        <div className="settings-item">

          <div>

            <span>
              Machine Learning Model
            </span>

            <strong>
              Random Forest Regressor
            </strong>

          </div>


          <div className="settings-status">
            Active
          </div>

        </div>


        <div className="settings-item">

          <div>

            <span>
              Database
            </span>

            <strong>
              MySQL
            </strong>

          </div>


          <div className="settings-status">
            Connected
          </div>

        </div>

      </div>


      {/* Project Information */}

      <div className="settings-section">

        <h2>
          Project Information
        </h2>


        <div className="settings-project">

          <p>
            <strong>Project:</strong>{" "}
            Data-Driven Predictive Control of Linear Processes
          </p>


          <p>
            <strong>Application:</strong>{" "}
            Water Quality Prediction System
          </p>


          <p>
            <strong>Version:</strong>{" "}
            1.0
          </p>

        </div>

      </div>


      {/* Logout */}

      <div className="logout-section">

        <button
          className="logout-button"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>

  );
}


export default App;