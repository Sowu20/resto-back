const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');

// Connexion à MongoDB
const uri = "mongodb+srv://sowukelly67:sowukelly@clusterresto.srmvdzb.mongodb.net/?appName=ClusterResto";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Vous vous êtes connecté à MongoDB avec succès !");
  } finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

const app = express();

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Autorisation des cors
const corsOption = {
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    Credential: true
};

app.use(cors(corsOption));
app.use(express.json());

const userRoute = require('./routes/userRoute');
const restaurentRoute = require('./routes/restaurentRoute');
const menuRoute = require('./routes/menuRoute');
const repasRoute = require('./routes/repasRoute');
const commandeRoute = require('./routes/commandeRoute');

app.use('/api', userRoute); 
app.use('/api', restaurentRoute);
app.use('/api', menuRoute);
app.use('/api', repasRoute);
app.use('/api', commandeRoute);

module.exports = app;