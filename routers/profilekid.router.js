const express = require("express");
const ProfileKidController = require("../controllers/profiekid.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.post(
  "/create-profile",
  verify.verifyToken,
  ProfileKidController.createProfile
);

router.get(
  "/get-profiles",
  verify.verifyToken,
  ProfileKidController.getProfileByUserId
);

router.patch(
  "/update-profile/:id",
  verify.verifyToken,
  ProfileKidController.updateProfile
);

router.patch(
  "/ban-profile/:id",
  verify.verifyToken,
  ProfileKidController.bannedProfile
);

module.exports = router;
