const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

const sessionOption = {
  secret:"mysupersecretcode",
  resave: false,
  saveUninitialized:true,
  cookie: {
    expires: Date.now() + 3 * 24 *  60 * 60 * 1000,
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}
app.use(session(sessionOption));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
})
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query; // Also fixed spelling from "anonymos"
  req.session.name = name;
 if(name === "anonymous"){
  req.flash("error", "User not registered ");
 }else{
  req.flash("success", "User registered successfully");
 }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  
  res.render("page.ejs", {
    name: req.session.name
  });
});
// app.get("/reqcount", (req, res) => {
//   if(req.session.count){
//     req.session.count++;
//   }
//   else{
//     req.session.count = 1;
//   }
//   res.send(`you sent a request ${req.session.count} times`);
// })

// app.get("/", (req, res) => {
//   res.send("test Successful");
// })

app.listen(3000, (req, res)=>{
  console.log(`port success ${3000}`)
})