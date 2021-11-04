'use strict';

require('dotenv').config();
class Forcast {
    constructor(date,description,min_temp,max_temp) {
        this.date = date;
        this.description = description;
        this.min_temp = min_temp;
        this.max_temp = max_temp;
    }
}

const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const axios = require('axios');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/weather',handleGetWeather);
app.get('/*', (req,res) => res.status(403).send('not found'));

async function handleGetWeather(req,res) {
    console.log('Hello from weather!');
    //res.status(200).send(weather[0].city_name + " " + weather[1].city_name + " " + weather[2].city_name);
    
    let lat = req.query.lat;
    let lon = req.query.lon;
    let city_name = req.query.searchQuery || '';
    try {
        //console.log(`http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
        let weather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
        weather = weather.data.data
        //console.log(weather);
        let forcasts;
        forcasts = weather.map(el => new Forcast(el.valid_date,el.weather.description,el.min_temp,el.max_temp));
        console.log(forcasts);
        res.staus(200).send(forcasts);
        console.log('complete');
    } catch {
        res.status(500).send("something went wrong");
    }
}

app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));