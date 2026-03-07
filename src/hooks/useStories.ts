'use client';

import { useState, useEffect } from 'react';
import { indexedDBService, StoredDocument } from '@/lib/indexedDB';

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

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      await indexedDBService.init();
      const storedStories = await indexedDBService.getAllDocuments();

      // 将 Blob 转换为 URL
      const storiesWithUrls: Story[] = storedStories.map((s) => ({
        id: s.id,
        title: s.title,
        author: s.author,
        category: s.category,
        excerpt: s.excerpt,
        content: s.content,
        documentUrl: s.documentBlob ? URL.createObjectURL(s.documentBlob) : undefined,
        createdAt: s.createdAt,
      }));

      setStories(storiesWithUrls);
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
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
      await indexedDBService.init();

      // 将 Data URL 转换回 Blob
      const documentBlob = data.documentUrl ? dataUrlToBlob(data.documentUrl) : undefined;

      const newStory: StoredDocument = {
        id: Date.now(),
        title: data.title,
        author: data.author,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        documentBlob,
        createdAt: new Date(),
      };

      await indexedDBService.saveDocument(newStory);

      // 重新加载列表
      await loadStories();
    } catch (error) {
      console.error('Failed to add story:', error);
      throw error;
    }
  };

  const updateStory = async (id: number, data: Partial<Story>) => {
    try {
      await indexedDBService.init();
      const existing = await indexedDBService.getDocument(id);

      if (existing) {
        const updated: StoredDocument = {
          ...existing,
          ...data,
        };

        await indexedDBService.saveDocument(updated);
        await loadStories();
      }
    } catch (error) {
      console.error('Failed to update story:', error);
      throw error;
    }
  };

  const deleteStory = async (id: number) => {
    try {
      await indexedDBService.init();
      await indexedDBService.deleteDocument(id);
      await loadStories();
    } catch (error) {
      console.error('Failed to delete story:', error);
      throw error;
    }
  };

  const getStory = async (id: number) => {
    try {
      await indexedDBService.init();
      const stored = await indexedDBService.getDocument(id);

      if (stored) {
        return {
          id: stored.id,
          title: stored.title,
          author: stored.author,
          category: stored.category,
          excerpt: stored.excerpt,
          content: stored.content,
          documentUrl: stored.documentBlob ? URL.createObjectURL(stored.documentBlob) : undefined,
          createdAt: stored.createdAt,
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to get story:', error);
      return null;
    }
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

// 将 Data URL 转换为 Blob
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
