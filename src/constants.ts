export const GRID_SIZE = 20; // Size of each grid cell in pixels
export const GRID_COUNT = 20; // Number of cells in width and height
export const INITIAL_TICK_INTERVAL = 150; // Milliseconds per game tick
export const MIN_TICK_INTERVAL = 60; // Minimum tick interval
export const TICK_DECREMENT = 5; // How much the tick interval decreases per 5 points
export const POINTS_PER_SPEED_INCREASE = 5; // Points needed to increase speed

export enum GameState {
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Particle extends Coordinate {
  life: number;
}
