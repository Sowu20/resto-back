const transporter = require('../config/mailer');
const User = require('../models/User');

const emailNotification = async(userId, { title, body }) => {
    try {
        const user = await User.findById(userId);
        
        if (!user || !user.email){
            console.log('Utilisateur sans email');
            return;
        }
        await transporter.sendMail({
           from: `"Zamora" <${process.env.EMAIL_USER}>`,
           to: user.email,
           subject: title,
           html: `
                <h2>${title}</h2>
                <p>${body}</p>
                <hr/>
                <small>Notification automatique</small>
           ` 
        });
        console.log("Email envoyé à :", user.email);
    } catch (error) {
        console.error('Erreur email: ', error.message);
    }
};

module.exports = emailNotification