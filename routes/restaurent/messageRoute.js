const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../../middlewares/authmiddleware');

router.post('/message', auth, messageController.addMessage);
router.get('/message', auth, messageController.listMessage);
router.get('/message/:id', auth, messageController.detailMessage);
router.put('/message/:id/read', auth, messageController.MarkedAsRead);
router.delete('/message/:id', auth, messageController.deleteMessage);

module.exports = router;