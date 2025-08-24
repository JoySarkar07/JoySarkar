const reviewServices = require("../services/reviewServices");

const createReview = async (req, res)=>{
    try{
        const response = await reviewServices.createReview(req.body);
        res.status(201).send({message:"Review created successfully.", data:response});
    }catch(e){
        res.status(500).send({message:"Review creation failled.", data:e.message});
    }
}

const getAllReviews = async (req, res)=>{
    try{
        const response = await reviewServices.getAllReviews();
        res.status(200).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const getReviewById = async (req, res)=>{
    try{
        const response = await reviewServices.getReviewById(req.params.reviewId);
        res.status(201).send({message:"Ok", data:response});
    }catch(e){
        res.status(404).send({message:"Not found", data:e.message});
    }
}

const deleteReview = async (req, res)=>{
    try{
        await reviewServices.deleteReview(req.params.reviewId);
        res.status(204).send({message:"No Content"});
    }catch(e){
        res.status(400).send({message:"Bad Request"});
    }
}

const updateReview = async (req, res)=>{
    try{
        const response = await reviewServices.updateReview(req.params.reviewId, req.body);
        res.status(200).send({message:"Review updated successfully.", data:response});
    }catch(e){
        res.status(400).send({message:"Review updation failled.", data:e.message});
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview,
    updateReview
}