import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>Water Quality Prediction</h1>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          {error && <div className="login-error">{error}</div>}
        </form>

      </div>
    </div>
  );
}

export default Login;