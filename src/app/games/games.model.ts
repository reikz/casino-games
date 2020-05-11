export interface Game {
  categories: string[];
  name: string;
  image: string;
  id: string;
  jackpot?: number;
  showOverlay?: boolean;
}

export interface Jackpot {
  game: string;
  amount: number;
}
