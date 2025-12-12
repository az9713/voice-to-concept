import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Idea } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json');
const IMAGES_DIR = path.join(DATA_DIR, 'images');

async function readIdeas(): Promise<Idea[]> {
  try {
    const data = await fs.readFile(IDEAS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeIdeas(ideas: Idea[]): Promise<void> {
  await fs.writeFile(IDEAS_FILE, JSON.stringify(ideas, null, 2));
}

// GET single idea by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ideas = await readIdeas();
    const idea = ideas.find(i => i.id === id);

    if (!idea) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(idea);
  } catch (error) {
    console.error('Error reading idea:', error);
    return NextResponse.json(
      { error: 'Failed to read idea' },
      { status: 500 }
    );
  }
}

// DELETE idea by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ideas = await readIdeas();
    const ideaToDelete = ideas.find(i => i.id === id);

    if (!ideaToDelete) {
      return NextResponse.json(
        { error: 'Idea not found' },
        { status: 404 }
      );
    }

    // Delete associated image files
    if (ideaToDelete.images) {
      for (const image of ideaToDelete.images) {
        if (image.filePath) {
          const imagePath = path.join(DATA_DIR, image.filePath);
          try {
            await fs.unlink(imagePath);
          } catch {
            // Image file may not exist, continue
          }
        }
      }
    }

    // Remove idea from list
    const filtered = ideas.filter(i => i.id !== id);
    await writeIdeas(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting idea:', error);
    return NextResponse.json(
      { error: 'Failed to delete idea' },
      { status: 500 }
    );
  }
}
