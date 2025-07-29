# Restoku

<!-- A modern fullstack web application for restaurant ordering system built with a clean architecture approach.

## Tech Stack

### Backend (API)

- **Framework**: NestJS - A progressive Node.js framework for building efficient and scalable server-side applications
- **Database**: PostgreSQL with Prisma ORM for type-safe database access
- **Authentication**: JWT-based authentication with Passport.js
- **Validation**: class-validator and class-transformer for data validation
- **Documentation**: Swagger/OpenAPI integration
- **Testing**: Jest for unit and e2e testing

### Frontend (Web)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router DOM v7
- **Styling**: TailwindCSS for utility-first CSS framework
- **Development**: ESLint for code linting -->

### Development Tools

- **Monorepo**: Turborepo for managing the monorepo workspace
- **Package Manager**: npm with workspaces
- **Database Migration**: Prisma Migrate
- **Code Quality**: ESLint configurations for both frontend and backend

## 📁 Project Structure

```text
restoku/
├── apps/
│   ├── api/          # NestJS backend application
│   │   ├── src/
│   │   ├── prisma/   # Database schema and migrations
│   │   └── test/
│   └── web/          # React frontend application
│       ├── src/
│       └── public/
├── package.json      # Root package.json with workspaces
└── turbo.json        # Turborepo configuration
```

<!-- ## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm

### Installation

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables for database connection

4. Run database migrations:

   ```bash
   cd apps/api
   npx prisma migrate dev
   ```

5. Start development servers:

   ```bash
   npm run dev
   ```

This will start both the API server and web application concurrently using Turborepo. -->
