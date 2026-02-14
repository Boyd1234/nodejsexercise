const express = require('express');
const app = express();
// Add at the top of your file
//nodig voor middleware
app.use(express.json());

//voor HTML forms die data posten.
app.use(express.urlencoded({ extended: true }));

//Serve CSS, JavaScript, images, and other static assets:
//je kanr gwn meerdere onder elk zetten
// de /public staat niet in je url
app.use(express.static('public'));

//dit kan ook, ds ist bij /static da et ga werken
app.use('/static', express.static('public'));


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];


//================================================================================
//================================================================================
//================================================================================
//GET REQUESTS
app.get('/api/courses', (req, res)=>{
    res.send(courses);
})


app.get('/moreparams/:par1/:par2/:par3', (req, res)=>{
    res.send(req.params);
})

//optional parameters
//toont de extra dingen bv bij http://localhost:3000/api/posts/2021/12?sortBy=name&limit=10 toont et die sortby etc...
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.get('/api/courses/:id', (req, res) => {
    //parseInt want parameters zijn strings.
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course){
        return res.status(404).send('error: geen course me die id');
    }
    res.send(course);
});

//================================================================================
//================================================================================
//================================================================================
//POST REQUESTS

const Joi = require('joi');

app.post('/api/courses', (req, res)=>{
    //nooit users vertrouwen dus vlaidate
    //manuele validatie is ni goe dus "npm i joi"
    // if(!req.body.name ||req.body.name.length < 3){
    //     return res.status(400).send("Name required, min 3 chars");
    // }
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body)

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

//extra validation rules:
// String with min/max length
// const schema = Joi.object({
//     name: Joi.string().min(3).max(50).required()
// });

// // Number with range
// const schema = Joi.object({
//     age: Joi.number().integer().min(0).max(120).required()
// });

// // Email
// const schema = Joi.object({
//     email: Joi.string().email().required()
// });

// // Multiple fields
// const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     email: Joi.string().email().required(),
//     age: Joi.number().integer().min(18)
// });

// // Optional field
// const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     description: Joi.string().optional()
// });


//================================================================================
//================================================================================
//================================================================================
//PUT REQUESTS

//maak validatiefunctie om herhaling te vermijden
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    return schema.validate(course);
}


//put is volledig ding wijzigen (alle velden)
app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course){
        return res.status(404).send('Course with given ID not found');
    }

    const result = validateCourse(req.body);

    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }

    course.name = req.body.name;

    res.send(course);
});





//================================================================================
//================================================================================
//================================================================================
//DELETE REQUESTS
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) {
        return res.status(404).send('Course with given ID not found');
    }
    
    const index = courses.indexOf(course);
    // splice(startIndex, deleteCount)
    courses.splice(index, 1);
    
    res.send(course);
});

//SLECHT
// app.listen(3000, ()=>{
//     console.log('listening');
// });

//BETERE VERSIE VOOR PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});