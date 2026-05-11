import { Game } from "./game";
import { Snake } from "./snake";
import { Food } from "./food";
import { Renderer } from "./renderer";
import { Direction, GameState } from "./constants";

// Initialize the game components
const canvasId = "game-canvas";
const renderer = new Renderer(canvasId);
const snake = new Snake();
const food = new Food();
const game = new Game(snake, food, renderer);

// Input handling
document.addEventListener("keydown", (e) => {
  if (game.getGameState() === GameState.MENU || game.getGameState() === GameState.GAME_OVER) {
    if (e.code === "Space") {
      game.start();
    }
    return;
  }

  if (e.code === "KeyP" || e.code === "Escape") {
    game.togglePause();
    return;
  }

  let direction: Direction | null = null;
  switch (e.code) {
    case "ArrowUp":
    case "KeyW":
      direction = Direction.UP;
      break;
    case "ArrowDown":
    case "KeyS":
      direction = Direction.DOWN;
      break;
    case "ArrowLeft":
    case "KeyA":
      direction = Direction.LEFT;
      break;
    case "ArrowRight":
    case "KeyD":
      direction = Direction.RIGHT;
      break;
  }
  if (direction !== null) {
    game.handleKeyPress(direction);
  }
});

// Tap handling for start/restart (basic)
renderer.canvas.addEventListener("click", () => {
  if (game.getGameState() === GameState.MENU || game.getGameState() === GameState.GAME_OVER) {
    game.start();
  }
});

console.log("Game initialized", { game, snake, food, renderer });
