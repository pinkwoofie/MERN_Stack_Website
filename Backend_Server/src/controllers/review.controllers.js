// import jwt from 'jsonwebtoken';
// import { asyncHandler } from '../utils/asyncHandler.js';
// import { ApiError } from '../utils/ApiError.js';
// import { Audio } from '../models/audio.models.js';
// import { ApiResponse } from '../utils/ApiResponse.js';

// const addReview = asyncHandler(async (req, res) => {
//     const { audiobookId } = req.params;
//     const { rating, comment } = req.body;

//     if (!rating || !comment) {
//         throw new ApiError(400, "Rating and comment are required");
//     }

//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         throw new ApiError(401, "Not authorized, no token");
//     }

//     const token = authHeader.split(' ')[1];
//     let userId;

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         userId = decoded.userId;
//     } catch (error) {
//         throw new ApiError(401, "Not authorized, token failed");
//     }

//     const review = {
//         user: userId,
//         rating,
//         comment,
//     };

//     try {
//         const audiobook = await Audio.findById(audiobookId)
//         .populate('reviews.user', 'avatar fullname');

//         if (!audiobook) {
//             throw new ApiError(404, "Audiobook not found");
//         }

//         audiobook.reviews.push(review);
//         await audiobook.save();

//         res.status(201).json(new ApiResponse(200, audiobook, "Review added successfully"));
//     } catch (error) {
//         throw new ApiError(500, "Error adding review");
//     }
// });

// export { addReview };


import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Audio } from '../models/audio.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const addReview = asyncHandler(async (req, res) => {
    const { audiobookId } = req.params;
    const { rating, comment } = req.body;

    console.log(`${audiobookId},   ${rating},    ${comment}`)

    if (!rating || !comment) {
        throw new ApiError(400, "Rating and comment are required");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, "Not authorized, no token");
    }

    const token = authHeader.split(' ')[1];
    let userId;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    } catch (error) {
        throw new ApiError(401, "Not authorized, token failed");
    }

    const review = {
        user: userId,
        rating,
        comment,
    };

    try {
        const audiobook = await Audio.findById(audiobookId)
          .populate('owner', 'avatar fullname')
          .populate('reviews.user', 'avatar fullname');

        if (!audiobook) {
            throw new ApiError(404, "Audiobook not found");
        }

        audiobook.reviews.push(review);
        await audiobook.save();

        const updatedAudiobook = await Audio.findById(audiobookId)
          .populate('owner', 'avatar fullname')
          .populate('reviews.user', 'avatar fullname');

        console.log("Updated Audiobook: ", updatedAudiobook); // Log the updated audiobook

        res.status(201).json(new ApiResponse(201, updatedAudiobook, "Review added successfully"));
    } catch (error) {
        throw new ApiError(500, "Error adding review");
    }
});

export { addReview };