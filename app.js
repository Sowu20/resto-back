const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');

const app = express();

app.use(express.json()); 

app.use(cors({
    origin: [
      'https://resto-back-xazy.onrender.com',
      'https://zamora-app.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Connexion à MongoDB via Mongoose
mongoose.connect("mongodb+srv://sowukelly67:sowukelly@clusterresto.srmvdzb.mongodb.net/ClusterResto?appName=ClusterResto")
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const userRoute = require('./routes/userRoute');
const restoRoute = require('./routes/restaurentRoute');
const menuRoute = require('./routes/menuRoute');
const repasRoute = require('./routes/repasRoute');
const cmdeRoute = require('./routes/commandeRoute');
const categorieRoute = require('./routes/categorieRoute');
const tableRoute = require('./routes/tableRoute');

app.use('/api', userRoute);
app.use('/api', restoRoute);
app.use('/api', menuRoute);
app.use('/api', repasRoute);
app.use('/api', cmdeRoute);
app.use('/api', categorieRoute);
app.use('/api', tableRoute);

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;