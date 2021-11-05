'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

let handleGetWeather = require('./Forecast.js');

app.use(cors());

const PORT = process.env.PORT || 3001



async function handleGetMovies(req,res) {
    try {
        let city_name = req.query.city_name;
        console.log(city_name);
        let movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`);
        
        //lets get the 10 most popular movies
        let movieData = movies.data.results.sort((a,b) => {
            if(a.popularity > b.popularity) {
                return -1;
            } else if (a.popularity < b.popularity) {
                return 1;
            } else {
                return 0;
            }
        });

        movieData = movies.data.results.slice(0,9);
        movieData=movieData.map(movie => new Movie(movie));
        console.log(movieData);
        res.status(200).send(movieData);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.release_date = obj.release_date;
        this.poster_path = obj.poster_path;
        this.popularity = obj.popularity;
    }
}

app.get('/weather',handleGetWeather);
app.get('/movies',handleGetMovies);
app.get('/*', (req,res) => res.status(404).send('Path does not exist'));


app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));