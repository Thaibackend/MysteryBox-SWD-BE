const express = require("express");
const MysteryBoxController = require("../controllers/mysterybox.controller");
const router = express.Router();

router.post("/create-mysterybox", MysteryBoxController.createMysteryBox);
router.get("/get-mysterybox", MysteryBoxController.getMysteryBox);
router.get("/get-mysterybox/:id", MysteryBoxController.getMysteryBoxById);
router.post(
  "/get-mysterybox-condition",
  MysteryBoxController.getMysteryBoxCondition
);

router.put("/update-box", MysteryBoxController.updateBox);

module.exports = router;
