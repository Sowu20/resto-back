const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/restaurent/notificationController');
const auth = require('../../middlewares/authmiddleware');

router.post('/notification', auth, notificationController.createNotification);
router.get('/notification', auth, notificationController.listNotifications);
router.get('/notification/stats', auth, notificationController.statsNotification);
router.get('/notification/settings/:restaurentId', auth, notificationController.settings);
router.get('/notification/:userId', auth, notificationController.listNotificationUser);
router.get('/notification/count/:userId', auth, notificationController.unReadCount);
router.get('/notification/:id', auth, notificationController.detailNotification);
router.put('/notification/read/:notificationId', auth, notificationController.markAsRead);
router.put('/notification/settings/:restaurentId', auth, notificationController.updateSettings);
router.put('/notification/:id', auth, notificationController.updateNotification);
router.delete('/notification/:id', auth, notificationController.deleteNotification);

module.exports = router;