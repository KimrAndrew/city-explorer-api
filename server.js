'use strict';

require('dotenv').config();
class Forcast {
    constructor(data,description) {
        this.date = data;
        this.description = description;
    }
}

const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/weather',handleGetWeather);
app.get('/*', (req,res) => res.status(403).send('not found'));

function handleGetWeather(req,res) {
    console.log('Hello from weather!');
    res.status(200).send(weather[0].city_name + " " + weather[1].city_name + " " + weather[2].city_name);
    
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));