import React, { createContext } from "react";
export const authDataContext = createContext();
const AuthContext = ({ children }) => {
  let serverUrl = "https://onecart-backend-6ige.onrender.com";
  const value = {
    serverUrl,
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
};

export default AuthContext;
