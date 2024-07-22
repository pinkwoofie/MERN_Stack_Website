import { ApiError } from "./ApiError.js";

const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.log(error.message);
           
                const errorResponse = new ApiError(
                    500,
                    error.message || 'Internal Server Error',
                    [],
                    error.stack
                );
                res.json(errorResponse);
            
}
};
}




export {asyncHandler}