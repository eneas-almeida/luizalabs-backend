# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Initial setup
docker-compose up -d              # Start MongoDB container
cp .env-example .env             # Create environment file
yarn install                      # Install dependencies

# Development
yarn dev                          # Run development server with nodemon and debugging

# Testing
yarn test                         # Run all unit tests with Jest
```

## Architecture Overview

This project implements **Clean Architecture** with clear separation of concerns. The request flow follows this pattern:

```
HTTP Request → Routes → Controllers → Usecases → Repositories → MongoDB
                ↓
           Middlewares (auth, errors, request-id)
```

### Main Entry Point

The application initializes using a **Builder Pattern** in [src/app.js](src/app.js):

```javascript
const main = new MainBuild();
main
    .setBanner()
    .setMiddlewares()
    .setDatabase()
    .then((res) => res.setRoutes().then((res) => res.setCustomErrors().build()))
```

## Key Architectural Patterns

### 1. Factory Pattern for Dependency Injection

All dependencies are wired through factories in [src/main/factories/controllers/](src/main/factories/controllers/). Example:

```javascript
// src/main/factories/controllers/accounts-controller.factory.js
class AccountsControllerFactory {
    constructor() {
        const accountsRepository = new AccountsRepository();
        const cryptHashProvider = new BcryptHashProvider();
        const uniqueIdHashProvider = new UUIDHashProvider();
        const tokenProvider = new JwtTokenProvider();

        this.createAccountController = new CreateAccountController(
            new CreateAccountUsecase(accountsRepository, cryptHashProvider, uniqueIdHashProvider, tokenProvider),
            new CreateFavoriteUsecase(new FavoritesRepository(), uniqueIdHashProvider)
        );
    }
}
```

### 2. Layer Responsibilities

**Routes** ([src/main/routes/](src/main/routes/))
- Define HTTP endpoints and map to controllers
- Apply authentication middleware where needed
- Use factory pattern to instantiate controllers

**Controllers** ([src/controllers/](src/controllers/))
- Handle HTTP-specific concerns (req/res)
- Create DTOs from request body
- Delegate business logic to usecases
- Return HTTP responses with appropriate status codes

**Usecases** ([src/usecases/](src/usecases/))
- Contain pure business logic, independent of HTTP
- Validate input via DTOs
- Throw `AppError` for business rule violations
- Orchestrate repositories and providers

**DTOs** ([src/usecases/*/dtos/](src/usecases/))
- Validate and structure input data
- Provide type-safe getters for properties
- Keep validation logic centralized

**Repositories** ([src/infra/db/repositories/](src/infra/db/repositories/))
- Abstract database operations
- Use Mongoose schemas
- Return domain objects

**Schemas** ([src/infra/db/schemas/](src/infra/db/schemas/))
- Define Mongoose models
- Configure indexes
- Set default values and timestamps

### 3. Provider Pattern for Cross-Cutting Concerns

Providers abstract external dependencies in [src/infra/providers/](src/infra/providers/):

- **BcryptHashProvider** - Password hashing and comparison
- **JwtTokenProvider** - JWT token generation and verification
- **UUIDHashProvider** - Unique ID generation
- **AxiosHttpClientProvider** - HTTP client with retry logic

### 4. Adapter Pattern for External Integrations

External APIs are accessed via adapters in [src/main/adapters/integrations/](src/main/adapters/integrations/) that delegate to integration implementations in [src/external/integrations/](src/external/integrations/).

## Authentication and Middleware

### Protected Routes

Routes requiring authentication use the middleware in [src/main/middlewares/authentication.js](src/main/middlewares/authentication.js):

```javascript
router.get('/favorites', authentication, listFavoritesController.handle.bind(listFavoritesController));
```

The middleware:
- Validates `Authorization: Bearer <token>` header
- Verifies JWT token using `JwtTokenProvider.verify()`
- Attaches decoded payload to `req.auth`
- Throws `AppError` for invalid/missing tokens

### Global Middlewares

Applied in [src/main/configs/middlewares.js](src/main/configs/middlewares.js):

- `helmet()` - Security headers
- `morgan('dev')` - HTTP request logging
- `requestId` - Generates unique ID for each request
- `cors()` - CORS configuration
- `express.json()` - Body parsing

### Error Handling

The custom error handler in [src/main/middlewares/custom-errors.js](src/main/middlewares/custom-errors.js):

- Catches all errors using `express-async-errors`
- Returns structured JSON for `AppError` instances
- In development: uses `youch` for detailed error traces
- In production: returns generic 500 errors for security

**Usage in usecases:**
```javascript
throw new AppError('Account already exists', 409);  // statusCode, metadata optional
```

## Database Configuration

**Database:** MongoDB via Mongoose

**Connection:** Configured in [src/main/configs/db.js](src/main/configs/db.js) using environment variables:

```
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=luizalabs
MONGODB_USER=luizalabs
MONGODB_PASSWORD=luizalabs
```

**Schemas** are defined with indexes and use manual ID assignment via UUID.

## Testing Patterns

**Framework:** Jest with coverage for usecases

**Test Structure:**
```
__tests__/
├── mocks/
│   ├── repositories/     # Mock implementations of repositories
│   ├── providers/        # Mock implementations of providers
│   └── integrations/     # Mock implementations of external integrations
└── usecases/             # Unit tests for business logic
```

**Testing Pattern:**

Tests use dependency injection with mocks to isolate business logic:

```javascript
describe('CreateAccountUsecase', () => {
    let createAccountUsecase;
    let accountsMockRepository;
    let cryptHashMockProvider;

    beforeEach(() => {
        accountsMockRepository = new AccountsMockRepository();
        cryptHashMockProvider = new CryptHashMockProvider();
        // ... other mocks

        createAccountUsecase = new CreateAccountUsecase(
            accountsMockRepository,
            cryptHashMockProvider,
            // ... other dependencies
        );
    });

    it('Should create an account', async () => {
        const dto = new CreateAccountDto({ name: 'Test', email: 'test@test.com', password: '123456' });
        await createAccountUsecase.execute(dto);
    });
});
```

**Mock Repositories** maintain in-memory arrays to simulate database operations without actual DB connections.

## API Endpoints

All routes are prefixed with `/api/v1`:

**Public Routes:**
- `POST /api/v1/accounts/create` - Create account
- `POST /api/v1/accounts/login` - Login and get JWT token

**Protected Routes** (require `Authorization: Bearer <token>`):
- `POST /api/v1/favorites` - Create favorite list
- `GET /api/v1/favorites` - List user's favorites
- `GET /api/v1/favorites/:id` - Get specific favorite
- `PUT /api/v1/favorites/:id` - Update favorite
- `DELETE /api/v1/favorites/:id` - Delete favorite
- `PATCH /api/v1/favorites/manager` - Add/remove products from favorites
- `GET /api/v1/products` - Get products from external API

## Directory Structure

```
src/
├── main/                    # Application core configuration
│   ├── adapters/           # Adapters for external services
│   ├── configs/            # App, DB, routes, middleware configs
│   ├── errors/             # Custom error classes
│   ├── factories/          # Dependency injection factories
│   ├── middlewares/        # Express middlewares
│   └── routes/             # Route definitions
├── controllers/            # HTTP request handlers
├── usecases/              # Business logic layer
│   └── */dtos/            # Data transfer objects with validation
├── infra/                 # Infrastructure layer
│   ├── db/
│   │   ├── repositories/  # Data access layer
│   │   └── schemas/       # Mongoose schemas
│   └── providers/         # Cross-cutting services (hash, token, HTTP)
├── external/              # External API integrations
└── domain/                # Domain entities

__tests__/                 # Unit tests with mocks
```

## Environment Variables

Required in `.env`:

```bash
# MongoDB
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_NAME=luizalabs
MONGODB_USER=luizalabs
MONGODB_PASSWORD=luizalabs

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d

# API
API_AMBIENT=development
PORT=3000
```
