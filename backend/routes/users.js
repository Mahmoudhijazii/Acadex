const express = require('express');
const { signup, verifyUser, login, getProfile, updateProfile, updateProfilePicture, getAllUsers, deleteCourse, deleteListing } = require('../controllers/usersController');
const multer = require('multer');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// // Multer storage configuration for local uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const multerUpload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/verify', verifyUser);
router.post('/login', login);

router.delete('/deleteCourse/:id', authenticate, deleteCourse);
router.delete('/deleteListing/:id', authenticate, deleteListing);

router.get('/all', getAllUsers);

router.get('/profile', authenticate, getProfile); // Get user profile
router.put('/profile/update', authenticate, updateProfile); // Update name & bio
router.put('/profile/picture', authenticate, updateProfilePicture);

module.exports = router;
