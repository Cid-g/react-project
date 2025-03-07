import React, { createContext, useContext, useEffect, useState } from "react";

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Check token expiration on app load or user change
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const accessToken = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
  
      if (accessToken && refreshToken && tokenExpiration) {
        const now = new Date().getTime();
        if (now > parseInt(tokenExpiration)) {
          // Token expired, try to refresh it
          try {
            const response = await fetch("http://localhost:5000/api/auth/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken }),
            });
  
            const data = await response.json();
            if (response.ok) {
              // Refresh successful, update tokens and user data
              login(data.user, data.accessToken, data.refreshToken, data.expiresIn);
            } else {
              // Refresh failed, log out the user
              logout();
            }
          } catch (error) {
            // Network error, log out the user
            logout();
          }
        }
      }
    };
  
    checkTokenExpiration();
  }, [user]);
  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Function to log in and set user state
  const login = (userData, accessToken, refreshToken, expiresIn) => {
    setUser(userData);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  
    // Store token expiration time
    const tokenExpiration = new Date().getTime() + expiresIn * 1000; // Convert to milliseconds
    localStorage.setItem("tokenExpiration", tokenExpiration.toString());
  };

  // Function to log out and clear user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiration");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);