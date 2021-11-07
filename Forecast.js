const axios = require('axios');
require('dotenv').config();

let cache = require('./cache.js');

//requires params: lat and lon 
//returns array of Forecast objects

async function handleGetWeather(req,res) {
    console.log('Weather route was hit');
    
    //query parameters: gets weather data through latitude and longitude coordinates
    let lat = req.query.lat;
    let lon = req.query.lon;
    let key = 'weather-' + lat + lon;

    try {
        let forecasts = await cache.get(key,getWeather,[lat,lon],parseWeather);
        forecasts = forecasts.value;
        console.log(forecasts);
        res.status(200).send(forecasts);
    } catch(error) {
        console.log(error);
        res.status(500).send("something went wrong with city-explorer-api");
    }
}

async function getWeather(lat,lon) {
    let weather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
    return weather;
}

function parseWeather(response) {
    let weather = response.data.data;
    //console.log(weather);
    let forecasts = weather.map(obj => new Forecast(obj));
    return forecasts;
}

class Forecast {
    constructor(obj) {
        this.date = obj.valid_date;
        this.description = obj.weather.description;
        this.min_temp = obj.min_temp;
        this.max_temp = obj.max_temp;
        this.icon = obj.weather.icon
    }
}

module.exports = handleGetWeather;