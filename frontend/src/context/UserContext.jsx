import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  let [userData, setUserData] = useState("");
  let { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(
        serverUrl + "/api/user/getcurrentuser",

        {
          withCredentials: true,
        }
      );
      setUserData(result.data.user);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData, getCurrentUser };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
