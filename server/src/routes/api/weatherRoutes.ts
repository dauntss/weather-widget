import { Router, type Request, type Response } from 'express';
const router = Router();
import 'dotenv/config';
import * as fs from 'fs';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
  // TODO: GET weather data from city name
  let weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=imperial&appid=${process.env.API_KEY}`);
  let weatherDataJson = await weatherData.json();
  let forecastData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${req.body.cityName}&appid=${process.env.API_KEY}`);
  let forecastDataJson = await forecastData.json();
  console.log(forecastDataJson);
  console.log(weatherDataJson);
  // TODO: save city to search history
  let randomID = crypto.randomUUID();
  let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  searchHistory.push({id: randomID, city: req.body.city});
  fs.writeFileSync('./db/db.json', JSON.stringify(searchHistory));
  res.json([weatherDataJson, forecastDataJson.list]);
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(searchHistory);
  console.log(req.body.cityName)
});

interface City {
  city: string;
  id: string;
}

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  let searchHistory = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  let updatedHistory = searchHistory.filter((city: City) => city.id !== req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(updatedHistory));
  res.json(updatedHistory);
});

export default router;
