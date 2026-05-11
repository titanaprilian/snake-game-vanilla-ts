// src/renderer.ts
export class Renderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext("2d")!;
  }

  clear(): void {}
  drawSnake(): void {}
  drawFood(): void {}
}
