import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [refreshTimeoutId, setRefreshTimeoutId] = useState(null);

  const scheduleTokenRefresh = (expiresIn) => {
    // Clear existing timeout
    if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
    
    // Schedule refresh 1 minute before expiration
    const refreshTime = expiresIn * 1000 - 60000;
    const timeoutId = setTimeout(handleTokenRefresh, refreshTime);
    setRefreshTimeoutId(timeoutId);
  };

  const handleTokenRefresh = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") })
      });
  
      if (!response.ok) throw new Error('Refresh failed');
      
      const data = await response.json();
      
      // Update client-side tokens
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("tokenExpiration", Date.now() + data.expiresIn * 1000);
      
      // Reschedule next refresh
      scheduleTokenRefresh(data.expiresIn);
  
    } catch (error) {
      logout();
    }
  };

  const login = (userData, accessToken, refreshToken, expiresIn) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const tokenExpiration = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("tokenExpiration", tokenExpiration.toString());
    scheduleTokenRefresh(expiresIn);
  };
  

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Logging out with refresh token:", refreshToken); // Debugging
  
    if (refreshToken) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
  
        const data = await response.json();
        console.log("Logout response:", data); // Debugging
  
        if (!response.ok) {
          console.error("Logout failed:", data.message);
        }
      } catch (error) {
        console.error("Logout request error:", error);
      }
    }
  
    // Clear frontend session
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
  
    if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
  };
  
  
  

  const [loading, setLoading] = useState(true); // Add loading state

useEffect(() => {
  const checkToken = async () => {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (accessToken && refreshToken && tokenExpiration) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiration)) {
        await handleTokenRefresh();
      } else {
        setUser(JSON.parse(localStorage.getItem("user"))); // Reload user from localStorage
      }
    }
    setLoading(false);
  };

  checkToken();
}, []);

return (
  <UserContext.Provider value={{ user, login, logout }}>
    {!loading && children} {/* Prevent rendering until loading is done */}
  </UserContext.Provider>
);

};

export const useUser = () => useContext(UserContext);