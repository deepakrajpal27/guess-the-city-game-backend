import { Injectable } from '@nestjs/common';
import * as citiesData from '../data/cities.json';
import { City, CityHintResponse, GuessResponse } from 'src/types/game-interfaces';

@Injectable()
export class GameService {
  private cities: City[] = citiesData.cities;
  private currentCity: City | null = null;

  getRandomCityHint(): CityHintResponse {
    this.currentCity = this.cities[Math.floor(Math.random() * this.cities.length)];

    return {
      hint: `This city is in ${this.currentCity.continent} and has famous landmarks like ${this.currentCity.landmarks[0]}.`,
    };
  }

  checkGuess(guess: string): GuessResponse {
    if (!this.currentCity) {
      return { correct: false, message: 'No city selected. Start a new game!' };
    }

    if (!guess || typeof guess !== 'string') {
      return { correct: false, message: 'Invalid input. Please provide a city name.' };
    }

    const normalizedGuess: string = guess.trim().toLowerCase();
    const correctCityName: string = this.currentCity.name.toLowerCase();

    if (normalizedGuess === correctCityName) {
      return { correct: true, message: `Correct! The city was ${this.currentCity.name}.` };
    } else {
      return { correct: false, message: 'Incorrect guess. Try again!' };
    }
  }
}
