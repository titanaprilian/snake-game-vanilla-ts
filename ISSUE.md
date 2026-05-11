# Scaffold Snake Game — Vanilla TypeScript + Vite

> **For the implementer:** This issue is self-contained. Read it fully before starting. If anything is unclear, re-read the Notes section before asking.

---

## Overview

Set up the initial project structure for a Snake Game built with Vanilla TypeScript and Vite. The scaffold defines the module boundaries upfront — each file has a single responsibility as described below. The result must compile, run in development, and build for production without errors. No game logic needs to be implemented in this issue — only the file structure, module stubs, and wiring.

---

## Scope

This covers the full initial project setup from scratch. It touches the root configuration files (`package.json`, `tsconfig.json`, `index.html`) and the `src/` directory containing five TypeScript modules: `main.ts`, `game.ts`, `snake.ts`, `food.ts`, and `renderer.ts`.

---

## Tasks

1. Initialise the project by creating `package.json` with `vite` as the only dev dependency and `dev`, `build`, and `preview` scripts.
2. Create `tsconfig.json` targeting `ES2020` or later with `"module": "ESNext"` and `"moduleResolution": "Bundler"`.
3. Create `index.html` at the project root with a `<canvas>` element (id: `game-canvas`) and a module script tag pointing to `src/main.ts`.
4. Create the five stub modules under `src/` following the responsibilities in the Notes section — each file should export its class with empty method bodies, enough for TypeScript to compile.
5. Wire `src/main.ts` to import from the other four modules so the import graph is established from the start.
6. Run `npm install`, then verify `npm run dev` starts without errors and `npm run build` produces a `dist/` folder cleanly.

---

## Acceptance Criteria

- [ ] Project structure matches exactly the layout in the Notes section — no extra files, no missing files.
- [ ] `npm run dev` starts the Vite dev server with no errors.
- [ ] `npm run build` completes with zero errors and outputs to `dist/`.
- [ ] TypeScript reports zero compilation errors across all five modules.
- [ ] `index.html` contains a `<canvas id="game-canvas">` element.
- [ ] `src/main.ts` imports from `game.ts`, `snake.ts`, `food.ts`, and `renderer.ts`.

---

## Out of Scope

- Do not implement any game logic — stubs and empty class bodies only.
- Do not add a CSS file or any styling beyond what is inlined in `index.html` if needed.
- Do not add ESLint, Prettier, or any testing tools.
- Do not add any UI framework (React, Vue, etc.).
- Do not configure CI/CD or deployment.

---

## Notes

Required project structure:

```
snake-game/
├── src/
│   ├── main.ts       — Entry point. Initialises the game and starts the loop.
│   ├── game.ts       — Game class. Owns the game loop, state, and coordinates other modules.
│   ├── snake.ts      — Snake class. Manages snake position, direction, and movement.
│   ├── food.ts       — Food class. Manages food position and respawn logic.
│   └── renderer.ts   — Renderer class. Handles all canvas drawing — nothing else draws to the canvas.
├── index.html
├── tsconfig.json
└── package.json
```

Stub pattern to follow for each module:

```ts
// snake.ts
export class Snake {
  constructor() {}
  move(): void {}
  changeDirection(): void {}
}
```
