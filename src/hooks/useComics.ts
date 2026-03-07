'use client';

import { useState, useEffect } from 'react';

export interface Comic {
  id: number;
  title: string;
  description: string;
  cover?: string;
  gradient?: string;
  createdAt?: Date;
}

const STORAGE_KEY = 'comics_data';

export function useComics() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从localStorage加载数据
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setComics(parsed);
      } catch (e) {
        console.error('Failed to parse comics data:', e);
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = (data: Comic[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addComic = (data: Omit<Comic, 'id' | 'createdAt'>) => {
    const newComic: Comic = {
      ...data,
      id: Date.now(),
      createdAt: new Date(),
    };
    const updated = [...comics, newComic];
    setComics(updated);
    saveToStorage(updated);
    return newComic;
  };

  const updateComic = (id: number, data: Partial<Comic>) => {
    const updated = comics.map((comic) =>
      comic.id === id ? { ...comic, ...data } : comic
    );
    setComics(updated);
    saveToStorage(updated);
  };

  const deleteComic = (id: number) => {
    const updated = comics.filter((comic) => comic.id !== id);
    setComics(updated);
    saveToStorage(updated);
  };

  const getComic = (id: number) => {
    return comics.find((comic) => comic.id === id);
  };

  return {
    comics,
    loading,
    addComic,
    updateComic,
    deleteComic,
    getComic,
  };
}
