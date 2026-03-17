const Notification = require('../../models/Notification');
const SettingNotification = require('../../models/SettingNotification');

exports.createNotification = async(req, res) => {
    try {
        const notification = await Notification.create(req.body);

        res.status(201).json(notification);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.detailNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification introuvable"
            });
        }

        res.status(200).json({ notification });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSettings = async(req, res) => {
    try {
        const { restaurentId } = req.params;

        const settings = await SettingNotification.findOneAndUpdate(
            { restaurent: restaurentId },
            req.body,
            { new: true }
        );

        res.json(settings);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Notification supprimée"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markAsRead = async(req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { lue: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({
                message: 'Notification non trouvé'
            });
        }

        return res.status(200).json({
            message: 'Notification marquée comme lue',
            notification
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({
            notifications
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listNotificationUser = async(req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await Notification.find({ user: userId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            notifications
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.unReadCount = async(req, res) => {
    try {
        const { userId } = req.params;

        const count = await Notification.countDocuments({
            user: userId,
            lue: false
        });

        return res.status(200).json({
            unreadCount: count
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.statsNotification = async(req, res) => {
    try {
        const total = await Notification.countDocuments();
        const envoyer = await Notification.countDocuments({ status: 'envoye' });
        const en_attente = await Notification.countDocuments({ status: 'en_attente' });
        const echec = await Notification.countDocuments({ status: 'echec' });

        res.status(200).json({
            total,
            envoyer,
            en_attente,
            echec
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.settings = async(req, res) => {
    try {
        const { restaurentId } = req.params;

        let settings = await SettingNotification.findOne({
            restaurent: restaurentId
        });

        if (!settings) {
            settings = await SettingNotification.create({
                restaurent: restaurentId
            });
        }

        res.json(settings);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}