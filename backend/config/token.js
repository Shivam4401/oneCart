import jwt from "jsonwebtoken";

export const genToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("token_error", error.message);
    }
}


export const genToken1 = async (email) => {
    try {
        const token = await jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("token_error", error.message);
    }
}