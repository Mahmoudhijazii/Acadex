const express = require('express');
require('dotenv').config();
const path = require('path');
const { sequelize, User, TutorCourse, Dorm, DormImage, Listing, ListingImage, ChatMessage } = require('./models');
const userRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const listingRoutes = require('./routes/listings');
const adminRoutes = require('./routes/admins');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'https://student-x.com', // Replace with your actual frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to include credentials
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/users', userRoutes);
app.use('/api/courses', coursesRoutes );
app.use('/api/listings', listingRoutes );
app.use('/api/admin', adminRoutes);
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
