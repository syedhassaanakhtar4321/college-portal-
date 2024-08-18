// controllers/voteController.js
const Vote = require('../models/vote.model');
const Student = require('../models/student.model');

exports.castVote = async (req, res) => {
  const { voterId, candidateId } = req.body;

  try {
    const voter = await Student.findById(voterId);
    if (!voter || voter.hasVoted) {
      return res.status(400).json({ msg: 'Vote already cast or invalid voter' });
    }

    const candidate = await Student.findById(candidateId);
    if (!candidate || candidate.house !== voter.house || !candidate.isCandidate) {
      return res.status(400).json({ msg: 'Invalid candidate or house mismatch' });
    }

    const newVote = new Vote({
      voter: voterId,
      candidate: candidateId,
      house: voter.house,
    });
    await newVote.save();

    voter.hasVoted = true;
    await voter.save();

    res.json({ msg: 'Vote successfully cast' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};