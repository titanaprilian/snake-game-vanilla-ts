# Snake Game (Vanilla TypeScript + Vite)

This project is a scaffolded Snake Game built using Vanilla TypeScript and Vite. It follows a structured development workflow based on predefined issues and agent skills.

## Project Overview

- **Goal:** Build a functional Snake Game with clear module boundaries and single-responsibility classes.
- **Technologies:** Vanilla TypeScript, Vite (for bundling and dev server), HTML5 Canvas.
- **Architecture:**
    - `src/main.ts`: Entry point, initialises the game and loop.
    - `src/game.ts`: Game loop and state coordination.
    - `src/snake.ts`: Snake movement and direction logic.
    - `src/food.ts`: Food spawning and position management.
    - `src/renderer.ts`: Dedicated canvas drawing logic.

## Building and Running

The project uses Vite for development and building.

- **Start Development Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Preview Production Build:** `npm run preview`

*(Note: These commands are based on the Vite default setup described in the project requirements.)*

## Development Workflow

This workspace uses a specific agent-led workflow:

1.  **Issue Tracking:** Active tasks are defined in `.opencode/ISSUE.md`.
2.  **Skills:** Custom agent skills are located in `.opencode/skills/` and `.gemini/skills/`.
    - `implement-issue`: Guided process for reading the issue, planning, and implementing code on a new branch.
3.  **Conventions:**
    - Always read `ISSUE.md` completely before starting work.
    - Propose an implementation plan for user approval before writing code.
    - Use the specified branch naming convention (e.g., `feat/`, `fix/`).
    - Adhere to the module responsibilities and stub patterns defined in the project documentation.
    - Ensure zero TypeScript errors and a successful build before handoff.

## Key Directories

- `src/`: Source code modules.
- `.opencode/`: Project-specific task definitions and agent skills.
- `.gemini/`: Agent configuration and shared skills.
