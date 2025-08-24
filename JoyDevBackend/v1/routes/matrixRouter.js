const express = require("express");
const matrixController = require("../../controllers/matrixController");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

router.post("/", authMiddleware, matrixController.createMatrix);

router.get("/", matrixController.getAllMatrixs);

router.get("/:matrixId", matrixController.getMatrixById);

router.delete("/:matrixId", authMiddleware, matrixController.deleteMatrix);

router.patch("/:matrixId", authMiddleware, matrixController.updateMatrix);

module.exports = router;