import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authService } from '@/lib/auth';
import { randomBytes } from 'crypto';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    // User check
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password and generate API key
    const hashedPassword = await authService.hashPassword(password);
    const apiKey = randomBytes(32).toString('hex');

    // Create new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        apiKey,
      },
      select: {
        id: true,
        email: true,
        name: true,
        apiKey: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = authService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return NextResponse.json({
      message: 'User registered successfully',
      user,
      token,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}