const Review = require("../models/Review");

const createReview = async (reviewData)=>{
    return await Review.create(reviewData);
}

const getAllReviews = async ()=>{
    return await Review.find(); 
}

const getReviewById = async (reviewId)=>{
    return await Review.findById(reviewId);
}

const deleteReview = async (reviewId)=>{
    return await Review.findByIdAndDelete(reviewId);
}

const updateReview = async (reviewId, updatedData)=>{
    return await Review.findByIdAndUpdate(
        reviewId,
        { $set: updatedData},
        { new: true, runValidators: true}
    );
    
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
}