'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

let handleGetWeather = require('./Forecast.js');

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/weather',handleGetWeather);
app.get('/*', (req,res) => res.status(404).send('Path does not exist'));


app.listen(PORT, () => console.log(`I am a server that is listening on port:${PORT}`));