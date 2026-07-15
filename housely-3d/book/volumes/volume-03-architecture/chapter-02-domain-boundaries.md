# Chapter 02 - Domain Boundaries

## Purpose

Define which responsibilities belong to each domain or service area.

## Deliverables

- Domain list.
- Boundary rules.
- Ownership notes.

## Dependencies

- System context.
- Product feature taxonomy.

## Estimated Size

- Medium.

## Review Checklist

- Are responsibilities exclusive enough to avoid confusion.
- Are shared concerns called out.
- Can the boundaries support scale.

## Project Workspace Domain

### Purpose

Define ownership for the building project model before the workspace grows into a larger editing surface.

### Rationale

The project vertical slice needs a clear model boundary so persistence, UI, and viewer mapping can evolve independently without splitting the source of truth.

### Ownership

- `Project` owns the top-level workspace record and metadata.
- `Building` owns a set of floors.
- `Floor` owns a set of rooms.
- `Room` owns dimensions, transform, and editable properties.
- The project workspace store owns the active project, selection state, and CRUD orchestration.
- The repository owns serialization, deserialization, and storage access.

### Examples

- The UI never writes directly to browser storage.
- Room dimensions are stored once in the domain model and mapped into the viewer on render.
- Selection is tracked by stable IDs, not Three.js object references.

### Deferred Work

- Authentication.
- Backend APIs.
- Collaboration.
- Cloud sync.

## Related

- [Volume 03 README](README.md)
- [Coding Standards Structure](../../../docs/structures/coding-standards-structure.md)
