const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const { protect, authorize } = require("../config/auth");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/find/:id", getUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);
router.get("/data/:id", protect, authorize("Admin"), getUserById);

module.exports = router;
