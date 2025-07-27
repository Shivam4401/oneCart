import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";


export const register = async (req, res) => {
    try {
        // destructure the required fields
        const { name, email, password } = req.body;
        // check if the user email already exist
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "email already exist" });
        }
        // check if the email is valid or not
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Enter valid email" });
        }
        // check for strong password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 character long !" });
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // now create the user
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        // jwt token creation
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false,
        });
        //send response for user creation
        return res.status(200).json({
            message: "user created successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: `register error ${error.message}`,
        });
    }
}

export const login =async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "email doesnot exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "incorrect password",
            });
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false,
        });
        
        res.status(200).json({
            message: "user logged in successfully",
            user,
        });

    } catch (error) {
        return res.statur(500).json({
            message: `login error ${error.message}`,
        });
    }
}


export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `logout error ${error.message}`,
    });
  }
};

export const googleLogin = async (req,res) => {
        try {
        const { name,email} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
              name,email
          })
        }
      
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false,
        });
        
        res.status(200).json({
            message: "user logged in successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: `google login error ${error.message}`,
        });
    }
}

export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = await genToken1(email);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1 * 24 * 60 * 60 * 1000,
                sameSite: "strict",
                secure: false,
            });
            
            res.status(200).json({
              token
            });
        }
        return res.status(400).json({
            message:"Invalid credentials"
        })
    } catch (error) {
        console.log("Admin login error");
        return res.status(500).json({
            message:`Adminlogin error ${error}`
        })
    }
} 