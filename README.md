# Video Metadata Management API

A scalable RESTful API for managing video metadata built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- CRUD operations for video metadata (title, description, duration, genre, tags)
- Advanced filtering and pagination
- JWT authentication
- Redis caching
- PostgreSQL with optimized queries
- Comprehensive unit tests
- Swagger API documentation

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 14+ (TypeScript)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT
- **Cache**: Redis
- **Testing**: Jest

## Quick Start

```bash
# Install dependencies
bun install

# Setup environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL | JWT_SECRET | REDIS_URL

# Run migrations and seed data
bun prisma:migrate
bun run seed

# Start development server
bun dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/video_metadata_db"
JWT_SECRET="your-secret-key"
REDIS_URL="redis://localhost:6379"
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login and get JWT token

### Videos (requires JWT)
- `POST /api/videos` - Create video
- `GET /api/videos` - List videos (supports filtering & pagination)
- `GET /api/videos/:id` - Get video by ID
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video

### Query Parameters
```
GET /api/videos?page=1&limit=20&genre=Action&tags=thriller&search=inception
```

## Authentication

Include JWT token in request headers:
```bash
Authorization: Bearer <your-jwt-token>
```

## Testing

```bash
bun test                # Run all tests
```

## API Documentation

Swagger UI available at: `http://localhost:3000/api-docs`
