const { mainMenu } = require('../views/menuView/mainMenu');
const { registerForm } = require('../views/formView/registerForm');
const { userReader } = require('../views/readerView/reader');
const { listrestaurentReader } = require('../views/readerView/listrestaurentReader');
const { restaurentReader } = require('../views/readerView/restaurentReader');

const getMenu = (req, res) => {
    res.json(mainMenu.toJSON());
};

const getForm = (req, res) => {
    res.json(registerForm.toJSON());
};

const getReader = (req, res) => {
    res.json(userReader.toJSON());
};

const getlistRestaurent = (req, res) => {
    res.json(listrestaurentReader.toJSON());
};

const getRestaurent = (req, res) => {
    res.json(restaurentReader.toJSON());
};

module.exports = { getMenu, getForm, getReader, getlistRestaurent, getRestaurent };