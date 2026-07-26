# 📚 AI-Powered Literacy Assistant for Neo-Learners

> An interactive, AI-driven educational platform that helps children and beginner learners master **reading**, **writing**, **speaking**, and **vocabulary** through gamified lessons, voice drills, and smart curriculum recommendations — all in **9 Indian languages**.

---

## 🏗️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Vite)                      │
│  Landing Page → Register → Profile Setup → Dashboard → Lessons       │
│  Assessment → AI Evaluation → Voice Practice → Sticker Album         │
│  Level Selection → Reports → Admin Dashboard                         │
│                        Port: 5180                                    │
└──────────────────────┬───────────────────────────────────────────────┘
                       │  REST API (Axios)
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     BACKEND (Django + DRF)                            │
│                                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────────┐     │
│  │   Auth API   │  │ Profile API  │  │  Curriculum & Lessons    │     │
│  │ (Register/   │  │ (Save/Get    │  │  API (CRUD + Seeding)    │     │
│  │  Login/OAuth)│  │  Profile)    │  │                          │     │
│  └─────────────┘  └──────────────┘  └──────────────────────────┘     │
│                                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────────┐     │
│  │ Assessment  │  │   AI Rec.    │  │   Learning Path API      │     │
│  │    API      │  │ (Gemini LLM) │  │  (Save/Get study queue)  │     │
│  └─────────────┘  └──────────────┘  └──────────────────────────┘     │
│                        Port: 8000                                    │
└──────────────────────┬───────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│               DATABASE (PostgreSQL — Neon Cloud)                     │
│                                                                      │
│  Tables: auth_user, profiles, curriculum, lesson, lesson_content,    │
│          assessment_result, learning_path                             │
│                                                                      │
│  1,002 Lessons  ×  9 Languages  =  9,018 LessonContent rows         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### Module 1 — Core Platform
| Feature | Description |
|---------|-------------|
| 🔐 Registration & Login | Email/password + Google OAuth sign-in |
| 👤 Profile Setup | Age, education, preferred language, avatar, learning goals |
| 📖 Lesson Player | Listen & Read Along with TTS, AI chat tutor, bookmarks, notes |
| 🎤 Voice Practice | Real-time speech recognition with pronunciation scoring |
| 📝 Assessment Wizard | 3-section quiz (Reading, Writing, Comprehension) with images |
| 🤖 AI Evaluation | Score breakdown with personalized AI improvement tips |
| 🎨 Sticker Album | 1000+ vocabulary items across 8 categories in 4+ languages |
| 📊 Reports | Visual skill radar charts and weekly progress tracking |
| 🏆 Gamification | XP, coins, streaks, badges, and leaderboard |

### Module 2 — AI-Powered Curriculum Recommendation
| Feature | Description |
|---------|-------------|
| 📚 Curriculum Database | 3 levels (Beginner, Intermediate, Advanced) with 334 lessons each |
| 🌐 9 Languages | English, Hindi, Telugu, Tamil, Kannada, Bengali, Marathi, Gujarati, Punjabi |
| 🤖 AI Recommendations | Gemini 2.5 LLM analyzes weak scores and recommends 2 best lessons |
| 🗺️ Level Map | Duolingo-style winding game path with stage nodes per level |
| 🎓 Graduation Tests | Level tests at the end of each tier — pass (≥70%) to unlock next level |
| 🔓 Progressive Unlocking | Stages unlock sequentially; levels unlock via graduation tests |
| 📈 Learning Path Queue | AI-recommended lessons are saved as a personal study roadmap |
| 🖼️ Rich Examples | Every lesson has 3 bilingual examples (English + Hindi/Telugu) |

---

## 🚀 Quick Start — Run Locally

### Prerequisites
- **Python 3.12+** with `pip`
- **Node.js 18+** with `npm`
- Internet connection (for Neon PostgreSQL cloud database)

### 1. Clone the Repository
```bash
git clone https://github.com/Springboard-Internship-2026/AI-Powered-Literacy-Assistant-for-Neo-Learners_Jun_2026.git
cd AI-Powered-Literacy-Assistant-for-Neo-Learners_Jun_2026
git checkout Adarsh_Vishwakarma
```

