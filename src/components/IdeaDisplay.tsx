'use client';

import { Idea } from '@/lib/types';
import ImageGallery from './ImageGallery';
import Link from 'next/link';

interface IdeaDisplayProps {
  idea: Idea;
}

export default function IdeaDisplay({ idea }: IdeaDisplayProps) {
  const { analysis, images, transcript, createdAt } = idea;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'from-green-500 to-emerald-500';
    if (rating >= 6) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Ideas
      </Link>

      {/* Header */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getRatingColor(analysis.rating)} mb-4`}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-white font-bold text-lg">{analysis.rating}/10</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {analysis.title}
        </h1>

        <p className="text-xl text-purple-400 font-medium mb-4">
          {analysis.tagline}
        </p>

        <p className="text-gray-500 text-sm">
          Created on {formatDate(createdAt)}
        </p>
      </div>

      {/* Image Gallery */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Visualizations</h2>
        <ImageGallery images={images} />
      </section>

      {/* Analysis */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Analysis</h2>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {analysis.analysis}
          </p>
        </div>
      </section>

      {/* Key Points */}
      {analysis.keyPoints && analysis.keyPoints.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Key Points</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {analysis.keyPoints.map((point, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-5 border border-gray-700"
              >
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-purple-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-300">{point}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Improvements */}
      {analysis.improvements && analysis.improvements.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Suggested Improvements</h2>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <ul className="space-y-4">
              {analysis.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Original Transcript */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-6">Original Idea</h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 italic leading-relaxed">
            &ldquo;{transcript}&rdquo;
          </p>
        </div>
      </section>
    </div>
  );
}
