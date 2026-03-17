const Notification = require('../models/Notification');
const pusher = require('../config/pusher');

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

    return notification
};

module.exports = sendNotification;