const Notification = require('../models/Notification');
const pusher = require('../config/pusher');
const sendPushNotification  = require('./pushService');

const sendNotification = async({ userId, titre, contenu, type = 'systeme' }) => {
    const notification = await Notification.create({
        user: userId,
        titre,
        contenu,
        type
    });

    await pusher.trigger(`user-${userId}`, `new-notification`, {
        id: notification._id,
        titre: notification.titre,
        contenu: notification.contenu,
        type: notification.type,
        lue: notification.lue,
        createdAt: notification.createdAt
    });

    try {
        await sendPushNotification(userId, {
            title: notification.titre,
            body: notification.contenu
        });
    } catch(error) {
        console.error('Erreur web pus: ', error.push);
    }

    return notification
};

module.exports = sendNotification;