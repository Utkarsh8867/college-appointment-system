const express = require('express');
const router = express.Router();
const { getAllProfessors, getAllStudents,getAllUsers } = require('../controllers/userController');
// const { verifyToken } = require('../middleware/auth'); // assuming you're using JWT
// const {  isAdmin } = require('../middleware/auth.js');
router.get('/professors', getAllProfessors);
router.get('/students', getAllStudents);
router.get('/allusers', getAllUsers);

module.exports = router;
