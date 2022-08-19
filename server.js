
const http = require('http');
const app = require('./app');
http.createServer(app).listen(8081);
// Console will print the message
console.log('Server running at localhost:8081 \n Server running at http://127.0.0.1:8081/');