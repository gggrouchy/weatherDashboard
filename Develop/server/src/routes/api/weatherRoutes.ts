import { Router, type Request, type Response } from 'express';
const router = Router();

import WeatherService from '../../services/WeatherService.ts';
import HistoryService from './../../services/HistoryService.ts';

router.post('/', async (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName; // Ensure this matches the sent data
    const newCity = await HistoryService.addCity(cityName);
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    res.json([newCity, ...weatherData]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

router.get('/history', async (req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const cityId = req.params.id;
    await HistoryService.removeCity(cityId);
    res.json({ message: 'City removed from history' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove city' });
  }
});

export default router;

