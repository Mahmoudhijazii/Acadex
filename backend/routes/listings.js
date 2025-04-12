const express = require ('express');
const router = express.Router();
const { getListings, postItem } = require ('../controllers/listingsController');
const { authenticate } = require('../middleware/auth');

router.get("/listings", getListings);
router.post("/listings", authenticate, postItem);

module.exports = router; 