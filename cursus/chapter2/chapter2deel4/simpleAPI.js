const http = require('http')

const server = http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'application/json'});

    if(req.url==='/'){
        res.write(JSON.stringify({ message: 'Welcome to the API'}));
    }
    else if (req.url === '/api/users'){
        res.writeHead(200, { 'Content-Type': 'application/json'});
        const users = [
            { id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'}
        ];
        res.write(JSON.stringify(users));
    }
    else {
        res.writeHead(404);
        res.write(JSON.stringify({ error: 'Not Found'}));
    }

    res.end();
});

server.listen(3000);
console.log('API server running on port 3000');
