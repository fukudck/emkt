const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/get', verifyToken, campaignController.get);

router.post("/add", verifyToken, campaignController.add);
router.put("/update", verifyToken, campaignController.update);
router.delete("/delete", verifyToken, campaignController.delete);

router.post('/start', verifyToken, campaignController.startCampaign)

module.exports = router;