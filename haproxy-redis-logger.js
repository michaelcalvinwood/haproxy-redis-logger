const httpsPort = 5100;
const httpPort = 5101;

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const redis = require('redis');

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

let debug = false;

const redisConfig = {
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    },
    password: REDIS_PASSWORD
}

console.log('redisConfig', redisConfig);

let client = null;
let ready = false;

const getClient = async () => {
    client = await redis.createClient(redisConfig).connect();
    console.log(client)
    ready = true;
}
getClient();

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '200mb'})); 
app.use(cors());

app.use((req, res, next) => {
    //console.log(req.query);
    next()
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/log', async (req, res) => {
    try {
        req.query.userAgent = '';
        req.query.cookie = '';
        if (debug) console.log('log', req.query);
        if (ready) client.rPush('hVisitor', JSON.stringify(req.query));
    } catch (err) {
        console.error(err);
    }
    res.status(200).send('ok');
})

http.createServer(app).listen(httpPort, '0.0.0.0');

