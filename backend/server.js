const express = require('express');
const { sequelize, User, TutorCourse, Dorm, DormImage, Listing, ListingImage, ChatMessage } = require('./models');
const userRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/courses', coursesRoutes );

// Start server
const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
