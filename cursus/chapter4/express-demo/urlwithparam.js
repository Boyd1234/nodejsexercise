const express = require('express');
const app = express();

app.get('/api/courses/:id', (req, res)=>{
    res.send(req.params.id);
})


app.get('/moreparams/:par1/:par2/:par3', (req, res)=>{
    res.send(req.params);
})

//optional parameters
//toont de extra dingen bv bij http://localhost:3000/api/posts/2021/12?sortBy=name&limit=10 toont et die sortby etc...
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.listen(3000, ()=>{
    console.log('listening');
});