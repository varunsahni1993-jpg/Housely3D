# Chapter 05 - Application Shell

## Purpose

Document the frontend shell architecture so future features extend a stable foundation instead of inventing new structural patterns.

## Deliverables

- Application structure map.
- Routing strategy.
- Layout architecture.
- State management model.
- Theme architecture.
- Feature extension rules.

## Dependencies

- Coding standards chapter.
- Testing and quality chapter.
- Development lifecycle chapter.
- Handbook roadmap.

## Estimated Size

- Medium.

## Review Checklist

- Is the shell layout consistent across pages.
- Are routes lazy-loaded and modular.
- Are stores isolated by concern.
- Is the theme centralized.
- Are future features expected to live in feature modules.

## Application Structure

### Purpose

Create a predictable `src/` layout that separates app wiring, reusable UI, features, and infrastructure.

### Rationale

A stable folder structure lowers cognitive load and keeps future features from becoming tangled.

### Examples

- `app/` for providers and app wiring.
- `components/` for reusable UI primitives.
- `layouts/` for page chrome and navigation shells.
- `pages/` for route-level screen compositions.
- `router/` for route definitions and navigation metadata.
- `stores/` for isolated Zustand state slices.

### Anti-Patterns

- Putting everything in `App.tsx`.
- Mixing feature logic into shared UI components.

### Expected Outcomes

- Easier onboarding.
- Smaller change surfaces.

## Routing Strategy

### Purpose

Keep routing simple, lazy-loaded, and easy to extend.

### Rationale

Route-level code splitting keeps the initial shell light and lets each surface evolve independently.

### Examples

- Home, dashboard, projects, viewer, settings, and not-found routes.
- Lazy-loaded page modules.
- Route fallback for unknown paths.

### Anti-Patterns

- Eager-loading every page.
- Hard-coding page state inside the router.

### Expected Outcomes

- Faster initial loads.
- Cleaner route boundaries.

## Layout Architecture

### Purpose

Define a shared shell with sidebar navigation, top navigation, breadcrumbs, and a content area.

### Rationale

A consistent layout makes the application feel like one product instead of disconnected screens.

### Examples

- Responsive drawer on smaller screens.
- Permanent sidebar on desktop.
- Global top bar with logo and user avatar placeholders.
- Breadcrumbs above the page content.

### Anti-Patterns

- Custom chrome on every page.
- Navigation state scattered across pages.

### Expected Outcomes

- Stronger product cohesion.
- Better navigation clarity.

## State Management

### Purpose

Keep UI state and preferences in small, dedicated stores.

### Rationale

Zustand slices keep shared state lightweight without introducing a complex global data layer too early.

### Examples

- Theme store.
- Sidebar store.
- App settings store.
- User preferences store.

### Anti-Patterns

- Putting unrelated state into one store.
- Using state management for server data.

### Expected Outcomes

- Predictable state ownership.
- Easy persistence for shell preferences.

## Theme Architecture

### Purpose

Centralize color, typography, spacing, and mode handling.

### Rationale

Theme decisions should be reusable and reversible from one place.

### Examples

- Light and dark mode support.
- Responsive typography.
- Centralized semantic colors.
- Theme provider wrapping the application.

### Anti-Patterns

- Inline color values everywhere.
- Hard-coded typography in feature components.

### Expected Outcomes

- Visual consistency.
- Easier design iteration.

## Feature Extension Rules

### Purpose

Explain how future work should be added safely.

### Rationale

The shell should be extensible without forcing later teams to refactor the foundation.

### Examples

- Put domain workflows in `features/`.
- Keep shared controls in `components/`.
- Create a new route only when a surface has an actual user need.
- Update docs before expanding the shell boundary.

### Anti-Patterns

- Feature code that bypasses the shell structure.
- Copy-pasting page scaffolding for each new surface.

### Expected Outcomes

- Sustainable growth.
- Lower duplication.

## Related

- [Volume 05 README](README.md)
- [Handbook Roadmap](../../roadmap.md)
- [Application Backlog](../../../docs/backlog.md)
