const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError= require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
   .route("/")
   .get( wrapAsync(listingController.index))
    .post( 
        isLoggedIn, 
        // validateListing ,
        upload.single("image"),
        validateListing,
        wrapAsync(listingController.createListing));

    
//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router
   .route("/:id")
   .get( wrapAsync(listingController.showListing))
   .put(
    isLoggedIn,
    isOwner,
     upload.single("image"),
    validateListing, wrapAsync(listingController.updateListing)
)
    .delete(
    isLoggedIn,
    isOwner, 
     wrapAsync(listingController.destroyListing)
    );

//Edit Route
router.get("/:id/edit",
     isLoggedIn,
     isOwner,
     wrapAsync(listingController.renderEditForm)
    );

module.exports = router;