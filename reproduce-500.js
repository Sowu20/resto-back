const http = require('http');

const postData = JSON.stringify({
    customer_name: "Jean Dupont",
    customer_phone: "90123456",
    payement_method: "tmoney"
});

// Test sur le serveur local
const options = {
    hostname: 'localhost',
    port: 3000,
    // Test avec les paramètres de votre log (attieke, restaurant 2, slash final)
    path: '/mobile/restaurents/2/repas/attieke/order/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('📤 Envoi de la commande vers localhost...');

const req = http.request(options, (res) => {
    console.log(`✅ Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => data += chunk);

    res.on('end', () => {
        console.log('📥 Réponse du serveur:');
        console.log(data); // Affiche le HTML de l'erreur si c'est une 500
    });
});

req.on('error', (e) => {
    console.error(`❌ Erreur: ${e.message}`);
});

req.write(postData);
req.end();
