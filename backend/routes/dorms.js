const express = require('express');
const router = express.Router();
const { getDorms, getDormById } = require('../controllers/dormsController');

router.get('/posts', getDorms);
router.get('/:id', getDormById);


module.exports = router;