const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { verifyToken } = require('../middleware/authMiddleware');

// Lấy danh sách nhóm
router.get("/", verifyToken, groupController.getAllGroups);

// Thêm nhóm mới
router.post("/", verifyToken, groupController.createGroup);

// Lấy chi tiết nhóm
router.get("/:id", verifyToken, groupController.getGroupById);

// Cập nhật nhóm
router.put("/:id", verifyToken, groupController.updateGroup);

// Xóa nhóm
router.delete("/:id", verifyToken, groupController.deleteGroup);

// Thêm liên hệ vào nhóm
router.post("/:id/contacts", verifyToken, groupController.addContactToGroup);

// Lấy danh sách liên hệ của một nhóm
router.get("/:id/contacts", verifyToken, groupController.getGroupContacts);

module.exports = router;
