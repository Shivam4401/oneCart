import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { useContext } from "react";
import { adminDataContext } from "./context/AdminContext";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  let { adminData } = useContext(adminDataContext);
  return (
    <>
      <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <>
          {" "}
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/lists" element={<List />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default App;
