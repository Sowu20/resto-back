const { ReaderView } = require('@numerum-tech/cmsdk');

const aboutView = new ReaderView('about-app', 'À propos de Zamora')
    .setIntro('Bienvenue sur Zamora, votre compagnon gastronomique intelligent.')
    .addParagraph('Cette application a été conçue pour simplifier votre expérience en restaurant et vous offrir un service fluide et moderne.')
    .addParagraph('Voici ce que vous pouvez faire avec cette application :')
    .addParagraph('🍴 Découvrir les restaurants : Explorez une sélection des meilleurs établissements locaux avec leurs spécialités.')
    .addParagraph('📜 Consulter les menus en temps réel : Accédez aux cartes à jour, avec photos et descriptions détaillées des plats.')
    .addParagraph('🛒 Commander en un clic : Passez vos commandes directement depuis l\'application, que vous soyez sur place ou à emporter.')
    .addParagraph('🔍 Scanner pour commander : Utilisez le scanner QR intégré sur votre table pour accéder instantanément au menu et commander.')
    .addParagraph('🚀 Suivi rapide : Profitez d\'un service plus rapide et d\'une meilleure communication avec l\'établissement.')
// .addLink('/mobile', 'Retour à l\'accueil');

module.exports = { aboutView };
