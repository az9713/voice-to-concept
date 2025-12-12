# Voice to Concept

Transform your voice ideas into visual concept pages with AI-powered analysis and image generation.

> **Acknowledgement:** This application is inspired by the YouTube video ["Shipmas Day 6: Bring Any Idea To Life App (Nano Banana Pro API)"](https://www.youtube.com/watch?v=qNtFxkl975c&t=323s) by [All About AI](https://www.youtube.com/@AllAboutAI).

---

## Quick Links

| Guide | Description | Best For |
|-------|-------------|----------|
| [Quick Start](docs/QUICK_START.md) | Get running in 5 minutes + 10 example ideas | First-time users |
| [User Guide](docs/USER_GUIDE.md) | Complete step-by-step instructions | All users |
| [Developer Guide](docs/DEVELOPER_GUIDE.md) | Technical documentation for developers | Developers |

---

## What is Voice to Concept?

Voice to Concept is a web application that transforms your spoken or written ideas into complete visual concept pages.

**Input:** Speak or type your idea (e.g., "A smart coffee mug that maintains temperature")

**Output:**
- A professional product name and tagline
- A rating from 1-10 with detailed analysis
- 5 AI-generated images (hero product, app mockup, lifestyle photo, blueprint, logo)
- Key points highlighting strengths
- Suggested improvements

---

## Features

- **Voice Input** - Speak naturally and your idea is transcribed
- **Text Input** - Type your ideas if you prefer
- **AI Analysis** - Google Gemini rates and analyzes your idea
- **Image Generation** - 5 professional concept images per idea
- **Persistent Storage** - Ideas saved to disk, never lost
- **Dark Theme** - Modern, eye-friendly interface
- **Cross-Platform** - Works on Windows, macOS, and Linux
- **No Account Needed** - Just add your API keys and go

---

## 5-Minute Quick Start

### 1. Install Node.js
Download from https://nodejs.org/ (click the LTS button)

### 2. Open Terminal
- **Windows:** Press `Win`, type `cmd`, press Enter
- **Mac:** Press `Cmd+Space`, type `Terminal`, press Enter

### 3. Navigate to Project
```bash
cd path/to/voice-to-concept
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Configure API Keys
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and add your keys:
```
OPENAI_API_KEY=sk-your-key-here
GEMINI_API_KEY=AIzaSy-your-key-here
```

**Get keys from:**
- OpenAI: https://platform.openai.com/api-keys
- Gemini: https://aistudio.google.com/apikey

### 6. Start the App
```bash
npm run dev
```

### 7. Open Browser
Go to **http://localhost:3000**

---

## Documentation

### For Users

**[Quick Start Guide](docs/QUICK_START.md)** - 5-minute setup + 10 example ideas to try

**[Complete User Guide](docs/USER_GUIDE.md)** - Everything you need to know:
- Detailed installation instructions
- How to get API keys step-by-step
- Voice recording guide
- Text input guide
- Understanding your results
- Managing saved ideas
- 10 educational use cases
- Complete troubleshooting
- FAQ

### For Developers

**[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Complete technical documentation:
- Architecture overview with diagrams
- Technology stack explained
- Project structure deep dive
- Next.js App Router explained
- API routes documentation
- React components guide
- TypeScript usage
- Tailwind CSS styling
- External API integration
- Common development tasks
- Adding new features
- Testing guide
- Debugging guide
- Performance optimization
- Security considerations
- Deployment guide
- Complete glossary

---

## Project Structure

```
voice-to-concept/
├── data/                     # Persistent storage (auto-created)
│   ├── ideas.json            # Idea metadata
│   └── images/               # Generated PNG images
├── docs/
│   ├── QUICK_START.md        # 5-minute guide
│   ├── USER_GUIDE.md         # Complete user documentation
│   └── DEVELOPER_GUIDE.md    # Technical documentation
├── src/
│   ├── app/
│   │   ├── api/              # Server-side API routes
│   │   │   ├── transcribe/   # OpenAI Whisper endpoint
│   │   │   ├── analyze/      # Gemini analysis endpoint
│   │   │   ├── generate-image/ # Gemini image endpoint (saves to disk)
│   │   │   ├── ideas/        # Ideas CRUD API
│   │   │   └── images/       # Serve images from disk
│   │   ├── idea/[id]/        # Idea detail page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── IdeaInput.tsx     # Main input form
│   │   ├── VoiceRecorder.tsx # Audio recording
│   │   ├── IdeaCard.tsx      # Idea preview card
│   │   ├── IdeaDisplay.tsx   # Full idea view
│   │   └── ImageGallery.tsx  # Image grid + lightbox
│   └── lib/                  # Shared utilities
│       ├── types.ts          # TypeScript interfaces
│       ├── storage.ts        # Async API storage calls
│       └── prompts.ts        # AI prompt templates
├── .env.local.example        # Environment template
├── package.json              # Dependencies
└── README.md                 # This file
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first styling |
| OpenAI Whisper | Speech-to-text |
| Google Gemini | Text analysis + image generation |
| File-based storage | Persistent data on disk |

---

## API Costs

This app uses paid AI services:

| Service | Cost Per Idea |
|---------|---------------|
| OpenAI Whisper | ~$0.01 |
| Gemini Analysis | ~$0.01 |
| Gemini Images (5) | ~$0.15-0.25 |
| **Total** | **~$0.15-0.30** |

Both services offer free credits for new accounts.

---

## Troubleshooting

**App won't start?**
- Make sure you're in the right folder
- Run `npm install` first
- Check that `.env.local` has your API keys

**Microphone not working?**
- Allow microphone permissions when prompted
- Try Chrome browser (best compatibility)
- Check that microphone works in other apps

**API errors?**
- Verify API keys are correct in `.env.local`
- Check you have credits/quota available
- Try restarting the server (`Ctrl+C` then `npm run dev`)

**Ideas disappeared?**
- Ideas are stored in the `data/` folder on your computer
- Make sure the server is running (`npm run dev`)
- Check that `data/ideas.json` exists

See the [User Guide](docs/USER_GUIDE.md#14-troubleshooting-common-problems) for complete troubleshooting.

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Check code quality
```

---

## License

MIT License - free to use, modify, and distribute.

---

## Acknowledgments

- Inspired by the YouTube video ["Shipmas Day 6: Bring Any Idea To Life App (Nano Banana Pro API)"](https://www.youtube.com/watch?v=qNtFxkl975c&t=323s) by [All About AI](https://www.youtube.com/@AllAboutAI)
- Built with Claude Code and Claude Opus 4.5
- Uses OpenAI Whisper for speech recognition
- Powered by Google Gemini for AI analysis and image generation

---

## Need Help?

1. Check the [Quick Start Guide](docs/QUICK_START.md)
2. Read the [User Guide](docs/USER_GUIDE.md)
3. Review the [Developer Guide](docs/DEVELOPER_GUIDE.md)
4. Look at error messages - they usually explain the problem
