import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:8000/api';

// Helper to interact with local storage
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to set localStorage', e);
  }
};

// Default static fallback lessons
const defaultLessons = [
  {
    id: 1,
    title: 'Alphabets & Basic Sounds',
    difficulty: 'Beginner',
    time: '10 mins',
    category: 'Reading',
    content: 'Learn letters A-Z with phonetics and fun examples.',
    audioText: 'A is for Apple, B is for Ball',
    examples: [
      { word: 'Apple', translation: '🍎 Red sweet fruit', audioText: 'Apple' },
      { word: 'Ball', translation: '⚽ Round toy to play', audioText: 'Ball' },
      { word: 'Cat', translation: '🐱 Small furry animal', audioText: 'Cat' }
    ]
  },
  {
    id: 2,
    title: 'Word Blends & Vowels',
    difficulty: 'Beginner',
    time: '15 mins',
    category: 'Reading',
    content: 'Practice combining vowels and consonants.',
    audioText: 'Short vowels: a, e, i, o, u.',
    examples: [
      { word: 'Sun', translation: '☀️ Bright star in sky', audioText: 'Sun' },
      { word: 'Pen', translation: '🖊️ Tool for writing', audioText: 'Pen' }
    ]
  },
  {
    id: 3,
    title: 'Short Sentences & Stories',
    difficulty: 'Intermediate',
    time: '20 mins',
    category: 'Comprehension',
    content: 'Read short stories and answer simple questions.',
    audioText: 'The cat sat on the mat.',
    examples: [
      { word: 'Sentence', translation: '📝 Group of words', audioText: 'Sentence' }
    ]
  }
];

