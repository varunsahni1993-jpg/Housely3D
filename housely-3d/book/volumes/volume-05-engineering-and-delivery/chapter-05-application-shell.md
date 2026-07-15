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
- Project workspace route under `/projects/:projectId`.
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

## Viewer Architecture

### Purpose

Describe how the 3D viewer foundation is organized so future editing, measurement, and analysis tools can attach without rewriting the rendering core.

### Rationale

The viewer is its own domain. Keeping the engine, scene, controls, camera, and overlay shells separate makes it easier to add specialized tools later while preserving a stable rendering surface.

### Examples

- `src/viewer/providers` for viewer lifecycle, tool registration, and selection context placeholders.
- `src/viewer/engine` for the React Three Fiber canvas and viewer-level error handling.
- `src/viewer/scene` for scene composition and shared world setup.
- `src/viewer/camera` for camera presets, reset logic, and fit-to-scene hooks.
- `src/viewer/controls` for orbit, future first-person, and orthographic control modes.
- `src/viewer/components` for overlay shells and status surfaces.
- `src/viewer/lighting`, `src/viewer/grid`, and `src/viewer/helpers` for reusable scene primitives.
- `src/features/projects` for the project domain, repository, workspace store, and scene adapter.

### Scene Hierarchy

### Purpose

Keep the world layout predictable so tools can rely on consistent coordinate space and camera behavior.

### Rationale

Rendering features should compose around a shared scene root rather than mutating ad hoc objects from arbitrary components.

### Examples

- Scene root initializes ambient, hemisphere, and directional lighting.
- Ground plane and reference grid define a stable origin.
- Axes helper appears only in development builds.
- Fog is optional and centralized.
- Domain features provide scene children through the viewer canvas instead of mutating the engine directly.
- Room meshes are derived from project state, not from duplicate viewer state.

### Camera Architecture

### Purpose

Provide a single place for default positioning, reset behavior, and future camera presets.

### Rationale

Camera state should be reusable from tool commands rather than embedded in individual scene objects.

### Examples

- Default perspective camera lives in the viewer canvas configuration.
- A camera rig applies the active preset and keeps the projection matrix current.
- Resetting the camera returns to the default preset.
- Fit-to-scene is a placeholder for later bounds-aware behavior.

### Control Architecture

### Purpose

Keep navigation predictable while leaving room for alternate control modes.

### Rationale

Orbit controls are the default interaction model, but the control layer should be isolated so first-person and orthographic modes can be introduced later without changing the canvas contract.

### Examples

- Damped orbit interaction.
- Sensible min and max distance limits.
- Pan, zoom, and rotate enabled by default.
- `makeDefault` control registration for future replacement.

### Guidelines For Future Rendering Features

### Purpose

Define the guardrails for viewer enhancements.

### Rationale

Future tools should register through the provider and render in their own domain folders instead of expanding the canvas component directly.

### Examples

- Add new tools through provider registration and shell panels.
- Keep scene primitives memoized and stateless when possible.
- Dispose resources through React Three Fiber lifecycles.
- Prefer narrow, composable components over a single large viewer implementation.
- Keep non-rendering state in provider or hook layers.
- Keep project data in the domain store and repository, not in Three.js objects.

### Deferred Work

The following work is intentionally postponed:

- Selection system.
- Transform gizmos.
- Object snapping.
- Measurement tools.
- Undo and redo.
- Section cuts.
- Minimap.
- Physics.
- Level of detail system.
- Asset streaming.

## Related

- [Volume 05 README](README.md)
- [Handbook Roadmap](../../roadmap.md)
