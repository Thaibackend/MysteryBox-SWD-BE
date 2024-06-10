const express = require("express");
const router = express.Router();
const passport = require("passport");
const OauthController = require("../controllers/oauth.controller");
require("dotenv").config();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  async (req, res, next) => {
    passport.authenticate("google", (err, profile) => {
      req.user = profile;
      next();
    })(req, res, next);
  },
  (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/${req.user?.id}`);
  }
);

// /${req.user?.id}

router.post("/login-oauth-success", OauthController.loginSuccess);

module.exports = router;
