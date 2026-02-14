//npm i config
//maak de map "config" met de bestanden "default.json" "development.json" en "production.json"

const config = require('config');

console.log('app name:', config.get('name'));
console.log('mail host', config.get('mail.host'));
console.log('Password:', config.get('mail.password'));