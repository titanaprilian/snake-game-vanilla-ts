import { Game } from "./game";
import { Snake } from "./snake";
import { Food } from "./food";
import { Renderer } from "./renderer";

// Initialize the game components
const canvasId = "game-canvas";
const renderer = new Renderer(canvasId);
const snake = new Snake();
const food = new Food();
const game = new Game();

console.log("Game initialized", { game, snake, food, renderer });
