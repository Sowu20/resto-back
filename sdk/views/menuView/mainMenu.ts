import { ActionListView } from "@numerum-tech/cmsdk";

export const mainMenu = new ActionListView('main-menu', 'Menu principale')
    .addAction('register-form', "Faire l'inscription", 'Créer un compte')
    .addAction('user-reader', 'Voir mon profil', 'Consulter mes informations');

module.exports = mainMenu