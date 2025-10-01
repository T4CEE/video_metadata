import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'dummy-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
}

export const authService = {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  },

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  },

  generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET);
  },

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      return null;
    }
  },

  async authenticateRequest(request: NextRequest): Promise<JWTPayload | null> {
    
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer')) {
      const token = authHeader.substring(7);
      const payload = this.verifyToken(token);
      if (payload) return payload;
    }

    const apiKey = request.headers.get('x-api-key');
    if (apiKey) {
      const user = await prisma.user.findUnique({
        where: { apiKey },
        select: { id: true, email: true },
      });
      if (user) {
        return { userId: user.id, email: user.email };
      }
    }

    return null;
  },
};