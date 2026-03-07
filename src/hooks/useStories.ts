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

const STORAGE_KEY = 'stories_data';

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setStories(parsed);
      } catch (e) {
        console.error('Failed to parse stories data:', e);
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = (data: Story[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addStory = (data: Omit<Story, 'id' | 'createdAt'>) => {
    const newStory: Story = {
      ...data,
      id: Date.now(),
      createdAt: new Date(),
    };
    const updated = [...stories, newStory];
    setStories(updated);
    saveToStorage(updated);
    return newStory;
  };

  const updateStory = (id: number, data: Partial<Story>) => {
    const updated = stories.map((story) =>
      story.id === id ? { ...story, ...data } : story
    );
    setStories(updated);
    saveToStorage(updated);
  };

  const deleteStory = (id: number) => {
    const updated = stories.filter((story) => story.id !== id);
    setStories(updated);
    saveToStorage(updated);
  };

  const getStory = (id: number) => {
    return stories.find((story) => story.id === id);
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
