const express = require("express");
const experienceController = require("../../controllers/experienceController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");


router.post("/", authMiddleware, experienceController.createExperience);

router.get("/", experienceController.getAllExperiences);

router.get("/:experienceId", experienceController.getExperienceById);

router.delete("/:experienceId", authMiddleware, experienceController.deleteExperience);

router.patch("/:experienceId", authMiddleware, experienceController.updateExperience);

module.exports = router;