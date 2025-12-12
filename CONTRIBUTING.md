# Contributing to Voice to Concept

This document provides technical documentation for developers who want to understand, modify, or extend the Voice to Concept application.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Components](#components)
- [State Management](#state-management)
- [Adding New Features](#adding-new-features)
- [Code Style](#code-style)
- [Testing](#testing)

## Architecture Overview

Voice to Concept follows a standard Next.js 14 App Router architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   React Components                    │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐     │   │
│  │  │ HomePage │ │ IdeaPage │ │  IdeaInput       │     │   │
│  │  └────┬─────┘ └────┬─────┘ │  - VoiceRecorder │     │   │
│  │       │            │       │  - TextInput     │     │   │
│  │       │            │       └────────┬─────────┘     │   │
│  │       │            │                │               │   │
│  └───────┼────────────┼────────────────┼───────────────┘   │
└──────────┼────────────┼────────────────┼────────────────────┘
           │            │                │
           │ API Calls (fetch)           │
           ▼            ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js API Routes                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │
│  │ /transcribe  │ │  /analyze    │ │ /generate-image  │    │
│  └──────┬───────┘ └──────┬───────┘ └────────┬─────────┘    │
│         │                │                  │               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │
│  │ /api/ideas   │ │/api/ideas/[id]│ │/api/images/[path]│    │
│  │ (GET/POST)   │ │ (GET/DELETE) │ │  (Serve files)   │    │
│  └──────┬───────┘ └──────┬───────┘ └────────┬─────────┘    │
│         │                │                  │               │
│         ▼                ▼                  ▼               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              File System (data/ folder)              │   │
│  │  data/ideas.json          data/images/*.png          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │                │
          ▼                ▼
   ┌──────────────┐ ┌──────────────┐
   │ OpenAI API   │ │ Gemini API   │
   │ (Whisper)    │ │ (Analysis +  │
   │              │ │  Images)     │
   └──────────────┘ └──────────────┘
```

### Data Flow

1. **Voice Input**: Browser MediaRecorder → WebM blob → `/api/transcribe` → OpenAI Whisper → text
2. **Text Analysis**: Text → `/api/analyze` → Gemini 3 Pro → JSON (title, rating, analysis, improvements)
3. **Image Generation**: Prompt → `/api/generate-image` → Gemini 3 Pro Image → PNG saved to `data/images/`
4. **Storage**: Complete idea object → `/api/ideas` (POST) → `data/ideas.json` + image files on disk

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys for OpenAI and Google Gemini

### Local Development

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Add your API keys to .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
data/                             # Persistent storage (auto-created)
├── ideas.json                    # Array of idea metadata
└── images/                       # Generated PNG images
    └── {ideaId}-{type}.png       # e.g., idea-123-hero.png

src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (server-side)
│   │   ├── analyze/
│   │   │   └── route.ts          # POST: Gemini analysis
│   │   ├── generate-image/
│   │   │   └── route.ts          # POST: Gemini image generation (saves to disk)
│   │   ├── ideas/
│   │   │   ├── route.ts          # GET all / POST new idea
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET / DELETE single idea
│   │   ├── images/
│   │   │   └── [...path]/
│   │   │       └── route.ts      # Serve images from disk
│   │   └── transcribe/
│   │       └── route.ts          # POST: Whisper transcription
│   ├── idea/
│   │   └── [id]/
│   │       └── page.tsx          # Dynamic idea detail page
│   ├── globals.css               # Global styles & Tailwind
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components (client-side)
│   ├── IdeaCard.tsx              # Idea preview card
│   ├── IdeaDisplay.tsx           # Full idea view
│   ├── IdeaInput.tsx             # Input form with processing logic
│   ├── ImageGallery.tsx          # Image grid with lightbox
│   └── VoiceRecorder.tsx         # MediaRecorder wrapper
└── lib/                          # Shared utilities
    ├── prompts.ts                # AI prompt templates
    ├── storage.ts                # Async API storage calls
    └── types.ts                  # TypeScript interfaces
```

## API Routes

### POST /api/transcribe

Converts audio to text using OpenAI Whisper.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `audio` (File) - WebM or MP3 audio file

**Response:**
```json
{
  "text": "The transcribed text from the audio"
}
```

**Error Response:**
```json
{
  "error": "Failed to transcribe audio"
}
```

### POST /api/analyze

Analyzes an idea using Google Gemini.

**Request:**
```json
{
  "transcript": "The idea text to analyze"
}
```

**Response:**
```json
{
  "title": "Product Name",
  "tagline": "Short memorable tagline",
  "rating": 8,
  "analysis": "Detailed analysis...",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"]
}
```

### POST /api/generate-image

Generates an image using Google Gemini Image and saves it to disk.

**Request:**
```json
{
  "prompt": "Image generation prompt",
  "type": "hero",
  "label": "Hero Product",
  "ideaId": "idea-1702234567890-abc123"
}
```

**Response:**
```json
{
  "type": "hero",
  "label": "Hero Product",
  "filePath": "images/idea-1702234567890-abc123-hero.png",
  "prompt": "Original prompt"
}
```

### GET /api/ideas

Returns all saved ideas.

**Response:**
```json
[
  {
    "id": "idea-123",
    "transcript": "...",
    "analysis": { ... },
    "images": [ ... ],
    "createdAt": "2024-12-10T..."
  }
]
```

### POST /api/ideas

Saves a new idea.

**Request:**
```json
{
  "id": "idea-123",
  "transcript": "...",
  "analysis": { ... },
  "images": [ ... ],
  "createdAt": "2024-12-10T..."
}
```

### GET /api/ideas/[id]

Returns a single idea by ID.

### DELETE /api/ideas/[id]

Deletes an idea and its associated image files.

### GET /api/images/[...path]

Serves image files from the `data/` folder with proper MIME types and caching headers.

## Components

### IdeaInput

The main input component that orchestrates the entire idea creation flow.

**Props:**
```typescript
interface IdeaInputProps {
  onIdeaCreated?: () => void;  // Callback when idea is saved
}
```

**Key Functions:**
- `processIdea(transcript: string)` - Main processing pipeline
- `handleVoiceRecording(audioBlob: Blob)` - Handles voice input
- `handleTextSubmit(e: FormEvent)` - Handles text input

### VoiceRecorder

Cross-platform audio recording using MediaRecorder API.

**Props:**
```typescript
interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  disabled?: boolean;
}
```

**Browser Compatibility:**
- Uses `audio/webm` codec (Chrome, Firefox, Edge)
- Falls back to `audio/mp4` (Safari)

### ImageGallery

Displays generated images with lightbox functionality.

**Props:**
```typescript
interface ImageGalleryProps {
  images: IdeaImage[];
}
```

**Features:**
- Grid layout with hover effects
- Click to open lightbox
- Download functionality

### IdeaDisplay

Full-page view of a single idea with all generated content.

**Props:**
```typescript
interface IdeaDisplayProps {
  idea: Idea;
}
```

### IdeaCard

Preview card for the ideas list on the home page.

**Props:**
```typescript
interface IdeaCardProps {
  idea: Idea;
  onDelete?: (id: string) => void;
}
```

## State Management

### File-Based Storage

Ideas are stored in `data/ideas.json` as a JSON array. Images are stored as PNG files in `data/images/`.

```
data/
├── ideas.json                    # Array of idea metadata
└── images/
    ├── idea-123-hero.png
    ├── idea-123-ui-mockup.png
    ├── idea-123-lifestyle.png
    ├── idea-123-blueprint.png
    └── idea-123-logo.png
```

### Data Schema

```typescript
interface Idea {
  id: string;              // Unique ID: "idea-{timestamp}-{random}"
  transcript: string;      // Original idea text
  analysis: IdeaAnalysis;  // AI analysis results
  images: IdeaImage[];     // Array of 5 generated images
  createdAt: string;       // ISO date string
}

interface IdeaAnalysis {
  title: string;
  tagline: string;
  rating: number;          // 1-10
  analysis: string;
  keyPoints: string[];
  improvements: string[];
}

interface IdeaImage {
  type: 'hero' | 'ui-mockup' | 'lifestyle' | 'blueprint' | 'logo';
  label: string;
  filePath: string;        // Relative path: "images/idea-123-hero.png"
  prompt: string;          // Original generation prompt
}
```

### Storage Functions

Located in `src/lib/storage.ts`. All functions are async and call API routes:

```typescript
getIdeas(): Promise<Idea[]>                   // GET /api/ideas
getIdeaById(id: string): Promise<Idea | null> // GET /api/ideas/[id]
saveIdea(idea: Idea): Promise<void>           // POST /api/ideas
deleteIdea(id: string): Promise<void>         // DELETE /api/ideas/[id]
generateId(): string                          // Generate unique ID (sync)
```

## Adding New Features

### Adding a New Image Type

1. Update the `IdeaImage` type in `src/lib/types.ts`:
   ```typescript
   type: 'hero' | 'ui-mockup' | 'lifestyle' | 'blueprint' | 'logo' | 'new-type';
   ```

2. Add the prompt configuration in `src/lib/prompts.ts`:
   ```typescript
   {
     type: 'new-type',
     label: 'New Type Label',
     getPrompt: (title, description) => `Your prompt template...`,
   }
   ```

### Adding a New Analysis Field

1. Update `IdeaAnalysis` in `src/lib/types.ts`
2. Update `ANALYSIS_PROMPT` in `src/lib/prompts.ts` to include the new field
3. Update `IdeaDisplay.tsx` to render the new field

### Adding a Different AI Provider

1. Create a new API route in `src/app/api/`
2. Follow the existing pattern: validate input, call API, return JSON
3. Update the component that calls the API

## Code Style

### TypeScript Guidelines

- Use explicit types for function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use `'use client'` directive only when necessary

### Component Guidelines

- One component per file
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

### CSS/Tailwind Guidelines

- Use Tailwind utility classes
- Group related classes logically
- Use CSS custom properties for theme values
- Keep `globals.css` minimal

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase (e.g., `IdeaCard`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `ANALYSIS_PROMPT`)
- **Types/Interfaces**: PascalCase (e.g., `IdeaAnalysis`)

## Testing

### Manual Testing Checklist

- [ ] Voice recording works on Chrome, Firefox, Safari
- [ ] Text input submits correctly
- [ ] Ideas persist after page refresh
- [ ] Delete functionality works
- [ ] Images display and download correctly
- [ ] Error states show appropriate messages
- [ ] Loading states display during processing

### API Testing

Test individual endpoints using curl:

```bash
# Test transcription
curl -X POST http://localhost:3000/api/transcribe \
  -F "audio=@test-audio.webm"

# Test analysis
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"transcript": "A smart water bottle that tracks hydration"}'

# Test image generation
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Product photo of smart water bottle", "type": "hero", "label": "Hero", "ideaId": "test-123"}'

# Test ideas API
curl http://localhost:3000/api/ideas

# Test single idea
curl http://localhost:3000/api/ideas/idea-123
```

### Adding Automated Tests

To add Jest/Testing Library tests:

1. Install dependencies:
   ```bash
   npm install -D jest @testing-library/react @testing-library/jest-dom
   ```

2. Create test files alongside components:
   ```
   src/components/IdeaCard.tsx
   src/components/IdeaCard.test.tsx
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for Whisper | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Self-Hosted

```bash
# Build
npm run build

# Start with environment variables
OPENAI_API_KEY=xxx GEMINI_API_KEY=xxx npm start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting for Developers

### Common Build Errors

**"Module not found"**
- Run `npm install`
- Check import paths use `@/` alias correctly

**"Type errors"**
- Run `npm run lint`
- Ensure all types are properly imported

**API errors in development**
- Check `.env.local` exists and has valid keys
- Verify API keys have correct permissions
- Check browser console for detailed errors

### Performance Considerations

- Images are stored as PNG files on disk (no size limit)
- Ideas metadata stored in `data/ideas.json`
- Consider implementing pagination for large idea counts
- Image generation is sequential (can be parallelized)

## License

MIT License - See LICENSE file for details.
