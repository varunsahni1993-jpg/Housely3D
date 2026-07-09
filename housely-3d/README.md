# Housely-3D
AI-powered Building Intelligence Platform.

This repository is documentation-first. Product decisions, architecture choices, prompt systems, research notes, and engineering standards must be documented before implementation work begins.

## Start Here

1. Read the [Documentation Index](docs/index.md).
1. Review the [Documentation Roadmap](docs/roadmap.md).
1. Use the [Documentation Standards](docs/standards/documentation-standards.md).
1. Create or update decisions in [decisions](decisions/README.md) using the templates in [templates](templates/README.md).

## Repository Areas

- [book](book/README.md) - engineering handbook and phased volumes.
- [docs](docs/README.md) - master documentation system.
- [prompts](prompts/README.md) - prompt library structure and governance.
- [research](research/README.md) - research notes, findings, and experiments.
- [templates](templates/README.md) - reusable documentation templates.
- [decisions](decisions/README.md) - ADRs and decision logs.
- [backups](backups/README.md) - backup policy references and recovery notes.

## Governance Rules

- Never start implementation before documentation.
- Never add application code during documentation phases unless explicitly instructed.
- Every major decision must link back to an ADR or decision log entry.
- Every document should reference related documents.
- Every phase must be independently reviewable.

## Documentation Layers

- Strategy: product, architecture, AI, and engineering plans.
- Standards: markdown style, naming, folder responsibilities, and coding standards structure.
- Lifecycle: git, branching, versioning, backup, and release strategy.
- Operations: security, testing, prompt library, and research structure.
- Handbook: the book volumes under [book](book/README.md).
