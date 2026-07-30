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

  // Module 3: Voice Learning & Progress Monitoring Dashboard Methods
  uploadSpeech: async (username: string, transcript: string, lesson_id?: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/voice-dashboard/speech/upload/`, { username, transcript, lesson_id });
      return res.data;
    } catch (err) {
      return { id: Date.now(), username, transcript, confidence: 0.92 };
    }
  },

  evaluatePronunciation: async (username: string, expected_text: string, learner_transcript: string, lesson_id?: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/voice-dashboard/speech/evaluate-pronunciation/`, { username, expected_text, learner_transcript, lesson_id });
      return res.data;
    } catch (err) {
      return {
        overall_score: 86,
        result_label: 'Good',
        content_score: 85,
        pronunciation_score: 85,
        fluency_score: 88,
        speech_rate: 120,
        pause_count: 1,
        xp_awarded: 25,
        coins_awarded: 10,
        current_xp: 250,
        level: 2
      };
    }
  },

  getSpeechHistory: async (username: string) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/voice-dashboard/speech/history/${username}/`);
      return res.data;
    } catch (err) {
      return { attempts: [], pronunciation_scores: [] };
    }
  },

  getDashboardOverview: async (username: string) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/voice-dashboard/dashboard/overview/${username}/`);
      return res.data;
    } catch (err) {
      return {
        overall_progress: 68,
        lessons_completed: 14,
        weekly_study_time_mins: 185,
        reading_improvement: 24,
        writing_improvement: 18,
        speaking_improvement: 32,
        pronunciation_trend: [75, 78, 82, 85, 88, 90, 94],
        average_pronunciation: 86,
        streak_days: 5,
        xp_progress: { xp: 450, level: 3, next_level_xp: 600, coins: 120 },
        skill_radar: { Reading: 85, Writing: 72, Speaking: 90, Pronunciation: 88, Vocabulary: 78, Comprehension: 82 },
        study_time_by_day: [
          { day: 'Mon', mins: 20 }, { day: 'Tue', mins: 35 }, { day: 'Wed', mins: 30 },
          { day: 'Thu', mins: 25 }, { day: 'Fri', mins: 40 }, { day: 'Sat', mins: 15 }, { day: 'Sun', mins: 20 }
        ],
        lessons_completed_by_day: [
          { day: 'Mon', count: 1 }, { day: 'Tue', count: 3 }, { day: 'Wed', count: 2 },
          { day: 'Thu', count: 1 }, { day: 'Fri', count: 4 }, { day: 'Sat', count: 1 }, { day: 'Sun', count: 2 }
        ],
        badges: ['Bronze Reader', 'Voice Pioneer', 'Pronunciation Star ⭐']
      };
    }
  },

  getGamification: async (username: string) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/voice-dashboard/gamification/${username}/`);
      return res.data;
    } catch (err) {
      return { xp: 450, coins: 120, streak_days: 5, level: 3, badges: ['Bronze Reader', 'Voice Pioneer'], claimed_rewards: [] };
    }
  },

  claimReward: async (username: string, item_id: string, cost: number) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/voice-dashboard/gamification/claim-reward/`, { username, item_id, cost });
      return res.data;
    } catch (err) {
      return { message: 'Reward claimed!', current_coins: 100, claimed_rewards: [item_id] };
    }
  },

  getGamificationLeaderboard: async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/voice-dashboard/gamification/leaderboard/`);
      return res.data;
    } catch (err) {
      return {
        leaderboard: [
          { rank: 1, username: 'aarav', name: 'Aarav Sharma', xp: 1250, level: 7, coins: 340, avatar: '🦁', badges: ['Reading Champion 🏆', 'Pronunciation Star ⭐'] },
          { rank: 2, username: 'diya', name: 'Diya Patel', xp: 980, level: 5, coins: 210, avatar: '🦄', badges: ['Gold Learner 🥇', 'Streak Master 🔥'] },
          { rank: 3, username: 'vivaan', name: 'Vivaan Gupta', xp: 840, level: 5, coins: 180, avatar: '🚀', badges: ['Speaking Ace 🎙️', 'Vocabulary King 👑'] },
          { rank: 4, username: 'ananya', name: 'Ananya Roy', xp: 620, level: 4, coins: 120, avatar: '🎨', badges: ['Writing Specialist ✍️'] },
          { rank: 5, username: 'kavya', name: 'Kavya Singh', xp: 450, level: 3, coins: 90, avatar: '⭐', badges: ['Bronze Reader 🥉'] }
        ]
      };
    }
  },

  generateAIReport: async (username: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/voice-dashboard/reports/generate-ai-recommendations/`, { username });
      return res.data;
    } catch (err) {
      return {
        recommendations: [
          { title: 'Practice Vowel Sounds 🍎', desc: 'Stretch out vowel sounds in words like "apple" and "ball" for 5 mins daily.', action_link: '/voice-practice', icon_name: 'Mic' },
          { title: 'Master Sentence Structure ✍️', desc: 'Complete 2 short writing exercises to boost subject-verb agreement.', action_link: '/learn-with-ai', icon_name: 'Edit3' },
          { title: 'Expand Active Vocabulary 📚', desc: 'Explore 5 new vocabulary words in your preferred language today.', action_link: '/vocabulary', icon_name: 'BookOpen' }
        ],
        weak_skills: ['Writing Clarity', 'Vowel Pronunciation'],
        report_summaries: {
          daily: 'Completed 2 lessons today with an average pronunciation accuracy of 88%.',
          weekly: 'Studied for 185 minutes across 5 active days. Earned 140 XP!',
          monthly: 'Lessons completed: 14. Pronunciation score improved by +12%.',
          lesson_completion: '14 out of 20 core curriculum lessons completed (70% progress).',
          reading: 'Reading accuracy is at 85%. Excellent recognition of high-frequency words.',
          writing: 'Writing score is 72%. Great progress on simple sentences; focus on plurals.',
          speaking: 'Speaking confidence is 90%. Fluency rate averaged 125 words per minute.',
          pronunciation: 'Average pronunciation rating: Good (86%). Pause count decreased by 30%.',
          vocabulary: 'Recognized 45 new words this month with a 92% retention rate.',
          study_time: 'Peak study hours: 5 PM - 7 PM. Consistent daily practice habit.',
          weak_skills: 'Target areas: Complex sentence punctuation & long vowel stress.',
          strong_skills: 'Top strengths: Word recognition, clear speaking voice, daily streak.',
          achievements: 'Unlocked 3 badges: Bronze Reader, Voice Pioneer, 5-Day Streak Flame.',
          streak: 'Current streak: 5 Days! Keep practicing tomorrow to reach 6 days.',
          ai_summary: 'Learner shows strong verbal confidence. Recommended next step: Complete Writing Practice module.'
        }
      };
    }
  }
};
