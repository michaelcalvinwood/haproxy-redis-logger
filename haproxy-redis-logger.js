const httpsPort = 5100;
const httpPort = 5101;

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const redis = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisConfig = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD
}

console.log(redisConfig);

const client = redis.createClient(redisConfig);

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '200mb'})); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/log', async (req, res) => {
    console.log(req.body);
})

http.createServer(app).listen(httpPort, '127.0.0.1');

