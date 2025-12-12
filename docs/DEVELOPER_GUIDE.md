# Voice to Concept - Complete Developer Guide

This comprehensive guide covers everything you need to understand, maintain, and extend the Voice to Concept application. No prior experience with these specific technologies is assumed.

---

## Table of Contents

1. [Introduction & Architecture Overview](#1-introduction--architecture-overview)
2. [Technology Stack Explained](#2-technology-stack-explained)
3. [Development Environment Setup](#3-development-environment-setup)
4. [Project Structure Deep Dive](#4-project-structure-deep-dive)
5. [Understanding Next.js App Router](#5-understanding-nextjs-app-router)
6. [API Routes Explained](#6-api-routes-explained)
7. [React Components Guide](#7-react-components-guide)
8. [State Management with File Storage](#8-state-management-with-file-storage)
9. [TypeScript in This Project](#9-typescript-in-this-project)
10. [Styling with Tailwind CSS](#10-styling-with-tailwind-css)
11. [Working with External APIs](#11-working-with-external-apis)
12. [Common Development Tasks](#12-common-development-tasks)
13. [Adding New Features](#13-adding-new-features)
14. [Testing Guide](#14-testing-guide)
15. [Debugging Guide](#15-debugging-guide)
16. [Performance Optimization](#16-performance-optimization)
17. [Security Considerations](#17-security-considerations)
18. [Deployment Guide](#18-deployment-guide)
19. [Troubleshooting for Developers](#19-troubleshooting-for-developers)
20. [Glossary of Technical Terms](#20-glossary-of-technical-terms)

---

## 1. Introduction & Architecture Overview

### What This Application Does

Voice to Concept is a web application that:
1. Records user voice input or accepts text input
2. Converts voice to text using OpenAI's Whisper API
3. Analyzes the idea using Google's Gemini AI
4. Generates 5 images using Gemini's image generation
5. Displays results and saves them locally

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER'S BROWSER                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         REACT FRONTEND                               │   │
│  │   ┌─────────────┐    ┌─────────────┐    ┌──────────────────┐       │   │
│  │   │  Home Page  │    │ Idea Detail │    │    Input Form    │       │   │
│  │   │  (page.tsx) │    │   Page      │    │   (IdeaInput)    │       │   │
│  │   └──────┬──────┘    └──────┬──────┘    └────────┬─────────┘       │   │
│  └──────────┼──────────────────┼───────────────────┼──────────────────┘   │
└─────────────┼──────────────────┼───────────────────┼──────────────────────┘
              │ HTTP Requests    │                   │
              ▼                  ▼                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS API ROUTES (Server-Side)                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │  /api/transcribe │  │   /api/analyze   │  │/api/generate-image│         │
│  │  (Whisper STT)   │  │  (Gemini text)   │  │ (Saves to disk)  │         │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │   /api/ideas     │  │ /api/ideas/[id]  │  │/api/images/[path]│         │
│  │   (GET/POST)     │  │  (GET/DELETE)    │  │  (Serve files)   │         │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘         │
│           │                     │                     │                    │
│           ▼                     ▼                     ▼                    │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                    FILE SYSTEM (data/ folder)                        │  │
│  │  data/ideas.json              data/images/*.png                      │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
              │                     │
              │ HTTPS               │ HTTPS
              ▼                     ▼
┌───────────────────────┐ ┌───────────────────────┐
│   OPENAI API          │ │   GOOGLE GEMINI API   │
│   (Whisper)           │ │   (Analysis + Images) │
│  api.openai.com       │ │ generativelanguage.   │
│  /v1/audio/           │ │ googleapis.com        │
│  transcriptions       │ │                       │
└───────────────────────┘ └───────────────────────┘
```

### Data Flow Step by Step

**Step 1: User Input**
```
User speaks into microphone
        │
        ▼
MediaRecorder API captures audio as WebM blob
        │
        ▼
Blob sent to /api/transcribe as FormData
```

**Step 2: Transcription**
```
/api/transcribe receives audio blob
        │
        ▼
OpenAI Whisper API converts speech to text
        │
        ▼
Text returned to frontend
```

**Step 3: Analysis**
```
Frontend sends text to /api/analyze
        │
        ▼
Gemini AI analyzes and returns JSON:
{title, tagline, rating, analysis, keyPoints, improvements}
        │
        ▼
JSON returned to frontend
```

**Step 4: Image Generation**
```
Frontend sends 5 prompts to /api/generate-image (sequentially)
        │
        ▼
Gemini Image generates each image
        │
        ▼
Image saved to data/images/{ideaId}-{type}.png
        │
        ▼
File path returned to frontend
```

**Step 5: Storage**
```
Frontend assembles complete Idea object
        │
        ▼
POST to /api/ideas saves to data/ideas.json
        │
        ▼
User redirected to idea detail page
```

---

## 2. Technology Stack Explained

### Next.js 14 (App Router)

**What it is:** A React framework that adds server-side features.

**Why we use it:**
- Handles both frontend (React) and backend (API routes) in one project
- File-based routing (folders become URLs)
- Server-side rendering capabilities
- Built-in optimizations

**Key concepts:**
- `app/` directory contains all pages and API routes
- `page.tsx` files define pages
- `route.ts` files in `api/` folders define API endpoints
- `layout.tsx` wraps pages with common elements

### React 18

**What it is:** A JavaScript library for building user interfaces.

**Why we use it:**
- Component-based architecture
- Declarative UI updates
- Large ecosystem and community
- Works seamlessly with Next.js

**Key concepts:**
- Components are functions that return JSX (HTML-like syntax)
- `useState` manages component state
- `useEffect` handles side effects (like API calls)
- Props pass data between components

### TypeScript

**What it is:** JavaScript with static type checking.

**Why we use it:**
- Catches errors before runtime
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Required for professional Next.js projects

**Key concepts:**
- Interfaces define object shapes
- Types annotate variables and function parameters
- Compiler checks type correctness

### Tailwind CSS

**What it is:** A utility-first CSS framework.

**Why we use it:**
- Rapid styling without writing CSS files
- Consistent design system
- Responsive design made easy
- Small final bundle size

**Key concepts:**
- Classes like `bg-gray-800` apply styles directly
- `hover:`, `md:` prefixes for states and breakpoints
- Configuration in `tailwind.config.ts`

### External APIs

**OpenAI Whisper:**
- Speech-to-text service
- Handles multiple languages
- Very accurate transcription

**Google Gemini:**
- Large language model for text analysis
- Image generation capabilities
- Multimodal understanding

---

## 3. Development Environment Setup

### Step 3.1: Install Required Software

**Node.js (v18 or higher)**

Node.js runs JavaScript outside the browser. Download from https://nodejs.org/

Verify installation:
```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

**Code Editor (VS Code Recommended)**

Download from https://code.visualstudio.com/

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features (built-in)

**Git (Optional but Recommended)**

For version control. Download from https://git-scm.com/

### Step 3.2: Clone/Download the Project

If using Git:
```bash
git clone <repository-url>
cd voice-to-concept
```

Or download and extract the ZIP file, then:
```bash
cd path/to/voice-to-concept
```

### Step 3.3: Install Dependencies

```bash
npm install
```

This reads `package.json` and downloads all required packages into `node_modules/`.

**What gets installed:**
- `next` - The Next.js framework
- `react` and `react-dom` - React library
- `openai` - OpenAI API client
- `@google/genai` - Google Gemini API client
- `tailwindcss` - CSS framework
- `typescript` - TypeScript compiler
- Various type definitions (`@types/*`)

### Step 3.4: Configure Environment Variables

Create `.env.local` from the example:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:
```
OPENAI_API_KEY=sk-your-actual-key-here
GEMINI_API_KEY=AIzaSy-your-actual-key-here
```

**Important:** `.env.local` is gitignored - never commit API keys!

### Step 3.5: Start Development Server

```bash
npm run dev
```

The application runs at http://localhost:3000

**Development server features:**
- Hot reload (changes appear instantly)
- Error overlay (errors shown in browser)
- TypeScript checking
- Console output in terminal

### Step 3.6: Available NPM Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production build
npm run lint     # Check code for issues
```

---

## 4. Project Structure Deep Dive

```
voice-to-concept/
│
├── .env.local              # YOUR API keys (not committed to git)
├── .env.local.example      # Template for .env.local
├── .gitignore              # Files to exclude from git
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Exact dependency versions
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS (used by Tailwind)
├── eslint.config.mjs       # ESLint rules
│
├── data/                   # Persistent storage (auto-created)
│   ├── ideas.json          # Array of idea metadata
│   └── images/             # Generated PNG images
│       └── {ideaId}-{type}.png
│
├── docs/                   # Documentation files
│   ├── USER_GUIDE.md       # Guide for users
│   └── DEVELOPER_GUIDE.md  # This file
│
├── public/                 # Static files (served as-is)
│   ├── next.svg
│   └── vercel.svg
│
└── src/                    # Source code
    │
    ├── app/                # Next.js App Router
    │   │
    │   ├── globals.css     # Global styles
    │   ├── layout.tsx      # Root layout (wraps all pages)
    │   ├── page.tsx        # Home page (/)
    │   │
    │   ├── idea/
    │   │   └── [id]/
    │   │       └── page.tsx    # Dynamic idea page (/idea/123)
    │   │
    │   └── api/            # API Routes (server-side)
    │       │
    │       ├── transcribe/
    │       │   └── route.ts    # POST /api/transcribe
    │       │
    │       ├── analyze/
    │       │   └── route.ts    # POST /api/analyze
    │       │
    │       ├── generate-image/
    │       │   └── route.ts    # POST (saves images to disk)
    │       │
    │       ├── ideas/
    │       │   ├── route.ts    # GET all, POST new idea
    │       │   └── [id]/
    │       │       └── route.ts # GET/DELETE single idea
    │       │
    │       └── images/
    │           └── [...path]/
    │               └── route.ts # Serve images from disk
    │
    ├── components/         # React components
    │   ├── IdeaCard.tsx        # Card shown in ideas list
    │   ├── IdeaDisplay.tsx     # Full idea view
    │   ├── IdeaInput.tsx       # Main input form + processing
    │   ├── ImageGallery.tsx    # Image grid + lightbox
    │   └── VoiceRecorder.tsx   # Audio recording
    │
    └── lib/                # Shared utilities
        ├── types.ts            # TypeScript interfaces
        ├── storage.ts          # Async API storage calls
        └── prompts.ts          # AI prompt templates
```

### File Naming Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `page.tsx` | Page component | `app/page.tsx` → `/` route |
| `layout.tsx` | Layout wrapper | `app/layout.tsx` |
| `route.ts` | API endpoint | `app/api/transcribe/route.ts` |
| `[param]` | Dynamic route | `app/idea/[id]/` → `/idea/123` |
| `ComponentName.tsx` | React component | `IdeaCard.tsx` |
| `utilityName.ts` | Utility functions | `storage.ts` |

---

## 5. Understanding Next.js App Router

### How Routing Works

Next.js uses **file-based routing**. The folder structure determines URLs:

```
src/app/
├── page.tsx          →  /
├── about/
│   └── page.tsx      →  /about
├── idea/
│   └── [id]/
│       └── page.tsx  →  /idea/:id  (e.g., /idea/123)
└── api/
    └── analyze/
        └── route.ts  →  POST /api/analyze
```

### Page Components

A `page.tsx` file exports a React component that becomes a page:

```tsx
// src/app/page.tsx (Home page)
export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  );
}
```

### Layout Components

`layout.tsx` wraps pages with shared UI:

```tsx
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>  {/* pages render here */}
    </html>
  );
}
```

### Dynamic Routes

Square brackets create dynamic segments:

```
src/app/idea/[id]/page.tsx
```

Accessing the parameter:

```tsx
// src/app/idea/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';

export default function IdeaPage() {
  const params = useParams();
  const ideaId = params.id; // e.g., "123"

  return <div>Idea: {ideaId}</div>;
}
```

### Server vs Client Components

**Server Components** (default):
- Run on the server
- Can't use browser APIs
- Can't use hooks like `useState`
- Better for SEO and initial load

**Client Components** (with `'use client'`):
- Run in the browser
- Can use browser APIs (localStorage, MediaRecorder)
- Can use React hooks
- Required for interactivity

```tsx
'use client';  // This directive makes it a client component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);  // Hooks require 'use client'
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### When to Use `'use client'`

Add `'use client'` when your component:
- Uses `useState`, `useEffect`, or other hooks
- Uses browser APIs (`localStorage`, `window`, etc.)
- Has event handlers (`onClick`, `onChange`, etc.)
- Uses browser-only libraries

---

## 6. API Routes Explained

### What Are API Routes?

API routes are server-side endpoints defined in `app/api/`. They:
- Run on the server (Node.js environment)
- Can safely use API keys (not exposed to browser)
- Handle HTTP requests (GET, POST, etc.)
- Return JSON responses

### Route File Structure

```typescript
// src/app/api/example/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Handle POST requests
export async function POST(request: NextRequest) {
  // Parse request body
  const data = await request.json();

  // Do something
  const result = processData(data);

  // Return response
  return NextResponse.json({ result });
}

// Handle GET requests
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}
```

### The Transcribe Route (`/api/transcribe`)

**Purpose:** Convert audio to text using OpenAI Whisper

**File:** `src/app/api/transcribe/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse FormData (used for file uploads)
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    // Validate input
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }  // Bad Request
      );
    }

    // Call OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      response_format: 'text',
    });

    // Return transcribed text
    return NextResponse.json({ text: transcription });

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }  // Server Error
    );
  }
}
```

**Request format:**
```javascript
// Client-side code
const formData = new FormData();
formData.append('audio', audioBlob, 'recording.webm');

const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData,
});

const { text } = await response.json();
```

### The Analyze Route (`/api/analyze`)

**Purpose:** Analyze idea text using Gemini AI

**File:** `src/app/api/analyze/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { ANALYSIS_PROMPT } from '@/lib/prompts';

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const { transcript } = await request.json();

    // Validate input
    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'No transcript provided' },
        { status: 400 }
      );
    }

    // Combine system prompt with user input
    const fullPrompt = ANALYSIS_PROMPT + transcript;

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-05-20',
      contents: fullPrompt,
    });

    // Extract and clean response text
    const responseText = response.text || '';
    let cleanedText = responseText.trim();

    // Remove markdown code blocks if present
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7);
    }
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.slice(0, -3);
    }

    // Parse JSON response
    const analysis = JSON.parse(cleanedText.trim());

    return NextResponse.json(analysis);

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze idea' },
      { status: 500 }
    );
  }
}
```

**Request format:**
```javascript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ transcript: 'My idea description...' }),
});

const analysis = await response.json();
// { title, tagline, rating, analysis, keyPoints, improvements }
```

### The Generate-Image Route (`/api/generate-image`)

**Purpose:** Generate images using Gemini and save to disk

**File:** `src/app/api/generate-image/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const DATA_DIR = path.join(process.cwd(), 'data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');

export async function POST(request: NextRequest) {
  try {
    const { prompt, type, label, ideaId } = await request.json();

    // Ensure images directory exists
    await fs.mkdir(IMAGES_DIR, { recursive: true });

    // Call Gemini with image generation config
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    // Extract image from response
    const parts = response.candidates?.[0]?.content?.parts || [];
    let imageBase64 = null;

    for (const part of parts) {
      if (part.inlineData) {
        imageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 });
    }

    // Save image to disk
    const fileName = `${ideaId}-${type}.png`;
    const filePath = path.join(IMAGES_DIR, fileName);
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    await fs.writeFile(filePath, imageBuffer);

    return NextResponse.json({
      type,
      label,
      filePath: `images/${fileName}`,  // Relative path for serving
      prompt,
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
```

### The Ideas Routes (`/api/ideas`)

**Purpose:** CRUD operations for ideas stored in `data/ideas.json`

**Files:**
- `src/app/api/ideas/route.ts` - GET all, POST new
- `src/app/api/ideas/[id]/route.ts` - GET one, DELETE one

```typescript
// GET /api/ideas - returns all ideas
// POST /api/ideas - saves a new idea

// GET /api/ideas/[id] - returns single idea
// DELETE /api/ideas/[id] - deletes idea and its images
```

### The Images Route (`/api/images/[...path]`)

**Purpose:** Serve image files from disk with proper MIME types

**File:** `src/app/api/images/[...path]/route.ts`

```typescript
// Security: Validates path to prevent directory traversal
// Returns image with Content-Type: image/png
// Includes caching headers for performance
```

---

## 7. React Components Guide

### Component Overview

| Component | Purpose | Location |
|-----------|---------|----------|
| `IdeaInput` | Main input form, orchestrates processing | `src/components/IdeaInput.tsx` |
| `VoiceRecorder` | Audio recording with MediaRecorder | `src/components/VoiceRecorder.tsx` |
| `IdeaCard` | Preview card for ideas list | `src/components/IdeaCard.tsx` |
| `IdeaDisplay` | Full idea detail view | `src/components/IdeaDisplay.tsx` |
| `ImageGallery` | Image grid with lightbox | `src/components/ImageGallery.tsx` |

### IdeaInput Component Deep Dive

This is the most complex component - it orchestrates the entire idea creation flow.

**File:** `src/components/IdeaInput.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoiceRecorder from './VoiceRecorder';
import { InputMode, ProcessingStatus, IdeaAnalysis, Idea } from '@/lib/types';
import { IMAGE_PROMPTS } from '@/lib/prompts';
import { saveIdea, generateId } from '@/lib/storage';

interface IdeaInputProps {
  onIdeaCreated?: () => void;  // Optional callback
}

export default function IdeaInput({ onIdeaCreated }: IdeaInputProps) {
  const router = useRouter();

  // State management
  const [inputMode, setInputMode] = useState<InputMode>('voice');
  const [textInput, setTextInput] = useState('');
  const [status, setStatus] = useState<ProcessingStatus>({
    step: 'idle',
    message: ''
  });

  // Main processing function
  const processIdea = async (transcript: string) => {
    const ideaId = generateId();

    try {
      // Step 1: Analyze with Gemini
      setStatus({ step: 'analyzing', message: 'Analyzing your idea...' });

      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!analyzeResponse.ok) throw new Error('Analysis failed');

      const analysis: IdeaAnalysis = await analyzeResponse.json();

      // Step 2: Generate images (sequentially)
      const images = [];

      for (let i = 0; i < IMAGE_PROMPTS.length; i++) {
        const promptConfig = IMAGE_PROMPTS[i];

        setStatus({
          step: 'generating-images',
          message: `Generating ${promptConfig.label}...`,
          imageProgress: i + 1,
        });

        const imagePrompt = promptConfig.getPrompt(analysis.title, transcript);

        const imageResponse = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: imagePrompt,
            type: promptConfig.type,
            label: promptConfig.label,
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          images.push(imageData);
        }
      }

      // Step 3: Save and redirect
      const idea: Idea = {
        id: ideaId,
        transcript,
        analysis,
        images,
        createdAt: new Date().toISOString(),
      };

      saveIdea(idea);
      setStatus({ step: 'idle', message: '' });

      if (onIdeaCreated) onIdeaCreated();

      router.push(`/idea/${ideaId}`);

    } catch (error) {
      console.error('Error:', error);
      setStatus({ step: 'idle', message: '' });
      alert('Failed to process idea');
    }
  };

  // Handle voice recording completion
  const handleVoiceRecording = async (audioBlob: Blob) => {
    setStatus({ step: 'transcribing', message: 'Transcribing...' });

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const { text } = await response.json();
    await processIdea(text);
  };

  // Handle text form submission
  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    await processIdea(textInput.trim());
  };

  const isProcessing = status.step !== 'idle';

  return (
    <div>
      {/* Mode toggle */}
      <div>
        <button onClick={() => setInputMode('voice')}>Voice</button>
        <button onClick={() => setInputMode('text')}>Text</button>
      </div>

      {/* Input area */}
      {inputMode === 'voice' ? (
        <VoiceRecorder
          onRecordingComplete={handleVoiceRecording}
          disabled={isProcessing}
        />
      ) : (
        <form onSubmit={handleTextSubmit}>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={isProcessing}
          />
          <button type="submit" disabled={isProcessing}>
            Analyze Idea
          </button>
        </form>
      )}

      {/* Status display */}
      {isProcessing && (
        <div>
          <span>{status.message}</span>
          {status.imageProgress && <span>({status.imageProgress}/5)</span>}
        </div>
      )}
    </div>
  );
}
```

### VoiceRecorder Component

**File:** `src/components/VoiceRecorder.tsx`

Uses the browser's MediaRecorder API:

```typescript
'use client';

import { useState, useRef, useCallback } from 'react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({
  onRecordingComplete,
  disabled
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  // Refs persist values without causing re-renders
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      // Choose codec based on browser support
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      // Collect audio chunks as they're recorded
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // When recording stops, combine chunks and call callback
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        onRecordingComplete(audioBlob);

        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer for UI
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Could not access microphone');
    }
  }, [onRecordingComplete]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isRecording]);

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      disabled={disabled}
    >
      {isRecording ? 'Stop' : 'Record'}
      {isRecording && <span>{recordingTime}s</span>}
    </button>
  );
}
```

### Props Pattern

Components receive data through props (properties):

```typescript
// Defining props with interface
interface ButtonProps {
  label: string;           // Required string
  onClick: () => void;     // Required function
  disabled?: boolean;      // Optional boolean
}

// Using props in component
function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// Using the component
<Button label="Click me" onClick={() => alert('Clicked!')} />
<Button label="Disabled" onClick={() => {}} disabled={true} />
```

---

## 8. State Management with File Storage

### Why File Storage?

- **Unlimited storage** - no quota limits like browser LocalStorage
- **Persistent** - data survives browser cache clears
- **Cross-browser** - works in any browser on the same machine
- **Easy backup** - just copy the `data/` folder
- **Privacy-friendly** - data stays local on your machine

### Storage Architecture

```
data/
├── ideas.json              # Array of idea metadata (no binary data)
└── images/                 # Generated PNG images
    ├── idea-123-hero.png
    ├── idea-123-ui-mockup.png
    ├── idea-123-lifestyle.png
    ├── idea-123-blueprint.png
    └── idea-123-logo.png
```

### The Storage Module

**File:** `src/lib/storage.ts`

All storage functions are **async** and call API routes:

```typescript
import { Idea } from './types';

// GET ALL IDEAS
export async function getIdeas(): Promise<Idea[]> {
  const response = await fetch('/api/ideas');
  if (!response.ok) return [];
  return await response.json();
}

// GET ONE IDEA BY ID
export async function getIdeaById(id: string): Promise<Idea | null> {
  const response = await fetch(`/api/ideas/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

// SAVE AN IDEA
export async function saveIdea(idea: Idea): Promise<void> {
  await fetch('/api/ideas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
}

// DELETE AN IDEA
export async function deleteIdea(id: string): Promise<void> {
  await fetch(`/api/ideas/${id}`, { method: 'DELETE' });
}

// GENERATE UNIQUE ID (synchronous, client-side only)
export function generateId(): string {
  return `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

### API Routes for Storage

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/ideas` | GET | Get all ideas |
| `/api/ideas` | POST | Save new idea |
| `/api/ideas/[id]` | GET | Get single idea |
| `/api/ideas/[id]` | DELETE | Delete idea + images |
| `/api/images/[...path]` | GET | Serve image files |

### Using Storage in Components

Since all storage functions are async, you must use `await`:

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getIdeas, deleteIdea } from '@/lib/storage';
import { Idea } from '@/lib/types';

function IdeasList() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  // Load ideas when component mounts
  const loadIdeas = useCallback(async () => {
    setLoading(true);
    const loadedIdeas = await getIdeas();
    setIdeas(loadedIdeas);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  // Handle deletion
  const handleDelete = async (id: string) => {
    await deleteIdea(id);
    await loadIdeas();  // Refresh list
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {ideas.map(idea => (
        <div key={idea.id}>
          <h3>{idea.analysis.title}</h3>
          <button onClick={() => handleDelete(idea.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Loading Images from Storage

Images are served via the `/api/images/[...path]` route:

```typescript
// In components, use the API URL
function getImageUrl(image: IdeaImage): string {
  return `/api/images/${image.filePath}`;
}

// Example: image.filePath = "images/idea-123-hero.png"
// Results in: /api/images/images/idea-123-hero.png
```

---

## 9. TypeScript in This Project

### Why TypeScript?

TypeScript adds types to JavaScript, catching errors before runtime:

```typescript
// JavaScript - no error until runtime
function greet(name) {
  return name.toUpperCase();  // Crashes if name is undefined
}
greet();  // Runtime error!

// TypeScript - error shown immediately
function greet(name: string) {
  return name.toUpperCase();
}
greet();  // TypeScript error: Expected 1 argument, got 0
```

### Type Definitions

**File:** `src/lib/types.ts`

```typescript
// Type for image categories
export type ImageType = 'hero' | 'ui-mockup' | 'lifestyle' | 'blueprint' | 'logo';

// Interface for a single image
export interface IdeaImage {
  type: ImageType;
  label: string;
  filePath: string;    // Relative path: "images/idea-123-hero.png"
  prompt: string;      // Generation prompt
}

// Interface for analysis results
export interface IdeaAnalysis {
  title: string;
  tagline: string;
  rating: number;      // 1-10
  analysis: string;
  keyPoints: string[];
  improvements: string[];
}

// Interface for complete idea
export interface Idea {
  id: string;
  transcript: string;
  analysis: IdeaAnalysis;
  images: IdeaImage[];
  createdAt: string;   // ISO date string
}

// Interface for processing state
export interface ProcessingStatus {
  step: 'idle' | 'recording' | 'transcribing' | 'analyzing' | 'generating-images';
  message: string;
  imageProgress?: number;  // 1-5 during image generation
}

// Type for input modes
export type InputMode = 'text' | 'voice';
```

### Using Types

```typescript
// In components
import { Idea, ProcessingStatus } from '@/lib/types';

function IdeaComponent() {
  // TypeScript knows 'idea' has specific properties
  const [idea, setIdea] = useState<Idea | null>(null);

  // TypeScript enforces valid status values
  const [status, setStatus] = useState<ProcessingStatus>({
    step: 'idle',
    message: ''
  });

  // Error: 'invalid' is not assignable to ProcessingStatus['step']
  // setStatus({ step: 'invalid', message: '' });
}
```

### Type Checking

```bash
# Run TypeScript compiler to check types
npm run build  # Includes type checking

# Or check types without building
npx tsc --noEmit
```

---

## 10. Styling with Tailwind CSS

### How Tailwind Works

Instead of writing CSS files, you apply utility classes directly:

```jsx
// Traditional CSS approach
<div className="card">
  <h2 className="card-title">Hello</h2>
</div>

// styles.css
.card { padding: 16px; border-radius: 8px; background: #333; }
.card-title { font-size: 24px; font-weight: bold; }

// Tailwind approach - no CSS file needed!
<div className="p-4 rounded-lg bg-gray-800">
  <h2 className="text-2xl font-bold">Hello</h2>
</div>
```

### Common Tailwind Classes Used

**Spacing:**
- `p-4` = padding: 1rem (16px)
- `m-2` = margin: 0.5rem (8px)
- `px-6` = padding-left/right: 1.5rem
- `mt-4` = margin-top: 1rem
- `gap-4` = gap between flex/grid items

**Colors:**
- `bg-gray-800` = dark gray background
- `text-white` = white text
- `text-purple-400` = purple text
- `border-gray-700` = gray border

**Layout:**
- `flex` = display: flex
- `grid` = display: grid
- `grid-cols-3` = 3 column grid
- `items-center` = align-items: center
- `justify-between` = justify-content: space-between

**Typography:**
- `text-xl` = font-size: 1.25rem
- `font-bold` = font-weight: 700
- `text-center` = text-align: center

**Effects:**
- `rounded-lg` = border-radius: 0.5rem
- `shadow-lg` = large box shadow
- `opacity-50` = 50% opacity
- `hover:bg-gray-700` = darker on hover

**Responsive:**
- `md:grid-cols-2` = 2 columns on medium screens
- `lg:text-xl` = larger text on large screens

### Dark Theme Setup

**File:** `src/app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #030712;  /* Very dark blue-gray */
  --foreground: #f9fafb;  /* Almost white */
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

### Example Styled Component

```tsx
function Card({ title, children }) {
  return (
    <div className="
      bg-gray-800/50        /* Semi-transparent dark background */
      rounded-xl            /* Rounded corners */
      p-6                   /* Padding */
      border border-gray-700  /* Subtle border */
      hover:border-purple-500/50  /* Purple border on hover */
      transition-all        /* Smooth transitions */
      duration-300          /* 300ms duration */
    ">
      <h3 className="
        text-xl             /* Large text */
        font-semibold       /* Semi-bold weight */
        text-white          /* White color */
        mb-4                /* Margin bottom */
      ">
        {title}
      </h3>
      <div className="text-gray-400">
        {children}
      </div>
    </div>
  );
}
```

---

## 11. Working with External APIs

### OpenAI API (Whisper)

**Documentation:** https://platform.openai.com/docs/guides/speech-to-text

**Client initialization:**
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

**Transcription call:**
```typescript
const transcription = await openai.audio.transcriptions.create({
  file: audioFile,        // File object
  model: 'whisper-1',     // Model name
  response_format: 'text', // Return plain text
});
```

**Available parameters:**
- `model`: 'whisper-1' (only option currently)
- `response_format`: 'text', 'json', 'verbose_json', 'srt', 'vtt'
- `language`: Optional ISO-639-1 code (e.g., 'en')
- `prompt`: Optional context hint

### Google Gemini API

**Documentation:** https://ai.google.dev/gemini-api/docs

**Client initialization:**
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});
```

**Text generation:**
```typescript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-preview-05-20',
  contents: 'Your prompt here',
});

const text = response.text;
```

**Image generation:**
```typescript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-preview-05-20',
  contents: 'Description of image to generate',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],  // Enable image output
  },
});

// Extract image
const parts = response.candidates[0].content.parts;
for (const part of parts) {
  if (part.inlineData) {
    const base64Image = part.inlineData.data;
    // Use base64Image...
  }
}
```

### Error Handling Best Practices

```typescript
export async function POST(request: NextRequest) {
  try {
    // Parse input
    const data = await request.json();

    // Validate input
    if (!data.transcript) {
      return NextResponse.json(
        { error: 'Missing transcript' },
        { status: 400 }  // Bad Request
      );
    }

    // Make API call
    const result = await externalApi.call(data);

    // Return success
    return NextResponse.json(result);

  } catch (error) {
    // Log full error for debugging
    console.error('API Error:', error);

    // Check for specific error types
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 12. Common Development Tasks

### Task: Changing the AI Model

**To change Gemini model:**

1. Open `src/app/api/analyze/route.ts`
2. Find: `model: 'gemini-2.5-flash-preview-05-20'`
3. Replace with desired model (e.g., `'gemini-1.5-pro'`)
4. Repeat for `src/app/api/generate-image/route.ts`

### Task: Modifying Image Prompts

**To change how images are generated:**

1. Open `src/lib/prompts.ts`
2. Find the `IMAGE_PROMPTS` array
3. Modify the `getPrompt` function for any image type:

```typescript
{
  type: 'hero',
  label: 'Hero Product',
  getPrompt: (title, description) =>
    `YOUR NEW PROMPT HERE with ${title} and ${description}`,
},
```

### Task: Changing the Analysis Format

**To modify what Gemini analyzes:**

1. Open `src/lib/prompts.ts`
2. Find `ANALYSIS_PROMPT`
3. Modify the JSON structure in the prompt
4. Update `IdeaAnalysis` interface in `src/lib/types.ts` to match
5. Update `IdeaDisplay.tsx` to render new fields

### Task: Adding a New Page

1. Create folder: `src/app/your-page/`
2. Create file: `src/app/your-page/page.tsx`
3. Add component:

```tsx
export default function YourPage() {
  return (
    <main>
      <h1>Your New Page</h1>
    </main>
  );
}
```

4. Access at: `http://localhost:3000/your-page`

### Task: Adding a New API Route

1. Create folder: `src/app/api/your-route/`
2. Create file: `src/app/api/your-route/route.ts`
3. Add handler:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  // Process data...
  return NextResponse.json({ result: 'success' });
}
```

4. Call from frontend:

```typescript
const response = await fetch('/api/your-route', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' }),
});
```

---

## 13. Adding New Features

### Feature: Add PDF Export

**Implementation steps:**

1. Install PDF library:
   ```bash
   npm install jspdf
   ```

2. Create export function in `src/lib/export.ts`:
   ```typescript
   import { jsPDF } from 'jspdf';
   import { Idea } from './types';

   export function exportToPDF(idea: Idea) {
     const doc = new jsPDF();

     doc.setFontSize(24);
     doc.text(idea.analysis.title, 20, 30);

     doc.setFontSize(14);
     doc.text(idea.analysis.tagline, 20, 45);

     // Add more content...

     doc.save(`${idea.analysis.title}.pdf`);
   }
   ```

3. Add button in `IdeaDisplay.tsx`:
   ```tsx
   import { exportToPDF } from '@/lib/export';

   <button onClick={() => exportToPDF(idea)}>
     Export to PDF
   </button>
   ```

### Feature: Add More Image Types

1. Update `src/lib/types.ts`:
   ```typescript
   export type ImageType =
     | 'hero'
     | 'ui-mockup'
     | 'lifestyle'
     | 'blueprint'
     | 'logo'
     | 'packaging';  // New type
   ```

2. Add prompt in `src/lib/prompts.ts`:
   ```typescript
   {
     type: 'packaging',
     label: 'Product Packaging',
     getPrompt: (title, description) =>
       `Product packaging design for "${title}". Modern, retail-ready box design...`,
   },
   ```

### Feature: Add Idea Editing

1. Create edit page: `src/app/idea/[id]/edit/page.tsx`

2. Add edit form component

3. Add "Edit" button to `IdeaDisplay.tsx`

4. Update storage functions to support updating

### Feature: Add Search/Filter

1. Add search state to home page:
   ```typescript
   const [search, setSearch] = useState('');

   const filteredIdeas = ideas.filter(idea =>
     idea.analysis.title.toLowerCase().includes(search.toLowerCase())
   );
   ```

2. Add search input:
   ```tsx
   <input
     value={search}
     onChange={(e) => setSearch(e.target.value)}
     placeholder="Search ideas..."
   />
   ```

---

## 14. Testing Guide

### Manual Testing Checklist

**Voice Recording:**
- [ ] Microphone permission request appears
- [ ] Recording starts when clicking button
- [ ] Timer increments during recording
- [ ] Recording stops when clicking again
- [ ] Audio is transcribed correctly

**Text Input:**
- [ ] Text area accepts input
- [ ] Submit button works
- [ ] Empty input is rejected

**Processing:**
- [ ] Status messages appear
- [ ] Progress updates (1/5, 2/5, etc.)
- [ ] Analysis completes
- [ ] Images are generated

**Results Display:**
- [ ] Title and tagline display
- [ ] Rating badge shows
- [ ] All 5 images appear
- [ ] Analysis text renders
- [ ] Key points list
- [ ] Improvements list

**Navigation:**
- [ ] Back button works
- [ ] Clicking card opens detail page
- [ ] Home link works

**Storage:**
- [ ] Ideas persist after refresh
- [ ] Delete removes idea
- [ ] New ideas appear at top

### API Testing with cURL

```bash
# Test transcription (replace with actual audio file)
curl -X POST http://localhost:3000/api/transcribe \
  -F "audio=@test.webm"

# Test analysis
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"transcript": "A smart water bottle"}'

# Test image generation
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Product photo of water bottle", "type": "hero", "label": "Hero"}'
```

### Adding Automated Tests

1. Install testing dependencies:
   ```bash
   npm install -D jest @testing-library/react @testing-library/jest-dom
   ```

2. Create `jest.config.js`:
   ```javascript
   module.exports = {
     testEnvironment: 'jsdom',
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   };
   ```

3. Create `jest.setup.js`:
   ```javascript
   import '@testing-library/jest-dom';
   ```

4. Create test file `src/lib/storage.test.ts`:
   ```typescript
   import { generateId, saveIdea, getIdeas } from './storage';

   describe('storage', () => {
     beforeEach(() => {
       localStorage.clear();
     });

     test('generateId creates unique IDs', () => {
       const id1 = generateId();
       const id2 = generateId();
       expect(id1).not.toBe(id2);
     });

     test('saveIdea and getIdeas work together', () => {
       const idea = {
         id: 'test-1',
         transcript: 'Test idea',
         analysis: { title: 'Test', tagline: 'Test', rating: 5 },
         images: [],
         createdAt: new Date().toISOString(),
       };

       saveIdea(idea);
       const ideas = getIdeas();

       expect(ideas).toHaveLength(1);
       expect(ideas[0].id).toBe('test-1');
     });
   });
   ```

5. Run tests:
   ```bash
   npm test
   ```

---

## 15. Debugging Guide

### Browser Developer Tools

**Open DevTools:**
- Chrome/Edge: F12 or Ctrl+Shift+I
- Firefox: F12 or Ctrl+Shift+I
- Safari: Cmd+Opt+I

**Console Tab:**
- View `console.log()` output
- See JavaScript errors
- Execute JavaScript commands

**Network Tab:**
- View API requests/responses
- Check request payloads
- See response times
- Identify failed requests (red)

**Application Tab:**
- View LocalStorage
- Clear storage for testing
- See stored data

### Common Debugging Techniques

**Add console logs:**
```typescript
const processIdea = async (transcript: string) => {
  console.log('Processing idea:', transcript);  // Debug

  const response = await fetch('/api/analyze', ...);
  console.log('Analysis response:', response);  // Debug

  const data = await response.json();
  console.log('Analysis data:', data);  // Debug
};
```

**Debug API routes:**
```typescript
export async function POST(request: NextRequest) {
  console.log('API called');  // Shows in terminal

  const body = await request.json();
  console.log('Request body:', body);

  // ... rest of handler
}
```

**Check environment variables:**
```typescript
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('Key prefix:', process.env.OPENAI_API_KEY?.substring(0, 5));
```

### Debugging React Components

**Use React DevTools extension:**
1. Install "React Developer Tools" browser extension
2. Open DevTools, find "Components" tab
3. Inspect component state and props
4. Track component re-renders

**Debug state changes:**
```typescript
useEffect(() => {
  console.log('Status changed:', status);
}, [status]);
```

### Debugging Storage Issues

```typescript
// In browser console
localStorage.getItem('voice-to-concept-ideas')

// Clear storage
localStorage.removeItem('voice-to-concept-ideas')

// Check storage size
new Blob([localStorage.getItem('voice-to-concept-ideas')]).size
```

---

## 16. Performance Optimization

### Current Performance Characteristics

| Operation | Typical Time | Notes |
|-----------|--------------|-------|
| Transcription | 2-5 seconds | Depends on audio length |
| Analysis | 3-8 seconds | Varies with AI load |
| Image (each) | 10-30 seconds | Most variable |
| **Total per idea** | **60-180 seconds** | |

### Optimization Opportunities

**1. Parallel Image Generation (Advanced)**

Current: Sequential (one at a time)
Optimized: Parallel (all at once)

```typescript
// Current approach
for (const prompt of IMAGE_PROMPTS) {
  const image = await generateImage(prompt);  // Wait for each
  images.push(image);
}

// Optimized approach
const imagePromises = IMAGE_PROMPTS.map(prompt =>
  generateImage(prompt)  // Start all at once
);
const images = await Promise.all(imagePromises);  // Wait for all
```

**Caution:** May hit rate limits with parallel requests.

**2. Image Caching (If Same Prompts)**

Store generated images for reuse:
```typescript
const cacheKey = `image-${hashPrompt(prompt)}`;
const cached = localStorage.getItem(cacheKey);
if (cached) return JSON.parse(cached);
```

**3. Lazy Loading Images**

Only load images when visible:
```tsx
<img loading="lazy" src={...} />
```

**4. Reduce Image Count**

Offer option for fewer images:
```typescript
const imageCount = userPreference || 5;
const prompts = IMAGE_PROMPTS.slice(0, imageCount);
```

---

## 17. Security Considerations

### API Key Security

**Do:**
- Store keys in `.env.local` only
- Ensure `.env.local` is in `.gitignore`
- Use environment variables on server-side only

**Don't:**
- Commit keys to version control
- Expose keys in client-side code
- Share keys in screenshots or logs

### Input Validation

Always validate user input:
```typescript
export async function POST(request: NextRequest) {
  const { transcript } = await request.json();

  // Validate type
  if (typeof transcript !== 'string') {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  // Validate length
  if (transcript.length > 10000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  // Sanitize if needed
  const clean = transcript.trim();
}
```

### Rate Limiting Considerations

The application doesn't implement rate limiting. For production:
- Add request throttling
- Implement user-based limits
- Monitor API usage

### Data Privacy

- Ideas stored locally only
- No server-side database
- Data never leaves user's browser (except for AI processing)
- Consider adding data export/delete features for GDPR

---

## 18. Deployment Guide

### Option 1: Vercel (Recommended)

Vercel is the company behind Next.js and offers free hosting.

**Steps:**

1. Push code to GitHub

2. Go to https://vercel.com/ and sign up

3. Click "New Project"

4. Import your GitHub repository

5. Configure environment variables:
   - Click "Environment Variables"
   - Add `OPENAI_API_KEY`
   - Add `GEMINI_API_KEY`

6. Click "Deploy"

7. Your app is live at `your-project.vercel.app`

### Option 2: Self-Hosted (Docker)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t voice-to-concept .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your-key \
  -e GEMINI_API_KEY=your-key \
  voice-to-concept
```

### Option 3: Traditional Server

1. SSH into your server

2. Install Node.js 18+

3. Clone/copy the project

4. Install dependencies:
   ```bash
   npm ci --only=production
   ```

5. Create `.env.local` with API keys

6. Build:
   ```bash
   npm run build
   ```

7. Start with process manager:
   ```bash
   npm install -g pm2
   pm2 start npm --name "voice-to-concept" -- start
   ```

---

## 19. Troubleshooting for Developers

### Problem: TypeScript Errors

**Symptom:** Red underlines in VS Code, build fails

**Solutions:**
1. Run `npm install` to ensure all types installed
2. Restart VS Code TypeScript server: Cmd+Shift+P → "TypeScript: Restart TS Server"
3. Check import paths use `@/` correctly
4. Verify interface definitions match usage

### Problem: API Route Returns 500

**Symptom:** API calls fail with 500 error

**Debug steps:**
1. Check terminal for error message
2. Add console.log to route handler
3. Verify environment variables are set
4. Test API key directly with curl

### Problem: Component Not Updating

**Symptom:** State changes but UI doesn't reflect

**Solutions:**
1. Ensure using `setState` function, not direct mutation
2. Check if using `key` prop correctly in lists
3. Verify `useEffect` dependencies array

### Problem: Styles Not Applied

**Symptom:** Tailwind classes not working

**Solutions:**
1. Restart dev server
2. Check class names for typos
3. Verify file is in `content` paths in tailwind config
4. Clear browser cache

### Problem: Storage Not Working

**Symptom:** Ideas not persisting or loading

**Solutions:**
1. Check the server is running (`npm run dev`)
2. Check browser console for API errors
3. Verify `data/` folder exists in project root
4. Check `data/ideas.json` is valid JSON
5. Ensure API routes are accessible (try `/api/ideas` in browser)

### Problem: Audio Recording Fails

**Symptom:** Microphone not working

**Solutions:**
1. Check browser microphone permissions
2. Verify HTTPS (required in some browsers)
3. Test microphone in other applications
4. Try different browser (Chrome works best)

---

## 20. Glossary of Technical Terms

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - standardized way for programs to communicate |
| **API Route** | Server-side endpoint in Next.js that handles HTTP requests |
| **App Router** | Next.js file-based routing system using the `app/` directory |
| **Base64** | Encoding scheme to represent binary data (like images) as text |
| **Blob** | Binary Large Object - raw data like audio or images in JavaScript |
| **Client Component** | React component that runs in the browser (marked with `'use client'`) |
| **Component** | Reusable piece of UI in React |
| **CORS** | Cross-Origin Resource Sharing - security mechanism for web requests |
| **Dependencies** | External packages your project needs (listed in package.json) |
| **Environment Variable** | Configuration value set outside the code (like API keys) |
| **ESLint** | Tool that checks JavaScript/TypeScript code for issues |
| **FormData** | JavaScript object for sending form data including files |
| **Hook** | React function for adding features to components (useState, useEffect) |
| **Interface** | TypeScript definition of an object's structure |
| **JSX** | Syntax extension that lets you write HTML-like code in JavaScript |
| **Layout** | Component that wraps pages with shared UI (header, footer) |
| **File Storage** | Server-side storage in the `data/` folder |
| **MediaRecorder** | Browser API for recording audio/video |
| **Middleware** | Code that runs between request and response |
| **npm** | Node Package Manager - tool for installing JavaScript packages |
| **Page** | React component that represents a URL route |
| **Props** | Data passed to React components |
| **REST** | Architectural style for web APIs using HTTP methods |
| **Server Component** | React component that runs on the server (default in App Router) |
| **State** | Data that changes over time in a component |
| **Tailwind CSS** | Utility-first CSS framework |
| **Type** | TypeScript annotation describing what kind of value something is |
| **TypeScript** | JavaScript with static type checking |
| **Utility Class** | Single-purpose CSS class (like `bg-gray-800`) |
| **WebM** | Audio/video format well-supported by browsers |

---

## Quick Reference Card

### Useful Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Check for code issues
```

### File Locations

| Need to change... | Edit this file |
|------------------|----------------|
| API keys | `.env.local` |
| AI prompts | `src/lib/prompts.ts` |
| Type definitions | `src/lib/types.ts` |
| Storage logic | `src/lib/storage.ts` (async API calls) |
| Global styles | `src/app/globals.css` |
| API endpoints | `src/app/api/*/route.ts` |
| Components | `src/components/*.tsx` |
| Pages | `src/app/**/page.tsx` |

### Key URLs

- Application: http://localhost:3000
- OpenAI Dashboard: https://platform.openai.com
- Google AI Studio: https://aistudio.google.com
- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
- React Docs: https://react.dev

---

*This documentation was created to be comprehensive and self-contained. If something is unclear or missing, please update this document for future developers.*
