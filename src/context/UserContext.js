import React, { createContext, useContext, useEffect, useState } from "react";

// Create UserContext
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Remove when user logs out
    }
  }, [user]);

  // Function to log in and set user state
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out and clear user state
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
