# 🧪 Testing Guide

## Overview

The Imposter App uses Vitest for fast and reliable testing. This guide covers testing strategies, conventions, and best practices.

## Testing Stack

- **Test Runner**: Vitest 3.2.4
- **Testing Library**: @testing-library/react 16.3.0
- **Environment**: jsdom for DOM simulation
- **Coverage**: Built-in Vitest coverage

## Available Scripts

```bash
npm run test         # Run tests in watch mode
npm run test:ui      # Visual test interface
npm run test:run     # Single test run (CI mode)
```

## Testing Conventions

### File Naming
- Test files: `*.test.tsx` or `*.test.ts`
- Test utilities: `test-utils.ts`
- Setup files: `test-setup.ts`

### File Structure
```
src/
├── components/
│   ├── ConfigStep.tsx
│   └── ConfigStep.test.tsx
├── helpers/
│   ├── StaticMethods.ts
│   └── StaticMethods.test.ts
└── test-setup.ts
```

## Component Testing

### Basic Component Test
```typescript
import { render, screen } from '@testing-library/react';
import { ConfigStep } from './ConfigStep';

describe('ConfigStep', () => {
  const mockProps = {
    setItemListIdentifier: vi.fn(),
    itemListIdentifier: 0,
    UpdatePlayerNumber: vi.fn(),
  };

  it('renders configuration form', () => {
    render(<ConfigStep {...mockProps} />);
    
    expect(screen.getByText('Select Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Players')).toBeInTheDocument();
  });
});
```

### User Interaction Testing
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('updates player count on form submission', async () => {
  const user = userEvent.setup();
  const mockUpdatePlayerNumber = vi.fn();
  
  render(<ConfigStep {...mockProps} UpdatePlayerNumber={mockUpdatePlayerNumber} />);
  
  const input = screen.getByLabelText('Number of Players');
  const form = screen.getByRole('form');
  
  await user.clear(input);
  await user.type(input, '5');
  await user.click(screen.getByRole('button', { name: /start/i }));
  
  expect(mockUpdatePlayerNumber).toHaveBeenCalledWith(5);
});
```

## Utility Function Testing

```typescript
import { getRandomFromList } from './StaticMethods';

describe('StaticMethods', () => {
  describe('getRandomFromList', () => {
    it('returns an item from the list', () => {
      const list = ['item1', 'item2', 'item3'];
      const result = getRandomFromList(list);
      
      expect(list).toContain(result);
    });

    it('handles single item list', () => {
      const list = ['onlyItem'];
      const result = getRandomFromList(list);
      
      expect(result).toBe('onlyItem');
    });
  });
});
```

## Testing Best Practices

### 1. Test Structure (AAA Pattern)
```typescript
it('should do something', () => {
  // Arrange
  const mockFn = vi.fn();
  
  // Act
  render(<Component onAction={mockFn} />);
  fireEvent.click(screen.getByRole('button'));
  
  // Assert
  expect(mockFn).toHaveBeenCalled();
});
```

### 2. Descriptive Test Names
- ✅ `'displays error message when form is invalid'`
- ❌ `'test error'`

### 3. Test User Behavior, Not Implementation
```typescript
// ✅ Good - tests behavior
expect(screen.getByText('Welcome')).toBeInTheDocument();

// ❌ Avoid - tests implementation
expect(component.state.showWelcome).toBe(true);
```

### 4. Use Semantic Queries
```typescript
// ✅ Preferred order
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')
screen.getByText('Hello World')

// ❌ Avoid when possible
screen.getByTestId('submit-button')
```

### 5. Mock External Dependencies
```typescript
// Mock framer-motion for tests
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
  },
  AnimatePresence: ({ children }: any) => children,
}));
```

## Test Environment Setup

The test environment is configured in `src/test-setup.ts`:

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

## Coverage Guidelines

- **Minimum coverage**: 80% for new code
- **Critical paths**: 100% coverage for game logic
- **Components**: Focus on user interactions and edge cases
- **Utilities**: Test all public functions

## Debugging Tests

### Using Vitest UI
```bash
npm run test:ui
```

### Debug in VS Code
1. Set breakpoints in test files
2. Use "Debug Current Test" command
3. Step through test execution

### Screen Debug
```typescript
import { screen } from '@testing-library/react';

// Debug current DOM state
screen.debug();

// Debug specific element
screen.debug(screen.getByRole('button'));
```

## Common Testing Patterns

### Form Testing
```typescript
it('validates form input', async () => {
  const user = userEvent.setup();
  
  render(<Form />);
  
  // Test validation
  await user.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/required/i)).toBeInTheDocument();
  
  // Test successful submission
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
});
```

### Animation Testing
```typescript
// Mock animations for faster, more reliable tests
const mockMotion = {
  div: 'div',
  initial: {},
  animate: {},
  exit: {},
};

vi.mock('framer-motion', () => ({
  motion: mockMotion,
  AnimatePresence: ({ children }: any) => children,
}));
```

---

*For more advanced testing scenarios, refer to the [Vitest documentation](https://vitest.dev/) and [Testing Library guides](https://testing-library.com/docs/react-testing-library/intro/).*
