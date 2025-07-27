import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";

export const adminDataContext = createContext();
const AdminContext = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  const getAdmin = async () => {
    try {
      let resutl = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
      });
      setAdminData(resutl.data);
      console.log(resutl.data);
    } catch (error) {
      setAdminData(null);
      console.log(error);
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);
  const value = { adminData, setAdminData, getAdmin };
  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  );
};

export default AdminContext;
