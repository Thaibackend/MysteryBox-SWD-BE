const express = require("express");
const MysteryBoxController = require("../controllers/mysterybox.controller");
const router = express.Router();

router.post("/create-mysterybox", MysteryBoxController.createMysteryBox); //api
router.get("/get-mysterybox", MysteryBoxController.getMysteryBox);

module.exports = router;