### 2. Backend Setup (Django)
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set database URL
set DATABASE_URL=postgresql://neondb_owner:npg_7vflxQB6qgGA@ep-bold-boat-aho98hli.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Run migrations
python manage.py migrate

# Seed 1002 lessons (optional — already seeded in cloud DB)
python seed_large_curriculum.py

# Start Django server
python manage.py runserver 8000
```

### 3. Frontend Setup (React + Vite)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Open in Browser
- **Frontend:** http://localhost:5180
- **Backend API:** http://localhost:8000/api

---

## 🗂️ Project Structure

```
literacy-assistant/
├── backend/                          # Django REST API
│   ├── config/                       # Django settings & URLs
│   │   ├── settings.py
│   │   └── urls.py
│   ├── accounts/                     # User auth (register, login, OAuth)
│   │   ├── models.py
│   │   ├── views.py
│   │   └── serializers.py
│   ├── assessments/                  # Assessment submission & scoring
│   │   ├── models.py
│   │   └── views.py
│   ├── curriculum/                   # Lessons, Curriculum, AI Recommendations
│   │   ├── models.py                # Curriculum, Lesson, LessonContent, LearningPath
│   │   ├── views.py                 # CRUD + AI recommend + learning path APIs
│   │   └── serializers.py
│   ├── seed_large_curriculum.py      # Seeds 1002 lessons in 9 languages
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/                         # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx       # Child-friendly hero with illustrations
│   │   │   ├── Register.tsx          # Multi-step registration wizard
│   │   │   ├── Login.tsx             # Email + Google OAuth login
│   │   │   ├── ProfileSetup.tsx      # Avatar, language, education setup
│   │   │   ├── Dashboard.tsx         # Game map, level selector, leaderboard
│   │   │   ├── Assessment.tsx        # 3-section quiz with images & TTS
│   │   │   ├── AIEvaluation.tsx      # Score breakdown & AI recommendations
│   │   │   ├── LessonView.tsx        # Lesson player with TTS & AI chat
│   │   │   ├── LevelSelection.tsx    # Visual level picker
│   │   │   ├── VoicePractice.tsx     # Speech recognition pronunciation drills
│   │   │   ├── Vocabulary.tsx        # Sticker album with 1000+ words
│   │   │   ├── Reports.tsx           # Radar chart skill analytics
│   │   │   └── AdminDashboard.tsx    # Admin management panel
│   │   ├── utils/
│   │   │   ├── api.ts               # Axios API client
│   │   │   ├── vocabData.ts          # 1000+ vocabulary items
│   │   │   └── translationHelper.ts  # Multi-language UI translations
│   │   └── App.tsx                   # React Router configuration
│   ├── public/                       # Static assets (images, illustrations)
│   ├── package.json
│   └── vite.config.ts
│
└── README.md                         # This file
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Register new user |
| `POST` | `/api/login` | Login with credentials |
| `POST` | `/api/google-login` | Google OAuth login |
| `GET/POST` | `/api/profile/<username>` | Get or save user profile |
| `GET` | `/api/lessons` | Get all lessons |
| `GET` | `/api/curriculum` | Get curriculum levels |
| `GET` | `/api/lessons/<curriculum_id>` | Get lessons by curriculum |
| `POST` | `/api/assessment` | Submit assessment scores |
| `POST` | `/api/recommend` | Get AI lesson recommendations |
| `POST` | `/api/learning-path` | Save recommended learning path |
| `POST` | `/api/complete-lesson` | Mark lesson as completed |
| `GET` | `/api/leaderboard` | Get XP leaderboard |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS 4, Lucide Icons |
| **Backend** | Django 5, Django REST Framework, Python 3.14 |
| **Database** | PostgreSQL (Neon Cloud) |
| **AI Engine** | Google Gemini 2.5 Flash API |
| **Speech** | Web Speech API (Recognition + Synthesis) |
| **Auth** | Session-based + Google OAuth (@react-oauth/google) |

---

## 👨‍💻 Author

**Adarsh Vishwakarma** — Springboard Internship 2026  
GitHub: [@Adarshhackology](https://github.com/Adarshhackology)  
Email: viralworld968@gmail.com

---

## 📄 License

This project is part of the Springboard Internship Program 2026. All rights reserved.
