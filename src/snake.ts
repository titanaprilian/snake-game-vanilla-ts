import { Coordinate, Direction, GRID_COUNT } from "./constants";

export class Snake {
  private body: Coordinate[];
  private direction: Direction;
  private nextDirection: Direction;
  private growSnake: boolean;

  constructor() {
    this.body = [];
    this.direction = Direction.RIGHT;
    this.nextDirection = Direction.RIGHT;
    this.growSnake = false;
    this.reset();
  }

  reset(): void {
    this.body = [
      { x: Math.floor(GRID_COUNT / 2), y: Math.floor(GRID_COUNT / 2) },
      { x: Math.floor(GRID_COUNT / 2) - 1, y: Math.floor(GRID_COUNT / 2) },
      { x: Math.floor(GRID_COUNT / 2) - 2, y: Math.floor(GRID_COUNT / 2) },
    ];
    this.direction = Direction.RIGHT;
    this.nextDirection = Direction.RIGHT;
    this.growSnake = false;
  }

  move(): void {
    this.direction = this.nextDirection;
    const head = { ...this.body[0] }; // Copy current head

    switch (this.direction) {
      case Direction.UP:
        head.y--;
        break;
      case Direction.DOWN:
        head.y++;
        break;
      case Direction.LEFT:
        head.x--;
        break;
      case Direction.RIGHT:
        head.x++;
        break;
    }

    this.body.unshift(head); // Add new head

    if (this.growSnake) {
      this.growSnake = false;
    } else {
      this.body.pop(); // Remove tail if not growing
    }
  }

  changeDirection(newDirection: Direction): void {
    // Prevent reversing into self
    const isOpposite =
      (this.direction === Direction.UP && newDirection === Direction.DOWN) ||
      (this.direction === Direction.DOWN && newDirection === Direction.UP) ||
      (this.direction === Direction.LEFT && newDirection === Direction.RIGHT) ||
      (this.direction === Direction.RIGHT && newDirection === Direction.LEFT);

    if (!isOpposite) {
      this.nextDirection = newDirection;
    }
  }

  grow(): void {
    this.growSnake = true;
  }

  getHead(): Coordinate {
    return this.body[0];
  }

  getBody(): Coordinate[] {
    return this.body;
  }

  checkSelfCollision(): boolean {
    const head = this.getHead();
    return this.body.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  }
}

