'use client';

import { useState, useEffect } from 'react';

export interface ShortVideo {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  views?: number;
  author?: string;
  createdAt?: Date;
}

const STORAGE_KEY = 'short_videos_data';

export function useShortVideos() {
  const [videos, setVideos] = useState<ShortVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从localStorage加载数据
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVideos(parsed);
      } catch (e) {
        console.error('Failed to parse short videos data:', e);
      }
    }
    setLoading(false);
  }, []);

  const saveToStorage = (data: ShortVideo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addVideo = (data: Omit<ShortVideo, 'id' | 'createdAt' | 'views'>) => {
    const newVideo: ShortVideo = {
      ...data,
      id: Date.now(),
      createdAt: new Date(),
      views: 0,
    };
    const updated = [...videos, newVideo];
    setVideos(updated);
    saveToStorage(updated);
    return newVideo;
  };

  const updateVideo = (id: number, data: Partial<ShortVideo>) => {
    const updated = videos.map((video) =>
      video.id === id ? { ...video, ...data } : video
    );
    setVideos(updated);
    saveToStorage(updated);
  };

  const deleteVideo = (id: number) => {
    const updated = videos.filter((video) => video.id !== id);
    setVideos(updated);
    saveToStorage(updated);
  };

  const getVideo = (id: number) => {
    return videos.find((video) => video.id === id);
  };

  const incrementViews = (id: number) => {
    const updated = videos.map((video) =>
      video.id === id ? { ...video, views: (video.views || 0) + 1 } : video
    );
    setVideos(updated);
    saveToStorage(updated);
  };

  return {
    videos,
    loading,
    addVideo,
    updateVideo,
    deleteVideo,
    getVideo,
    incrementViews,
  };
}
