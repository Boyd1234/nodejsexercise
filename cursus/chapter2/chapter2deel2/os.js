const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const osType = os.type();
const uptime = os.uptime();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
console.log(`OS Type: ${osType}`);