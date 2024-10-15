"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// TODO: Define an interface for the Coordinates object
// TODO: Define a class for the Weather object
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        // TODO: Define the baseURL, API key, and city name properties
        this.baseURL = 'https://api.openweathermap.org/';
        this.cityName = '';
        // TODO: Create fetchLocationData method
        // private async fetchLocationData(query: string) {}
        // TODO: Create destructureLocationData method
        // private destructureLocationData(locationData: Coordinates): Coordinates {}
        // TODO: Create buildGeocodeQuery method
        // private buildGeocodeQuery(): string {}
        // TODO: Create buildWeatherQuery method
        // private buildWeatherQuery(coordinates: Coordinates): string {}
        // TODO: Create fetchAndDestructureLocationData method
        // private async fetchAndDestructureLocationData() {}
        // TODO: Create fetchWeatherData method
        // private async fetchWeatherData(coordinates: Coordinates) {}
        // TODO: Build parseCurrentWeather method
        // private parseCurrentWeather(response: any) {}
        // TODO: Complete buildForecastArray method
        // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
        // TODO: Complete getWeatherForCity method
        // async getWeatherForCity(city: string) {}
    }
}
exports.default = new WeatherService();
