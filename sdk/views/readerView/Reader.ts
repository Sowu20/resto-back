import { ReaderView } from "@numerum-tech/cmsdk";

export const userReader = new ReaderView('user-reader', "Détail d'un utilisateur")
    .setIntro('Détail du compte')
    .addListField([
        'Name: Amad',
        'Adress: Agoè',
        'Phone: 87908765',
        'Email: amad@gmail.com',
        'Role: Admin',
    ])
    .addSeparator()
    .addParagraph('Compte actif et validé');