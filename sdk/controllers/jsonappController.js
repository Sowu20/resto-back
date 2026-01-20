const { mainMenu } = require('../views/menuView/mainMenu');
const { registerForm } = require('../views/formView/registerForm');
const { userReader } = require('../views/readerView/reader');
const { listrestaurentReader } = require('../views/readerView/listrestaurentReader');
const { restaurentDetail } = require('../views/readerView/restaurentDetailReader');
const { menuReader } = require('../views/readerView/menusReader');
const { repasReader } = require('../views/readerView/repasReader');

const HomeScreen = (req, res) => {
    res.json(mainMenu.toJSON());
};

const RegisterForm = (req, res) => {
    res.json(registerForm.toJSON());
};

const getReader = (req, res) => {
    res.json(userReader.toJSON());
};

const Restaurents = (req, res) => {
    res.json(listrestaurentReader.toJSON());
};

const RestaurentDetail = (req, res) => {
    res.json(restaurentDetail.toJSON());
};

const Menu = (req, res) => {
    res.json(menuReader.toJSON());
};

const Repas = (req, res) => {
    res.json(repasReader.toJSON());
};

module.exports = { HomeScreen, RegisterForm, getReader, Restaurents, RestaurentDetail, Menu, Repas };