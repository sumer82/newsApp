const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const newsController = require("../controllers/newsController");

router.get("/", newsController.getAllNews);
router.post(
  "/postNews",
  authController.authenticateToken,
  newsController.createNews
);

module.exports = router;
