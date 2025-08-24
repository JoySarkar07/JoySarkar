const express = require("express");
const reviewController = require("../../controllers/reviewController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/", reviewController.createReview);

router.get("/", reviewController.getAllReviews);

router.get("/:reviewId", reviewController.getReviewById);

router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

router.patch("/:reviewId", reviewController.updateReview);

module.exports = router;