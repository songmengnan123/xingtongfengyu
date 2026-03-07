'use client';

import { useState, useEffect } from 'react';

export interface ShortDrama {
  id: number;
  title: string;
  episodes: number;
  duration: string;
  description: string;
  views?: string;
  cover?: string;
  createdAt?: Date;
}

const STORAGE_KEY = 'short-dramas_data';

export function useShortDramas() {
  const [dramas, setDramas] = useState<ShortDrama[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDramas(parsed);
      } catch (e) {
        console.error('Failed to parse short dramas data:', e);
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = (data: ShortDrama[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addDrama = (data: Omit<ShortDrama, 'id' | 'createdAt' | 'views'>) => {
    const newDrama: ShortDrama = {
      ...data,
      id: Date.now(),
      createdAt: new Date(),
      views: '0',
    };
    const updated = [...dramas, newDrama];
    setDramas(updated);
    saveToStorage(updated);
    return newDrama;
  };

  const updateDrama = (id: number, data: Partial<ShortDrama>) => {
    const updated = dramas.map((drama) =>
      drama.id === id ? { ...drama, ...data } : drama
    );
    setDramas(updated);
    saveToStorage(updated);
  };

  const deleteDrama = (id: number) => {
    const updated = dramas.filter((drama) => drama.id !== id);
    setDramas(updated);
    saveToStorage(updated);
  };

  const getDrama = (id: number) => {
    return dramas.find((drama) => drama.id === id);
  };

  return {
    dramas,
    loading,
    addDrama,
    updateDrama,
    deleteDrama,
    getDrama,
  };
}
