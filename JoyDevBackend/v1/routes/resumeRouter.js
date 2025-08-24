const express = require("express");
const multer = require("multer");
const path = require("path");
const resumeController = require("../../controllers/resumeController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

// ===== Multer Config =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, "mycv" + path.extname(file.originalname)); 
    // always save as mycv.pdf, mycv.docx etc.
  },
});

const upload = multer({ storage });

router.post("/upload-cv", authMiddleware, upload.single("cv"), resumeController.uploadCV);

router.get("/download-cv", resumeController.downloadCV);


module.exports = router;