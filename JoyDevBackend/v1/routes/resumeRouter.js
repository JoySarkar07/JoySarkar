const express = require("express");
const multer = require("multer");
const resumeController = require("../../controllers/resumeController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

const upload = multer();

router.post("/upload-cv", authMiddleware, upload.single("cv"), resumeController.uploadCV);

router.get("/download-cv", resumeController.downloadCV);


module.exports = router;