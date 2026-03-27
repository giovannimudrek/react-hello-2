# CONVENTIONS.md

## Naming Conventions
- **Exports**: PascalCase for classes/types, camelCase for functions and constants
- **Files**: kebab-case (e.g., `helper-functions.ts`, `math-utils.ts`)
- **Directories**: lowercase, semantic (e.g., `src/core/`, `src/utils/`, `src/types/`)
- **Test files**: `*.test.ts` or `*.spec.ts` suffix

## Code Organization
- All public APIs exported from `src/index.ts`
- Group related functions into modules (one concern per file)
- Keep utility functions in `src/utils/`
- Type definitions in `src/types/`

## Documentation
- JSDoc/TSDoc on all public exports
- README.md with usage examples and API reference
- Installation instructions and minimum version requirements
- CHANGELOG.md tracking breaking changes and features

## Testing
- Unit tests for all core functionality
- Edge case coverage for public APIs
- No external service dependencies in unit tests
- Test file co-located or in `tests/` directory
- Aim for >80% code coverage

## Versioning
- Semantic Versioning: MAJOR.MINOR.PATCH
- Git tags for releases (v1.0.0, v1.1.0, etc.)
- Breaking changes documented and version bumped

## Dependencies
- Minimize external dependencies (keep library lightweight)
- Explicitly mark peer dependencies in package.json
- Pin versions for reproducibility
- Document which versions the library supports

## Quality Standards
- ESLint for consistent code style
- TypeScript for type safety (recommended)
- Pre-commit hooks to catch issues
- Code review required before merge
- All tests must pass before release