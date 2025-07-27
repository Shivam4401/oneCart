import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/vcart logo.png";
import google from "../assets/google.png";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { userDataContext } from "../context/UserContext.jsx";

const Login = () => {
  let [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("login error", error.message);
    }
  };

  const googleLogin = async (e) => {
    try {
      const response = await signInWithPopup(auth, provider);
      // console.log(response);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );
      console.log(result.data);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.log(error);
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
        <p>Welcome to OneCart, Place your order</p>
      </div>
      <div className="max-w-[600px] w-[90%] h-[500px] bg-gray-600/4 flex flex-col items-center justify-start py-10 gap-3 rounded-lg border-[1px] shaswo-lg border-amber-50 ">
        <form
          action=""
          className="w-[90%] h-[90%]  flex flex-col items-center justify-start gap-[20px]"
          onSubmit={handleLogin}
        >
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] flex items-center justify-center gap-3 rounded-lg cursor-pointer"
            onClick={googleLogin}
          >
            <img className="w-5 h-5" src={google} alt="" />
            <h1 className="text-lg font-semibold py-4">Login with Google</h1>
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div> OR{" "}
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
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
                className="absolute right-5 top-25"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
            {!showPassword && (
              <IoEyeOff
                className="absolute right-5 top-25"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}

            <button className="w-[100%] h-[50px] bg-[#7e86f1e8] border-[1px] border-[#96969635] rounded-lg shadow-lg px-[20px] font-semibold mt-4">
              Login Account
            </button>
            <p className="flex gap-[10px]">
              You don't have any accout?
              <span
                className="text-purple-600 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Rgister
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
