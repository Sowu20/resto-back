const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  const fs = require('fs');
  fs.appendFileSync('server-debug.log', `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`);
  next();
});

app.use(express.json());

app.use(cors({
  origin: [
    'https://resto-back-xazy.onrender.com',
    'https://zamora-app.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://192.168.1.112:3000',
    'http://192.168.1.112:3000/user/dashboard',
    'https://demo.city-mate.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Connexion à MongoDB via Mongoose
mongoose.connect("mongodb+srv://sowukelly67:sowukelly@clusterresto.srmvdzb.mongodb.net/ClusterResto?appName=ClusterResto")
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const dashboardRoute = require('./routes/admin/dashboardRoute');
const adminCommandeRoute = require('./routes/admin/commandeRoute');
const userRoute = require('./routes/restaurent/userRoute');
const restoRoute = require('./routes/restaurent/restaurentRoute');
const menuRoute = require('./routes/restaurent/menuRoute');
const repasRoute = require('./routes/restaurent/repasRoute');
const cmdeRoute = require('./routes/restaurent/commandeRoute');
const categorieRoute = require('./routes/restaurent/categorieRoute');
const tableRoute = require('./routes/restaurent/tableRoute');
const offreRoute = require('./routes/restaurent/offreRoute');
const promotionRoute = require('./routes/restaurent/promotionRoute');
const annonceRoute = require('./routes/restaurent/annonceRoute');
const messageRoute = require('./routes/restaurent/messageRoute');
const jsonappRoute = require('./sdk/routes/jsonappRoute');
const imageController = require('./controllers/restaurent/imageController');

app.get('/api/images/:filename', imageController.getOptimizedImage);
app.use('/api', dashboardRoute);
app.use('/api', adminCommandeRoute);
app.use('/api', userRoute);
app.use('/api', restoRoute);
app.use('/api', menuRoute);
app.use('/api', repasRoute);
app.use('/api', cmdeRoute);
app.use('/api', categorieRoute);
app.use('/api', tableRoute);
app.use('/api', offreRoute);
app.use('/api', promotionRoute);
app.use('/api', annonceRoute);
app.use('/api', messageRoute);
app.use(jsonappRoute);

app.use('/doc-swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;