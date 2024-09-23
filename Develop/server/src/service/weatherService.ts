
import dotenv from 'dotenv'; 
import axios from 'axios';

dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
    public city: string,
    public temp: number,
    public windSpeed: number,
    public humidity: number,
    public icon: string
  ) {}
}

class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey = process.env.API_KEY;
  
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const response = await axios.get(`${this.baseURL}/weather?q=${query}&appid=${this.apiKey}&units=imperial`);
    return response.data.coord;
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await axios.get(`${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=${this.apiKey}&units=imperial`);
    return response.data;
  }

  private parseCurrentWeather(response: any): Weather {
    const { name, main, wind, weather } = response;
    return new Weather(name, main.temp, wind.speed, main.humidity, weather[0].icon);
  }

  async getWeatherForCity(city: string): Promise<Coordinates | null> {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`);
      
      // Explicitly define the expected response structure
      const data = response.data as { coord: Coordinates };
      
      return data.coord;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }
}

export default new WeatherService();



// TODO: Define an interface for the Coordinates object

// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class

  // TODO: Define the baseURL, API key, and city name properties
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



