import { promises as fs } from 'fs'; 
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Use to create unique ids

const filePath = path.join(__dirname, '../searchHistory.json');

class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

class HistoryService {
  private async read() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (err) {
      console.error('Error reading search history:', err);
      return [];
    }
  }

  private async write(cities: City[]) {
    try {
      await fs.writeFile(filePath, JSON.stringify(cities, null, 2));
    } catch (err) {
      console.error('Error writing search history:', err);
    }
  }

  async getCities() {
    return await this.read();
  }

  async addCity(cityName: string) {
    const cities = await this.read();
    const newCity = new City(cityName, uuidv4());
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  async removeCity(id: string) {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();



// TODO: Define a City class with name and id properties

// TODO: Complete the HistoryService class

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}

