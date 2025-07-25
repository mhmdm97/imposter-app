## Operational Leashes

This document defines a set of "leashes" that control the level of autonomy and creativity you should exercise when responding to requests. At the beginning of each interaction, I will specify which leash you should operate under.

**Important:** At the start of each response, you must clearly state which leash level you are operating under (e.g., "Operating under Medium Leash") to confirm the correct constraints are being applied.

### Short Leash
**Constraint:** Strict adherence to the task.
- **DO:** Execute the request exactly as specified.
- **DON'T:** Diverge from the instructions, make unsolicited improvements, or suggest changes. Your role is to be a direct tool.

### Medium Leash (default)
**Constraint:** Task completion with minor, beneficial improvements.
- **DO:** Complete the primary task. You may also:
    - Refactor methods for clarity and performance.
    - Add or improve error handling to make the code more robust.
    - Enhance documentation where it is lacking.
- **DON'T:** Introduce new libraries, significantly alter the architecture, or change the UI styling without permission.

### Long Leash
**Constraint:** Task completion with significant, value-adding enhancements.
- **DO:** Everything permitted under "Medium Leash", plus:
    - Improve UI/UX with better styling or component structure.
    - Introduce new libraries or dependencies if they provide a clear benefit (e.g., for state management, data validation).
    - Restructure or move components for better organization and reusability.
- **DON'T:** Make breaking changes to core APIs or data schemas without explicit discussion.

### Free Leash
**Constraint:** Full autonomy to achieve the user's goals.
- **DO:** Whatever you deem necessary to best accomplish the task and improve the overall project. This includes any changes from architectural refactoring to adding new features that you anticipate would be useful.
- **DON'T:** There are no limitations under this leash, but all significant changes should be clearly documented.

---

## Copilot Instructions

### Coding Standards
- Use descriptive, intention-revealing names.
- camelCase for variables/functions, PascalCase for classes/types/components, UPPER_CASE for constants, kebab-case for file names.
- Use 2 spaces for indentation.
- Limit lines to a maximum of 100 characters.
- Use trailing commas where applicable.
- End statements with semicolons.
- Use single quotes for strings.
- One component/class per file, group related code, separate business logic from UI, keep functions focused and short.
- Enable strict type checking, avoid `any`, use type annotations, interfaces, and type aliases.
- Use modern TypeScript features: optional chaining, nullish coalescing, async/await, destructuring, spread operator.
- Prefer functional React components with hooks, named exports, TypeScript interfaces for props, destructuring, default values, controlled components, React Context for app-wide state.
- Optimize React performance: React.memo, useCallback, useMemo, proper keys for lists, avoid inline functions in render.
- Express: router per resource, middleware for cross-cutting concerns, controller/service/repository pattern, validate input, use zod/joi, return proper HTTP codes.
- MongoDB: design schemas for query patterns, use indexes, projections, pagination, aggregation, batch operations.
- HTML: use semantic elements, proper heading hierarchy, label associations, validation attributes, consistent structure and indentation.
- CSS/Sass: BEM naming, ITCSS, use variables, limit nesting, mixins/functions, split into partials, mobile-first, relative units, content-based breakpoints.
- Accessibility: semantic HTML, ARIA only when needed, keyboard accessibility, focus management, WCAG 2.1 AA compliance, color contrast, text alternatives, React accessibility tools.
- Security: OWASP Top 10, HTTPS, encryption, parameterized queries, input validation/sanitization, update dependencies, strong passwords, security headers.
- Error handling:
  - **Frontend:**
    - Use try-catch blocks for asynchronous operations.
    - Display user-friendly error messages.
    - Log errors with sufficient context for debugging.
    - Handle specific error types (e.g., network errors, validation errors).
  - **Backend:**
    - Use try-catch blocks to handle exceptions.
    - Return structured error responses (e.g., JSON with error codes and messages).
    - Log errors with appropriate context (e.g., request details, stack traces).
    - Validate and sanitize input to prevent errors and security vulnerabilities.
  - **General Principles:**
    - Avoid exposing sensitive information in error messages.
    - Use consistent error codes and messages across the application.
    - Implement global error handling mechanisms (e.g., error boundaries in React, middleware in Express).
- Logging: Use the following levels consistently:
  - **Debug**: Detailed information for debugging purposes, used during development and troubleshooting.
  - **Info**: General operational messages that confirm the application is working as expected.
  - **Warn**: Indications of potential issues or unexpected situations that do not interrupt the application flow.
  - **Error**: Critical problems that cause failures or require immediate attention.
  - Ensure logs are meaningful, avoid sensitive information, and use structured logging formats (e.g., JSON) for easier parsing and analysis.
- Documentation: All project documentation is organized in the [`docs/`](../docs/) directory. See [`docs/README.md`](../docs/README.md) for the complete documentation index. Follow documentation standards for code/API documentation, release notes, commit messages, and UI component docs.

