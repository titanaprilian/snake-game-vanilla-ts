import { Coordinate, GRID_COUNT, GRID_SIZE, Particle } from "./constants";

export class Renderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2D rendering context for canvas");
    }
    this.context = ctx;

    this.canvas.width = GRID_COUNT * GRID_SIZE;
    this.canvas.height = GRID_COUNT * GRID_SIZE;
  }

  clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSnake(body: Coordinate[]): void {
    this.context.fillStyle = "lime";
    body.forEach((segment) => {
      this.context.fillRect(
        segment.x * GRID_SIZE,
        segment.y * GRID_SIZE,
        GRID_SIZE,
        GRID_SIZE
      );
    });
  }

  drawFood(position: Coordinate): void {
    this.context.fillStyle = "red";
    this.context.fillRect(
      position.x * GRID_SIZE,
      position.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  }

  drawText(text: string, color: string = "white", fontSize: number = 30): void {
    this.context.fillStyle = color;
    this.context.font = `${fontSize}px Arial`;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(
      text,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }

  drawScore(score: number): void {
    this.context.fillStyle = "white";
    this.context.font = "20px Arial";
    this.context.textAlign = "left";
    this.context.textBaseline = "top";
    this.context.fillText(`Score: ${score}`, 5, 5);
  }

  drawParticles(particles: Particle[]): void {
    particles.forEach((p) => {
      if (p.life > 0) {
        this.context.fillStyle = `rgba(255, 165, 0, ${p.life / 30})`; // Orange fading particles
        this.context.beginPath();
        this.context.arc(
          p.x * GRID_SIZE + GRID_SIZE / 2,
          p.y * GRID_SIZE + GRID_SIZE / 2,
          GRID_SIZE / 4,
          0,
          Math.PI * 2
        );
        this.context.fill();
        p.life--;
      }
    });
  }
}
