import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();
import * as fs from 'fs';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    console.log(req.body);
    // TODO: GET weather data from city name
    let weatherData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${req.body.cityName}&limit=100&appid=${process.env.API_KEY}`);
    let weatherDataJson = await weatherData.json();
    let forecastData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${req.body.cityName}&limit=100&appid=${process.env.API_KEY}`);
    let forecastDataJson = await forecastData.json();
    console.log(forecastDataJson);
    console.log(weatherDataJson);
    // TODO: save city to search history
    let randomID = crypto.randomUUID();
    let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    searchHistory.push({ id: randomID, city: req.body.city });
    fs.writeFileSync('./db/db.json', JSON.stringify(searchHistory));
    res.json(weatherDataJson);
});
// TODO: GET search history
router.get('/history', async (req, res) => {
    let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(searchHistory);
    console.log(req.body.cityName);
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let updatedHistory = searchHistory.filter((city) => city.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedHistory));
    res.json(updatedHistory);
});
export default router;
