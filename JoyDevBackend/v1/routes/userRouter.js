const express = require("express");
const userController = require("../../controllers/userController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, userController.createUser);

router.post("/login", userController.userLogin);

router.get("/", authMiddleware, userController.getAllUsers);

router.get("/:email", authMiddleware, userController.getUserByEmail);

router.delete("/:userId", authMiddleware, userController.deleteUser);

router.patch("/:userId", authMiddleware, userController.updateUser);

module.exports = router;