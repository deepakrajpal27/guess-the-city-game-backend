import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { CityHintResponse, GuessResponse } from 'src/types/game-interfaces';

/**
 * GameController - Handles incoming HTTP requests related to the game.
 * 
 * Routes:
 * - `GET /game/random-city` → Fetch a random city hint.
 * - `POST /game/guess` → Validate a user's guess.
 */
@Controller('game')
export class GameController {
  /**
   * Injects GameService to handle game logic.
   * @param gameService - The service handling game data and logic.
   */
  constructor(private readonly gameService: GameService) {}

  /**
   * Endpoint: `GET /game/random-city`
   * Fetches a random city hint from the GameService.
   * @returns {CityHintResponse} - The hint for a randomly selected city.
   */
  @Get('random-city')
  getRandomCityHint(): CityHintResponse {
    return this.gameService.getRandomCityHint();
  }

  /**
   * Endpoint: `POST /game/guess`
   * Checks if the user's guess matches the current city.
   * @param {Object} body - Request body containing the user's guess.
   * @param {string} [body.guess] - The guessed city name.
   * @returns {GuessResponse} - Whether the guess was correct or not.
   */
  @Post('guess')
  checkGuess(@Body() body: { guess?: string }): GuessResponse {
    return this.gameService.checkGuess(body.guess || '');
  }
}
