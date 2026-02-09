const Message = require('../models/Message');

exports.addMessage = async(req, res) => {
    try {
        const message = await Message.create({
            sender: req.userId,
            receiver,
            title,
            content
        });

        if (req.io) {
            req.io.to(receiver.toString()).emit('newNotification', {
                title: message.title,
                content: message.content,
                createdAt: message.createdAt
            });
        };

        return res.status(201).json({
            message: 'Message envoyé avec succès',
            message
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.listMessage = async(req, res) => {
    const messages = await Message.find()
        .populate('sender', 'nom email')
        .sort({ createdAt: -1 });

    return res.status(200).json(messages);
};

exports.detailMessage = async(req, res) => {
    try {
        const message = await Message.findById(req.params.id)
            .populate('sender', 'nom email');
        if (!message) {
            return res.status(404).json({
                message: 'Message introuvable'
            });
        };
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.MarkedAsRead = async(req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!message) {
            return res.status(404).json({
                messge: 'Message introuvable'
            });
        };
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteMessage = async(req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        return res.json({
            message: 'Message supprimé avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}