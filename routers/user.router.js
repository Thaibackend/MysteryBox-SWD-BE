const express = require("express");
const UserController = require("../controllers/user.controller");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

router.patch(
  "/update-profile-user/:id",
  verify.verifyToken,
  UserController.updateProfileUser
);

module.exports = router;
