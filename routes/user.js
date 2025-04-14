// routes/user.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

// Signup - GET
router.get("/signup", (req, res) => {
  console.log("GET /signup route hit");
  res.render("users/signup");
});

// Signup - POST
router.post("/signup", wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);
  req.flash("success", "Welcome to Wanderlust!");
  res.redirect("/listings");
}));

// Login - GET
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Login - POST
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect("/listings");
  }
);

router.get("/logout", (req, res, next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("sucess", "you are logged out");
    res.redirect("/listings");
  })
})

module.exports = router;
