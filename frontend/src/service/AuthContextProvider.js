import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthContextProvider component
export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
      _id: null,
      username: "",
    });
  
    const updateUser = (userData) => {
      setUser(userData);
    };
  
    const emptyUser = () => {
      setUser({
        _id: null,
        username: "",
      });
    };
  
    const login = () => {
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      setIsLoggedIn(false);
      emptyUser();
    };
  
    // Context value to provide to consumers
    const contextValue = {
      isLoggedIn,
      user,
      login,
      logout,
      updateUser,
      emptyUser,
    };
  
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
