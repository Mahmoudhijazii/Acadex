const express = require('express');
const {TutorCourse, User, Course} = require('../models');

const getPosts = async (req , res) => {
    try {
        const posts = await TutorCourse.findAll({
            include : [
                {model : User , attributes : ['name']},
                {model : Course , attributes : ['course_name'] }
            ],
        });
        res.status(201).json(posts);
    } catch (error){
        console.error(error);
        res.status(500).json({error : 'Failed to fetch posts.'});
    }
}

const getCourses = async (req , res) => {
    try{
        const courses = await Course.findAll({ attributes : ['id', 'course_name']});
        res.status(201).json(courses);
    } catch (error){
        console.error(error);
        res.status(500).json({ error : 'Failed to fetch courses.'});
    }
}

const postCourse = async (req , res) => {
    try{
        const { userId , courseID , description} = req.body;
        await TutorCourse.create({
            user_id : userId,
            course_id : courseID,
            description,
        });
        res.status(201).json({message : 'Post created successfully. '});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post.' });
    }
}

module.exports = { getPosts, getCourses, postCourse };