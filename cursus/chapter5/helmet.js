const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

//built-in middleware
app.use(express.json());

//helmet is voor beveiliging
app.use(helmet());

//automatische logging vn requests
app.use(morgan('tiny'));

app.get('/api/courses', (req,res)=>{
    res.send([
        {
            id:1, name: 'course1'
        },
        {
            id:2, name:'course2'
        }
    ]);
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));