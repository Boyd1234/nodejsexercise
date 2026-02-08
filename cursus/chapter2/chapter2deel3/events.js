const Logger = require('../chapter2deel1/logger');
const logger = new Logger();

//dit is de listeren
logger.on('messageLogged', function(){
    console.log('listener called', arg);
});
logger.log('message') //in deze functie emit je

// //listener moet eerst, dan pas trigger, messageLogged is ier gwn de naam.
// logger.emit('messageLogged');

// //dit is de listeren met parameter, kan ook zonder parameters
// emitter.on('messageLogged', function(arg){
//     console.log('listener called', arg);
// });

// //trigger met parameter
// // emitter.emit('messageLogged', { id: 1, url:'http://...'});

// const log = require('../chapter2deel1/logger')
// log('message');

//je emitters in app.js en logger.js zijn andere objecten ==> probleem!!

//oplossing is custom klasse maken (in je logger.js)