const { FormView, MessageView } = require('@numerum-tech/cmsdk');

const form = new FormView('test-form', 'Test Form')
    .addTextField('name', 'Name', true)
    .submitButton('Submit', 'POST', 'https://example.com/submit');

console.log('--- FormView ---');
console.log(JSON.stringify(form.toJSON(), null, 2));

const message = new MessageView('test-msg', 'Test Message')
    .setBody('Hello World')
    .setPrimaryAction('OK', 'GET');

console.log('\n--- MessageView ---');
console.log(JSON.stringify(message.toJSON(), null, 2));
