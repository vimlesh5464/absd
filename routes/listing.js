const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");

 const listingControllers = require("../controllers/listing.js");
 const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.route("/")
.get(wrapAsync(listingControllers.index))
//  .post(isLoggedIn, validateListing, wrapAsync(listingControllers.createIndex));
.post(upload.single('listing[image]'),(req, res)=>{
  res.send(req.file);
})

 // New Route
 router.get("/new", isLoggedIn, listingControllers.renderNewForm);
 
router.route("/:id")
.get(wrapAsync(listingControllers.showIndex))
.put(isLoggedIn, isOwner, validateListing, wrapAsync(listingControllers.updateIndex))
.delete(isLoggedIn,isOwner, wrapAsync(listingControllers.deleteIndex));






// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingControllers.editIndex));


module.exports = router;