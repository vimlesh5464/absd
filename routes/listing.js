const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");

 const listingControllers = require("../controllers/listing.js");
 const multer  = require('multer');
 const {storage} = require("../cloudconfig.js");
const upload = multer({ storage});


router.route("/")
.get(wrapAsync(listingControllers.index))
 .post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingControllers.createIndex));

 // New Route
 router.get("/new", isLoggedIn, listingControllers.renderNewForm);
 
router.route("/:id")
.get(wrapAsync(listingControllers.showIndex))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingControllers.updateIndex))
.delete(isLoggedIn,isOwner, wrapAsync(listingControllers.deleteIndex));






// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingControllers.editIndex));


module.exports = router;