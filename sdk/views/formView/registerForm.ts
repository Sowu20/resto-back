import { FormView } from "@numerum-tech/cmsdk";

export const registerForm = new FormView('register-form', "Formulaire d'inscription")
    .setIntro("Veuillez remplir tous les champs s'il vous plaît")
    .addTextField('name', 'Nom Complet', true)
    .addTextField('adress', 'Adresse', true)
    .addPhoneField('phone', 'Numéro de téléphone', true)
    .addEmailField('email', 'Adresse email', true)
    .addSelectField('role', 'Role', true, [
        { label: 'Admin', value: 'Adm' },
        { label: 'Restaurateur', value: 'Rest' }
    ])
    .addPasswordField('password', 'Mot de passe', 8)
    .submitButton('Inscrivez-vous', 'POST');