// Unified API adapter connecting to Django + MySQL backend with local fallback
import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:8000/api';

// Local storage helper
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const defaultLessons = [
  {
    id: 1,
    title: 'Alphabets & Basic Sounds',
    difficulty: 'Beginner',
    time: '10 mins',
    category: 'Reading',
    content: 'Welcome to your first lesson! Alphabets are the building blocks of reading and writing. Let\'s practice the phonetic sounds: A says /æ/ as in Apple, B says /b/ as in Ball, C says /k/ as in Cat.',
    audioText: 'Phonetic sounds: A says apple, B says ball, C says cat. Try saying these words aloud.',
    examples: ['Apple (सेब)', 'Ball (गेंदा)', 'Cat (बिल्ली)'],
  },
  {
    id: 2,
    title: 'Grammar Basics: Nouns & Verbs',
    difficulty: 'Beginner',
    time: '15 mins',
    category: 'Writing',
    content: 'A noun is a naming word. It names a person, place, animal, or thing (e.g., Adarsh, Delhi, Tiger, Pen). A verb is an action word (e.g., Run, Write, Speak, Learn). Form simple sentences like: "Adarsh reads a book." Here, Adarsh is a noun, and reads is a verb.',
    audioText: 'A noun names a person, place, or thing. A verb shows action. Like: Adarsh runs. Adarsh is the noun, runs is the verb.',
    examples: ['Nouns: Ram, School, Dog', 'Verbs: Eat, Sleep, Walk'],
  },
  {
    id: 3,
    title: 'Short Story: The Thirsty Crow',
    difficulty: 'Intermediate',
    time: '20 mins',
    category: 'Comprehension',
    content: 'Once upon a time, a crow was very thirsty. He flew around looking for water. Finally, he saw a pitcher with a little water at the bottom. He could not reach it. He thought of a plan. He picked up small pebbles one by one and dropped them into the pitcher. The water level rose, the crow drank the water, and flew away happily. Moral: Where there is a will, there is a way.',
    audioText: 'The thirsty crow dropped pebbles into the pitcher to make the water level rise. He drank and flew away happily. Where there is a will, there is a way.',
    examples: ['Pitcher (घड़ा)', 'Pebbles (कंकड़)', 'Moral (नैतिकता)'],
  },
  {
    id: 4,
    title: 'Daily Conversational English',
    difficulty: 'Intermediate',
    time: '12 mins',
    category: 'Speaking',
    content: 'Let\'s practice common phrases. "Good morning! How are you?" - "I am doing well, thank you." "What is your name?" - "My name is Adarsh." "Where are you going?" - "I am going to the school." Practice pronouncing these sentences with correct stress.',
    audioText: 'Good morning! How are you? My name is Adarsh. I am learning to speak with my AI tutor.',
    examples: ['Good Morning (शुभ प्रभात)', 'Thank You (धन्यवाद)', 'Welcome (स्वागत हे)'],
  }
];

export const initMockDatabase = () => {
  if (!localStorage.getItem('users')) {
    setStorageItem('users', [{ username: 'adarsh', email: 'adarsh@example.com', password: 'password', name: 'Adarsh' }]);
  }
  if (!localStorage.getItem('lessons')) {
    setStorageItem('lessons', defaultLessons);
  }
  if (!localStorage.getItem('leaderboard')) {
    setStorageItem('leaderboard', [
      { name: 'Adarsh', xp: 320, level: 3, streak: 15 },
      { name: 'Siddharth', xp: 280, level: 2, streak: 9 },
      { name: 'Priya', xp: 250, level: 2, streak: 12 },
      { name: 'Amit', xp: 190, level: 1, streak: 5 },
      { name: 'Anjali', xp: 140, level: 1, streak: 3 },
    ]);
  }
};

initMockDatabase();

