import { Idea } from './types';

// Fetch all ideas from server
export async function getIdeas(): Promise<Idea[]> {
  try {
    const response = await fetch('/api/ideas');
    if (!response.ok) {
      throw new Error('Failed to fetch ideas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return [];
  }
}

// Fetch single idea by ID from server
export async function getIdeaById(id: string): Promise<Idea | null> {
  try {
    const response = await fetch(`/api/ideas/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch idea');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching idea:', error);
    return null;
  }
}

// Save idea to server
export async function saveIdea(idea: Idea): Promise<void> {
  try {
    const response = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(idea),
    });
    if (!response.ok) {
      throw new Error('Failed to save idea');
    }
  } catch (error) {
    console.error('Error saving idea:', error);
    throw error;
  }
}

// Delete idea from server
export async function deleteIdea(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/ideas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete idea');
    }
  } catch (error) {
    console.error('Error deleting idea:', error);
    throw error;
  }
}

// Generate unique ID (still client-side, no server needed)
export function generateId(): string {
  return `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
