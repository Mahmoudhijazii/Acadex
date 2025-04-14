const express = require ('express');
const router = express.Router();
const { getListings, postItem, getListingById } = require ('../controllers/listingsController');
const { authenticate } = require('../middleware/auth');

router.get("/listings", getListings);
router.post("/listings", authenticate, postItem);
router.get("/product/:id",authenticate,  getListingById);


module.exports = router; 