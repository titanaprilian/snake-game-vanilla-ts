import { Snake } from "./snake";
import { Food } from "./food";
import { Renderer } from "./renderer";
import {
  GameState,
  Direction,
  GRID_COUNT,
  INITIAL_TICK_INTERVAL,
  MIN_TICK_INTERVAL,
  TICK_DECREMENT,
  POINTS_PER_SPEED_INCREASE,
  Coordinate,
  Particle,
} from "./constants";

export class Game {
  private snake: Snake;
  private food: Food;
  private renderer: Renderer;
  private score: number;
  private gameState: GameState;
  private lastTickTime: number;
  private tickInterval: number;
  private animationFrameId: number | null;
  private particles: Particle[] = [];

  constructor(snake: Snake, food: Food, renderer: Renderer) {
    this.snake = snake;
    this.food = food;
    this.renderer = renderer;
    this.score = 0;
    this.gameState = GameState.MENU;
    this.lastTickTime = 0;
    this.tickInterval = INITIAL_TICK_INTERVAL;
    this.animationFrameId = null;
  }

  start(): void {
    this.resetGame();
    this.gameState = GameState.PLAYING;
    this.loop();
  }

  resetGame(): void {
    this.snake.reset();
    this.food.spawn(this.snake.getBody());
    this.score = 0;
    this.tickInterval = INITIAL_TICK_INTERVAL;
    this.particles = [];
  }

  loop(): void {
    this.animationFrameId = requestAnimationFrame(this.loop.bind(this));

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTickTime;

    if (
      this.gameState === GameState.PLAYING &&
      deltaTime >= this.tickInterval
    ) {
      this.lastTickTime = currentTime;
      this.update();
    }

    this.render();
  }

  update(): void {
    if (this.gameState !== GameState.PLAYING) return;

    this.snake.move();

    const head = this.snake.getHead();

    // Wall collision
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_COUNT ||
      head.y >= GRID_COUNT
    ) {
      this.gameState = GameState.GAME_OVER;
      return;
    }

    // Self collision
    if (this.snake.checkSelfCollision()) {
      this.gameState = GameState.GAME_OVER;
      return;
    }

    // Food collision
    if (
      head.x === this.food.getPosition().x &&
      head.y === this.food.getPosition().y
    ) {
      this.snake.grow();
      this.score++;
      this.spawnParticles(this.food.getPosition()); // Trigger particle effect
      this.food.spawn(this.snake.getBody());

      if (this.score % POINTS_PER_SPEED_INCREASE === 0) {
        this.tickInterval = Math.max(
          MIN_TICK_INTERVAL,
          this.tickInterval - TICK_DECREMENT,
        );
      }
    }
    // Update particles (life decreases, filter out dead ones)
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  render(): void {
    this.renderer.clear();
    this.renderer.drawFood(this.food.getPosition());
    this.renderer.drawSnake(this.snake.getBody());
    this.renderer.drawParticles(this.particles);

    if (this.gameState === GameState.MENU) {
      this.renderer.drawText("Press Space to Start", "white");
    } else if (this.gameState === GameState.PAUSED) {
      this.renderer.drawText("PAUSED", "white");
    } else if (this.gameState === GameState.GAME_OVER) {
      this.renderer.drawText(`Game Over! Score: ${this.score}`, "red");
    }

    this.renderer.drawScore(this.score);
  }

  handleKeyPress(direction: Direction): void {
    if (this.gameState === GameState.PLAYING) {
      this.snake.changeDirection(direction);
    }
  }

  togglePause(): void {
    if (this.gameState === GameState.PLAYING) {
      this.gameState = GameState.PAUSED;
    } else if (this.gameState === GameState.PAUSED) {
      this.gameState = GameState.PLAYING;
    }
  }

  getGameState(): GameState {
    return this.gameState;
  }

  setGameState(state: GameState): void {
    this.gameState = state;
  }

  // Simple particle system
  spawnParticles(position: Coordinate): void {
    for (let i = 0; i < 5; i++) {
      this.particles.push({ x: position.x, y: position.y, life: 30 });
    }
  }
}
