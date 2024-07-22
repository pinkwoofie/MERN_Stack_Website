import mongoose, {Schema} from "mongoose";

const categorySchema = Schema(
{
    name: {
        type: String,
        required: true,
        unique: true
    },
    coverimage:{
        type: String,
        required: true
    }


}, {timestamps: true});

export const Category = mongoose.model("Category", categorySchema)

