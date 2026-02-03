const { createRestaurantDetailReader } = require('./sdk/views/readerView/restaurentDetailReader');
const { getOptimizedImageUrl } = require('./sdk/utils/imageUtils');

// Mock d'un restaurant sans image
const mockRestaurant = {
    _id: { toString: () => 'mock-id-123' },
    name: 'Mon Restaurant Test',
    address: '123 Rue de Test',
    phone: '0123456789',
    status: 'Ouvert',
    // image: undefined // Volontairement manquant
};

console.log('--- Test getOptimizedImageUrl ---');
const url = getOptimizedImageUrl(undefined);
console.log('URL générée pour image undefined:', url);
if (url.includes('Restaurant.jpg')) {
    console.log('✅ Succès: Image par défaut utilisée.');
} else {
    console.log('❌ Échec: Image par défaut non trouvée.');
}

console.log('\n--- Test createRestaurantDetailReader ---');
try {
    const reader = createRestaurantDetailReader(mockRestaurant);
    const json = reader.toJSON();
    console.log('JSON généré avec succès.');

    // Dans le CMSDK, l'image est dans json.content.image
    const imageObject = json.content ? json.content.image : null;
    console.log('Objet image dans le JSON:', JSON.stringify(imageObject, null, 2));

    if (imageObject && imageObject.url && imageObject.url.includes('Restaurant.jpg')) {
        console.log('✅ Succès: Le JSON contient l\'image par défaut à l\'emplacement correct.');
    } else {
        console.log('❌ Échec: L\'image par défaut est manquante ou mal placée.');
    }
} catch (error) {
    console.error('❌ Crash lors de la génération de la vue:', error.message);
    console.error(error.stack);
}
