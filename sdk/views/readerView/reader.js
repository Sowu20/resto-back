const { ReaderView } = require('@numerum-tech/cmsdk');

const createUserReaderView = (baseUrl = 'https://resto-back-xazy.onrender.com') => {
    return new ReaderView('user-profile', 'Mon Profil')
        .setIntro('Bienvenue sur votre profil')
        .addParagraph('Nom: John Doe')
        .addParagraph('Email: john@example.com')
        .addLink(`${baseUrl}/mobile/forms`, 'Modifier le profil');
}

module.exports = { createUserReaderView };
