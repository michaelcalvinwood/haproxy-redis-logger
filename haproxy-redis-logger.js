const httpsPort = 5100;
const httpPort = 5101;


const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '200mb'})); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


http.createServer(app).listen(httpPort, '127.0.0.1');

