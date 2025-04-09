const express = require('express');
const router = express.Router();
const { deleteCourse } = require('../controllers/adminController');
const { authenticate } = require('../middleware/auth');
const { User } = require('../models');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

// DELETE a course by id (admin only)
router.delete('/courses/:id', authenticate, isAdmin, deleteCourse);

module.exports = router;
