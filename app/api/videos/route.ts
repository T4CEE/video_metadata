import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authService } from '@/lib/auth';
import { cacheService } from '@/lib/redis';
import { PaginatedResponse } from '@/types';

const videoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  duration: z.number().positive(),
  genre: z.string().min(1),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
});

// GET - Fetch videos with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const user = await authService.authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build cache key
    const cacheKey = `videos:${user.userId}:${genre || 'all'}:${tags?.join('-') || 'all'}:${search || 'all'}:${page}:${limit}`;
    
    // Check cache
    const cachedData = await cacheService.get<PaginatedResponse<any>>(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // Build where clause
    const where: any = { userId: user.userId };
    
    if (genre) {
      where.genre = genre;
    }
    
    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags };
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    //queries in parallel
    const [videos, total] = await Promise.all([
      prisma.video.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          genre: true,
          tags: true,
          thumbnailUrl: true,
          videoUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.video.count({ where }),
    ]);

    const response: PaginatedResponse<any> = {
      data: videos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    // Cache the result for 5 minutes
    await cacheService.set(cacheKey, response, 300);

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET videos error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new video
export async function POST(request: NextRequest) {
  try {
    const user = await authService.authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const videoData = videoSchema.parse(body);

    const video = await prisma.video.create({
      data: {
        ...videoData,
        userId: user.userId,
      },
    });

    // Invalidate cache for this user
    await cacheService.delPattern(`videos:${user.userId}:*`);

    return NextResponse.json({
      message: 'Video created successfully',
      video,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }
    console.error('POST video error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}