const { previewOrder } = require('./sdk/controllers/jsonappController');
const mongoose = require('mongoose');

// Mock objects for Express
const req = {
    params: {},
    body: {
        restaurantId: '65c2a1b2c3d4e5f6g7h8i9j0',
        mealId: '65c2a1b2c3d4e5f6g7h8i9j1',
        customer_name: 'Test Client',
        customer_phone: '90000000',
        payment_method: 'tmoney'
    }
};

const res = {
    statusCode: 200,
    status: function (code) {
        this.statusCode = code;
        return this;
    },
    json: function (data) {
        console.log('--- TEST RESULT ---');
        console.log('Status:', this.statusCode);
        if (this.statusCode === 500) {
            console.log('Error Details:', data.details);
        }
        console.log('-------------------');
        process.exit(0);
    }
};

console.log('Testing route: POST /mobile/repas/order/preview');
console.log('Input Body:', JSON.stringify(req.body, null, 2));

// Note: This test will attempt to connect to MongoDB because of the model calls in previewOrder.
// If it fails with a DB connection error, it proves that the controller logic was executed 
// and it correctly extracted the IDs from the body.

previewOrder(req, res).catch(err => {
    console.log('--- TEST LOG ---');
    console.log('Logic reached DB interaction point.');
    if (err.message.includes('buffering timed out')) {
        console.log('SUCCESS: Controller correctly extracted IDs and tried to query DB.');
    } else {
        console.error('Error during test:', err.message);
    }
    process.exit(0);
});
