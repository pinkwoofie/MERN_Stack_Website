import { Category } from "../models/categry.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

export { getCategories };

