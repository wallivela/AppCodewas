import React, { useState } from "react";
import "./SplashScreen.css";
import axios from "axios";

const SplashScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        onLogin();
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Nombre de usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="splash-container">
      <div className="logo-container">
        <img src="src/assets/logo.png" alt="logo" className="logo" />
        <div className="login-box">
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            id="username"
            placeholder="Nombre de Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
