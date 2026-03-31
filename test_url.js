const { createRepasReader } = require('./sdk/views/readerView/repasReader');

const restaurantId = '6989992008a1b331bb61f960';
const tableId = null;
const categoryId = '699c487e350edfb09cbab1f5';
const repas = [{ _id: '69c14a1af97f7345b50bf2d5', name: 'Test Plat', image: null }];
const baseUrl = 'https://resto-back-xazy.onrender.com';

const result = createRepasReader(restaurantId, tableId, repas, baseUrl, categoryId);
// console.log('Full Result:', JSON.stringify(result, null, 2));
console.log('Resulting HREF:', result.actions[0].href);
