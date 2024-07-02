const express = require("express");
const MysteryBoxController = require("../controllers/mysterybox.controller");
const router = express.Router();

router.post("/create-mysterybox", MysteryBoxController.createMysteryBox); //api
router.get("/get-mysterybox", MysteryBoxController.getMysteryBox);
router.get(
  "/get-mysterybox-condition",
  MysteryBoxController.getMysteryBoxCondition
);

module.exports = router;
