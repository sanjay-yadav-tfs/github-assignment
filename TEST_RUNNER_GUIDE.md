# Test Running Scripts

## Backend Tests

### Install test dependencies
```bash
cd backend
npm install --save-dev jest supertest
```

### Run all tests
```bash
npm test
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test files
```bash
# Integration tests
npm test -- tests/integration/auth.test.js
npm test -- tests/integration/users.test.js

# Unit tests
npm test -- tests/unit/user.model.test.js
npm test -- tests/unit/services.test.js
npm test -- tests/unit/validation.test.js
npm test -- tests/unit/auth.middleware.test.js
```

### Run tests in watch mode
```bash
npm test -- --watch
```

## Frontend Tests

### Install test dependencies
```bash
cd frontend
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitejs/plugin-react jsdom vitest @vitest/coverage-v8 msw
```

### Run all tests
```bash
npm test
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test files
```bash
# Component tests
npm test -- src/test/UserLogin.test.jsx
npm test -- src/test/UserRegister.test.jsx
npm test -- src/test/AdminDashboard.test.jsx
npm test -- src/test/PendingUsersTable.test.jsx

# API tests
npm test -- src/test/authAPI.test.js
npm test -- src/test/usersAPI.test.js
```

## Docker Test Environment

### Build and run tests in Docker
```bash
# Backend tests
docker-compose run --rm backend npm test

# Frontend tests
docker-compose run --rm frontend npm test
```

## Continuous Integration

### GitHub Actions workflow example
```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm ci
      - run: cd backend && npm test
      
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm ci
      - run: cd frontend && npm test
```

## Test Database Setup

For integration tests, ensure you have a test database configured:

### Environment Variables (.env.test)
```
NODE_ENV=test
DB_NAME=user_onboarding_test
DB_USER=your_test_user
DB_PASSWORD=your_test_password
DB_HOST=localhost
DB_PORT=1433
JWT_SECRET=test_jwt_secret
```

## Coverage Reports

### View coverage reports
```bash
# Backend
cd backend && npm run test:coverage
open coverage/lcov-report/index.html

# Frontend
cd frontend && npm run test:coverage
open coverage/index.html
```

## Debugging Tests

### Debug backend tests
```bash
cd backend
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

### Debug frontend tests
```bash
cd frontend
npm test -- --inspect-brk
```