const axios = require('axios');
require('dotenv').config();

let cache = require('./cache.js');

async function handleGetMovies(req,res) {
    let city_name = req.query.city_name;
    let key = 'movies-' + city_name;
    try {
        //let city_name = req.query.city_name;
        //let movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`);
        //let movies = await getMovies(city_name);
        //let movieData = parseMovies(movies);
        let movieData = await cache.get(key,getMovies,city_name,parseMovies);
        movieData = movieData.value;
        console.log(movieData);
        res.status(200).send(movieData);
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function getMovies (city_name) {
    let movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`);
    return movies;
}

function sortMovies (movies) {
    let movieData = movies.data.results.sort((a,b) => {
        if(a.popularity > b.popularity) {
            return -1;
        } else if (a.popularity < b.popularity) {
            return 1;
        } else {
            return 0;
        }
    });
    return movieData;
}
function reduceMovies (movies) {
    let data = movies.slice(0,9);
    return data;
}
function parseMovies (movies) {
    return reduceMovies(sortMovies(movies)).map(movie => new Movie(movie));
}
class Movie {
    constructor(obj) {
        this.title = obj.title;
        this.release_date = obj.release_date;
        this.poster_path = obj.poster_path;
        this.popularity = obj.popularity;
    }
}

module.exports  = handleGetMovies;