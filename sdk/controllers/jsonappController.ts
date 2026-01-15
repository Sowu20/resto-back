import { mainMenu } from '../views/menuView/mainMenu';
import { registerForm } from '../views/formView/registerForm';
import { userReader } from '../views/readerView/Reader';

const formViews: Record<string, any> = {
    'registerForm': registerForm,
};

const readerViews: Record<string, any> = {
    'userReader': userReader,
};

const actionViews: Record<string, any> = {
    'mainMenu': mainMenu,
};

export const getMenu = (req: any, res: any) => {
    const { viewId } = req.params;
    const menu = actionViews[viewId];
    if (!menu) {
        return res.status(404).json({
            message: 'Menu non trouvé'
        });
    }
    res.json(menu.toJSON());
};

export const getForm = (req: any, res: any) => {
    const { formId } = req.params;
    const form = formViews[formId];
    if (!form) {
        return res.status(404).json({
            message: 'Formulaire non trouvé'
        })
    }
    res.json(form.toJSON());
};

export const getReader = (req: any, res: any) => {
    const { readerId } = req.params;
    const reader = readerViews[readerId];
    if (!reader) {
        return res.status(404).json({
            message: 'Lecteur non trouvé'
        })
    }
    res.json(reader.toJSON());
};