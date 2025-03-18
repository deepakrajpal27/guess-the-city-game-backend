import { Injectable } from '@nestjs/common';
import * as citiesData from '../data/cities.json';
import { City, CityHintResponse, GuessResponse } from 'src/types/game-interfaces';

/**
 * GameService - Handles game logic for fetching city hints and checking guesses.
 * 
 * Responsibilities:
 * - Stores the list of cities from `cities.json`.
 * - Selects a random city for the game.
 * - Checks if a user's guess matches the current city.
 */
@Injectable()
export class GameService {
  // List of cities loaded from the JSON file
  private cities: City[] = citiesData.cities;

  // Stores the currently selected city for the game session
  private currentCity: City | null = null;

  /**
   * Selects a random city from the list and provides a hint.
   * @returns {CityHintResponse} - A hint containing the city's continent and a landmark.
   */
  getRandomCityHint(): CityHintResponse {
    // Randomly select a city from the list
    this.currentCity = this.cities[Math.floor(Math.random() * this.cities.length)];

    return {
      hint: `This city is in ${this.currentCity.continent} and has famous landmarks like ${this.currentCity.landmarks[0]}.`,
    };
  }

  /**
   * Validates the user's guess against the currently selected city.
   * @param {string} guess - The city name guessed by the user.
   * @returns {GuessResponse} - Whether the guess is correct and a corresponding message.
   */
  checkGuess(guess: string): GuessResponse {
    // Ensure a city has been selected before checking the guess
    if (!this.currentCity) {
      return { correct: false, message: 'No city selected. Start a new game!' };
    }

    // Validate input: Ensure the guess is a non-empty string
    if (!guess || typeof guess !== 'string') {
      return { correct: false, message: 'Invalid input. Please provide a city name.' };
    }

    // Normalize user input for case-insensitive comparison
    const normalizedGuess: string = guess.trim().toLowerCase();
    const correctCityName: string = this.currentCity.name.toLowerCase();

    // Compare the guess with the correct city name
    if (normalizedGuess === correctCityName) {
      return { correct: true, message: `Correct! The city was ${this.currentCity.name}.` };
    } else {
      return { correct: false, message: 'Incorrect guess. Try again!' };
    }
  }
}
