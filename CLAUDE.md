# CLAUDE.md

This file provides guidance for future Claude Code instances working on this project.

## Project Overview

Voice to Concept is a Next.js 14 web application that transforms voice/text ideas into visual concept pages with AI-powered analysis and image generation.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (dark theme)
- **Storage**: File-based persistent storage (server-side)
- **APIs**:
  - OpenAI Whisper (speech-to-text)
  - Google Gemini (text analysis and image generation)

## Key Commands

```bash
npm install      # Install dependencies
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── transcribe/route.ts    # OpenAI Whisper endpoint
│   │   ├── analyze/route.ts       # Gemini text analysis
│   │   ├── generate-image/route.ts # Gemini image generation (saves to disk)
│   │   ├── ideas/route.ts         # GET all ideas, POST new idea
│   │   ├── ideas/[id]/route.ts    # GET/DELETE single idea
│   │   └── images/[...path]/route.ts # Serve images from disk
│   ├── idea/[id]/page.tsx         # Idea detail page
│   ├── page.tsx                   # Home page
│   └── layout.tsx                 # Root layout
├── components/
│   ├── IdeaInput.tsx              # Main input form + processing logic
│   ├── VoiceRecorder.tsx          # MediaRecorder wrapper
│   ├── IdeaCard.tsx               # Idea preview card
│   ├── IdeaDisplay.tsx            # Full idea detail view
│   └── ImageGallery.tsx           # Image grid with lightbox
└── lib/
    ├── types.ts                   # TypeScript interfaces
    ├── storage.ts                 # Async API calls for storage
    └── prompts.ts                 # AI prompt templates
data/
├── ideas.json                     # Idea metadata (auto-created)
└── images/                        # Generated images (auto-created)
```

## API Keys Configuration

Store in `.env.local`:
```
OPENAI_API_KEY=sk-your-key-here
GEMINI_API_KEY=AIzaSy-your-key-here
```

## Important: Gemini Model Names

Use these exact model names for the Google Gemini API:

| Purpose | Model Name |
|---------|------------|
| Text Analysis | `gemini-3-pro-preview` |
| Image Generation | `gemini-3-pro-image-preview` |

**Do NOT use:**
- `gemini-2.5-flash-preview-05-20` (does not exist)
- `gemini-3-pro-preview` for image generation (won't generate images)

## Known Issues & Solutions

### 1. Storage Quota (Historical - Now Fixed)

**Problem**: Previously used LocalStorage which has ~5MB limit. Base64 images (~1-2MB each, 5 per idea) exceeded quota.

**Solution**: Migrated to file-based persistent storage. Ideas stored in `data/ideas.json`, images saved as PNG files in `data/images/`. No quota limits.

### 2. Image Generation Returns No Images

**Problem**: Using wrong model for image generation.

**Solution**: Must use `gemini-3-pro-image-preview` with `responseModalities: ['TEXT', 'IMAGE']` config.

### 3. Voice Recording Cross-Platform

**Solution**: VoiceRecorder component auto-detects codec support:
- Chrome/Firefox/Edge: `audio/webm`
- Safari: `audio/mp4`

## Persistent Storage Architecture

The app uses file-based persistent storage via Next.js API routes:

### Storage Location
```
data/
├── ideas.json      # Array of idea metadata
└── images/         # Generated PNG images
    ├── {ideaId}-hero.png
    ├── {ideaId}-ui-mockup.png
    ├── {ideaId}-lifestyle.png
    ├── {ideaId}-blueprint.png
    └── {ideaId}-logo.png
```

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ideas` | GET | Get all ideas |
| `/api/ideas` | POST | Save new idea |
| `/api/ideas/[id]` | GET | Get single idea |
| `/api/ideas/[id]` | DELETE | Delete idea + images |
| `/api/images/[...path]` | GET | Serve image files |

### Storage Functions (src/lib/storage.ts)

All storage functions are async and call the API routes:
- `getIdeas()` - Fetch all ideas
- `getIdeaById(id)` - Fetch single idea
- `saveIdea(idea)` - Save new idea
- `deleteIdea(id)` - Delete idea and associated images

### Notes
- The `data/` folder is auto-created on first use
- `data/ideas.json` and `data/images/` are in `.gitignore`
- Images served with proper MIME types and caching headers
- Path traversal protection on image serving endpoint

## Data Flow

1. **Voice Input**: Browser MediaRecorder → WebM blob → `/api/transcribe` → OpenAI Whisper → text
2. **Text Analysis**: Text → `/api/analyze` → Gemini 3 Pro → JSON (title, rating, analysis, improvements)
3. **Image Generation**: Prompt → `/api/generate-image` → Gemini 3 Pro Image → PNG saved to `data/images/`
4. **Storage**: Complete idea object → `/api/ideas` → `data/ideas.json` + image files

## Documentation

- `docs/USER_GUIDE.md` - Complete user documentation
- `docs/DEVELOPER_GUIDE.md` - Technical documentation
- `docs/QUICK_START.md` - 5-minute setup guide
- `CONTRIBUTING.md` - Developer contribution guidelines
