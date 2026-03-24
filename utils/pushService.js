const webpush = require('../config/webpush');
const PushSubscription = require('../models/PushSubscription');

const sendPushNotification = async (userId, data) => {
  const subscriptions = await PushSubscription.find({ user: userId });

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        sub.subscription,
        JSON.stringify(data)
      );
    } catch (err) {
      console.error("Erreur push :", err.message);
    }
  }
};

module.exports = sendPushNotification;