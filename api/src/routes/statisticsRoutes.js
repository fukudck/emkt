const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const { verifyToken } = require('../middleware/authMiddleware');

// Lấy thống kê chiến dịch
router.get('/campaign', verifyToken, statisticsController.getCampaignStatistics);

module.exports = router;
