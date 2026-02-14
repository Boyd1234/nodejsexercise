const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('wie is et');
    next();
});

app.use((req, res, next) => {
    console.log('controle');
    next();
});

app.get('/', (req, res) => {
    console.log("welkom");
    res.send('hallo');
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));