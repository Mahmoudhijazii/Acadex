const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User, TutorCourse, Listing} = require('../models');
const sendVerificationEmail = require('../mailer'); 

const tempUsers = {};

const signup = async (req , res) => {
    const { name , email , password , profile_pic , bio } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (!email.endsWith('@students.aust.edu.lb')){
        return res.status(400).json({ error: 'Invalid email domain. Use @students.aust.edu.lb' });
    }
    const existingUser = await User.findOne({where : {email}});
    if (existingUser){
        return res.status(400).json({ error: 'Email already registered.' });
    } 
    const hashedPass = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    tempUsers[email] = { name, email, hashedPass, profile_pic, bio, verificationCode };
    
    try {
        await sendVerificationEmail(email, verificationCode);
        res.status(200).json({ message: 'Verification code sent to your email.' });
    } catch (error) {
        console.error('Error sending verification email:', error);
        res.status(500).json({ error: 'Failed to send verification email.' });
    }
};

const verifyUser = async (req, res) => {
    const { verificationCode } = req.body; // Only get verification code from user
    console.log("Received Verification Code:", verificationCode);
    console.log("Current Temp Users:", tempUsers);

    // Find the user in tempUsers by matching verificationCode
    const tempUserEntry = Object.entries(tempUsers).find(([email, user]) => user.verificationCode === parseInt(verificationCode, 10));

    if (!tempUserEntry) {
        return res.status(400).json({ error: 'Invalid verification code or user not found.' });
    }

    const [email, tempUser] = tempUserEntry;
    console.log("Matching User Found:", tempUser);

    try {
        await User.create({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.hashedPass,
            profile_pic: tempUser.profile_pic,
            bio: tempUser.bio,
            role: 'user',
            verification_code: tempUser.verificationCode,
            is_verified: true,
        });

        delete tempUsers[email]; // Remove the temp user after successful registration
        res.status(201).json({ message: 'User verified and registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

const login = async (req , res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ where : {email}});
        if (!user){
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        if (!user.is_verified){
            return res.status(403).json({ error: 'User not verified. Please complete signup.' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        const token = jwt.sign({ id : user.id , role : user.role} , 'mostafa' , {expiresIn : '3h'});
        res.status(200).json({ message: 'Login successful.', token, role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log in.' });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['name', 'email', 'profile_picture', 'bio'],
            include: [
                { model: TutorCourse, attributes: ['course_name', 'description'],  as: 'tutor_courses' },
                { model: Listing, attributes: ['title', 'price'], as: 'listings' }
            ]
        });

        if (!user) return res.status(404).json({ error: 'User not found' });
        
        // Return profile picture or set to null if not defined
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
};


const updateProfile = async (req, res) => {
    const { name, bio } = req.body;
    try {
        await User.update({ name, bio }, { where: { id: req.user.id } });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

const updateProfilePicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const { profile_picture } = req.body;

        await User.update(
            { profile_picture : profile_picture },
            { where: { id: userId } }
        );

        res.status(200).json({ message: "Profile picture updated", profile_picture });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating profile picture" });
    }
};

module.exports = {signup, verifyUser, login, getProfile, updateProfile, updateProfilePicture};