const express = require ('express');
const router = express.Router();
const { getPosts , getCourses, postCourse} = require ('../controllers/coursesController');
const { authenticate } = require('../middleware/auth');

//fetch all courses posts
router.get('/posts', getPosts);

//create a post
router.post('/posts', authenticate, postCourse);

module.exports = router; 