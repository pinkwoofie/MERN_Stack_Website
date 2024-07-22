// src/controllers/authController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = asyncHandler(async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    console.log(req.body);

    if (!usernameOrEmail || !password) {
        throw new ApiError(400, "Username or Email and Password are required");
    }

    // Find user by username or email
    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate a token (adjust payload and secret as needed)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expiry
    });

    return res.status(200).json(
        new ApiResponse(200, { token, user: { username: user.username, email: user.email } }, "Login successful")
    );
});

export { loginUser };
