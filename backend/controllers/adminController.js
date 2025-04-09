const express = require('express');
const { TutorCourse } = require('../models');

const deleteCourse = async (req , res ) => {
    const {id} = req.params;
    try{
        const course =  await TutorCourse.findByPk(id);
        if (!course){
            return res.status(404).json({ error: 'Course not found.' });
        }
        await course.destroy();
        res.json({ message: 'Course deleted successfully.' });
    } catch (error) {
        console.error('Error deleting tutor course:', error.message);
        res.status(500).json({ error: 'Failed to delete course.' });
    }
};

module.exports =  {deleteCourse} ;