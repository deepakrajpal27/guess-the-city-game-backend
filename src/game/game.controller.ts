import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService} from './game.service';
import { CityHintResponse, GuessResponse } from 'src/types/game-interfaces';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('random-city')
  getRandomCityHint(): CityHintResponse {
    return this.gameService.getRandomCityHint();
  }

  @Post('guess')
  checkGuess(@Body() body: { guess?: string }): GuessResponse {
    return this.gameService.checkGuess(body.guess || '');
  }
}