import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getAdmin, getCurrentuser } from "../controllers/userController.js";
import adminAuth from "../middlewares/adminAuth.js";

let userRoutes = express.Router();

userRoutes.get("/getcurrentuser", isAuth, getCurrentuser)
userRoutes.get("/getadmin", adminAuth, getAdmin)

export default userRoutes