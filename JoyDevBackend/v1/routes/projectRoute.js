const express = require("express");
const projectController = require("../../controllers/projectController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/", authMiddleware, projectController.createProject);

router.get("/", projectController.getAllProjects);

router.get("/:projectId", projectController.getProjectById);

router.delete("/:projectId", authMiddleware, projectController.deleteProject);

router.patch("/:projectId", authMiddleware, projectController.updateProject);

module.exports = router;