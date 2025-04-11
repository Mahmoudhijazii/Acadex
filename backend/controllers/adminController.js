const express = require('express');
const { TutorCourse, Listing, Dorm } = require('../models');

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

const deleteListing = async (req , res) => {
    const {id} = req.params;
    try{
        const item = await Listing.findByPk(id);
        if (!item){
            return res.status(404).json({ error: 'Item not found.' });
        } 
        await item.destroy();
        res.json({ message: 'Item deleted successfully.' });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({ error: 'Failed to delete item.' });
    }
}

const deleteDorm = async (req , res) => {
    const{id} = req.params;
    try{
        const dorm = await Dorm.findByPk(id);
        if (!dorm){
            return res.status(404).json({ error: 'Dorm not found.' });
        } 
        await dorm.destroy();
        res.json({ message: 'Item deleted successfully.' });
    }catch{
        console.error('Error deleting dorm:', error.message);
        res.status(500).json({ error: 'Failed to delete dorm.' });
    }
}

module.exports =  {deleteCourse, deleteListing, deleteDorm} ;