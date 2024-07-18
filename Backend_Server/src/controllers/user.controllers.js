import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { resolve } from "path";
import fs from "fs";

const registerUser = asyncHandler( async(req, res) => {

    const {username, fullname, email, password} = req.body;
    console.log(`email: ${email}`);

    if([fullname, email, username, password].some( (field) => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({$or: [{username}, {email}]});
    if(existedUser)
    {
        throw new ApiError(409, "User with email or username is already exist ");
    }

    const avatarPath = req.file ? resolve("public/temp", req.file.filename) : null;
    console.log(`profile photo   ${avatarPath}`)
    if(!avatarPath)
    {
        throw new ApiError(400, "Avatar file is required");
    }
    console.log(`local file uploading is completed`)
    const avatar = await uploadOnCloudinary(avatarPath);
    //console.log(avatar);
    if(!avatar)
    {
        throw new ApiError(400, "failed to upload avatar on cloudinary");
    }

    fs.unlinkSync(avatarPath);

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "something went wrong while creation of user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfullly")
    )

})

export {registerUser};