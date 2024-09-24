import { Router, Request, Response } from 'express';
import WeatherService from '../../service/weatherService';
import HistoryService from '../../service/historyService';

const router = Router();

router.post('/weather', async (req: Request, res: Response) => {
  const { cityName } = req.body;
  if (!cityName) {
      return res.status(400).send({ error: 'City name is required' });
  }
  try {
      const newCity = await HistoryService.addCity(cityName);
      const weatherData = await WeatherService.getWeatherForCity(cityName);
      return res.json({ city: newCity, weather: weatherData });
  } catch (err) {
      return res.status(500).send({ error: 'Error fetching weather data' });
  }
});

router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching city history' });
  }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: 'Error deleting city from history' });
  }
});

export default router;
