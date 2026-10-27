# what-eat-today — Agent Development Guidelines

## 1. Core Principles (Immutable)

- **100% Free & Open-Source**: Never introduce paywalls, subscriptions, premium tiers, or artificial limits.
- **Deterministic Math**: All nutrition calculations (BMR, TDEE, calories, macros) must be deterministic and testable. Never use LLM completions to guess nutritional numbers.
- **Local-First & Privacy**: Guest mode requires no account; IndexedDB (Dexie.js) is the primary local persistence layer.
- **Clean-Room Design**: Never copy Mealbird proprietary code, assets, or trademarks.
- **Independent Architecture**: Keep domain and application logic independent of React, Dexie, and UI.

## 2. Boundaries & Testing

- Follow the 4-layer architecture: `domain` -> `application` -> `infrastructure` -> `presentation`.
- All domain logic and calculation use cases must have corresponding Vitest unit tests.
