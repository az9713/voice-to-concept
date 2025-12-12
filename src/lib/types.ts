export interface IdeaImage {
  type: 'hero' | 'ui-mockup' | 'lifestyle' | 'blueprint' | 'logo';
  label: string;
  filePath: string;  // Path to image file in data/images/
  prompt: string;
}

export interface IdeaAnalysis {
  title: string;
  tagline: string;
  rating: number;
  analysis: string;
  keyPoints: string[];
  improvements: string[];
}

export interface Idea {
  id: string;
  transcript: string;
  analysis: IdeaAnalysis;
  images: IdeaImage[];
  createdAt: string;
}

export interface ProcessingStatus {
  step: 'idle' | 'recording' | 'transcribing' | 'analyzing' | 'generating-images';
  message: string;
  imageProgress?: number; // 1-5 for image generation
}

export type InputMode = 'text' | 'voice';
