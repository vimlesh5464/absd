// routes/user.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const userControllers = require("../controllers/user.js")


router.route("/signup")
.get(userControllers.signupGet)
.post(wrapAsync(userControllers.signupPost));

router.route("/login")
.get(userControllers.loginGET)
.post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userControllers.loginPOST
);

router.get("/logout", userControllers.logout)

module.exports = router;
