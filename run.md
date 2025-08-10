# Quick Run Commands

## Setup
```bash
npm install
npm run test:db:setup
```

## Development
```bash
npm run dev          # Start Next.js development server
npm run test:watch   # Run tests in watch mode
```

## Testing
```bash
npm test             # Run all tests
npm run test:coverage # Run tests with coverage report
npm run test:unit    # Unit tests only
npm run test:e2e     # End-to-end tests
```

## TDD Workflow
```bash
npm run tdd:red      # RED: Write failing tests
npm run tdd:green    # GREEN: Make tests pass
npm run tdd:refactor # REFACTOR: Improve code
```

## Build & Deploy
```bash
npm run build        # Production build
npm run start        # Start production server
```

## Database
```bash
npx prisma migrate dev    # Apply database migrations
npx prisma studio         # Open database browser
```