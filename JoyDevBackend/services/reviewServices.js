const review = require("../database/reviewDB");

const createReview = async (reviewData)=>{
    return await review.createReview(reviewData);
}

const getAllReviews = async ()=>{
    return await review.getAllReviews();
}

const getReviewById = async (reviewId)=>{
    return await review.getReviewById(reviewId);
}

const deleteReview = async (reviewId)=>{
    return await review.deleteReview(reviewId);
}

const updateReview = async (reviewId, updatedData)=>{
    return await review.updateReview(reviewId, updatedData);     
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview,
    updateReview
}