import { mainMenu } from '../views/menuView/mainMenu';
import { registerForm } from '../views/formView/registerForm';
import { userReader } from '../views/readerView/reader';

export const getMenu = (req, res) => {
    res.json(mainMenu.toJSON());
};

export const getForm = (req, res) => {
    res.json(registerForm.toJSON());
};

export const getReader = (req, res) => {
    res.json(userReader.toJSON());
};