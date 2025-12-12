import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Idea } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json');

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readIdeas(): Promise<Idea[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(IDEAS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeIdeas(ideas: Idea[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(IDEAS_FILE, JSON.stringify(ideas, null, 2));
}

// GET all ideas
export async function GET() {
  try {
    const ideas = await readIdeas();
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error reading ideas:', error);
    return NextResponse.json(
      { error: 'Failed to read ideas' },
      { status: 500 }
    );
  }
}

// POST new idea
export async function POST(request: NextRequest) {
  try {
    const idea: Idea = await request.json();

    if (!idea.id) {
      return NextResponse.json(
        { error: 'Idea must have an id' },
        { status: 400 }
      );
    }

    const ideas = await readIdeas();
    const existingIndex = ideas.findIndex(i => i.id === idea.id);

    if (existingIndex >= 0) {
      ideas[existingIndex] = idea;
    } else {
      ideas.unshift(idea); // Add new ideas at the beginning
    }

    await writeIdeas(ideas);
    return NextResponse.json(idea);
  } catch (error) {
    console.error('Error saving idea:', error);
    return NextResponse.json(
      { error: 'Failed to save idea' },
      { status: 500 }
    );
  }
}
