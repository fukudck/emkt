const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { verifyToken } = require('../middleware/authMiddleware');

// Lấy danh sách người dùng
router.get('/getUsers', verifyToken, userController.getUsers);

module.exports = router;