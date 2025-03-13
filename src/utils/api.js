// src/utils/api.js
const API_BASE = 'http://localhost:5000/api';

export const authFetch = async (endpoint, options = {}) => {
  let accessToken = localStorage.getItem("token");
  let refreshToken = localStorage.getItem("refreshToken");
  let response;
  
  try {
    // Initial request
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Handle token expiration (401 Unauthorized)
    if (response.status === 401) {
      // Attempt token refresh
      const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshResponse.ok) {
        throw new Error("Token refresh failed");
      }

      const tokenData = await refreshResponse.json();
      
      // Update local storage with new tokens
      localStorage.setItem("token", tokenData.accessToken);
      localStorage.setItem("refreshToken", tokenData.refreshToken);
      localStorage.setItem("tokenExpiration", 
        Date.now() + tokenData.expiresIn * 1000
      );

      // Retry original request with new token
      return authFetch(endpoint, options);
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    
    // Clear auth state on critical errors
    if (error.message.includes("Token refresh failed")) {
      localStorage.clear();
      window.location.href = "/login";
    }
    
    // Return error response for handling by caller
    return {
      ok: false,
      status: 500,
      json: async () => ({ message: "Network error occurred" })
    };
  }
};