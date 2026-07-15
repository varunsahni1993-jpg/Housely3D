# Chapter 03 - Data and Storage

## Purpose

Document how platform data is organized, retained, and protected.

## Deliverables

- Data model overview.
- Storage tier map.
- Retention and recovery notes.

## Dependencies

- Domain boundaries.
- Backup strategy.

## Estimated Size

- Medium to large.

## Review Checklist

- Are data classes named.
- Are retention assumptions explicit.
- Are recovery implications clear.

## Project Workspace Data Model

### Purpose

Document the first local project domain that powers the building workspace.

### Rationale

The project workflow needs durable local state for buildings, floors, and rooms before any backend or auth layer is introduced.

### Hierarchy

- `Project` contains many `Building` records.
- `Building` contains many `Floor` records.
- `Floor` contains many `Room` records.
- Room dimensions are stored in meters.
- Timestamps use ISO 8601 strings.

### Room Convention

- Width maps to the scene box X axis.
- Height maps to the scene box Y axis.
- Length maps to the scene box Z axis.
- Position is stored as a center point in meters.
- Rotation is stored as Euler angles in radians.

## Persistence Abstraction

### Purpose

Keep the storage mechanism replaceable.

### Rationale

A repository interface lets the UI stay stable while the backing store evolves from browser storage to IndexedDB or an API-backed implementation later.

### Contract

- `listProjects` returns all stored projects.
- `getProject` returns a single project or `null`.
- `saveProject` persists a normalized project record.
- `deleteProject` removes a project by ID.

### Error Handling

- Invalid stored payloads are ignored.
- Missing data falls back to an empty list.
- Storage errors surface through the workspace store so the UI can report them without calling storage directly.

## Related

- [Volume 03 README](README.md)
- [Backup Strategy](../../../docs/lifecycle/backup-strategy.md)
