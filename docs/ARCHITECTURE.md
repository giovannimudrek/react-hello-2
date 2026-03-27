# ARCHITECTURE.md

## Project Type
Library — pure code library with minimal entry point

## Current Structure
```
.
└── index.html        # Entry point
```

## Recommended Structure (as project grows)
```
.
├── index.html        # Documentation/landing page
├── src/              # Library source code
│   ├── index.ts      # Main entry point (exports all public APIs)
│   ├── core/         # Core functionality modules
│   ├── utils/        # Utility functions
│   └── types/        # Type definitions
├── tests/            # Test suite
├── dist/             # Built/compiled output
├── package.json      # Package metadata and dependencies
├── tsconfig.json     # TypeScript configuration (if applicable)
├── .eslintrc         # Linting rules
└── README.md         # Library documentation
```

## Key Principles
- Keep public API minimal and focused
- Group related functionality into modules
- Export all public symbols from `src/index.ts`
- No external frameworks — pure library code
- Well-documented public interface
- Backwards compatible releases

## Typical Flow
1. PO: Define feature requirements
2. TL: Design API and module structure
3. Fullstack: Implement the library code
4. QA: Write and run comprehensive tests
5. Code Review: Validate design and quality
6. PR: Create release PR, bump version, tag