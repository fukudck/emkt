const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { verifyToken } = require('../middleware/authMiddleware');
// Đăng ký người dùng
router.post('/register', authController.register);

// Đăng nhập người dùng
router.post('/login', authController.login);


//For testing, Remove later
router.get('/profile', verifyToken, (req, res) => {
    // Bạn có thể sử dụng thông tin người dùng đã giải mã từ token
    const user = req.user;
    res.status(200).json({ message: 'Thông tin người dùng', user });
  });
//For testing, Remove later
module.exports = router;