'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/weather',handleGetWeather);

function handleGetWeather(req,res) {
    console.log(req.query.name);
    console.log('Hello from weather!');
}