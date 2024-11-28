const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { verifyToken } = require('../middleware/authMiddleware');

// Lấy danh sách người dùng
router.get('/getUsers', verifyToken, userController.getUsers);

// Thêm người dùng mới
router.post('/add',verifyToken, userController.addUser);

// Cập nhật thông tin người dùng
router.put('/update/:id', verifyToken, userController.updateUser);

// Xóa người dùng
router.delete('/delete/:id', verifyToken, userController.deleteUser);
module.exports = router;