const User = require("../models/user");

module.exports.signupGet = (req, res) => {
  console.log("GET /signup route hit");
  res.render("users/signup");
}

module.exports.signupPost = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ email, username });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, (err)=>{
    if(err){
      return next(err);
    }
    req.flash("success", "Welcome to Wanderlust!");
  res.redirect("/listings");
  })
}

module.exports.loginGET = (req, res) => {
  res.render("users/login");
}

module.exports.loginPOST = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  })
}