
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"

export const verifyJWT = asyncHandler( async (req, _, next) => {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(`Token ${token}`);

        if(!token)
        {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodeToken?._id).select("-password -refresToken");

        if(!user)
        {
            throw new ApiError(401, "Invalid Access token");
        }

        req.user = user;
        next();

    }catch(error){
        throw new ApiError(402, error?.message || "Invalid Access Token")
    }
})