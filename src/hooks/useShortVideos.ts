'use client';

import { useState, useEffect } from 'react';

export interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  author?: string;
  duration?: string;
  views?: number;
  createdAt?: Date;
}

const STORAGE_KEY = 'short_videos';

export function useShortVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      // 从 localStorage 读取
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setVideos(parsed);
      }
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveVideos = (videos: Video[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  };

  const addVideo = async (data: {
    title: string;
    description: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    author?: string;
    duration?: string;
  }) => {
    try {
      const newVideo: Video = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        thumbnailUrl: data.thumbnailUrl,
        author: data.author,
        duration: data.duration,
        views: 0,
        createdAt: new Date(),
      };

      const updated = [...videos, newVideo];
      setVideos(updated);
      saveVideos(updated);
    } catch (error) {
      console.error('Failed to add video:', error);
      throw error;
    }
  };

  const updateVideo = async (id: number, data: Partial<Video>) => {
    try {
      const updated = videos.map((v) => (v.id === id ? { ...v, ...data } : v));
      setVideos(updated);
      saveVideos(updated);
    } catch (error) {
      console.error('Failed to update video:', error);
      throw error;
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      const updated = videos.filter((v) => v.id !== id);
      setVideos(updated);
      saveVideos(updated);
    } catch (error) {
      console.error('Failed to delete video:', error);
      throw error;
    }
  };

  const getVideo = async (id: number) => {
    return videos.find((v) => v.id === id) || null;
  };

  const incrementViews = async (id: number) => {
    const video = videos.find((v) => v.id === id);
    if (video) {
      await updateVideo(id, { views: (video.views || 0) + 1 });
    }
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
