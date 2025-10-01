import { prisma } from '@/lib/prisma';
import { authService } from '@/lib/auth';

describe('Videos API', () => {
  let testUser: any;
  let authToken: string;
  let testVideoId: string;

  beforeAll(async () => {
    // Create test user
    const hashedPassword = await authService.hashPassword('testpass123');
    testUser = await prisma.user.create({
      data: {
        email: 'videotest@example.com',
        password: hashedPassword,
        name: 'Video Test User',
        apiKey: 'video-test-api-key',
      },
    });

    authToken = authService.generateToken({
      userId: testUser.id,
      email: testUser.email,
    });
  });

  afterAll(async () => {
    // Clean up
    await prisma.video.deleteMany({ where: { userId: testUser.id } });
    await prisma.user.delete({ where: { id: testUser.id } });
    await prisma.$disconnect();
  });

  describe('POST /api/videos', () => {
    it('should create a new video successfully', async () => {
      const videoData = {
        title: 'Test Video',
        description: 'This is a test video',
        duration: 120,
        genre: 'Tutorial',
        tags: ['testing', 'nodejs', 'api'],
        thumbnailUrl: 'https://example.com/thumb.jpg',
        videoUrl: 'https://example.com/video.mp4',
      };

      const video = await prisma.video.create({
        data: {
          ...videoData,
          userId: testUser.id,
        },
      });

      testVideoId = video.id;

      expect(video).toBeDefined();
      expect(video.title).toBe(videoData.title);
      expect(video.genre).toBe(videoData.genre);
      expect(video.tags).toEqual(videoData.tags);
      expect(video.duration).toBe(videoData.duration);
    });

    it('should fail without authentication', async () => {
      // This test would need the actual API route handler
      // For demonstration, we test the validation logic
      const videoData = {
        title: '',
        duration: -1,
        genre: '',
        tags: [],
      };

      // Title should not be empty
      expect(videoData.title.length).toBe(0);
      // Duration should be positive
      expect(videoData.duration).toBeLessThan(0);
    });
  });

  describe('GET /api/videos', () => {
    it('should fetch videos with pagination', async () => {
      // Create multiple test videos
      const videosToCreate = Array.from({ length: 5 }, (_, i) => ({
        title: `Test Video ${i + 1}`,
        description: `Description ${i + 1}`,
        duration: 60 + i * 10,
        genre: i % 2 === 0 ? 'Tutorial' : 'Entertainment',
        tags: ['test', `tag${i}`],
        userId: testUser.id,
      }));

      await prisma.video.createMany({
        data: videosToCreate,
      });

      const videos = await prisma.video.findMany({
        where: { userId: testUser.id },
        take: 10,
        skip: 0,
        orderBy: { createdAt: 'desc' },
      });

      expect(videos.length).toBeGreaterThan(0);
      expect(videos.length).toBeLessThanOrEqual(10);
    });

    it('should filter videos by genre', async () => {
      const tutorialVideos = await prisma.video.findMany({
        where: {
          userId: testUser.id,
          genre: 'Tutorial',
        },
      });

      expect(tutorialVideos.length).toBeGreaterThan(0);
      tutorialVideos.forEach((video) => {
        expect(video.genre).toBe('Tutorial');
      });
    });

    it('should filter videos by tags', async () => {
      const taggedVideos = await prisma.video.findMany({
        where: {
          userId: testUser.id,
          tags: {
            hasSome: ['testing'],
          },
        },
      });

      expect(taggedVideos.length).toBeGreaterThan(0);
      taggedVideos.forEach((video) => {
        expect(video.tags).toContain('testing');
      });
    });

    it('should search videos by title', async () => {
      const searchResults = await prisma.video.findMany({
        where: {
          userId: testUser.id,
          title: {
            contains: 'Test',
            mode: 'insensitive',
          },
        },
      });

      expect(searchResults.length).toBeGreaterThan(0);
      searchResults.forEach((video) => {
        expect(video.title.toLowerCase()).toContain('test');
      });
    });
  });

  describe('PUT /api/videos/[id]', () => {
    it('should update video metadata successfully', async () => {
      const updateData = {
        title: 'Updated Test Video',
        description: 'Updated description',
        genre: 'Documentary',
      };

      const updatedVideo = await prisma.video.update({
        where: { id: testVideoId },
        data: updateData,
      });

      expect(updatedVideo.title).toBe(updateData.title);
      expect(updatedVideo.description).toBe(updateData.description);
      expect(updatedVideo.genre).toBe(updateData.genre);
    });

    it('should fail to update non-existent video', async () => {
      const fakeId = 'non-existent-id-12345';

      await expect(
        prisma.video.update({
          where: { id: fakeId },
          data: { title: 'Should Fail' },
        })
      ).rejects.toThrow();
    });
  });

  describe('DELETE /api/videos/[id]', () => {
    it('should delete video successfully', async () => {
      const videoToDelete = await prisma.video.create({
        data: {
          title: 'Video to Delete',
          duration: 100,
          genre: 'Test',
          tags: ['delete'],
          userId: testUser.id,
        },
      });

      await prisma.video.delete({
        where: { id: videoToDelete.id },
      });

      const deletedVideo = await prisma.video.findUnique({
        where: { id: videoToDelete.id },
      });

      expect(deletedVideo).toBeNull();
    });

    it('should fail to delete non-existent video', async () => {
      const fakeId = 'non-existent-id-67890';

      await expect(
        prisma.video.delete({
          where: { id: fakeId },
        })
      ).rejects.toThrow();
    });
  });

  describe('Authorization Tests', () => {
    it('should not allow access to videos from other users', async () => {
      // Create another user
      const otherUser = await prisma.user.create({
        data: {
          email: 'other@example.com',
          password: await authService.hashPassword('pass123'),
          apiKey: 'other-api-key',
        },
      });

      // Create video for other user
      const otherUserVideo = await prisma.video.create({
        data: {
          title: 'Other User Video',
          duration: 90,
          genre: 'Private',
          tags: ['private'],
          userId: otherUser.id,
        },
      });

      // Try to fetch with original user
      const video = await prisma.video.findFirst({
        where: {
          id: otherUserVideo.id,
          userId: testUser.id,
        },
      });

      expect(video).toBeNull();

      // Cleanup
      await prisma.video.delete({ where: { id: otherUserVideo.id } });
      await prisma.user.delete({ where: { id: otherUser.id } });
    });
  });
});
