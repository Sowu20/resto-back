const { version } = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Gestion Restaurent API',
        description: "API de gestion de restaurents, de commandes, d'utilisateur, de menus, de repas",
        version: '1.0.0'
    },
};

const options = {
    swaggerDefinition,
    apis: ['./docs/*.js'],
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;