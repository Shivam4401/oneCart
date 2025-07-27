import express from "express";
import { adminLogin, googleLogin, login, logout, register } from "../controllers/authController.js";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.post("/googlelogin", googleLogin );
authRoutes.post("/adminlogin", adminLogin );