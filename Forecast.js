const axios = require('axios');
require('dotenv').config();

//requires params: lat and lon 
//returns array of Forecast objects

async function handleGetWeather(req,res) {
    console.log('Weather route was hit');
    
    //query parameters: gets weather data through latitude and longitude coordinates
    let lat = req.query.lat;
    let lon = req.query.lon;


    try {
        //get request for weather information
        let weather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`);
        weather = weather.data.data
        let forecasts;
        forecasts = weather.map(el => new Forecast(el.valid_date,el.weather.description,el.min_temp,el.max_temp));
        res.status(200).send(forecasts);
    } catch(error) {
        console.log(error);
        res.status(500).send("something went wrong");
    }
}

class Forecast {
    constructor(date,description,min_temp,max_temp) {
        this.date = date;
        this.description = description;
        this.min_temp = min_temp;
        this.max_temp = max_temp;
    }
}

module.exports = handleGetWeather;