# what-eat-today

> An open-source, manual-first, local-first meal planning web application.

[![CI](https://github.com/PhanManhTan/what-eat-today/actions/workflows/ci.yml/badge.svg)](https://github.com/PhanManhTan/what-eat-today/actions/workflows/ci.yml)

---

## 🌟 Vision & Guiding Principles

`what-eat-today` is designed for disciplined eaters, home cooks, and macro trackers who want **deterministic arithmetic**, **complete privacy**, and **zero vendor lock-in**.

1. **Forever Free**: All features are free. No subscriptions, paywalls, premium tiers, or artificial limits.
2. **Local-First & Privacy-Conscious**: All recipes, meal plans, biometrics, and grocery lists live entirely in your browser via IndexedDB (Dexie.js). No mandatory user accounts, cookies, or trackers.
3. **Deterministic Math**: Calories and macronutrients are strictly calculated using verified public food composition tables (USDA FoodData Central CC0 and Vietnam National Institute of Nutrition). **No AI guessing or probabilistic hallucinations.**
4. **Self-Hostable**: Deployable as static assets on Cloudflare Pages or in a single lightweight Docker container (< 150MB RAM).
5. **Clean-Room Design**: Independent open-source implementation with transparent nutrition math and community-driven datasets.

---

## 🏗️ Architecture

The codebase follows a **modular monolith** with four strict boundaries:

```
src/
├── domain/            # Pure business entities, value objects, and repository interfaces
│   ├── entities/      # FoodItem, Recipe, MealPlan, GroceryItem, UserProfile
│   ├── value-objects/ # NutritionFacts, DataProvenance, unit helpers
│   └── repositories/  # Repository interfaces (IFoodRepository, etc.)
├── application/       # Use cases and application services (pure & testable)
│   └── use-cases/     # calculateUserTargets, nutrient solvers
├── infrastructure/    # Database drivers, storage implementations, external adapters
│   ├── db/            # Dexie.js schema v1, versioning
│   └── repositories/  # DexieFoodRepository, DexieRecipeRepository, etc.
└── presentation/      # React UI, shadcn-styled components, layout, pages, routing
    ├── components/    # Layout, UI primitives (Button, Card, Badge)
    ├── pages/         # Dashboard, Recipes, Meal Planner, Grocery List, Settings
    └── routes/        # React Router configuration
```

---

## 🚀 Incremental Roadmap

- [x] **P0: Foundation & Core Shell** _(Completed)_
  - Modular monolith folder structure with strict TypeScript.
  - Core domain entities, value objects, and repository interfaces.
  - Dexie.js IndexedDB v1 schema and local repositories.
  - Working React Router navigation (Dashboard, Recipes, Meal Planner, Grocery List, Settings).
  - Deterministic Mifflin–St Jeor target calculator use case.
  - Unit tests with Vitest (100% pass), linting, formatting, and CI workflow.
  - Docker + Nginx self-hosting configuration.
- [ ] **P1: Food Catalog & Nutrition Data**
  - Ingest public domain USDA FoodData Central (CC0) and Vietnam NIN datasets.
  - Fast client-side search and filtering by aisle/category.
- [ ] **P2: Recipe Management & Math Breakdown**
  - Interactive recipe builder with line-by-line gram weights.
  - Transparent per-ingredient nutrient calculation.
- [ ] **P3: Manual Weekly Meal Planner**
  - 7-day planner with strict per-day protein and calorie floors.
  - Batch cooking (cook once, eat across multiple days) tracker.
- [ ] **P4: Smart Grocery List**
  - Aisle-sorted list generated from active meal plan.
  - Pack size vs. portion consumed calculation.
- [ ] **P5: Settings, Export & Backups**
  - Full JSON backup export/import with version validation.
- [ ] **P6: PWA, Offline Caching & Production Deployment**
  - Service worker offline support and installable web app.
- [ ] **P7: Optional Deterministic Planning Algorithms**
  - Constraint-based linear programming / backtracking menu assistant.

---

## 💻 Getting Started Locally

### Prerequisites

- Node.js >= 20
- npm >= 10

### Installation & Development Server

```bash
# Clone the repository
git clone https://github.com/PhanManhTan/what-eat-today.git
cd what-eat-today

# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev
```

### Running Tests & Quality Checks

```bash
# Typecheck
npm run typecheck

# Unit tests (Vitest)
npm run test

# Linter (ESLint 9)
npm run lint

# Code formatting (Prettier)
npm run format:check
```

### Docker Self-Hosting

```bash
# Build and run with Docker
docker compose up -d

# Open http://localhost:3000 in your browser
```

---

## 📄 License & Attribution

- **LICENSE**: _Pending user approval (Recommended: AGPL-3.0 to protect open-source freedom, or Apache-2.0)._
- Nutrition data sourced from:
  - **USDA FoodData Central** (Public Domain / CC0)
  - **Vietnam National Institute of Nutrition (NIN)** (Public Nutritional Data)
