const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerSpec = require('./docs/swagger');

// Connexion à MongoDB

const app = express();

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json());

// Autorisation des cors

const userRoute = require('./routes/userRoute');
const restaurentRoute = require('./routes/restaurentRoute');
const repasRoute = require('./routes/repasRoute');
const commandeRoute = require('./routes/commandeRoute');

app.use('/api', userRoute); 
app.use('/api', restaurentRoute);
app.use('/api', repasRoute);
app.use('/api', commandeRoute);

module.exports = app;