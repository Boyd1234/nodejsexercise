const path = require('path');
const pathObj = path.parse(__filename);

console.log(pathObj);
path.join('/users', 'milan', 'file.txt');    // Join paths
path.resolve('file.txt');                     // Absolute path
path.basename('/users/milan/file.txt');      // 'file.txt'
path.dirname('/users/milan/file.txt');       // '/users/milan'
path.extname('/users/milan/file.txt');       // '.txt'