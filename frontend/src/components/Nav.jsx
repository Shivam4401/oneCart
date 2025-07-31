import React, { useContext, useState } from "react";
import logo from "../assets/vcart logo.png";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchCircleSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { shopDataContext } from "../context/ShopContext";
// import { getCurrentuser } from "../../../backend/controllers/userController";

const Nav = () => {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();
  // console.log("userData", userData);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
       // setUserData(null); 
       setUserData(""); 
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[100vw] h-[70px] bg-[#ecfafaec] shadow-md shadow-black z-10 sticky top-0 flex items-center justify-between px-8 ">
        <div className="flex items-center justify-center gap-4 cursor-pointer">
          <img className="w-7 " src={logo} alt="" />
          <h1 className="text-xl font-semibold">OneCart</h1>
        </div>

        <div className="w-[55%] lg:w-[35%] hidden md:flex">
          <ul className=" flex items-center justify-center gap-5 md:gap-7  text-white ">
            <li
              className="bg-gray-700 px-3 py-1 rounded-lg cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="bg-gray-700 px-3 py-1 rounded-lg cursor-pointer"
              onClick={() => navigate("/collection")}
            >
              Collections
            </li>
            <li
              className="bg-gray-700 px-3 py-1 rounded-lg cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="bg-gray-700 px-3 py-1 rounded-lg cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-5 px-5 relative">
          {showSearch && (
            <IoSearchCircleOutline
              className="text-4xl cursor-pointer"
              onClick={() => {
                setShowSearch((prev) => !prev);
                navigate("/collection");
              }}
            />
          )}
          {!showSearch && (
            <IoSearchCircleSharp
              className="text-4xl cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          )}

          {!userData && (
            <FaUserCircle
              className="text-3xl  cursor-pointer"
              onClick={() => setShowProfile((prev) => !prev)}
            />
          )}
          {userData && (
            <div
              className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center  cursor-pointer"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {userData?.name[0].toUpperCase()}
            </div>
          )}

          <IoCartOutline
            className="text-4xl cursor-pointer hidden md:block"
            onClick={() => navigate("/cart")}
          />
          <p className="rounded-full text-[8px] bg-black text-white absolute p-1 right-2 -top-1 hidden md:block">
            {getCartCount()}
          </p>
        </div>
      </div>
      {showSearch && (
        <div className="w-full h-[70px] bg-[#e8e1e1] flex items-center justify-center relative">
          <input
            className="lg:w-[50%] w-[80%] h-[35px] bg-[#363131] px-4 text-white rounded-2xl pb-1  border-[1px] border-white cursor-pointer flex items-center justify-center"
            type="text"
            placeholder="search here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      )}
      {showProfile && (
        <div className="w-[200px] h-[150px] bg-[#4f4d4d] border-[1px] border-[#e2dada]  top-20 right-2 flex  items-center justify-center z-10 fixed rounded-lg">
          <ul className="w-[100%] h-[100%] py-[10px] flex  items-start justify-around flex-col ">
            {!userData && (
              <li
                className="w-[100%] px-[15px] py-[10px] font-semibold  cursor-pointer hover:bg-[#f6f2f2]"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}

            {userData && (
              <li
                className="w-[100%] px-[15px] py-[10px] font-semibold  cursor-pointer hover:bg-[#f6f2f2] "
                onClick={() => {
                  handleLogout();
                  setShowProfile(false);
                }}
              >
                Logout
              </li>
            )}
            <li
              className="w-[100%] px-[15px] py-[10px] font-semibold  cursor-pointer hover:bg-[#f6f2f2]"
              onClick={() => navigate("/order")}
            >
              Orders
            </li>
            <li
              className="w-[100%] px-[15px] py-[10px] font-semibold  cursor-pointer hover:bg-[#f6f2f2]"
              onClick={() => navigate("/about")}
            >
              About
            </li>
          </ul>
        </div>
      )}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-10 fixed bottom-0 left-0 bg-[#191818] md:hidden">
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <IoMdHome className="w-[30px] h-[30px] text-white md:hidden" />
          Home
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <HiOutlineCollection className="w-[30px] h-[30px] text-white md:hidden" />
          Collection
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-[2px]">
          <MdContacts className="w-[30px] h-[30px] text-white md:hidden" />
          Contact
        </button>
        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/cart")}
        >
          <IoCartOutline className="w-[30px] h-[30px] text-white md:hidden" />
          Cart
        </button>
        <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold  rounded-full text-[9px] top-[8px] right-[18px]">
          {getCartCount()}
        </p>
      </div>
    </>
  );
};

export default Nav;
