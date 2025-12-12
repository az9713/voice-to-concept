'use client';

import { useState, useEffect, useCallback } from 'react';
import IdeaInput from '@/components/IdeaInput';
import IdeaCard from '@/components/IdeaCard';
import { Idea } from '@/lib/types';
import { getIdeas, deleteIdea } from '@/lib/storage';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadIdeas = useCallback(async () => {
    setLoading(true);
    const loadedIdeas = await getIdeas();
    setIdeas(loadedIdeas);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadIdeas();
  }, [loadIdeas]);

  const handleDelete = async (id: string) => {
    await deleteIdea(id);
    await loadIdeas();
  };

  const handleIdeaCreated = async () => {
    await loadIdeas();
    setShowInput(false);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Voice to Concept
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Transform your ideas into visual concept pages
              </p>
            </div>
            <button
              onClick={() => setShowInput(!showInput)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all"
            >
              {showInput ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Idea
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Input Section */}
      {showInput && (
        <section className="border-b border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Share Your Idea</h2>
              <p className="text-gray-400">
                Speak or type your idea and watch it come to life
              </p>
            </div>
            <IdeaInput onIdeaCreated={handleIdeaCreated} />
          </div>
        </section>
      )}

      {/* Ideas Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 mx-auto border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Loading ideas...</p>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No ideas yet</h3>
            <p className="text-gray-400 mb-6">
              Click &ldquo;New Idea&rdquo; to create your first concept
            </p>
            <button
              onClick={() => setShowInput(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all"
            >
              Create Your First Idea
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-white">
                Your Ideas ({ideas.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <IdeaCard key={idea.id} idea={idea} onDelete={handleDelete} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
