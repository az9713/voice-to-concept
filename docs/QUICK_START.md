# Voice to Concept - Quick Start Guide

Get up and running in 5 minutes with this quick start guide.

---

## Fastest Setup (5 Minutes)

### Step 1: Install Node.js (2 minutes)

Download and install from: https://nodejs.org/ (click the LTS button)

### Step 2: Open Terminal (30 seconds)

**Windows:** Press `Windows key`, type `cmd`, press `Enter`

**Mac:** Press `Cmd + Space`, type `Terminal`, press `Enter`

### Step 3: Navigate to Project (30 seconds)

```bash
cd path/to/voice-to-concept
```

**Tip:** Type `cd ` then drag the folder into the terminal window.

### Step 4: Install Dependencies (1 minute)

```bash
npm install
```

Wait for it to finish.

### Step 5: Add API Keys (1 minute)

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` in any text editor

3. Replace with your keys:
   ```
   OPENAI_API_KEY=sk-your-key-here
   GEMINI_API_KEY=AIzaSy-your-key-here
   ```

4. Save the file

**Don't have keys?** Get them here:
- OpenAI: https://platform.openai.com/api-keys
- Gemini: https://aistudio.google.com/apikey

### Step 6: Start the App (30 seconds)

```bash
npm run dev
```

### Step 7: Open in Browser

Go to: **http://localhost:3000**

---

## Your First Idea (2 Minutes)

1. Click the purple **"New Idea"** button

2. Click **"Text"** to use text input

3. Paste this example:
   ```
   A smart water bottle that tracks how much you drink throughout
   the day. It glows to remind you to drink water and syncs with
   a phone app to show your hydration history.
   ```

4. Click **"Analyze Idea"**

5. Wait 1-2 minutes while it processes

6. See your results: title, rating, analysis, and 5 generated images!

---

## 10 Example Ideas to Try

Copy and paste these into the text input to see how Voice to Concept works with different types of ideas.

### Example 1: Smart Home Device
```
A motion-sensing nightlight for hallways that only turns on when you
walk by at night. It uses soft amber light that doesn't disrupt sleep,
and can learn your household's patterns to know when to expect movement.
```
**What you'll learn:** How the AI handles hardware products

---

### Example 2: Mobile App
```
A language learning app that uses your phone's camera to identify
objects around you and teaches you the word in your target language.
Point at a chair, learn "silla" in Spanish. Point at your dog, learn
"perro". It gamifies daily learning with streaks and achievements.
```
**What you'll learn:** How the AI creates app mockups

---

### Example 3: Food & Beverage
```
A portable cold brew coffee maker that fits in your bag. You add
coffee grounds and water in the morning, and by lunchtime you have
smooth cold brew ready to drink. It's leak-proof with a built-in
filter and drinking spout.
```
**What you'll learn:** How the AI visualizes consumer products

---

### Example 4: Subscription Service
```
A monthly mystery book subscription where each box contains a book
with no cover or title visible - just a few genre tags and mood
descriptors. Readers discover books they never would have picked
themselves. Includes bookmarks, tea samples, and discussion guides.
```
**What you'll learn:** How the AI handles service businesses

---

### Example 5: Pet Product
```
A self-cleaning cat litter box that uses UV light to sanitize and
whisper-quiet motors to sift litter. It connects to an app that
tracks your cat's bathroom habits and alerts you to health changes.
Comes in furniture-style designs that blend into home decor.
```
**What you'll learn:** How the AI addresses pet technology

---

### Example 6: Fitness Tool
```
A smart yoga mat with embedded pressure sensors that shows your
balance and weight distribution through an app. It guides you
through poses and gently corrects your form with visual feedback.
The mat rolls up and the sensors are completely waterproof.
```
**What you'll learn:** How the AI handles wellness products

---

### Example 7: Kids' Product
```
An educational globe that lights up when you touch different
countries. It plays audio about each country's culture, animals,
and landmarks in a kid-friendly voice. Parents can add their own
recordings like "Grandma lives here!" The globe grows with the
child, offering more detailed information as they get older.
```
**What you'll learn:** How the AI visualizes educational toys

---

### Example 8: Productivity Tool
```
A browser extension that blocks distracting websites but lets
you earn "focus points" that unlock browsing time. Work for 25
minutes and earn 5 minutes of free browsing. It gamifies
productivity with levels, achievements, and friendly competition
with friends.
```
**What you'll learn:** How the AI handles software/extensions

---

### Example 9: Sustainability Product
```
Reusable produce bags made from recycled ocean plastic. They're
mesh for ventilation, machine washable, and come in sets of
different sizes. Each bag has a built-in tare weight tag that
cashiers can easily see. The packaging shows the ocean plastic
cleanup impact of each purchase.
```
**What you'll learn:** How the AI addresses eco-friendly products

---

### Example 10: Entertainment/Game
```
A board game where players build and run rival pizza restaurants.
You hire staff, develop recipes, handle customer complaints, and
compete for limited delivery zones. The game includes real mini
pizza recipe cards that players can actually cook. Expansions add
food critics, health inspectors, and food truck challenges.
```
**What you'll learn:** How the AI handles entertainment products

---

## Quick Tips

### For Better Results:

1. **Be specific** - "A coffee mug" is vague. "A smart coffee mug that maintains temperature" is better.

2. **Explain the problem** - Why does this need to exist? What frustration does it solve?

3. **Mention your audience** - Who uses this? Busy parents? College students? Senior citizens?

4. **Include features** - What makes it special? What can it do?

5. **Aim for 50-150 words** - Too short lacks detail, too long may confuse the analysis.

### Keyboard Shortcuts:

- **Ctrl/Cmd + C** - Copy selected text
- **Ctrl/Cmd + V** - Paste text
- **Tab** - Move between elements

### If Something Goes Wrong:

1. **Refresh the page** - Most issues resolve with a refresh

2. **Check your API keys** - Open `.env.local` and verify keys are correct

3. **Restart the server** - Press `Ctrl+C` in terminal, then `npm run dev` again

4. **See the full guides** - Check `docs/USER_GUIDE.md` for detailed troubleshooting

---

## What's Next?

After trying the examples, you can:

1. **Create your own ideas** - What have you been thinking about lately?

2. **Use voice input** - Click "Voice" and speak naturally about your idea

3. **Download images** - Hover over any image and click the download icon

4. **Read the full guide** - See `docs/USER_GUIDE.md` for complete documentation

---

## Quick Reference

| Action | How To |
|--------|--------|
| Start app | `npm run dev` in terminal |
| Stop app | `Ctrl+C` in terminal |
| Create idea | Click "New Idea" button |
| Switch input mode | Click "Voice" or "Text" |
| View saved idea | Click any idea card |
| Delete idea | Click trash icon on card |
| Download image | Hover image, click download icon |
| Go home | Click "Voice to Concept" title |

---

*For complete documentation, see:*
- `docs/USER_GUIDE.md` - Full user manual
- `docs/DEVELOPER_GUIDE.md` - Technical documentation
- `README.md` - Project overview