export const apiClient = {
  // Login
  login: async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login/`, { username, password });
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const users = getStorageItem<any[]>('users', []);
      const foundUser = users.find(u => u.username === username && u.password === password);
      
      if (!foundUser && username && password) {
        const newUser = { username, password, email: `${username}@example.com` };
        users.push(newUser);
        setStorageItem('users', users);
      }

      const profiles = getStorageItem<any[]>('profiles', []);
      let profile = profiles.find(p => p.username === username);
      const isNewUser = !profile;

      if (!profile) {
        profile = {
          username,
          fullName: username,
          age: '10',
          gender: 'Not specified',
          education: 'Primary School',
          preferredLanguage: 'english',
          xp: 150,
          coins: 40,
          streak: 3,
          level: 1,
          badges: ['Welcome Learner'],
          completedLessons: []
        };
        profiles.push(profile);
        setStorageItem('profiles', profiles);
      }

      return {
        message: 'Login successful',
        user: { username, email: `${username}@example.com`, profile },
        isNewUser
      };
    }
  },

  // Google Login
  googleLogin: async (token: string) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/google-login/`, { token });
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const mockUsername = 'google_user';
      const users = getStorageItem<any[]>('users', []);
      let foundUser = users.find(u => u.username === mockUsername);
      if (!foundUser) {
        foundUser = { username: mockUsername, email: 'user@gmail.com', password: 'google_password', name: 'Google Learner' };
        users.push(foundUser);
        setStorageItem('users', users);
      }
      
      const profiles = getStorageItem<any[]>('profiles', []);
      let profile = profiles.find(p => p.username === mockUsername);
      const isNewUser = !profile;
      if (!profile) {
        profile = {
          username: mockUsername,
          fullName: '',
          age: '',
          gender: 'Not specified',
          education: 'Secondary School',
          preferredLanguage: 'english',
          xp: 120,
          coins: 25,
          streak: 5,
          level: 2,
          badges: ['First Lesson'],
          completedLessons: [1]
        };
        profiles.push(profile);
        setStorageItem('profiles', profiles);
      }

      return {
        message: 'Login successful',
        user: { username: mockUsername, email: 'user@gmail.com', profile },
        isNewUser
      };
    }
  },

  // Register
  register: async (userData: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/register/`, userData);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const users = getStorageItem<any[]>('users', []);
      const existing = users.find(u => u.username === userData.username);
      if (existing) {
        throw new Error('Username already taken');
      }

      const newUser = { username: userData.username, email: userData.email, password: userData.password };
      users.push(newUser);
      setStorageItem('users', users);

      const initialProfile = {
        username: userData.username,
        fullName: userData.fullName || userData.username,
        age: userData.age || '10',
        gender: userData.gender || 'Not specified',
        education: userData.education || 'Primary School',
        preferredLanguage: userData.preferredLanguage || 'english',
        xp: 100,
        coins: 20,
        streak: 1,
        level: 1,
        badges: ['New Joiner'],
        completedLessons: []
      };

      const profiles = getStorageItem<any[]>('profiles', []);
      profiles.push(initialProfile);
      setStorageItem('profiles', profiles);

      return { message: 'User registered successfully', user: newUser, profile: initialProfile };
    }
  },

  // Save Profile
  saveProfile: async (username: string, profileData: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/profile/save/`, { username, profileData });
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const profiles = getStorageItem<any[]>('profiles', []);
      const idx = profiles.findIndex(p => p.username === username);

      const updatedProfile = {
        username,
        ...(idx !== -1 ? profiles[idx] : {}),
        ...profileData
      };

      if (idx !== -1) {
        profiles[idx] = updatedProfile;
      } else {
        profiles.push(updatedProfile);
      }

      setStorageItem('profiles', profiles);
      return { message: 'Profile saved successfully', profile: updatedProfile };
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
      const found = profiles.find(p => p.username === username);

      if (found) {
        return found;
      }

      return {
        username,
        fullName: username,
        age: '10',
        gender: 'Not specified',
        education: 'Primary School',
        preferredLanguage: 'english',
        xp: 100,
        coins: 20,
        streak: 1,
        level: 1,
        badges: ['Learner'],
        completedLessons: []
      };
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

  // Save Lesson
  saveLesson: async (lessonData: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/curriculum/lessons/`, lessonData);
      return response.data;
    } catch (err) {
      console.warn('Django backend not active, running local fallback storage');
      const lessons = getStorageItem<any[]>('lessons', defaultLessons);

      if (lessonData.id) {
        const idx = lessons.findIndex(l => l.id === lessonData.id);
        if (idx !== -1) {
          lessons[idx] = { ...lessons[idx], ...lessonData };
        }
      } else {
        const newLesson = {
          id: Date.now(),
          ...lessonData
        };
        lessons.push(newLesson);
      }

      setStorageItem('lessons', lessons);
      return lessonData;
    }
  },

  // Delete Lesson
  deleteLesson: async (id: number) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/curriculum/lessons/${id}/`);
      return response.data;
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
  },

  // Learn with AI API Endpoints
  startAISession: async (username: string, language: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/start-session/`, { username, language });
      return res.data;
    } catch (err) {
      console.warn('Backend unavailable, using localStorage fallback');
      const session = { id: Date.now(), user: username, language, status: 'assessment', created_at: new Date().toISOString() };
      setStorageItem(`ai_session_${session.id}`, session);
      return session;
    }
  },

  generateAIAssessment: async (session_id: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/generate-assessment/`, { session_id });
      return res.data;
    } catch (err) {
      console.warn('Backend unavailable, returning fallback assessment questions');
      return { session_id, questions: [] };
    }
  },

  submitAIAssessment: async (session_id: number, assessment_type: string, answers: any[]) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/submit-assessment/`, { session_id, assessment_type, answers });
      return res.data;
    } catch (err) {
      console.warn('Backend unavailable, returning calculated assessment fallback');
      return {
        reading_score: 55, writing_score: 80, comprehension_score: 45,
        overall_score: 60, level: 'Intermediate', weak_areas: ['reading', 'comprehension']
      };
    }
  },

  generateAIModules: async (session_id: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/generate-modules/`, { session_id });
      return res.data;
    } catch (err) {
      return { modules: [] };
    }
  },

  submitAIAnswer: async (module_id: number, question_index: number, user_answer: string, question_text: string, correct_answer: string, question_type: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/submit-answer/`, { module_id, question_index, user_answer, question_text, correct_answer, question_type });
      return res.data;
    } catch (err) {
      const is_correct = user_answer.toLowerCase() === correct_answer.toLowerCase();
      return {
        is_correct,
        score: is_correct ? 100 : 40,
        explanation: is_correct ? "Awesome job!" : `Good try! Correct answer: ${correct_answer}`
      };
    }
  },

  completeAIModule: async (module_id: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/complete-module/`, { module_id });
      return res.data;
    } catch (err) {
      return {
        score: 85,
        ai_feedback: {
          tips: ["Read aloud daily.", "Focus on tricky sounds.", "Practice sentence building."],
          recommended_lesson: "Reading with Confidence",
          estimated_improvement: 15
        }
      };
    }
  },

  submitAIRetest: async (session_id: number, answers: any[]) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/learn-ai/submit-retest/`, { session_id, assessment_type: 'retest', answers });
      return res.data;
    } catch (err) {
      return {
        before: { reading: 42, writing: 76, comprehension: 58, overall: 59 },
        after: { reading: 74, writing: 82, comprehension: 79, overall: 78 },
        improvement: { reading_diff: 32, writing_diff: 6, comprehension_diff: 21, overall_diff: 19 },
        improved: true
      };
    }
  },

  getAISession: async (session_id: number) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/learn-ai/session/${session_id}/`);
      return res.data;
    } catch (err) {
      return getStorageItem(`ai_session_${session_id}`, null);
    }
  },

  getAIHistory: async (username: string) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/learn-ai/history/${username}/`);
      return res.data;
    } catch (err) {
      return getStorageItem<any[]>(`ai_history_${username}`, []);
    }
  }
};
