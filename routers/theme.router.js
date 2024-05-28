const express = require("express");
const ThemeController = require("../controllers/theme.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/create-theme",
  verify.verifyToken,
  verify.isStaff,
  ThemeController.createTheme
);

router.get("/get-themes", ThemeController.getThemes);

module.exports = router;
