const express = require("express");
const skillController = require("../../controllers/skillController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");


router.post("/", authMiddleware, skillController.createSkill);

router.get("/", skillController.getAllSkills);

router.get("/:skillId", skillController.getSkillById);

router.delete("/:skillId", authMiddleware, skillController.deleteSkill);

router.patch("/:skillId", authMiddleware, skillController.updateSkill);

module.exports = router;