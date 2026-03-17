const mongoose = require('mongoose');

const SettingNotificationSchema = new mongoose.Schema({
    events: {
        newOrder: {
            type: Boolean,
            default: true
        },
        orderClient: {
            type: Boolean,
            default: true
        },
        statusOrderChanged: {
            type: Boolean,
            default: true
        },
        promotion: {
            type: Boolean,
            default: false
        },
    },
    channels: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: false
        }
    },
    restaurent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurent',
        required: true
    }
}, { timestamps: true });

const SettingNotification = mongoose.model('SettingNotification', SettingNotificationSchema);

module.exports = SettingNotification;