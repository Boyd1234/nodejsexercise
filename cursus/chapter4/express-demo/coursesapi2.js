const express = require('express');
const app = express();

const courses = [
    {id:1, name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
];

app.get('/api/courses', (req, res)=>{
    res.send(courses);
});

//extra
// // Send plain text
// res.send('Hello World');

// // Send JSON
// res.send({ message: 'Hello' });

// // Send array
// res.send([1, 2, 3]);

// // Send HTML
// res.send('<h1>Hello World</h1>');

// // Send status code
// res.status(404).send('Not Found');

// // JSON explicitly
// res.json({ message: 'Hello' });

// app.listen(3000, ()=>{
//     console.log('Listening');
// });