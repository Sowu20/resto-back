const { ReaderView } = require('@numerum-tech/cmsdk');

const userReader = new ReaderView('user-profile', 'Mon Profil')
    .setIntro('Bienvenue sur votre profil')
    .addParagraph('Nom: John Doe')
    .addParagraph('Email: john@example.com')
    .addLink('/mobile/forms', 'Modifier le profil');

module.exports = { userReader };
