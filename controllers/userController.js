const User = require('../models/User');

// Get all professors
exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await User.find({ role: 'professor' }).select('-password');
    res.json(professors);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(403).json({ msg: 'Access denied: Admins only' });
    // }

    const users = await User.find().select('-password'); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