### Testing Standards
- **Test runner:** Use Vitest for all tests, configured with jsdom environment for React components.
- **Testing library:** Use @testing-library/react for component testing, focus on user behavior over implementation.
- **File naming:** Use `*.test.tsx` for component tests, `*.test.ts` for utility/helper tests.
- **Test structure:** Follow AAA pattern (Arrange, Act, Assert), use descriptive test names that explain behavior.
- **Component testing:** Test user interactions, accessibility, error states, and edge cases. Use semantic queries (getByRole, getByLabelText) over test IDs.
- **Utility testing:** Test pure functions with various inputs, edge cases, and error conditions.
- **Mocking:** Use vi.fn() for function mocks, mock external dependencies and APIs.
- **Coverage:** Aim for meaningful coverage focusing on critical paths and user flows.
- **Test scripts:** Use `npm run test` for watch mode, `npm run test:run` for CI, `npm run test:ui` for visual interface.
- See [`docs/development/testing-guide.md`](../docs/development/testing-guide.md) for detailed testing strategies and examples.

### Documentation Standards
- Document close to code, use language-appropriate syntax, keep docs up-to-date.
- Use clear, consistent language, define terms, avoid unexplained acronyms.
- Methods/functions: summary, param/return descriptions, remarks, author/date info.
- File headers: project, file, purpose, author, creation/modification history.
- API endpoints: summary, remarks, usage, param/response descriptions.
- Database changes: author, date, description, params, returns.
- Commit messages: [Type]: Brief description, details, bullet points, issue/ticket references, testing info.
- Release notes: semantic versioning, organize by change type, date/version, links.
- UI components: document purpose, props, events, dependencies, usage, accessibility, changes.

### Data Management Standards
- **Data validation:** Server-side validation required for all inputs, client-side validation for user experience only.
- **Data transformation:** Use DTOs for API boundaries, sanitize all inputs, validate data types and ranges.
- **Privacy compliance:** GDPR compliance required, implement data retention policies, user consent management.
- **Database operations:** Use transactions for multi-step operations, implement proper indexing, avoid N+1 queries.
- **Data sanitization:** Remove sensitive data from logs, mask PII in non-production environments.

### Dependency Management
- **Library evaluation:** Assess popularity (GitHub stars, downloads), active maintenance, security track record, bundle size impact.
- **Update schedule:** Monthly security patches, quarterly dependency updates, annual major version upgrades.
- **License compliance:** Document all licenses, avoid copyleft licenses for proprietary code, maintain license inventory.
- **Vulnerability scanning:** Automated security checks in CI/CD pipeline, immediate patching of critical vulnerabilities.
- **Version pinning:** Use exact versions in package-lock.json, document breaking changes in upgrade notes.
- **Bundle analysis:** Monitor bundle size impact, lazy load heavy dependencies, tree-shake unused code.

### Rule Improvement & Maintenance
- Continuously improve rules based on new patterns, repeated implementations, common errors, new tools, best practices.
- Compare new code with rules, identify patterns to standardize, update rules/examples/references.
- Add new rules for new tech/patterns, common bugs, repeated feedback, new security/performance needs.
- Modify rules for better examples, edge cases, related updates, changed details.
- Deprecate outdated rules, document migration paths, update references.
- Keep examples and documentation synchronized with codebase.

### Quick Reference

#### Before Committing Checklist
- [ ] Tests pass locally (`npm test` or `yarn test`)
- [ ] Linting/formatting applied (`npm run lint:fix`)
- [ ] No console.log statements in production code
- [ ] Types are properly defined (no `any` types)
- [ ] Documentation updated for API changes
- [ ] Error handling implemented
- [ ] Security considerations reviewed
- [ ] Performance impact assessed

#### Component Creation Checklist
- [ ] Component follows single responsibility principle
- [ ] TypeScript interfaces defined for props
- [ ] Default props specified where applicable
- [ ] Accessibility attributes included
- [ ] Unit tests written
- [ ] Storybook story created (if applicable)
- [ ] Error boundaries implemented for critical components

#### API Development Checklist
- [ ] Input validation implemented
- [ ] Proper HTTP status codes returned
- [ ] Error responses structured consistently
- [ ] Authentication/authorization checked
- [ ] Rate limiting considered
- [ ] API documentation updated
- [ ] Integration tests written

### Tool Configurations
Reference actual configuration files for consistency:

- **ESLint:** [`eslint.config.js`](../eslint.config.js)
- **TypeScript:** [`tsconfig.json`](../tsconfig.json)
- **Vite:** [`vite.config.ts`](../vite.config.ts)
- **Package configs:** [`package.json`](../package.json)

### Rule Exceptions
- **Legacy code:** Follow existing patterns until scheduled refactoring, document technical debt.
- **Performance optimizations:** May require breaking style rules for critical performance gains, document reasoning.
- **Third-party integrations:** May need to adapt to external API constraints, isolate non-standard code.
- **Temporary workarounds:** Must include TODO comments with timeline and ticket reference.
- **Emergency fixes:** Can bypass normal review process but require post-incident review and proper fix.
- **Prototype code:** Relaxed standards for proof-of-concept work, but must be refactored before production.

### Formatting & Structure Guidelines
- Use bullet points for clarity, concise descriptions, DO/DON'T examples, reference actual code.
- Start rules with high-level overview, include actionable requirements, correct implementation examples, code references, keep rules DRY.
- Use language-specific code blocks for examples.
- Reference files using relative paths to maintain proper linking.

---
These instructions are enforced for all code, documentation, and workflow automation in the Imposter App project. Update this file as standards evolve.
