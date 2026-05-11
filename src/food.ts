import { Coordinate, GRID_COUNT } from "./constants";

export class Food {
  private position: Coordinate;

  constructor() {
    this.position = { x: 0, y: 0 }; // Initial dummy position
  }

  spawn(snakeBody: Coordinate[]): void {
    let newPosition: Coordinate;
    let collisionWithSnake: boolean;

    do {
      newPosition = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT),
      };
      collisionWithSnake = snakeBody.some(
        (segment) => segment.x === newPosition.x && segment.y === newPosition.y
      );
    } while (collisionWithSnake);

    this.position = newPosition;
  }

  getPosition(): Coordinate {
    return this.position;
  }
}

