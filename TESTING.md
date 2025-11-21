# Testing Guide - Corporate Paso a Paso

## Overview
This document explains the testing setup and guidelines for the Corporate Paso a Paso website project. The project uses Jest and React Testing Library for comprehensive test coverage.

## Testing Stack

### Dependencies
- **Jest**: Testing framework
- **React Testing Library**: Component testing utility
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/jest-dom**: Custom Jest matchers
- **Babel**: JavaScript transpiler for tests

## Project Structure

```
client/
├── __mocks__/                    # Mock implementations
│   ├── fileMock.js              # Static asset mock
│   └── svgMock.js               # SVG component mock
├── src/
│   ├── __tests__/               # Test files
│   │   ├── Form.test.js         # Form component tests
│   │   ├── sanitizer.test.js    # Sanitization logic tests
│   │   └── imageOptimization.test.js  # Image utility tests
│   ├── setupTests.js            # Jest configuration
│   └── ...
├── jest.config.js               # Jest configuration
└── .babelrc                      # Babel configuration
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Specific Test File
```bash
npm test Form.test.js
```

### Run Tests with Coverage Report
```bash
npm test -- --coverage
```

### Run Tests with Verbose Output
```bash
npm test -- --verbose
```

## Test Coverage

### Current Coverage Targets
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

### Current Tests

#### 1. **Sanitizer Service Tests** (`sanitizer.test.js`)
Tests for XSS prevention and input sanitization:

**Test Cases:**
- `sanitizeInput()`: Remove HTML tags, escape entities, trim whitespace
- `sanitizeEmail()`: Preserve valid email, remove suspicious chars
- `sanitizeFormData()`: Sanitize all form fields, handle nested objects, preserve arrays

**Example:**
```javascript
import sanitizer from '../services/sanitizer';

test('should remove HTML tags', () => {
  const result = sanitizer.sanitizeInput('<script>alert("xss")</script>Hello');
  expect(result).not.toContain('<script>');
});
```

#### 2. **Form Component Tests** (`Form.test.js`)
Integration tests for the contact form:

**Test Cases:**
- Render all required form fields
- Validate required field checks
- Validate field length constraints
- Validate email format
- Accept valid form data
- Clear form after submission
- Handle submission errors
- Verify accessibility attributes (aria-describedby)

**Example:**
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

test('should show validation error for empty nombre', async () => {
  render(<Form />);
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/El nombre es requerido/i)).toBeInTheDocument();
  });
});
```

#### 3. **Image Optimization Tests** (`imageOptimization.test.js`)
Unit tests for image utility functions:

**Test Cases:**
- `generateSrcSet()`: Create responsive srcset strings
- `getImageSizes()`: Generate sizes attribute
- `supportsWebP()`: Browser capability detection
- `getOptimalImageFormat()`: Choose best image format
- `preloadImages()`: Create preload links
- `lazyLoadImage()`: Lazy load with IntersectionObserver

**Example:**
```javascript
import { generateSrcSet } from '../utils/imageOptimization';

test('should generate srcset with multiple sizes', () => {
  const srcset = generateSrcSet('/images/hero', ['320', '640']);
  expect(srcset).toContain('320w');
  expect(srcset).toContain('640w');
});
```

## Writing New Tests

### Test File Naming Convention
- **Pattern**: `ComponentName.test.js` or `utility.test.js`
- **Location**: `src/__tests__/` directory

### Basic Test Structure
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from '../components/MyComponent';

describe('MyComponent', () => {
  it('should render with required text', () => {
    render(<MyComponent />);
    expect(screen.getByText(/required text/i)).toBeInTheDocument();
  });
});
```

### Common Testing Patterns

#### Testing User Interactions
```javascript
import userEvent from '@testing-library/user-event';

test('should update input value', async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  const input = screen.getByLabelText(/Nombre/i);
  await user.type(input, 'Juan');
  
  expect(input.value).toBe('Juan');
});
```

#### Testing Async Operations
```javascript
import { waitFor } from '@testing-library/react';

test('should show error after failed submission', async () => {
  render(<Form />);
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});
```

#### Testing Accessibility
```javascript
test('should have proper aria attributes', () => {
  render(<Form />);
  const input = screen.getByLabelText(/Nombre/i);
  
  expect(input).toHaveAttribute('aria-describedby');
});
```

### Mocking

#### Mock External Modules
```javascript
jest.mock('../services/logger');

import logger from '../services/logger';

test('should log error', () => {
  logger.error('test');
  expect(logger.error).toHaveBeenCalledWith('test');
});
```

#### Mock Fetch Requests
```javascript
global.fetch = jest.fn();

test('should submit form', async () => {
  fetch.mockResolvedValueOnce(
    new Response(JSON.stringify({}), { status: 200 })
  );
  
  // Test code...
});
```

## Best Practices

### 1. **Test User Behavior, Not Implementation**
❌ **Bad**: Test that a specific function was called
✅ **Good**: Test that clicking a button updates the DOM

### 2. **Use Semantic Queries**
❌ **Bad**: `document.querySelector('.btn')`
✅ **Good**: `screen.getByRole('button', { name: /Submit/i })`

### 3. **Test Accessibility**
- Always verify aria attributes exist
- Test keyboard navigation where applicable
- Ensure form labels are associated with inputs

### 4. **Keep Tests Focused**
- One assertion or behavior per test when possible
- Use descriptive test names
- Avoid testing multiple features in one test

### 5. **Use Setup and Teardown**
```javascript
describe('MyComponent', () => {
  beforeEach(() => {
    // Setup code
  });
  
  afterEach(() => {
    // Cleanup code
  });
});
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v2
```

## Troubleshooting

### Common Issues

**Problem**: `TypeError: document.createElement is not a function`
**Solution**: Ensure `testEnvironment: 'jsdom'` is set in jest.config.js

**Problem**: `ReferenceError: IntersectionObserver is not defined`
**Solution**: Mock IntersectionObserver in setupTests.js (already done)

**Problem**: `Cannot find module '@testing-library/react'`
**Solution**: Run `npm install --save-dev @testing-library/react`

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Future Test Coverage Goals

- [ ] Unit tests for validation functions (constants.js)
- [ ] Component snapshot tests for complex layouts
- [ ] E2E tests using Cypress or Playwright
- [ ] Performance testing (React Profiler)
- [ ] Visual regression testing
- [ ] 80%+ code coverage for critical paths
