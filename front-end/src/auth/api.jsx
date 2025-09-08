const API_URL = "http://127.0.0.1:8000/api";

function getHeaders() {
  const token = localStorage.getItem("access");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error("Error en GET " + path);
  return await response.json();
}

export async function apiPost(path, data) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error en POST " + path);
  return await response.json();
}
