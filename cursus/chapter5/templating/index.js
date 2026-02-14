const express = require('express')

//je moet je minionderdelen (routes etc) connecten
const courses = require('./routes/courses');
const home = require('./routes/home');

const logger = require('./middleware/logger');

const app = express();

app.use(logger);

app.use(express.json());

app.use('/api/courses', courses);
app.use('/',home);
app.set('view engine', 'pug');


//je moet dus je views folder aanmaken dan
app.set('views','./views');


app.listen(3000);

//index.js zou veelte groot worden dus drm al de mapjes aanmaken.