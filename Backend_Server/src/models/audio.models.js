import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const reviewSchema = new Schema({
    user: 
    {   type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rating: 
    {   type: Number,
        min: 1,
        max: 5
    },
    comment: 
    {   type: String, 
        required: true 
    },
}, { timestamps: true });


const audideoSchema = new Schema(
{
    audiofile: {
        type: String,
        required: true
    },
    coverimage: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    listenCount: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
    },
    reviews: [reviewSchema],





}, {timestamps: true})

audideoSchema.plugin(mongooseAggregatePaginate);

export const Audio = mongoose.model("Audio", audideoSchema)