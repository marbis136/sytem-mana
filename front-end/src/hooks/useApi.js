import { useCallback } from "react";
import { getAccessToken, refreshToken, saveTokens } from "../services/auth";

export function useApi() {
  const apiCall = useCallback(async (url, options = {}) => {
    let token = getAccessToken();

    let response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    // Si el token expiró → intentar refrescar
    if (response.status === 401 && getAccessToken()) {
      try {
        token = await refreshToken();

        response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error("No se pudo refrescar el token", err);
        throw err;
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error en la API");
    }

    return await response.json();
  }, []);

  return apiCall;
}
