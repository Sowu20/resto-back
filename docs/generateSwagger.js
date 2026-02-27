const fs = require('fs');
const swaggerSpec = require('./swagger'); 

fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));

console.log('swagger.json généré avec succès !');