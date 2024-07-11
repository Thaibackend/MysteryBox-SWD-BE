const express = require("express");
const ThemeController = require("../controllers/theme.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/create-theme", ThemeController.createTheme);

router.get("/get-themes", ThemeController.getThemes);

router.patch("/delete-theme/:id", ThemeController.deleteTheme);

router.put("/update-theme/:id", ThemeController.updateTheme);
module.exports = router;
