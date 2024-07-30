import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Audio } from '../models/audio.models.js';
import { User } from '../models/user.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAudiobooksByCategory = asyncHandler(async (req, res) => {

    // const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    // console.log(`incoming ${incomingRefreshToken}`);
    // if (!incomingRefreshToken) {
    //     throw new ApiError(401, "unauthorized request")
    // }

    
    // const decodedToken = jwt.verify(
    //     incomingRefreshToken,
    //     process.env.REFRESH_TOKEN_SECRET
    // )
    
    // const user = await User.findById(decodedToken?._id)
    
    // if (!user) {
    //     throw new ApiError(401, "Invalid refresh token")
    // }
    
    // if (incomingRefreshToken !== user?.refreshToken) {
    //     throw new ApiError(401, "Refresh token is expired or used");   
    // }

    const categoryId = req.query.category;

    if (!categoryId) {
        throw new ApiError(400, "Category ID is required");
    }

    try {
        // Populate owner with fullname and avatar
        const audiobooks = await Audio.find({ category: categoryId })
                                      .populate('owner', 'fullname avatar');
        res.status(200).json(new ApiResponse(200, audiobooks, "Audiobooks fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Error fetching audiobooks");
    }
});


export { getAudiobooksByCategory };
