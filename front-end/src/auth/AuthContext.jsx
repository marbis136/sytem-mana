// src/auth/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE}/api/auth/login/`;

//const API_URL = "http://127.0.0.1:8000/api/auth/login/"; // ajusta si es necesario

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login({ login, password }) {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }), // ⚠️ usa "login" porque así lo definiste en Django
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const data = await response.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    setUser({ login }); // opcional, podrías pedir más datos al backend
    return data;
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
