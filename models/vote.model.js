// models/vote.model.js
const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Vote', VoteSchema);