// routes/auth.route.js
const express = require('express');
const router = express.Router();
const { loginStudent, registerStudent } = require('../controllers/authcontroller.js');

// @route POST /api/auth/login
// @desc Authenticate student and get token
// @access Public
router.post('/login', loginStudent);

// @route POST /api/auth/register
// @desc Register a student or candidate
// @access Public
router.post('/register', registerStudent);

module.exports = router;