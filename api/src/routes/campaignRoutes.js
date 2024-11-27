const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/get', verifyToken, campaignController.get);

module.exports = router;