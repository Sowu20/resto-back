const http = require('http');
const fs = require('fs');

const postData = JSON.stringify({
    customer_name: "Jean Dupont",
    customer_phone: "90123456",
    payement_method: "tmoney"
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/mobile/restaurents/1/repas/fufu/order',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('📤 Envoi de la commande...');

const req = http.request(options, (res) => {
    console.log(`✅ Status Code: ${res.statusCode}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const json = JSON.parse(data);
        fs.writeFileSync('test-response.json', JSON.stringify(json, null, 2));
        console.log('✅ Réponse sauvegardée dans test-response.json');
        console.log(`\n🔍 Type de vue: ${json.type}`);
        console.log(`📋 Titre: ${json.content.title}`);
    });
});

req.on('error', (e) => {
    console.error(`❌ Erreur: ${e.message}`);
});

req.write(postData);
req.end();
