const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/getContacts', verifyToken, contactController.getContacts);

router.get('/getContactGroups', verifyToken, contactController.getContactGroups);

module.exports = router;