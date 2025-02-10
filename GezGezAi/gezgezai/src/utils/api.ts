const API_URL = "http://localhost:5000/api";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Yetkilendirme hatası: Kullanıcı giriş yapmamış.");
  }

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API isteği başarısız.");
  }

  return response.json();
};
