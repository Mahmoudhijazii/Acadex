const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require('../models');
const sendVerificationEmail = require('./mailer'); 

const temUsers = {};

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

const verifyUser = async (req , res) => {
    const {email, verificationCode} = req.body;
    const tempUser = tempUser[email];
    if(!tempUser){
        return res.status(400).json({ error: 'User not found or already verified.' });
    }
    if (tempUser.verificationCode !== parseInt(verificationCode, 10)){
        return res.status(400).json({ error: 'Invalid verification code.' });
    }
    try {
        await User.create({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.hashedPass,
            profile_pic: tempUser.profile_pic,
            bio: tempUser.bio,
            role: 'user', 
            verification_code : temUsers.verificationCode,
            is_verified: true,
        });
        delete tempUsers[email];
        res.status(201).json({ message: 'User verified and registered successfully.' });
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

const login = async (req , res) => {
    const [ email, password ] = req.body;
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
        const token = jwt.sign({ id : user.id , role : user.role} , 'mostafa' , {expiresIn : '1h'});
        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log in.' });
    }
};