import { prisma } from '@/lib/prisma';
import { authService } from '@/lib/auth';

// Mock Next.js request/response
const mockRequest = (body: any, headers: Record<string, string> = {}) => ({
  json: async () => body,
  headers: new Headers(headers),
  url: 'http://localhost:3000/api/test',
});

// console.log("I am mock request", mockRequest)

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Authentication API', () => {
  beforeAll(async () => {
    // Cleaning test database
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const hashedPassword = await authService.hashPassword(userData.password);
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
          apiKey: 'test-api-key-123',
        },
      });

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password);
    });

    it('should fail with duplicate email', async () => {
      const existingUser = await prisma.user.findFirst({
        where: { email: 'test@example.com' },
      });

      expect(existingUser).toBeDefined();

      // Attempt to create duplicate
      await expect(
        prisma.user.create({
          data: {
            email: 'test@example.com',
            password: 'hashedpass',
            apiKey: 'another-key',
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });

      expect(user).toBeDefined();

      const isValidPassword = await authService.comparePassword(
        'password123',
        user!.password
      );

      expect(isValidPassword).toBe(true);

      const token = authService.generateToken({
        userId: user!.id,
        email: user!.email,
      });

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should fail with incorrect password', async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'test@example.com' },
      });

      const isValidPassword = await authService.comparePassword(
        'wrongpassword',
        user!.password
      );

      expect(isValidPassword).toBe(false);
    });
  });

  describe('JWT Token Validation', () => {
    it('should verify valid JWT token', () => {
      const payload = {
        userId: 'test-user-id',
        email: 'test@example.com',
      };

      const token = authService.generateToken(payload);
      const verified = authService.verifyToken(token);

      expect(verified).toBeDefined();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.email).toBe(payload.email);
    });

    it('should reject invalid JWT token', () => {
      const invalidToken = 'invalid.token.here';
      const verified = authService.verifyToken(invalidToken);

      expect(verified).toBeNull();
    });
  });
});