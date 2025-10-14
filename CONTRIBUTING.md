# Contributing Guide

Thank you for considering contributing to this portfolio template! This guide will help you get started.

## Development Setup

1. **Prerequisites**
   - Node.js 18.17+
   - pnpm 8.0+
   - Git

2. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd packaging-designer-portfolio
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

## Code Standards

### TypeScript

- Use TypeScript for all new files
- Avoid `any` types when possible
- Define interfaces for component props
- Use type inference where appropriate

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance

### File Organization

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # Reusable React components
│   ├── ui/          # shadcn/ui base components
│   └── layout/      # Layout components
├── lib/             # Utilities and helpers
├── types/           # TypeScript type definitions
└── hooks/           # Custom React hooks
```

### Naming Conventions

- **Files**: kebab-case (`project-card.tsx`)
- **Components**: PascalCase (`ProjectCard`)
- **Functions**: camelCase (`formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`SITE_CONFIG`)
- **Types/Interfaces**: PascalCase (`Project`, `Post`)

### Styling

- Use Tailwind CSS utilities
- Follow mobile-first responsive design
- Use CSS variables for theme colors
- Keep custom CSS minimal

### Accessibility

- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper heading hierarchy
- Test with screen readers
- Maintain color contrast ratios (WCAG AA)

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(blog): add reading time calculation
fix(contact): resolve form submission error
docs(readme): update installation instructions
```

### Pull Requests

1. Create a feature branch
2. Make your changes
3. Run tests: `pnpm test:e2e`
4. Run linter: `pnpm lint`
5. Format code: `pnpm format`
6. Commit with meaningful messages
7. Push and create PR
8. Wait for CI checks to pass
9. Request review

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Lighthouse score maintained

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings generated
```

## Testing

### Running Tests

```bash
# Run Playwright tests
pnpm test:e2e

# Run in headed mode (see browser)
pnpm exec playwright test --headed

# Run specific test
pnpm exec playwright test tests/smoke.spec.ts
```

### Writing Tests

Tests are located in `tests/` directory using Playwright.

**Test Structure:**
```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path')
    // Test assertions
    await expect(page.locator('h1')).toBeVisible()
  })
})
```

### Performance Testing

```bash
# Build and test production
pnpm build
pnpm start

# Run Lighthouse
lighthouse http://localhost:3000 --view
```

Target scores: **95+** for all metrics

## Code Quality

### Linting

```bash
# Run ESLint
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### Type Checking

```bash
# Check TypeScript types
pnpm typecheck
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

## Adding Features

### New Page

1. Create file in `src/app/[route]/page.tsx`
2. Add metadata export
3. Implement page component
4. Add to navigation if needed
5. Update sitemap priority if needed

### New Component

1. Create file in `src/components/[name].tsx`
2. Define TypeScript interface for props
3. Implement component
4. Add to relevant stories (if using Storybook)
5. Document usage in component file

### New Content Type

1. Define TypeScript interface in `src/types/`
2. Update MDX loader in `src/lib/mdx.ts`
3. Create example content
4. Add schema markup if needed

## Documentation

### Code Comments

- Write self-documenting code
- Add comments for complex logic
- Document function parameters
- Explain "why" not "what"

### Documentation Files

- Update README for major changes
- Update SEO_PLAYBOOK for SEO changes
- Update DEPLOYMENT for deploy changes
- Create guides for new features

## Performance Best Practices

- Optimize images before upload
- Use next/image for all images
- Lazy load below-the-fold content
- Code split heavy components
- Minimize client-side JavaScript
- Use ISR for dynamic pages

## Security Best Practices

- Never commit secrets
- Use environment variables
- Validate all inputs
- Sanitize user data
- Keep dependencies updated
- Follow OWASP guidelines

## Getting Help

- Check existing documentation first
- Search closed issues on GitHub
- Ask in project discussions
- Tag maintainers in PRs/issues

## Issue Reporting

**Bug Report Template:**

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
[Add screenshots if applicable]

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]
```

**Feature Request Template:**

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should this work?

## Alternatives Considered
Other approaches you've considered

## Additional Context
Any other relevant information
```

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## Questions?

Feel free to reach out:
- Create a GitHub issue
- Start a discussion
- Contact the maintainers

Thank you for contributing! 🎉

