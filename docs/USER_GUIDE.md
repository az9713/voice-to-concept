# Voice to Concept - Complete User Guide

Welcome to Voice to Concept! This guide will walk you through everything you need to know to use this application, from installation to advanced features. No technical experience required.

---

## Table of Contents

1. [What is Voice to Concept?](#1-what-is-voice-to-concept)
2. [What You'll Need Before Starting](#2-what-youll-need-before-starting)
3. [Step-by-Step Installation](#3-step-by-step-installation)
4. [Getting Your API Keys](#4-getting-your-api-keys)
5. [Starting the Application](#5-starting-the-application)
6. [Your First Idea (Quick Start)](#6-your-first-idea-quick-start)
7. [Understanding the Interface](#7-understanding-the-interface)
8. [Using Voice Input](#8-using-voice-input)
9. [Using Text Input](#9-using-text-input)
10. [Understanding Your Results](#10-understanding-your-results)
11. [Managing Your Ideas](#11-managing-your-ideas)
12. [Downloading Images](#12-downloading-images)
13. [Ten Example Use Cases](#13-ten-example-use-cases)
14. [Troubleshooting Common Problems](#14-troubleshooting-common-problems)
15. [Frequently Asked Questions](#15-frequently-asked-questions)
16. [Glossary of Terms](#16-glossary-of-terms)

---

## 1. What is Voice to Concept?

Voice to Concept is a web application that transforms your spoken or written ideas into visual concept pages.

### What It Does

When you share an idea (by speaking or typing), the application will:

1. **Transcribe** your voice to text (if you spoke)
2. **Analyze** your idea using artificial intelligence
3. **Generate** a catchy name and tagline for your idea
4. **Rate** your idea on a scale of 1-10
5. **Create** 5 professional images visualizing your concept
6. **Provide** suggestions on how to improve your idea

### Who Is This For?

- **Entrepreneurs** who want to quickly visualize business ideas
- **Designers** looking for concept inspiration
- **Students** brainstorming project ideas
- **Anyone** who has ideas and wants to see them come to life

### What You'll Get

For each idea you submit, you receive:
- A professional product name
- A memorable tagline
- A rating with detailed analysis
- 5 AI-generated images:
  - Hero product shot
  - Mobile app UI mockup
  - Lifestyle photography
  - Technical blueprint
  - Logo design
- Key strengths of your idea
- Suggested improvements

---

## 2. What You'll Need Before Starting

Before you can use Voice to Concept, you need to prepare a few things. Don't worry - we'll guide you through each step.

### Required Items Checklist

- [ ] A computer (Windows, Mac, or Linux)
- [ ] Internet connection
- [ ] A web browser (Chrome, Firefox, Edge, or Safari)
- [ ] A microphone (built-in or external) - only needed for voice input
- [ ] Node.js software (we'll show you how to install this)
- [ ] OpenAI API key (we'll show you how to get this - requires account)
- [ ] Google Gemini API key (we'll show you how to get this - requires account)
- [ ] A credit card (for API billing - costs are typically $0.10-0.30 per idea)

### Cost Information

This application uses paid AI services. Here's what to expect:

| Service | What It Does | Cost Per Idea |
|---------|--------------|---------------|
| OpenAI Whisper | Converts your voice to text | ~$0.01 |
| Google Gemini | Analyzes your idea | ~$0.01 |
| Google Gemini Image | Creates 5 images | ~$0.15-0.25 |
| **Total** | | **~$0.15-0.30** |

Both OpenAI and Google offer free credits for new accounts, so you may be able to try several ideas for free.

---

## 3. Step-by-Step Installation

### Step 3.1: Install Node.js

Node.js is a program that allows your computer to run this application. Here's how to install it:

#### For Windows:

1. Open your web browser
2. Go to: https://nodejs.org/
3. You'll see two green download buttons. Click the one that says **"LTS"** (Long Term Support)
   - This downloads a file called something like `node-v20.x.x-x64.msi`
4. Find the downloaded file (usually in your Downloads folder)
5. Double-click the file to start installation
6. Click **"Next"** on the welcome screen
7. Check the box to accept the license agreement, click **"Next"**
8. Leave the installation location as default, click **"Next"**
9. Leave all features as default, click **"Next"**
10. Click **"Install"**
11. If asked "Do you want to allow this app to make changes?", click **"Yes"**
12. Wait for installation to complete
13. Click **"Finish"**

#### For Mac:

1. Open your web browser
2. Go to: https://nodejs.org/
3. Click the **"LTS"** download button
   - This downloads a file called something like `node-v20.x.x.pkg`
4. Find the downloaded file (usually in your Downloads folder)
5. Double-click the file to start installation
6. Click **"Continue"** through the introduction
7. Click **"Continue"** to agree to the license
8. Click **"Agree"** to confirm
9. Click **"Install"**
10. Enter your Mac password when prompted
11. Wait for installation to complete
12. Click **"Close"**

#### Verify Installation:

To confirm Node.js installed correctly:

**On Windows:**
1. Press the Windows key on your keyboard
2. Type "cmd" and press Enter (this opens Command Prompt)
3. Type: `node --version` and press Enter
4. You should see a version number like `v20.10.0`

**On Mac:**
1. Press Command + Space to open Spotlight
2. Type "Terminal" and press Enter
3. Type: `node --version` and press Enter
4. You should see a version number like `v20.10.0`

If you see a version number, Node.js is installed correctly!

### Step 3.2: Download Voice to Concept

You should already have the Voice to Concept folder. If not, make sure you have the complete project folder on your computer.

The folder should contain files like:
- `package.json`
- `README.md`
- A folder called `src`

### Step 3.3: Install Application Dependencies

"Dependencies" are additional software packages that Voice to Concept needs to work.

1. Open Command Prompt (Windows) or Terminal (Mac)
   - Windows: Press Windows key, type "cmd", press Enter
   - Mac: Press Command + Space, type "Terminal", press Enter

2. Navigate to the Voice to Concept folder:

   **Windows example** (adjust path to match your folder location):
   ```
   cd C:\Users\YourName\Downloads\voice-to-concept
   ```

   **Mac example**:
   ```
   cd ~/Downloads/voice-to-concept
   ```

   > **Tip**: You can also type `cd ` (with a space after) and then drag the folder into the terminal window - it will automatically fill in the path!

3. Type this command and press Enter:
   ```
   npm install
   ```

4. Wait for the installation to complete (this may take 1-2 minutes)
   - You'll see a progress bar and various messages
   - When it's done, you'll see something like "added 356 packages"

5. If you see any red "ERROR" messages, don't panic. Yellow "WARN" messages are normal and okay.

---

## 4. Getting Your API Keys

API keys are like passwords that allow the application to use AI services. You need two keys: one from OpenAI and one from Google.

### Step 4.1: Get Your OpenAI API Key

1. Open your web browser
2. Go to: https://platform.openai.com/signup
3. **Create an account:**
   - Click "Sign up"
   - Enter your email address
   - Create a password
   - Verify your email (check your inbox and click the verification link)
   - Complete any additional verification (phone number, etc.)

4. **Add payment method:**
   - After logging in, click on your profile icon (top right)
   - Click "Settings"
   - Click "Billing" in the left menu
   - Click "Add payment method"
   - Enter your credit card details
   - Add a small amount of credit (e.g., $5) to start

5. **Get your API key:**
   - Click on "API keys" in the left menu (or go to https://platform.openai.com/api-keys)
   - Click the green "+ Create new secret key" button
   - Give it a name like "Voice to Concept"
   - Click "Create secret key"
   - **IMPORTANT**: Copy the key immediately! It starts with `sk-` and looks like:
     ```
     sk-proj-abc123def456ghi789...
     ```
   - Save this key somewhere safe (a text file, password manager, etc.)
   - You cannot see this key again after closing the popup!

### Step 4.2: Get Your Google Gemini API Key

1. Open your web browser
2. Go to: https://aistudio.google.com/
3. **Sign in with Google:**
   - Click "Sign in" if not already signed in
   - Use your Google account (Gmail)

4. **Get your API key:**
   - Click "Get API key" in the left sidebar
   - Click "Create API key"
   - Select "Create API key in new project"
   - Copy the key that appears - it looks like:
     ```
     AIzaSyAbc123def456ghi789jkl012mno345
     ```
   - Save this key somewhere safe

### Step 4.3: Add Keys to the Application

1. In your Voice to Concept folder, find the file called `.env.local.example`

2. Make a copy of this file:
   - **Windows**: Right-click the file → Copy → Right-click in empty space → Paste
   - **Mac**: Select file → Command+C → Command+V

3. Rename the copy to exactly `.env.local` (remove the `.example` part)
   - **Windows**: Right-click → Rename
   - **Mac**: Click once, wait, click again on the name to edit
   - **Note**: The file starts with a dot (.) which is intentional

4. Open `.env.local` in a text editor:
   - **Windows**: Right-click → "Open with" → Notepad
   - **Mac**: Right-click → "Open With" → TextEdit

5. Replace the placeholder text with your actual keys:

   **Before:**
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   **After (example - use your own keys):**
   ```
   OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012mno345pqr678
   GEMINI_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345
   ```

6. Save the file:
   - **Windows**: Ctrl + S
   - **Mac**: Command + S

7. Close the text editor

---

## 5. Starting the Application

Now you're ready to start Voice to Concept!

### Step 5.1: Start the Server

1. Open Command Prompt (Windows) or Terminal (Mac)

2. Navigate to your Voice to Concept folder (same as before):
   ```
   cd C:\Users\YourName\Downloads\voice-to-concept
   ```
   or
   ```
   cd ~/Downloads/voice-to-concept
   ```

3. Type this command and press Enter:
   ```
   npm run dev
   ```

4. Wait for the application to start. You'll see:
   ```
   ▲ Next.js 16.0.8
   - Local: http://localhost:3000
   ```

5. **Keep this window open!** Closing it will stop the application.

### Step 5.2: Open in Browser

1. Open your web browser (Chrome recommended)

2. In the address bar at the top, type:
   ```
   http://localhost:3000
   ```

3. Press Enter

4. You should see the Voice to Concept home page with:
   - "Voice to Concept" title at the top
   - A purple "New Idea" button
   - An empty area (where your ideas will appear later)

**Congratulations! The application is now running!**

### Step 5.3: Stopping the Application

When you're done using Voice to Concept:

1. Go back to the Command Prompt/Terminal window
2. Press `Ctrl + C` (both Windows and Mac)
3. Type `Y` and press Enter if asked to confirm
4. You can now close the Command Prompt/Terminal window

### Step 5.4: Starting Again Later

Whenever you want to use Voice to Concept again:

1. Open Command Prompt/Terminal
2. Navigate to the folder: `cd path/to/voice-to-concept`
3. Run: `npm run dev`
4. Open browser to: `http://localhost:3000`

---

## 6. Your First Idea (Quick Start)

Let's create your first idea together! We'll use text input for simplicity.

### Quick Start: Creating Your First Idea

1. **Click "New Idea"**
   - Find the purple "New Idea" button in the top right
   - Click it once

2. **Choose Text Input**
   - You'll see two options: "Voice" and "Text"
   - Click "Text"

3. **Type Your Idea**
   - In the text box that appears, type:
     ```
     A smart coffee mug that keeps your drink at the perfect temperature
     all day. It connects to your phone and lets you set your preferred
     temperature. It also tracks how much caffeine you've consumed.
     ```

4. **Submit Your Idea**
   - Click the "Analyze Idea" button below the text box

5. **Wait for Processing**
   - You'll see status messages:
     - "Analyzing your idea with AI..."
     - "Generating Hero Product..." (1/5)
     - "Generating App UI Mockup..." (2/5)
     - And so on...
   - This takes about 1-2 minutes total

6. **View Your Results!**
   - When complete, you'll be taken to a page showing:
     - Your idea's new name (e.g., "TempBrew Smart Mug")
     - A tagline (e.g., "Your perfect temperature, every sip")
     - A rating out of 10
     - 5 generated images
     - Detailed analysis
     - Suggested improvements

7. **Explore Your Idea**
   - Scroll down to see all the images and information
   - Click any image to see it larger
   - Click "Back to Ideas" to return to the home page

**You've just created your first concept!** Your idea is now saved and will appear on the home page.

---

## 7. Understanding the Interface

### The Home Page

When you open Voice to Concept, you'll see the home page:

```
┌─────────────────────────────────────────────────────────────────┐
│  Voice to Concept                              [New Idea]       │
│  Transform your ideas into visual concept pages                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Your Ideas (3)                                                │
│                                                                 │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│   │   [Image]    │  │   [Image]    │  │   [Image]    │        │
│   │   8/10       │  │   7/10       │  │   9/10       │        │
│   │ Smart Mug    │  │ Plant Buddy  │  │ AI Game     │        │
│   │ Perfect temp │  │ See what...  │  │ Deploy the..│        │
│   │ Dec 10, 2024 │  │ Dec 9, 2024  │  │ Dec 8, 2024 │        │
│   │ 5 visuals    │  │ 5 visuals    │  │ 5 visuals   │        │
│   └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Elements explained:**

1. **Header**: Shows the app name and "New Idea" button
2. **Ideas Count**: Shows how many ideas you've saved
3. **Idea Cards**: Each saved idea appears as a card showing:
   - Thumbnail image (the hero product image)
   - Rating badge (top right of image)
   - Idea title
   - Tagline
   - Date created
   - Number of visuals
   - Delete button (trash icon)

### The Input Panel

When you click "New Idea", this panel appears:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Share Your Idea                              │
│          Speak or type your idea and watch it come to life      │
│                                                                  │
│                    [Voice]  [Text]                               │
│                                                                  │
│                   ┌─────────────┐                                │
│                   │             │                                │
│                   │     🎤      │                                │
│                   │             │                                │
│                   └─────────────┘                                │
│                                                                  │
│              Click to record your idea                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Elements explained:**

1. **Mode Toggle**: Switch between Voice and Text input
2. **Voice Mode**: Shows a microphone button for recording
3. **Text Mode**: Shows a text area for typing

### The Idea Detail Page

After processing or when clicking an idea card:

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Ideas                                                 │
│                                                                  │
│                        ⭐ 8/10                                   │
│                                                                  │
│                    TempBrew Smart Mug                            │
│               Your perfect temperature, every sip                │
│                                                                  │
│                   Created on December 10, 2024                   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Visualizations                                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ Hero   │ │ UI     │ │Lifestyle│ │Blueprint│ │ Logo   │       │
│  │Product │ │Mockup  │ │ Photo  │ │        │ │        │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  Analysis                                                        │
│  This is a well-conceived product idea that addresses a common  │
│  frustration among coffee and tea drinkers...                   │
├─────────────────────────────────────────────────────────────────┤
│  Key Points                                                      │
│  • Temperature control technology is proven and accessible      │
│  • Health tracking integration appeals to wellness market       │
│  • Premium positioning justifies higher price point             │
├─────────────────────────────────────────────────────────────────┤
│  Suggested Improvements                                          │
│  ✓ Add wireless charging capability                             │
│  ✓ Include a travel lid option                                  │
│  ✓ Consider a subscription model for premium app features       │
├─────────────────────────────────────────────────────────────────┤
│  Original Idea                                                   │
│  "A smart coffee mug that keeps your drink at the perfect..."   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Using Voice Input

Voice input lets you speak your idea instead of typing. This is great for capturing ideas quickly or when you think better out loud.

### Step-by-Step Voice Recording

1. **Click "New Idea"** on the home page

2. **Ensure "Voice" is selected** (it's the default)

3. **Allow Microphone Access**
   - The first time you record, your browser will ask for permission
   - Click "Allow" when prompted
   - If you accidentally clicked "Block", see troubleshooting section

4. **Start Recording**
   - Click the large purple microphone button
   - The button will turn red and start pulsing
   - A timer will show how long you've been recording

5. **Speak Your Idea**
   - Talk naturally, as if explaining to a friend
   - Be descriptive - more detail gives better results
   - Don't worry about "ums" and pauses - they're filtered out
   - Aim for 30 seconds to 2 minutes of speaking

6. **Stop Recording**
   - Click the red button (now showing a square) to stop
   - Or let it run - there's no strict time limit

7. **Wait for Processing**
   - First, your audio is transcribed (converted to text)
   - Then it's analyzed and images are generated

### Tips for Better Voice Input

**DO:**
- Speak clearly but naturally
- Describe the problem your idea solves
- Mention who would use it
- Include specific features
- Talk about what makes it unique

**DON'T:**
- Whisper (speak at normal volume)
- Speak too fast
- Have loud background noise
- Be too brief (one sentence isn't enough)

### Example Voice Script

Here's an example of what you might say:

> "So I have this idea for a smart plant pot. The pot would have sensors
> built into it that measure soil moisture, light levels, and temperature.
> It connects to an app on your phone and tells you exactly when to water
> your plant and if it needs more or less sunlight. It could even identify
> what kind of plant you have and give you specific care instructions.
> I think this would be perfect for people like me who love plants but
> always forget to water them or aren't sure what each plant needs."

---

## 9. Using Text Input

Text input is perfect when you want to carefully compose your idea or you're in a quiet environment where you can't speak.

### Step-by-Step Text Input

1. **Click "New Idea"** on the home page

2. **Click "Text"** to switch to text mode

3. **Type Your Idea**
   - A large text box appears
   - Type your idea description
   - You can write multiple paragraphs
   - Aim for 50-200 words for best results

4. **Click "Analyze Idea"**
   - The purple button below the text box
   - Processing begins immediately

### Tips for Better Text Input

**Structure your idea with:**
- What is it? (The core concept)
- Who is it for? (Target audience)
- What problem does it solve? (The need it addresses)
- What makes it special? (Unique features)

### Example Text Input

```
I want to create a subscription box service for amateur astronomers. Each
month, subscribers receive a themed box containing:

1. A detailed star map focused on that month's best celestial events
2. A small astronomy tool or accessory (like a red flashlight, lens
   cleaning kit, or phone telescope adapter)
3. An educational booklet explaining the science behind featured phenomena
4. Collectible cards featuring different stars, planets, and galaxies

The boxes would have different tiers - beginner, intermediate, and advanced.
The target audience is people interested in space who want to get into
stargazing but don't know where to start, as well as existing hobbyists
who want curated content delivered to their door.
```

---

## 10. Understanding Your Results

When Voice to Concept finishes processing your idea, you get a complete concept page. Here's what each section means:

### The Rating (1-10)

Your idea receives a score based on:
- **Market Potential (30%)**: Is there demand for this?
- **Technical Feasibility (25%)**: Can it be built?
- **Uniqueness (25%)**: How original is it?
- **Clarity (20%)**: How well-explained is the idea?

**Rating Guide:**
- **9-10**: Exceptional idea with strong potential
- **7-8**: Good idea with some refinement needed
- **5-6**: Decent concept that needs significant work
- **3-4**: Has issues that need to be addressed
- **1-2**: Fundamental problems with the concept

### The Five Generated Images

Each idea gets five different visual representations:

1. **Hero Product**
   - A professional product photo
   - Shows what your product might look like
   - Clean background, studio lighting
   - Use this for: Presentations, pitch decks

2. **App UI Mockup**
   - A smartphone interface design
   - Shows how a companion app might work
   - Modern, dark-themed design
   - Use this for: App concepts, user experience planning

3. **Lifestyle Photography**
   - Your product in a real-world setting
   - Shows someone using the product
   - Warm, natural lighting
   - Use this for: Marketing materials, social media

4. **Technical Blueprint**
   - Engineering-style diagram
   - Shows internal components
   - Labels and callouts
   - Use this for: Technical planning, patents

5. **Logo Design**
   - A brand logo for your product
   - Professional and minimalist
   - Includes product name
   - Use this for: Branding, merchandise

### The Analysis Section

This is a detailed written evaluation including:
- Summary of what the AI understood about your idea
- Assessment of market opportunity
- Technical considerations
- Potential challenges
- Overall viability assessment

### Key Points

Three main strengths or features of your idea, highlighting:
- What makes it valuable
- Why it would succeed
- Core differentiators

### Suggested Improvements

Three actionable recommendations to make your idea better:
- Additional features to consider
- Potential problems to address
- Ways to enhance the concept

### Original Idea

Your exact words (transcribed if voice, or your typed text) are preserved so you can:
- Remember what you originally said
- Compare your input to the AI's interpretation
- Refine and resubmit with changes

---

## 11. Managing Your Ideas

### Viewing Saved Ideas

All your ideas are saved automatically and appear on the home page. They're sorted with the newest first.

**To view an idea:**
1. Go to the home page (click "Voice to Concept" title)
2. Find the idea card you want
3. Click anywhere on the card
4. You'll see the full detail page

### Deleting Ideas

**To delete an idea:**
1. On the home page, find the idea card
2. Look for the trash can icon (bottom right of the card)
3. Click the trash icon
4. Confirm by clicking "OK" in the popup

**Warning:** Deleted ideas cannot be recovered!

### Ideas Storage

Your ideas are stored on your computer's disk in the `data/` folder. This means:

**Pros:**
- No account needed
- Your ideas stay private on your computer
- No storage limits (unlimited ideas)
- Ideas persist across browser sessions and different browsers
- Easy to back up (just copy the `data/` folder)
- Won't be lost when clearing browser data

**Storage Location:**
```
voice-to-concept/
└── data/
    ├── ideas.json      # Your idea metadata
    └── images/         # Generated PNG images
```

**Note:** The server must be running (`npm run dev`) to view your ideas.

### Backing Up Ideas

To back up all your ideas:

1. Navigate to your `voice-to-concept` project folder
2. Copy the entire `data/` folder to a safe location
3. To restore, copy the `data/` folder back to the project

For individual images:
1. Open the idea detail page
2. Download each image individually (hover and click download)

---

## 12. Downloading Images

All generated images can be downloaded to your computer.

### Method 1: From the Gallery (Quick)

1. Open an idea's detail page
2. Hover your mouse over any image
3. Look for the download icon (arrow pointing down) in the top right
4. Click the download icon
5. The image saves to your Downloads folder

### Method 2: From the Lightbox (Full Size)

1. Open an idea's detail page
2. Click on any image to open the lightbox (full-screen view)
3. Click the purple "Download" button at the bottom right
4. The image saves to your Downloads folder

### Image File Details

Downloaded images are:
- **Format**: PNG (high quality)
- **Size**: Approximately 1024x1024 pixels
- **File name**: `{type}-{timestamp}.png` (e.g., `hero-1702234567890.png`)

### Using Downloaded Images

You can use these images for:
- Personal mood boards
- Concept presentations
- Pitch decks
- Social media posts (for your own ideas)

**Note:** These are AI-generated images. If using commercially, check current AI image usage guidelines in your jurisdiction.

---

## 13. Ten Example Use Cases

Here are ten real examples you can try to learn how Voice to Concept works. Each includes what to type/say and what to expect.

### Use Case 1: Physical Product (Beginner)

**What to input:**
```
A portable, foldable laptop stand that fits in your pocket. It's made of
lightweight aluminum and unfolds to hold laptops at the perfect ergonomic
angle. It has non-slip pads and works with any laptop size.
```

**What you'll learn:** How the AI visualizes simple physical products with clear features.

**Expected results:** Clean product shots, a "tech accessory" style analysis.

---

### Use Case 2: Mobile App Idea (Beginner)

**What to input:**
```
A mobile app that helps people learn to cook by watching short video
recipes. Each recipe is under 60 seconds and shows simple meals that
college students can make with limited ingredients and equipment. The
app tracks what ingredients you have and suggests recipes you can make.
```

**What you'll learn:** How the AI creates app mockups and addresses software concepts.

**Expected results:** Focus on the UI mockup image, app-focused analysis.

---

### Use Case 3: Service Business (Beginner)

**What to input:**
```
A dog walking service that uses GPS tracking so pet owners can watch their
dog's walk in real-time. Walkers take photos during the walk and rate how
the dog behaved. The service offers scheduled recurring walks and
on-demand same-day booking.
```

**What you'll learn:** How the AI handles service businesses with tech components.

**Expected results:** Lifestyle images showing service in action, business model analysis.

---

### Use Case 4: Sustainability Product (Intermediate)

**What to input:**
```
Reusable food wraps made from beeswax-coated organic cotton. They replace
plastic wrap in the kitchen - you can wrap sandwiches, cover bowls, or
store cut vegetables. They last up to a year with proper care and come
in fun, colorful patterns. They're naturally antibacterial and can be
composted when worn out.
```

**What you'll learn:** How the AI addresses eco-friendly products and materials.

**Expected results:** Natural, organic aesthetic in images, sustainability-focused analysis.

---

### Use Case 5: Gaming Concept (Intermediate)

**What to input:**
```
A multiplayer mobile game where players build and manage virtual restaurants.
You design your restaurant layout, create menu items, hire staff, and serve
customers. The unique twist is that you can actually order real food delivery
from partner restaurants through the game, earning in-game currency and
real discounts.
```

**What you'll learn:** How the AI handles entertainment/gaming concepts with real-world integration.

**Expected results:** Game UI concepts, business model analysis for hybrid real/virtual products.

---

### Use Case 6: Health & Wellness (Intermediate)

**What to input:**
```
A meditation headband that reads your brainwaves and provides real-time
feedback through an app. It gently vibrates when your mind wanders, helping
you stay focused during meditation. It tracks your progress over time and
suggests personalized meditation exercises based on your stress levels and
sleep quality.
```

**What you'll learn:** How the AI handles wearable tech and health monitoring concepts.

**Expected results:** Technical blueprint showing sensors, health-focused analysis.

---

### Use Case 7: Educational Platform (Intermediate)

**What to input:**
```
An online platform that connects retired professionals with students for
mentorship. A retired engineer could mentor engineering students, a retired
doctor could advise pre-med students. Sessions are video calls scheduled
through the platform. Mentors volunteer their time, and the platform is
free for students. Revenue comes from universities paying for access.
```

**What you'll learn:** How the AI handles two-sided marketplace and social impact ideas.

**Expected results:** Platform UI concepts, marketplace dynamics in analysis.

---

### Use Case 8: Smart Home Device (Advanced)

**What to input:**
```
A smart doorbell specifically designed for package deliveries. When a
delivery person approaches, it opens a small secure compartment where
they can place packages. The compartment locks automatically and you
get a notification with a photo. Only you can unlock it remotely through
the app. It has a backup battery, tamper detection, and climate control
to protect temperature-sensitive deliveries.
```

**What you'll learn:** How the AI handles complex hardware with multiple features.

**Expected results:** Detailed blueprint, security-focused analysis.

---

### Use Case 9: B2B Software (Advanced)

**What to input:**
```
A software tool for small restaurants that uses AI to predict how much
food to prep each day. It analyzes historical sales data, weather forecasts,
local events, and holidays to forecast demand. It automatically generates
prep sheets for kitchen staff and integrates with inventory systems to
create shopping lists. The goal is to reduce food waste and ensure
restaurants never run out of popular items.
```

**What you'll learn:** How the AI handles enterprise/B2B concepts with AI components.

**Expected results:** Dashboard UI mockup, data-driven analysis.

---

### Use Case 10: Creative Concept (Advanced)

**What to input:**
```
An art installation that people can walk through, where the walls respond
to your emotions. Cameras with AI detect your facial expressions, and the
LED walls display colors and patterns that mirror or contrast your mood.
If you smile, the walls might bloom with flowers. If you look worried,
they might show calming ocean waves. It's designed for museums and
wellness centers to help people become more aware of their emotional state.
```

**What you'll learn:** How the AI handles abstract and artistic concepts.

**Expected results:** Atmospheric lifestyle images, unique creativity assessment.

---

### After Trying These Examples

You should now understand:
- How different types of ideas produce different results
- How much detail to include in your descriptions
- What makes some ideas score higher than others
- How images reflect different aspects of concepts

Try creating your own ideas next!

---

## 14. Troubleshooting Common Problems

### Problem: "Application won't start"

**Symptoms:** You run `npm run dev` but get an error.

**Solutions:**

1. **Check you're in the right folder**
   - Run `dir` (Windows) or `ls` (Mac) to see files
   - You should see `package.json` in the list
   - If not, use `cd` to navigate to the correct folder

2. **Dependencies not installed**
   - Run `npm install` again
   - Wait for it to complete fully

3. **Port already in use**
   - If you see "Port 3000 is already in use"
   - Either close other applications using that port
   - Or run `npm run dev -- -p 3001` to use a different port

---

### Problem: "Microphone not working"

**Symptoms:** Clicking the record button doesn't start recording.

**Solutions:**

1. **Check browser permissions**
   - Click the lock/info icon in the address bar
   - Find "Microphone" settings
   - Ensure it's set to "Allow"

2. **Reset permissions (Chrome)**
   - Go to `chrome://settings/content/microphone`
   - Find `localhost:3000` in the blocked list
   - Remove it, then refresh the page

3. **Check physical microphone**
   - Test your mic in another application
   - Ensure it's not muted
   - Select the correct microphone if you have multiple

4. **Try HTTPS** (if still not working)
   - Some browsers require HTTPS for microphone access
   - Try using a different browser (Chrome works best)

---

### Problem: "Failed to transcribe audio"

**Symptoms:** Recording works but transcription fails.

**Solutions:**

1. **Check OpenAI API key**
   - Open `.env.local`
   - Verify your OPENAI_API_KEY is correct
   - Keys start with `sk-`

2. **Check OpenAI account credits**
   - Go to https://platform.openai.com/account/billing
   - Ensure you have available credit
   - Add more credit if needed

3. **Recording too short**
   - Record for at least 3-5 seconds
   - Speak clearly and loud enough

4. **Recording too quiet**
   - Speak louder or move closer to microphone
   - Check microphone input level in system settings

---

### Problem: "Failed to analyze idea"

**Symptoms:** Transcription works but analysis fails.

**Solutions:**

1. **Check Gemini API key**
   - Open `.env.local`
   - Verify your GEMINI_API_KEY is correct
   - Keys start with `AIza`

2. **Check Gemini quota**
   - Go to https://aistudio.google.com/
   - Check if you've hit rate limits
   - Wait a few minutes and try again

3. **Restart the application**
   - Press Ctrl+C in the terminal
   - Run `npm run dev` again
   - Try your idea again

---

### Problem: "No images generated"

**Symptoms:** Analysis works but images fail or are missing.

**Solutions:**

1. **Check Gemini API has image capabilities**
   - Not all Gemini plans include image generation
   - Verify at https://aistudio.google.com/

2. **Wait longer**
   - Image generation can take 30-60 seconds per image
   - The total process might take 2-5 minutes

3. **Try a simpler idea**
   - Very complex ideas might fail image generation
   - Try a simpler description first

4. **Check browser console for errors**
   - Press F12 to open Developer Tools
   - Click "Console" tab
   - Look for red error messages

---

### Problem: "Ideas disappeared"

**Symptoms:** Previously saved ideas are no longer showing.

**Solutions:**

1. **Is the server running?**
   - Ideas require the server to be running (`npm run dev`)
   - Start the server and refresh the page

2. **Check the data folder**
   - Look for `data/ideas.json` in your project folder
   - If it exists, your ideas are still there

3. **Same computer?**
   - Ideas are stored locally on each computer in the `data/` folder
   - They don't sync between devices

4. **Did you delete the data folder?**
   - If `data/` folder was deleted, ideas are lost
   - Always back up the `data/` folder before making changes

---

### Problem: "Page looks broken/unstyled"

**Symptoms:** The page loads but looks plain without colors or formatting.

**Solutions:**

1. **Hard refresh the page**
   - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

2. **Clear browser cache**
   - Chrome: Ctrl+Shift+Delete → Clear cached images and files

3. **Restart the development server**
   - Stop with Ctrl+C
   - Run `npm run dev` again

---

## 15. Frequently Asked Questions

### General Questions

**Q: Is my data private?**
A: Yes. Your ideas are stored only on your computer in the `data/` folder. They are not uploaded to any server except temporarily during processing by the AI services.

**Q: Can I use this offline?**
A: You can view previously saved ideas offline, but creating new ideas requires an internet connection for AI processing.

**Q: Is there a mobile app?**
A: Currently, Voice to Concept is a web application. You can access it from a mobile browser, but voice recording may not work on all mobile devices.

**Q: How many ideas can I save?**
A: Unlimited! Ideas are stored on your computer's disk, not in the browser, so there's no storage limit.

### Cost Questions

**Q: How much does it cost to use?**
A: The application itself is free. You pay only for API usage:
- Approximately $0.15-0.30 per idea created
- Both OpenAI and Google offer free credits for new accounts

**Q: Why did my API call fail with no credits?**
A: Check your billing dashboards:
- OpenAI: https://platform.openai.com/account/billing
- Google: https://console.cloud.google.com/billing

**Q: Can I reduce costs?**
A: To reduce costs:
- Write shorter, more focused ideas
- Generate fewer images (requires code modification)
- Use text input instead of voice

### Technical Questions

**Q: Can I use a different AI service?**
A: Yes, with code modifications. See the Developer Guide for instructions.

**Q: Can I change the image styles?**
A: Yes, by editing the prompt templates. See the Developer Guide.

**Q: Why do images sometimes look wrong?**
A: AI image generation isn't perfect. Results depend on how well the AI interprets your description. Try rephrasing your idea for different results.

**Q: Can I edit an existing idea?**
A: Not currently. You would need to create a new idea with updated text.

### Troubleshooting Questions

**Q: Why is processing so slow?**
A: Image generation takes time. Expect 1-3 minutes total per idea. Network speed and API load also affect timing.

**Q: What browsers are supported?**
A: Chrome (recommended), Firefox, Edge, and Safari. Voice recording works best in Chrome.

**Q: Why did my idea get a low rating?**
A: The rating is based on market potential, feasibility, uniqueness, and clarity. Try providing more detail or addressing potential concerns in your description.

---

## 16. Glossary of Terms

| Term | Definition |
|------|------------|
| **API** | Application Programming Interface - a way for applications to communicate with AI services |
| **API Key** | A unique code that identifies you to an AI service, like a password |
| **Gemini** | Google's AI system used for analysis and image generation |
| **File Storage** | Data saved to disk in the `data/` folder |
| **Node.js** | Software that runs JavaScript applications on your computer |
| **npm** | Node Package Manager - a tool for installing application dependencies |
| **Terminal / Command Prompt** | Text-based interface for running commands on your computer |
| **Transcription** | Converting spoken audio into written text |
| **Whisper** | OpenAI's AI system for speech-to-text conversion |
| **Webhook** | Not used in this application |
| **localhost** | Your own computer acting as a server |
| **Port 3000** | A specific "channel" on your computer where the application runs |

---

## Need More Help?

If you're still having trouble:

1. Check the [Troubleshooting](#14-troubleshooting-common-problems) section again
2. Review the [FAQ](#15-frequently-asked-questions)
3. Look at the error messages carefully - they often explain the problem
4. Search for the exact error message online
5. Check if your API keys are correct and have available credit

Remember: Most problems are solved by:
- Restarting the application (`Ctrl+C`, then `npm run dev`)
- Checking API keys in `.env.local`
- Refreshing the browser page
