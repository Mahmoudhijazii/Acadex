const express = require('express');
const {TutorCourse, User} = require('../models');

const getPosts = async (req , res) => {
    try {
        const posts = await TutorCourse.findAll({
            include : [{ model : User, attributes : ['name'] }],
        });        
        res.status(201).json(posts);
    } catch (error){
        console.error(error);
        res.status(500).json({error : 'Failed to fetch posts.'});
    }
}

const postCourse = async (req, res) => {
    try {
        const { courseName, description } = req.body;
        
        if (!courseName || !description) {
            return res.status(400).json({ error: 'Course name and description are required.' });
        }

        const newCourse = await TutorCourse.create({
            user_id: req.user.id,
            course_name: courseName,
            description,
          });
      
          const courseWithUser = await TutorCourse.findOne({
            where: { id: newCourse.id },
            include: {
              model: User,
              attributes: ['id', 'name'], 
            },
          });
      
          res.status(201).json(courseWithUser); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post.' });
    }
};

module.exports = { getPosts, postCourse };