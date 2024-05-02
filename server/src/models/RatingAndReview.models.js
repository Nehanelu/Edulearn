const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
            trim: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            index: true,
        }
    }
);

const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema);
module.exports = RatingAndReview;