import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Audio } from '../models/audio.models.js';
import { Category } from '../models/categry.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const getAudiobooksByCategory = asyncHandler(async (req, res) => {
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
