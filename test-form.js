const { createOrderForm } = require('./sdk/views/formView/orderForm');
const fs = require('fs');

// Test du formulaire avec setNext
const form = createOrderForm('Fufu', '5000 FCFA', '1', 'fufu');
const json = form.toJSON();

fs.writeFileSync('test-form-output.json', JSON.stringify(json, null, 2));
console.log('✅ Formulaire sauvegardé dans test-form-output.json');
console.log(`\n🔍 Type de vue: ${json.type}`);
console.log(`📋 Titre: ${json.content.title}`);
console.log(`🔗 Navigation (setNext): ${json.navigation ? json.navigation.next : 'Non défini'}`);
console.log(`📤 Submit URL: ${json.content.submit ? json.content.submit.method + ' (voir fichier)' : 'Non défini'}`);
