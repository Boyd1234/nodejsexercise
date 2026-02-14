console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app.get('env'): ${app.get('env')}`);

//eerst dit nog uitvoeren: set NODE_ENV=production

//==============================================================================================
//==============================================================================================
//==============================================================================================
const express = require('express');
const morgan = require('morgan');
const app = express();

//alleen loggen in development:
//testen met NODE_ENV=development
//er zijn dus 2 (of 3) versies, development & production (en undefined)
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.get('/', (req, res) => {
    res.send('Hello');
});



const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));