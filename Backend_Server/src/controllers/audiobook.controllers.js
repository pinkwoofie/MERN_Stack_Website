import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Audio } from '../models/audio.models.js';
import { Category } from '../models/categry.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken';


const submitAudiobook = asyncHandler(async (req, res) => {
    // Extract and verify token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(`token via request ${token}`)
    if (!token) {
        throw new ApiError(401, "No token provided");
    }
    let decoded;
    try {
        console.log('Token:', token); // Debug: Log the token
        decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded); // Debug: Log the decoded object
    } catch (error) {
        console.error('JWT Verification Error:', error); // Debug: Log the error
        throw new ApiError(401, "Unauthorized");
    }
    

    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        throw new ApiError(400, "All text fields are required");
    }

    const audiofileLocal = req.files['audiofile'] ? req.files['audiofile'][0].path : null;
    const coverimageLocal = req.files['coverimage'] ? req.files['coverimage'][0].path : null;

    if (!audiofileLocal || !coverimageLocal) {
        throw new ApiError(400, "Audio and coverimage fields are required");
    }

    const audiofile = await uploadOnCloudinary(audiofileLocal);
    const coverimage = await uploadOnCloudinary(coverimageLocal);

    if (!audiofile || !coverimage) {
        throw new ApiError(400, "Both files are required");
    }

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
        throw new ApiError(404, "Category not found");
    }

    const newAudiobook = await Audio.create({
        title,
        description,
        audiofile: audiofile.url,
        coverimage: coverimage.url,
        category: categoryDoc._id,
        owner: decoded.userId
    });

    if (!newAudiobook) {
        throw new ApiError(500, "Something went wrong while creating the audiobook");
    }

    return res.status(201).json(new ApiResponse(200, newAudiobook, "Audiobook Registered Successfully"));
});

export { submitAudiobook };
