const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController.js");
const asyncHandler = require("../middlewares/asyncHandler.js");

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
// Validate Token route
router.get("/validateToken", authController.authenticateToken, (req, res) => {
  // If the token is valid, just send a success response
  let user = req.user;
  console.log(user);
  res.status(200).send(user);
});
// Protected route to get all users (only accessible by admin)
router.get(
  "/users",
  authController.authenticateToken,
  authController.checkAdmin,
  asyncHandler(userController.getAllUsers)
);

module.exports = router;
