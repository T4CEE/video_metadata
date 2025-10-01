import { OpenAPIV3 } from 'openapi-types';

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Video Metadata Management API',
    version: '1.0.0',
    description: 'RESTful API for managing video metadata with authentication and caching',
    contact: {
      name: 'API Support',
      email: 'support@videoapimanagement.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
    },
    schemas: {
      Video: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          duration: { type: 'number' },
          genre: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          thumbnailUrl: { type: 'string' },
          videoUrl: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 },
                  name: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
          },
          '400': {
            description: 'Validation error',
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
          },
          '401': {
            description: 'Invalid credentials',
          },
        },
      },
    },
    '/videos': {
      get: {
        tags: ['Videos'],
        summary: 'Get all videos with filtering',
        security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
        parameters: [
          {
            name: 'genre',
            in: 'query',
            schema: { type: 'string' },
          },
          {
            name: 'tags',
            in: 'query',
            schema: { type: 'string' },
            description: 'Comma-separated tags',
          },
          {
            name: 'search',
            in: 'query',
            schema: { type: 'string' },
          },
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 10 },
          },
        ],
        responses: {
          '200': {
            description: 'Paginated list of videos',
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
      post: {
        tags: ['Videos'],
        summary: 'Create a new video',
        security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  duration: { type: 'number' },
                  genre: { type: 'string' },
                  tags: { type: 'array', items: { type: 'string' } },
                  thumbnailUrl: { type: 'string' },
                  videoUrl: { type: 'string' },
                },
                required: ['title', 'duration', 'genre', 'tags'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Video created successfully',
          },
        },
      },
    },
    '/videos/{id}': {
      get: {
        tags: ['Videos'],
        summary: 'Get video by ID',
        security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Video details',
          },
          '404': {
            description: 'Video not found',
          },
        },
      },
      put: {
        tags: ['Videos'],
        summary: 'Update video',
        security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  duration: { type: 'number' },
                  genre: { type: 'string' },
                  tags: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Video updated successfully',
          },
        },
      },
      delete: {
        tags: ['Videos'],
        summary: 'Delete video',
        security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Video deleted successfully',
          },
        },
      },
    },
  },
};