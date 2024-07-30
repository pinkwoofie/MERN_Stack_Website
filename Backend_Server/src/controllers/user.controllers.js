import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { resolve } from "path";

// const generateAcessandRefreshToken = async (userID) => {
//     try{ 
//      // console.log(`checking in generatefunction ${userID}`)
//      const user = await User.findById(userID);
//      const accessToken = await user.generateAccessToken();
//      // console.log(`accesstoken in generate ${accessToken}`);
//      const refreshToken = await user.generateRefreshToken();
 
//      // console.log(`refreshtoken in generate ${refreshToken}`);
 
//      user.refreshToken = refreshToken;
//      await user.save({ validateBeforeSave : false});
//      return { accessToken, refreshToken };
//     }catch (error){
//      throw new ApiError(500, "something went wrong while generating tokens");
//     }
 
//  }



const registerUser = asyncHandler( async(req, res) => {


    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res




    const {username, fullname, email, password} = req.body;
    console.log(`email: ${email}`);

    if([fullname, email, username, password].some( (field) => field?.trim() === ""))
    {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({$or: [{username}, {email}]});
    console.log(existedUser);
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



const loginUser = asyncHandler(async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    //console.log(req.body);

    if (!usernameOrEmail || !password) {
        throw new ApiError(400, "Username or Email and Password are required");
    }

    // Find user by username or email
    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    //console.log(user);

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    //console.log(`matched ${isMatch}`)
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate a token (adjust payload and secret as needed)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expiry
    });

    //console.log(`token ${token}`);


    return res.status(200).json(
        new ApiResponse(200, { token, user: { username: user.username, email: user.email } }, "Login successful")
    );
});

export {
    registerUser,
    loginUser

};