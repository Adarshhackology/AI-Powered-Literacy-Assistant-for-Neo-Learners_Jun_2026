export interface ProfileData {
  fullName: string;
  avatar: string;
  xp: number;
  coins: number;
  streak: number;
  level: number;
  badges: string[];
  completedLessons: number[];
}

export interface Champion {
  rank: number;
  name: string;
  level: number;
  xp: number;
  avatar: string;
}

export interface ContinueLesson {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  color: string;
  icon: string;
}

export const defaultProfile: ProfileData = {
  fullName: 'POLUYTRE',
  avatar: '🧑‍🎓',
  xp: 249,
  coins: 80,
  streak: 1,
  level: 3,
  badges: ['First Lesson', '7 Day Streak', 'Level Explorer', 'Reading Star', 'Perfect Score'],
  completedLessons: [1, 2]
};

export const championsList: Champion[] = [
  { rank: 1, name: 'Adarsh', level: 5, xp: 1560, avatar: '👨‍🎓' },
  { rank: 2, name: 'Siddharth', level: 5, xp: 1480, avatar: '👨‍🎓' },
  { rank: 3, name: 'Priya', level: 5, xp: 1350, avatar: '👩‍🎓' },
  { rank: 4, name: 'Aashi', level: 4, xp: 1200, avatar: '👧' },
  { rank: 5, name: 'Yashwi', level: 4, xp: 1100, avatar: '👦' },
];

export const continueLessons: ContinueLesson[] = [
  { id: 1, title: 'Reading Comprehension', subtitle: 'Module 2 • Lesson 4', progress: 75, color: 'from-purple-500 to-indigo-600', icon: '📖' },
  { id: 2, title: 'Creative Writing', subtitle: 'Module 1 • Lesson 3', progress: 40, color: 'from-pink-500 to-rose-600', icon: '✍️' },
  { id: 3, title: 'Spoken English', subtitle: 'Module 3 • Lesson 1', progress: 60, color: 'from-sky-500 to-blue-600', icon: '🗣️' },
  { id: 4, title: 'Vocabulary Builder', subtitle: 'Module 2 • Lesson 6', progress: 30, color: 'from-emerald-500 to-teal-600', icon: '📚' },
];

export const badgesList = [
  { title: 'First Lesson', icon: '🥇', bg: 'from-amber-400 to-yellow-500' },
  { title: '7 Day Streak', icon: '🔥', bg: 'from-rose-500 to-pink-600' },
  { title: 'Level Explorer', icon: '🚀', bg: 'from-emerald-400 to-teal-500' },
  { title: 'Reading Star', icon: '⭐', bg: 'from-purple-500 to-indigo-600' },
  { title: 'Perfect Score', icon: '🏅', bg: 'from-sky-400 to-blue-500' },
];
