var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
const router = Router();
import 'dotenv/config';
import * as fs from 'fs';
// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // TODO: GET weather data from city name
    let weatherData = yield fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=imperial&appid=${process.env.API_KEY}`);
    let weatherDataJson = yield weatherData.json();
    let forecastData = yield fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${req.body.cityName}&appid=${process.env.API_KEY}`);
    let forecastDataJson = yield forecastData.json();
    console.log(forecastDataJson);
    console.log(weatherDataJson);
    // TODO: save city to search history
    let randomID = crypto.randomUUID();
    let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    searchHistory.push({ id: randomID, city: req.body.city });
    fs.writeFileSync('./db/db.json', JSON.stringify(searchHistory));
    res.json([weatherDataJson, forecastDataJson.list]);
}));
// TODO: GET search history
router.get('/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(searchHistory);
    console.log(req.body.cityName);
}));
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let updatedHistory = searchHistory.filter((city) => city.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedHistory));
    res.json(updatedHistory);
}));
export default router;
