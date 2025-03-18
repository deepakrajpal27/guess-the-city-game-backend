export interface City {
  name: string;
  landmarks: string[];
  continent: string;
}

export interface CityHintResponse {
  hint: string;
}

export interface GuessResponse {
  correct: boolean;
  message: string;
}