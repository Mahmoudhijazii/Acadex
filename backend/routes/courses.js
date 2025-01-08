const express = require ('express');
const router = express.Router();
const { getPosts , getCourses, postCourse} = require ('../controllers/coursesController');
const { authenticate } = require('../middleware/auth');

//fetch all courses posts
router.get('/posts',authenticate, getPosts);

//fetch all courses
router.get('/courses', authenticate,  getCourses);

//create a post
router.post('/posts', authenticate, postCourse);

module.exports = router; 