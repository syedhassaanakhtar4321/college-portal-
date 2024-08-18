// routes/vote.route.js
const express = require('express');
const router = express.Router();
const { castVote } = require('../controllers/votecontroller.js');
const authMiddleware = require('../middlewares/authMiddlewares.js');

// @route POST /api/vote/cast
// @desc Cast a vote for a candidate
// @access Private
router.post('/cast', authMiddleware, castVote);

module.exports = router;