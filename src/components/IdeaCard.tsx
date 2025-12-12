'use client';

import { Idea } from '@/lib/types';
import Link from 'next/link';

interface IdeaCardProps {
  idea: Idea;
  onDelete?: (id: string) => void;
}

export default function IdeaCard({ idea, onDelete }: IdeaCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && confirm('Are you sure you want to delete this idea?')) {
      onDelete(idea.id);
    }
  };

  const heroImage = idea.images.find(img => img.type === 'hero');

  return (
    <Link href={`/idea/${idea.id}`} className="block group">
      <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        {/* Thumbnail */}
        <div className="aspect-video bg-gray-900 relative overflow-hidden">
          {heroImage ? (
            <img
              src={`/api/images/${heroImage.filePath}`}
              alt={idea.analysis.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-yellow-400 font-bold text-sm">{idea.analysis.rating}/10</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate group-hover:text-purple-400 transition-colors">
                {idea.analysis.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                {idea.analysis.tagline}
              </p>
            </div>
            <button
              onClick={handleDelete}
              className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              title="Delete idea"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/50">
            <span className="text-gray-500 text-xs">{formatDate(idea.createdAt)}</span>
            <span className="text-purple-400 text-xs font-medium">
              {idea.images.length} visual{idea.images.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
