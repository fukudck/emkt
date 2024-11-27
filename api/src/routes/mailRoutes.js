const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/get', verifyToken, mailController.getMails);

router.post('/add', verifyToken, mailController.addMail)

router.delete("/delete/:id", verifyToken, mailController.deleteMail);

router.put("/update/:id", verifyToken, mailController.updateMail);


module.exports = router;