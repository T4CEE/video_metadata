import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await bcrypt.hash('123465789', 10);
  const apiKey = randomBytes(32).toString('hex');

  const user = await prisma.user.upsert({
    where: { email: 'cyrilekandem@gmail.com' },
    update: {},
    create: {
      email: 'cyrilekandem@gmail.com',
      password: hashedPassword,
      name: 'Cyril Ekandem',
      apiKey: apiKey,
    },
  });

  console.log(`✅ Created user: ${user.email}`);
  console.log(`🔑 API Key: ${user.apiKey}`);

  const genres = ['Tutorial', 'Entertainment', 'Documentary', 'Music', 'Gaming'];
  const tagOptions = [
    ['javascript', 'coding', 'tutorial'],
    ['funny', 'entertainment', 'viral'],
    ['nature', 'science', 'educational'],
    ['rock', 'music', 'live'],
    ['gaming', 'playthrough', 'fps'],
  ];

  const videos = [];
  for (let i = 0; i < 20; i++) {
    const genreIndex = i % genres.length;
    const video = await prisma.video.create({
      data: {
        title: `Sample Video ${i + 1}`,
        description: `This is a sample ${genres[genreIndex].toLowerCase()} video for testing purposes`,
        duration: Math.floor(Math.random() * 600) + 60,
        genre: genres[genreIndex],
        tags: tagOptions[genreIndex],
        thumbnailUrl: `https://picsum.photos/seed/${i}/640/360`,
        videoUrl: `https://example.com/videos/sample-${i + 1}.mp4`,
        userId: user.id,
      },
    });
    videos.push(video);
  }

  console.log(`✅ Created ${videos.length} sample videos`);
  console.log('🌱 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
