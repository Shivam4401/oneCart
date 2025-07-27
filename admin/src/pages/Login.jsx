import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { adminDataContext } from "../context/AdminContext";
import { authDataContext } from "../context/AuthContext";
// import { signInWithPopup } from "firebase/auth";

const Login = () => {
  let [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { adminData, getAdmin } = useContext(adminDataContext);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("AdminLogin Successfully");
      getAdmin();
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("AdminLogin Failed");
      setLoading(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center flex-col  justify-start gap-5 ">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start gap-4 px-[30px] cursor-pointer "
        onClick={() => navigate("/")}
      >
        <img className="w-9 h-9" src={logo} alt="" />
        <h1 className="text-xl font-semibold">OneCart</h1>
      </div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold">Login Page</h1>
        <p>Welcome to OneCart, Apply to Admin Login</p>
      </div>
      <div className="max-w-[600px] w-[90%] h-[500px] bg-gray-600/4 flex flex-col items-center justify-start py-10 gap-3 rounded-lg border-[1px] shaswo-lg border-amber-50 ">
        <form
          action=""
          className="w-[90%] h-[90%]  flex flex-col items-center justify-start gap-[20px]"
          onSubmit={AdminLogin}
        >
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="email"
              className="w-[100%] h-[50px] border-[1px] border-[#96969635] rounded-lg shadow-lg px-[20px] font-semibold"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={showPassword ? "text" : "password"}
              className="w-[100%] h-[50px] border-[1px] border-[#96969635] rounded-lg shadow-lg px-[20px] font-semibold "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword && (
              <IoEye
                className="absolute right-5 top-43"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
            {!showPassword && (
              <IoEyeOff
                className="absolute right-5 top-43"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}

            <button className="w-[100%] h-[50px] bg-[#7e86f1e8] border-[1px] border-[#96969635] rounded-lg shadow-lg px-[20px] font-semibold mt-4">
              Login Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
