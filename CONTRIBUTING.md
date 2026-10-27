# Contributing to what-eat-today

Thank you for your interest in contributing to **what-eat-today**! We welcome bug reports, documentation improvements, new dataset mappings, and code contributions.

---

## 🎯 Contribution Principles

1. **No AI Guessing / Hallucinations**: All nutritional math must be deterministic and backed by verified datasets.
2. **Local-First & Privacy**: Do not add third-party tracking scripts, advertising trackers, or mandatory cloud dependencies.
3. **Clean-Room Design**: Do not copy proprietary code, branding, or assets from commercial apps (such as Mealbird). All code and assets must be original or under compatible open-source licenses.
4. **Architectural Separation**: Keep domain and application logic independent of React and UI frameworks.

---

## 🛠️ Development Workflow

1. **Fork and branch**: Create a descriptive feature branch from `main` (e.g., `git checkout -b feat/p1-food-catalog`).
2. **Install dependencies**: `npm install`.
3. **Verify standards before opening a PR**:
   ```bash
   npm run typecheck
   npm run lint
   npm run format:check
   npm run test
   npm run build
   ```
4. **Unit Tests**: Any new calculation or domain logic must include corresponding tests in `vitest`.

---

## 🥗 Adding Food & Recipe Data

When contributing food items or recipes:

- Gram weights must be explicit and positive.
- Specify the provenance source (e.g., USDA FoodData Central `fdc_id`, Vietnam NIN food code, or Open Food Facts barcode).
- Include the aisle category to allow proper grocery list mapping.
