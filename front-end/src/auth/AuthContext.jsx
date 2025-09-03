import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = no autenticado

  useEffect(() => {
    // Recupera sesión simple (ejemplo) desde localStorage
    const raw = localStorage.getItem("demo_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = async ({ email, password }) => {
    // DEMO: valida "cualquier" usuario si hay email y password
    // Aquí normalmente llamarías a tu API
    if (!email || !password) throw new Error("Email y password requeridos");
    const demoUser = { email, name: "Usuario Demo" };
    localStorage.setItem("demo_user", JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem("demo_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
