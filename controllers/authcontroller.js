// controllers/authController.js
const Student = require('../models/student.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginStudent = async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ 
      token, 
      student: { 
        id: student.id, 
        rollNumber: student.rollNumber, 
        name: student.name, 
        house: student.house,
        isCandidate: student.isCandidate 
      } 
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.registerStudent = async (req, res) => {
  const { rollNumber, name, password, isCandidate, house } = req.body;

  try {
    let student = await Student.findOne({ rollNumber });
    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    student = new Student({ rollNumber, name, password, isCandidate, house });

    await student.save();

    const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ 
      token, 
      student: { 
        id: student.id, 
        rollNumber: student.rollNumber, 
        name: student.name, 
        house: student.house, 
        isCandidate: student.isCandidate 
      } 
    });
  } catch (err) {
    res.status500().json({ msg: 'Server error' });
  }
};