export const apiClient = {
  // Authentication: Login
  login: async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login/`, { username, password });
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const users = getStorageItem<any[]>('users', []);
      const foundUser = users.find(u => u.username === username && u.password === password);
      if (foundUser) {
        const profiles = getStorageItem<any[]>('profiles', []);
        const profile = profiles.find(p => p.username === username) || {
          fullName: foundUser.name,
          age: '24',
          gender: 'Male',
          education: 'Secondary School',
          preferredLanguage: 'english',
          xp: 150,
          coins: 40,
          streak: 15,
          level: 2,
          badges: ['First Lesson', '7 Day Streak'],
          completedLessons: [1]
        };
        return {
          message: 'Login successful',
          user: { username: foundUser.username, email: foundUser.email, profile }
        };
      }
      throw new Error('Invalid credentials');
    }
  },

  // Authentication: Register
  register: async (userData: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/register/`, userData);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const users = getStorageItem<any[]>('users', []);
      if (users.find(u => u.username === userData.username)) {
        throw new Error('Username already exists');
      }

      const newUser = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        name: userData.name
      };
      users.push(newUser);
      setStorageItem('users', users);

      const profiles = getStorageItem<any[]>('profiles', []);
      const newProfile = {
        username: userData.username,
        fullName: userData.name,
        age: userData.age || '24',
        education: userData.education || 'Primary School',
        preferredLanguage: userData.preferredLanguage || 'english',
        xp: 10,
        coins: 10,
        streak: 1,
        level: 1,
        badges: [],
        completedLessons: []
      };
      profiles.push(newProfile);
      setStorageItem('profiles', profiles);

      return {
        message: 'User registered successfully',
        user: newUser
      };
    }
  },

  // Save Profile
  saveProfile: async (username: string, profileData: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/profile/save/`, { username, ...profileData });
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const profiles = getStorageItem<any[]>('profiles', []);
      const index = profiles.findIndex(p => p.username === username);
      const updatedProfile = {
        ...(index !== -1 ? profiles[index] : {}),
        ...profileData,
        username
      };

      if (index !== -1) {
        profiles[index] = updatedProfile;
      } else {
        profiles.push(updatedProfile);
      }
      setStorageItem('profiles', profiles);
      return updatedProfile;
    }
  },

  // Get Profile
  getProfile: async (username: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/users/profile/${username}/`);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const profiles = getStorageItem<any[]>('profiles', []);
      const profile = profiles.find(p => p.username === username);
      if (!profile) {
        return {
          username,
          fullName: username,
          age: '24',
          education: 'Secondary School',
          preferredLanguage: 'english',
          xp: 100,
          coins: 20,
          streak: 15,
          level: 2,
          badges: ['First Lesson'],
          completedLessons: []
        };
      }
      return profile;
    }
  },

  // Get Lessons
  getLessons: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/curriculum/lessons/`);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      return getStorageItem<any[]>('lessons', defaultLessons);
    }
  },

  // Add Lesson
  saveLesson: async (lessonData: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/curriculum/lessons/`, lessonData);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const lessons = getStorageItem<any[]>('lessons', defaultLessons);
      if (lessonData.id) {
        const idx = lessons.findIndex(l => l.id === lessonData.id);
        if (idx !== -1) lessons[idx] = lessonData;
      } else {
        lessonData.id = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;
        lessons.push(lessonData);
      }
      setStorageItem('lessons', lessons);
      return lessonData;
    }
  },

  // Delete Lesson
  deleteLesson: async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/curriculum/lessons/${id}/`);
      return { success: true };
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const lessons = getStorageItem<any[]>('lessons', defaultLessons);
      const filtered = lessons.filter(l => l.id !== id);
      setStorageItem('lessons', filtered);
      return { success: true };
    }
  },

  // Get Leaderboard
  getLeaderboard: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/assessments/leaderboard/`);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      return getStorageItem<any[]>('leaderboard', []);
    }
  },

  // Complete Lesson
  completeLesson: async (username: string, lessonId: number, xpReward = 10, coinsReward = 5) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/curriculum/lessons/complete/`, { username, lessonId, xpReward, coinsReward });
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const profiles = getStorageItem<any[]>('profiles', []);
      const idx = profiles.findIndex(p => p.username === username);
      if (idx !== -1) {
        const profile = profiles[idx];
        if (!profile.completedLessons) profile.completedLessons = [];
        if (!profile.completedLessons.includes(lessonId)) {
          profile.completedLessons.push(lessonId);
          profile.xp = (profile.xp || 0) + xpReward;
          profile.coins = (profile.coins || 0) + coinsReward;
          
          if (!profile.badges) profile.badges = [];
          if (profile.completedLessons.length === 1 && !profile.badges.includes('First Lesson')) {
            profile.badges.push('First Lesson');
          }
          if (profile.completedLessons.length === 3 && !profile.badges.includes('Reading Expert')) {
            profile.badges.push('Reading Expert');
          }

          if (profile.xp >= 300) profile.level = 4;
          else if (profile.xp >= 150) profile.level = 3;
          else if (profile.xp >= 50) profile.level = 2;
          
          profiles[idx] = profile;
          setStorageItem('profiles', profiles);
          
          // Update leaderboard
          const leaderboard = getStorageItem<any[]>('leaderboard', []);
          const lbIdx = leaderboard.findIndex(l => l.name.toLowerCase() === username.toLowerCase());
          if (lbIdx !== -1) {
            leaderboard[lbIdx].xp = profile.xp;
            leaderboard[lbIdx].level = profile.level;
            setStorageItem('leaderboard', leaderboard);
          }
        }
        return profile;
      }
      return null;
    }
  }
};
