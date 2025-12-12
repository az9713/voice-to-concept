'use client';

import { useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import { InputMode, ProcessingStatus, IdeaAnalysis, IdeaImage, Idea } from '@/lib/types';
import { IMAGE_PROMPTS } from '@/lib/prompts';
import { saveIdea, generateId } from '@/lib/storage';
import { useRouter } from 'next/navigation';

interface IdeaInputProps {
  onIdeaCreated?: () => void;
}

export default function IdeaInput({ onIdeaCreated }: IdeaInputProps) {
  const router = useRouter();
  const [inputMode, setInputMode] = useState<InputMode>('voice');
  const [textInput, setTextInput] = useState('');
  const [status, setStatus] = useState<ProcessingStatus>({ step: 'idle', message: '' });

  const processIdea = async (transcript: string) => {
    const ideaId = generateId();

    try {
      // Step 1: Analyze with Gemini
      setStatus({ step: 'analyzing', message: 'Analyzing your idea with AI...' });

      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!analyzeResponse.ok) {
        throw new Error('Failed to analyze idea');
      }

      const analysis: IdeaAnalysis = await analyzeResponse.json();

      // Step 2: Generate images
      const images: IdeaImage[] = [];

      for (let i = 0; i < IMAGE_PROMPTS.length; i++) {
        const promptConfig = IMAGE_PROMPTS[i];
        setStatus({
          step: 'generating-images',
          message: `Generating ${promptConfig.label}...`,
          imageProgress: i + 1,
        });

        const imagePrompt = promptConfig.getPrompt(analysis.title, transcript);

        try {
          const imageResponse = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: imagePrompt,
              type: promptConfig.type,
              label: promptConfig.label,
              ideaId,
            }),
          });

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            images.push(imageData);
          }
        } catch (imgError) {
          console.error(`Failed to generate ${promptConfig.label}:`, imgError);
          // Continue with other images even if one fails
        }
      }

      // Save the complete idea
      const idea: Idea = {
        id: ideaId,
        transcript,
        analysis,
        images,
        createdAt: new Date().toISOString(),
      };

      await saveIdea(idea);
      setStatus({ step: 'idle', message: '' });
      setTextInput('');

      if (onIdeaCreated) {
        onIdeaCreated();
      }

      // Navigate to the idea page
      router.push(`/idea/${ideaId}`);
    } catch (error) {
      console.error('Error processing idea:', error);
      setStatus({ step: 'idle', message: '' });
      alert('Failed to process your idea. Please try again.');
    }
  };

  const handleVoiceRecording = async (audioBlob: Blob) => {
    try {
      setStatus({ step: 'transcribing', message: 'Transcribing your voice...' });

      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const { text } = await response.json();

      if (!text || text.trim().length === 0) {
        throw new Error('No speech detected');
      }

      await processIdea(text);
    } catch (error) {
      console.error('Transcription error:', error);
      setStatus({ step: 'idle', message: '' });
      alert('Failed to transcribe your recording. Please try again.');
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    await processIdea(textInput.trim());
  };

  const isProcessing = status.step !== 'idle';

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setInputMode('voice')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              inputMode === 'voice'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            disabled={isProcessing}
          >
            Voice
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              inputMode === 'text'
                ? 'bg-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            disabled={isProcessing}
          >
            Text
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
        {inputMode === 'voice' ? (
          <VoiceRecorder
            onRecordingComplete={handleVoiceRecording}
            disabled={isProcessing}
          />
        ) : (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Describe your idea in detail..."
              className="w-full h-40 bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={isProcessing || !textInput.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Analyze Idea
            </button>
          </form>
        )}

        {/* Processing Status */}
        {isProcessing && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 bg-gray-900 px-6 py-3 rounded-full">
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-300">{status.message}</span>
              {status.imageProgress && (
                <span className="text-purple-400 font-medium">
                  ({status.imageProgress}/5)
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
