# Architectural Decisions

**Last Updated:** 2026-04-01

## Technology Stack

### UI Framework
- **Decision:** React with TypeScript + Tailwind CSS
- **Rationale:** Established in project history (boarding screen, kanban board implementations)
- **Relevant Issues:** KAN-48 (Login Screen)

## Component Architecture - KAN-48 (Uma tela de login)

### Login Screen Component Pattern
- **Decision:** Create reusable LoginScreen component following established React+TS+Tailwind patterns
- **Component Structure:**
  - TypeScript for type safety
  - Tailwind CSS for styling consistency
  - React hooks for state management
- **Status:** Card pending implementation
- **Jira Reference:** KAN-48

### Form Handling Approach
- **Decision:** Use React hooks (useState) for form state management unless otherwise specified
- **Validation:** Client-side validation for empty fields and email format (if applicable)
- **Error Handling:** Display inline error messages for validation failures and authentication errors
- **Status:** To be confirmed during implementation

### Authentication Integration
- **Decision:** Pending clarification on authentication approach
- **Options:**
  1. Mock authentication (for development/demo purposes)
  2. Integration with actual backend API
  3. OAuth/SSO integration (if required)
- **Status:** Requires specification in KAN-48 card

## Project Consistency Notes

All new components should follow these established patterns:
- TypeScript for type safety
- Tailwind CSS for styling
- React functional components with hooks
- Consistent naming conventions and folder structure

