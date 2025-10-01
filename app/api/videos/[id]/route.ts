import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authService } from '@/lib/auth';
import { cacheService } from '@/lib/redis';

const updateVideoSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  duration: z.number().positive().optional(),
  genre: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  thumbnailUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
});

// Get single video
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authService.authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const video = await prisma.video.findFirst({
      where: {
        id: params.id,
        userId: user.userId,
      },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ video });
  } catch (error) {
    console.error('GET video error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update video
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authService.authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updateData = updateVideoSchema.parse(body);

    // Check if video exists and belongs to user
    const existingVideo = await prisma.video.findFirst({
      where: {
        id: params.id,
        userId: user.userId,
      },
    });

    if (!existingVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const video = await prisma.video.update({
      where: { id: params.id },
      data: updateData,
    });

    // Invalidate cache
    await cacheService.delPattern(`videos:${user.userId}:*`);

    return NextResponse.json({
      message: 'Video updated successfully',
      video,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }
    console.error('PUT video error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authService.authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if video exists and belongs to user
    const existingVideo = await prisma.video.findFirst({
      where: {
        id: params.id,
        userId: user.userId,
      },
    });

    if (!existingVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    await prisma.video.delete({
      where: { id: params.id },
    });

    // Invalidate cache
    await cacheService.delPattern(`videos:${user.userId}:*`);

    return NextResponse.json({
      message: 'Video deleted successfully',
    });
  } catch (error) {
    console.error('DELETE video error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}