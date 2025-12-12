import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const DATA_DIR = path.join(process.cwd(), 'data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');

async function ensureImagesDir() {
  try {
    await fs.access(IMAGES_DIR);
  } catch {
    await fs.mkdir(IMAGES_DIR, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, type, label, ideaId } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400 }
      );
    }

    if (!ideaId) {
      return NextResponse.json(
        { error: 'No ideaId provided' },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    // Extract the image from the response
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      return NextResponse.json(
        { error: 'No response from image generation' },
        { status: 500 }
      );
    }

    const parts = candidates[0].content?.parts || [];
    let imageBase64: string | null = null;

    for (const part of parts) {
      if (part.inlineData) {
        imageBase64 = part.inlineData.data || null;
        break;
      }
    }

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'No image generated' },
        { status: 500 }
      );
    }

    // Save image to disk
    await ensureImagesDir();
    const fileName = `${ideaId}-${type}.png`;
    const filePath = path.join(IMAGES_DIR, fileName);
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    await fs.writeFile(filePath, imageBuffer);

    // Return relative path for storage
    const relativePath = `images/${fileName}`;

    return NextResponse.json({
      type,
      label,
      filePath: relativePath,
      prompt,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
