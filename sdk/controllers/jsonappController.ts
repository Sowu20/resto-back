import { mainMenu } from '../views/menuView/mainMenu';
import { registerForm } from '../views/formView/registerForm';
import { userReader } from '../views/readerView/Reader';

export const getMenu = (req: any, res: any) => {
    res.json(mainMenu.toJSON());
};

export const getForm = (req: any, res: any) => {
    res.json(registerForm.toJSON());
};

export const getReader = (req: any, res: any) => {
    res.json(userReader.toJSON());
};