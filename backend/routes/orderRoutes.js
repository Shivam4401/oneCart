import express from "express";
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from "../controllers/orderController.js";
import isAuth from "../middlewares/isAuth.js"
import adminAuth from "../middlewares/adminAuth.js";

const orderRoutes = express.Router();

//for user
orderRoutes.post("/placeorder", isAuth, placeOrder);
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay);
orderRoutes.post("/userorder", isAuth, userOrders);
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay);

//for admin
orderRoutes.post("/list", adminAuth, allOrders);
orderRoutes.post("/status", adminAuth, updateStatus);

export default orderRoutes;