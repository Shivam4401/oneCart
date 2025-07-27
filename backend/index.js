import express from 'express';
import dotenv from "dotenv";
import { connectDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/authRoutes.js';
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoute.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

let port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["https://onecart-frontend-4orx.onrender.com","http://localhost:5174"],
    credentials:true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes); 
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
    res.send("Hello from server");
})



app.listen(port, () => {
    connectDb();
    console.log(`app is runnig of port ${port}`);
})


// rzp_test_5AjalRiAE5Y806 test key Id   
// Pisg9LHjXsBrpliCCVlHdaKS key_secret
