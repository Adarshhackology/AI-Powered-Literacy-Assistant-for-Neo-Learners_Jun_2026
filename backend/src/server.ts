import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Seeding Initial Data
const seedInitialData = async () => {
  try {
    const lessonCount = await prisma.lesson.count();
    if (lessonCount === 0) {
      console.log('Seeding initial lessons...');
      await prisma.lesson.createMany({
        data: [
          {
            title: 'Alphabets & Basic Sounds',
            difficulty: 'Beginner',
            time: '10 mins',
            category: 'Reading',
            content: 'Welcome to your first lesson! Alphabets are the building blocks of reading and writing. Let\'s practice the phonetic sounds: A says /æ/ as in Apple, B says /b/ as in Ball, C says /k/ as in Cat.',
            audioText: 'Phonetic sounds: A says apple, B says ball, C says cat. Try saying these words aloud.',
            examples: JSON.stringify(['Apple (सेब)', 'Ball (गेंदा)', 'Cat (बिल्ली)'])
          },
          {
            title: 'Grammar Basics: Nouns & Verbs',
            difficulty: 'Beginner',
            time: '15 mins',
            category: 'Writing',
            content: 'A noun is a naming word. It names a person, place, animal, or thing (e.g., Adarsh, Delhi, Tiger, Pen). A verb is an action word (e.g., Run, Write, Speak, Learn). Form simple sentences like: "Adarsh reads a book." Here, Adarsh is a noun, and reads is a verb.',
            audioText: 'A noun names a person, place, or thing. A verb shows action. Like: Adarsh runs. Adarsh is the noun, runs is the verb.',
            examples: JSON.stringify(['Nouns: Ram, School, Dog', 'Verbs: Eat, Sleep, Walk'])
          },
          {
            title: 'Short Story: The Thirsty Crow',
            difficulty: 'Intermediate',
            time: '20 mins',
            category: 'Comprehension',
            content: 'Once upon a time, a crow was very thirsty. He flew around looking for water. Finally, he saw a pitcher with a little water at the bottom. He could not reach it. He thought of a plan. He picked up small pebbles one by one and dropped them into the pitcher. The water level rose, the crow drank the water, and flew away happily. Moral: Where there is a will, there is a way.',
            audioText: 'The thirsty crow dropped pebbles into the pitcher to make the water level rise. He drank and flew away happily. Where there is a will, there is a way.',
            examples: JSON.stringify(['Pitcher (घड़ा)', 'Pebbles (कंकड़)', 'Moral (नैतिकता)'])
          },
          {
            title: 'Daily Conversational English',
            difficulty: 'Intermediate',
            time: '12 mins',
            category: 'Speaking',
            content: 'Let\'s practice common phrases. "Good morning! How are you?" - "I am doing well, thank you." "What is your name?" - "My name is Adarsh." "Where are you going?" - "I am going to the school." Practice pronouncing these sentences with correct stress.',
            audioText: 'Good morning! How are you? My name is Adarsh. I am learning to speak with my AI tutor.',
            examples: JSON.stringify(['Good Morning (शुभ प्रभात)', 'Thank You (धन्यवाद)', 'Welcome (स्वागत हे)'])
          }
        ]
      });
      console.log('Seeding completed successfully!');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seeding trigger during connection setup
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to MySQL database via Prisma!');
    seedInitialData();
  })
  .catch((err) => {
    console.error('Failed to connect to MySQL database:', err.message);
  });

// Authentication: Register
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, name, age, education, preferredLanguage } = req.body;
  if (!username || !email || !password || !name) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] }
    });
    if (existing) {
      return res.status(400).json({ error: 'Username or Email already registered' });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password, // Stored as plain text for phase 1 demo, or bcrypt can be used
        name,
        profile: {
          create: {
            fullName: name,
            age: age || '24',
            education: education || 'Primary School',
            preferredLanguage: preferredLanguage || 'english',
            xp: 10,
            coins: 10,
            streak: 1,
            level: 1,
            badges: JSON.stringify([]),
            completedLessons: JSON.stringify([])
          }
        }
      },
      include: { profile: true }
    });

    res.json({
      message: 'User registered successfully',
      user: {
        username: newUser.username,
        email: newUser.email,
        profile: newUser.profile
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Authentication: Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { profile: true }
    });

    if (user && user.password === password) {
      let parsedProfile = null;
      if (user.profile) {
        parsedProfile = {
          ...user.profile,
          badges: JSON.parse(user.profile.badges || '[]'),
          completedLessons: JSON.parse(user.profile.completedLessons || '[]')
        };
      }
      res.json({
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
          profile: parsedProfile
        }
      });
    } else {
      res.status(400).json({ error: 'Wrong Credentials' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Profile: Save
app.post('/api/profile/save', async (req, res) => {
  const { username, fullName, age, gender, education, occupation, preferredLanguage, learningGoal, readingLevel, writingLevel, speakingConfidence, dailyLearningTime, avatar, xp, coins, streak, level, badges, completedLessons } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const existingProfile = await prisma.profile.findUnique({ where: { userId: user.id } });

    const data = {
      fullName: fullName || user.name,
      age: age || '24',
      gender,
      education: education || 'Primary School',
      occupation,
      preferredLanguage: preferredLanguage || 'english',
      learningGoal,
      readingLevel,
      writingLevel,
      speakingConfidence: String(speakingConfidence || '50'),
      dailyLearningTime,
      avatar,
      xp: xp !== undefined ? Number(xp) : undefined,
      coins: coins !== undefined ? Number(coins) : undefined,
      streak: streak !== undefined ? Number(streak) : undefined,
      level: level !== undefined ? Number(level) : undefined,
      badges: badges ? JSON.stringify(badges) : undefined,
      completedLessons: completedLessons ? JSON.stringify(completedLessons) : undefined
    };

    let profile;
    if (existingProfile) {
      profile = await prisma.profile.update({
        where: { userId: user.id },
        data
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          ...data,
          fullName: data.fullName!,
          age: data.age!,
          education: data.education!,
          preferredLanguage: data.preferredLanguage!,
          user: { connect: { id: user.id } }
        }
      });
    }

    res.json({
      ...profile,
      badges: JSON.parse(profile.badges || '[]'),
      completedLessons: JSON.parse(profile.completedLessons || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Profile: Get
app.get('/api/profile/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { profile: true }
    });
    if (!user || !user.profile) return res.status(404).json({ error: 'Profile not found' });

    res.json({
      ...user.profile,
      badges: JSON.parse(user.profile.badges || '[]'),
      completedLessons: JSON.parse(user.profile.completedLessons || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Lessons: List
app.get('/api/lessons', async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: { id: 'asc' }
    });
    const parsed = lessons.map(les => ({
      ...les,
      examples: JSON.parse(les.examples || '[]')
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Lessons: Create
app.post('/api/lessons', async (req, res) => {
  const { title, difficulty, time, category, content, audioText, examples } = req.body;
  try {
    const lesson = await prisma.lesson.create({
      data: {
        title,
        difficulty,
        time,
        category,
        content,
        audioText,
        examples: JSON.stringify(examples || [])
      }
    });
    res.json({
      ...lesson,
      examples: JSON.parse(lesson.examples || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Lessons: Delete
app.delete('/api/lessons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lesson.delete({
      where: { id: parseInt(id) }
    });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Lessons: Complete lesson
app.post('/api/lessons/complete', async (req, res) => {
  const { username, lessonId, xpReward, coinsReward } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { profile: true }
    });
    if (!user || !user.profile) return res.status(404).json({ error: 'User profile not found' });

    const completed = JSON.parse(user.profile.completedLessons || '[]');
    let profile = user.profile;

    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      
      const badges = JSON.parse(user.profile.badges || '[]');
      if (completed.length === 1 && !badges.includes('First Lesson')) {
        badges.push('First Lesson');
      }
      if (completed.length === 3 && !badges.includes('Reading Expert')) {
        badges.push('Reading Expert');
      }

      let nextLevel = user.profile.level;
      const nextXp = user.profile.xp + (xpReward || 10);
      if (nextXp >= 300) nextLevel = 4;
      else if (nextXp >= 150) nextLevel = 3;
      else if (nextXp >= 50) nextLevel = 2;

      profile = await prisma.profile.update({
        where: { userId: user.id },
        data: {
          completedLessons: JSON.stringify(completed),
          badges: JSON.stringify(badges),
          xp: nextXp,
          coins: user.profile.coins + (coinsReward || 5),
          level: nextLevel
        }
      });
    }

    res.json({
      ...profile,
      badges: JSON.parse(profile.badges || '[]'),
      completedLessons: JSON.parse(profile.completedLessons || '[]')
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard: Get
app.get('/api/leaderboard', async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      orderBy: { xp: 'desc' },
      take: 10
    });
    const formatted = profiles.map(p => ({
      name: p.fullName,
      xp: p.xp,
      level: p.level,
      streak: p.streak
    }));
    res.json(formatted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Assessments: Save results
app.post('/api/assessments', async (req, res) => {
  const { username, readingScore, writingScore, comprehensionScore, overallScore } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { profile: true }
    });
    if (!user || !user.profile) return res.status(404).json({ error: 'User profile not found' });

    const result = await prisma.assessmentResult.create({
      data: {
        userId: user.id,
        readingScore,
        writingScore,
        comprehensionScore,
        overallScore
      }
    });

    const readLvl = overallScore >= 75 ? 'Advanced' : overallScore >= 45 ? 'Intermediate' : 'Beginner';
    const writeLvl = writingScore >= 70 ? 'Advanced' : writingScore >= 40 ? 'Intermediate' : 'Beginner';

    const updatedProfile = await prisma.profile.update({
      where: { userId: user.id },
      data: {
        readingLevel: readLvl,
        writingLevel: writeLvl,
        xp: user.profile.xp + 50,
        coins: user.profile.coins + 15
      }
    });

    res.json({
      result,
      profile: {
        ...updatedProfile,
        badges: JSON.parse(updatedProfile.badges || '[]'),
        completedLessons: JSON.parse(updatedProfile.completedLessons || '[]')
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin endpoint: List all profiles for management
app.get('/api/admin/profiles', async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: { user: true }
    });
    const parsed = profiles.map(p => ({
      ...p,
      badges: JSON.parse(p.badges || '[]'),
      completedLessons: JSON.parse(p.completedLessons || '[]'),
      username: p.user.username,
      email: p.user.email
    }));
    res.json(parsed);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
