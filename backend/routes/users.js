const express = require('express');
const { signup, verifyUser, login } = require('../controllers/usersController');
const router = express.Router();

router.post('/signup', signup);
router.post('/verify', verifyUser);
router.post('/login', login);

module.exports = router;