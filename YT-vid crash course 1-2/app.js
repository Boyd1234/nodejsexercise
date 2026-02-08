const xyz = require('./people') //zo import je een andere file
// of const { prop die je wil } = require...
//dan print je gwn prop ==> console.log(prop)
//je kan ook const {prop1, prop2, ...}
console.log(xyz.ages, xyz.people);


const os = require('os');
console.log(os.platform(), os.homedir());