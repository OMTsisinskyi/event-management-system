# Event Management System - Backend

The backend application of the Event Management System built with NestJS, TypeScript, and PostgreSQL.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- ESLint
- Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create PostgreSQL database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE event_management;

# Exit psql
\q
```

3. Create `.env` file with the following variables:

```
DATABASE_URL="postgresql://user:password@localhost:5432/event_management"
```

4. Set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Available Scripts

- `npm run start:dev` - Start development server
- `npm run build` - Build production version

## Project Structure

```
src/
├── events/          # Events module
├── categories       # Categories module
├── prisma/          # Database service
└── main.ts          # Application entry point
```

## API Documentation

The API documentation is available at `http://localhost:3000/api` when running in development mode.

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `GET /api/events/:id/similar` - Get similar events (based on location)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `DELETE /api/categories/:id` - Delete category

## Data Transfer Objects (DTOs)

### Event DTOs
- `CreateEventDto`:
  - `title`: string (3-100 chars) - Event title
  - `date`: Date - Event date
  - `location`: LocationDto - Event location
  - `description`: string (10-500 chars) - Event description
  - `categoryId`: number - ID of the event category

- `UpdateEventDto`: Partial version of CreateEventDto
- `LocationDto`:
  - `name`: string - Location name
  - `lat`: number (-90 to 90) - Latitude
  - `lng`: number (-180 to 180) - Longitude

### Category DTOs
- `CreateCategoryDto`:
  - `name`: string (2-50 chars) - Category name

## Database Schema

The database schema is defined in `prisma/schema.prisma`. To modify the schema:

1. Update the schema file
2. Generate migration: `npx prisma migrate dev`
3. Apply migration: `npx prisma migrate deploy`

