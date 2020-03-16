//
require('dotenv').config();
const http = require('http');
const hostname = '127.0.0.1';
const port = '3300'
const Router = require('./router/router')

const server = http.createServer(Router.handleRequest);

server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
