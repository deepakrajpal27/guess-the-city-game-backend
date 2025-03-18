import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: {
            getRandomCityHint: jest.fn().mockReturnValue({ hint: 'This is a test hint.' }),
            checkGuess: jest.fn().mockReturnValue({ correct: true, message: 'Correct!' }),
          },
        },
      ],
    }).compile();

    gameController = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(gameController).toBeDefined();
  });

  it('should return a city hint', () => {
    expect(gameController.getRandomCityHint()).toEqual({ hint: 'This is a test hint.' });
  });

  it('should return correct guess response', () => {
    expect(gameController.checkGuess({ guess: 'Paris' })).toEqual({ correct: true, message: 'Correct!' });
  });
});
