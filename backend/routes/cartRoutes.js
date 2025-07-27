import express from "express";
import { addToCart, getUserCart, UpdateCart } from "../controllers/cartController.js";
import isAuth from "../middlewares/isAuth.js"

const cartRoutes = express.Router();

cartRoutes.post('/get', isAuth ,getUserCart)
cartRoutes.post('/add', isAuth , addToCart)
cartRoutes.post('/update', isAuth, UpdateCart)

export default cartRoutes;