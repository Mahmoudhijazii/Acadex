const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.MAILTRAP_HOST,
    // port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

const sendVerificationEmail = async (email, code) => {
    try {
        await transporter.sendMail({
            from: '"Student-X Verification" <no-reply@aust.edu.lb>', 
            to: email, 
            subject: 'Your Verification Code', 
            text: `Your verification code is: ${code}`,
            html: `<p>Your verification code is: <strong>${code}</strong></p>`, 
        });
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendVerificationEmail;
