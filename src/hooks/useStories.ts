'use client';

import { useState, useEffect } from 'react';

export interface Story {
  id: number;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  documentUrl?: string;
  createdAt?: Date;
}

const STORAGE_KEY = 'stories';

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setStories(parsed);
      }
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStories = (stories: Story[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  };

  const addStory = async (data: {
    title: string;
    author: string;
    category: string;
    excerpt: string;
    content: string;
    documentUrl?: string;
  }) => {
    try {
      const newStory: Story = {
        id: Date.now(),
        title: data.title,
        author: data.author,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        documentUrl: data.documentUrl,
        createdAt: new Date(),
      };

      const updated = [...stories, newStory];
      setStories(updated);
      saveStories(updated);
    } catch (error) {
      console.error('Failed to add story:', error);
      throw error;
    }
  };

  const updateStory = async (id: number, data: Partial<Story>) => {
    try {
      const updated = stories.map((s) => (s.id === id ? { ...s, ...data } : s));
      setStories(updated);
      saveStories(updated);
    } catch (error) {
      console.error('Failed to update story:', error);
      throw error;
    }
  };

  const deleteStory = async (id: number) => {
    try {
      const updated = stories.filter((s) => s.id !== id);
      setStories(updated);
      saveStories(updated);
    } catch (error) {
      console.error('Failed to delete story:', error);
      throw error;
    }
  };

  const getStory = async (id: number) => {
    return stories.find((s) => s.id === id) || null;
  };

  return {
    stories,
    loading,
    addStory,
    updateStory,
    deleteStory,
    getStory,
  };
}
