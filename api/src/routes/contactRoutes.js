const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/authMiddleware');



// Lấy danh sách liên hệ
router.get("/", verifyToken,contactController.getAllContacts);

// Thêm liên hệ mới (bỏ kiểm tra dữ liệu)
router.post("/", verifyToken,contactController.createContact);

// Lấy chi tiết liên hệ
router.get("/:id", verifyToken,contactController.getContactById);

// Cập nhật liên hệ
router.put("/:id", verifyToken,contactController.updateContact);

// Xóa liên hệ
router.delete("/:id", verifyToken,contactController.deleteContact);

module.exports = router;