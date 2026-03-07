'use client';

import { useState, useEffect } from 'react';
import { indexedDBService, StoredVideo } from '@/lib/indexedDB';

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

export function useShortVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      await indexedDBService.init();
      const storedVideos = await indexedDBService.getAllVideos();

      // 将 Blob 转换为 URL
      const videosWithUrls: Video[] = storedVideos.map((v) => {
        const videoUrl = v.videoBlob ? URL.createObjectURL(v.videoBlob) : undefined;
        console.log(`Loading video ${v.id}:`, {
          hasBlob: !!v.videoBlob,
          blobSize: v.videoBlob?.size,
          blobType: v.videoBlob?.type,
          videoUrl: videoUrl?.substring(0, 100),
        });

        return {
          id: v.id,
          title: v.title,
          description: v.description,
          videoUrl,
          thumbnailUrl: v.thumbnailBlob ? URL.createObjectURL(v.thumbnailBlob) : undefined,
          author: v.author,
          duration: v.duration,
          views: v.views,
          createdAt: v.createdAt,
        };
      });

      setVideos(videosWithUrls);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setLoading(false);
    }
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
      await indexedDBService.init();

      // 将 Data URL 转换回 Blob
      let videoBlob: Blob | undefined;
      let thumbnailBlob: Blob | undefined;

      if (data.videoUrl) {
        videoBlob = dataUrlToBlob(data.videoUrl);
        console.log('Created video blob:', {
          size: videoBlob.size,
          type: videoBlob.type,
        });
      }

      if (data.thumbnailUrl) {
        thumbnailBlob = dataUrlToBlob(data.thumbnailUrl);
        console.log('Created thumbnail blob:', {
          size: thumbnailBlob.size,
          type: thumbnailBlob.type,
        });
      }

      const newVideo: StoredVideo = {
        id: Date.now(),
        title: data.title,
        description: data.description,
        videoBlob,
        thumbnailBlob,
        author: data.author,
        duration: data.duration,
        views: 0,
        createdAt: new Date(),
      };

      await indexedDBService.saveVideo(newVideo);
      console.log('Video saved to IndexedDB:', newVideo.id);

      // 重新加载列表
      await loadVideos();
    } catch (error) {
      console.error('Failed to add video:', error);
      throw error;
    }
  };

  const updateVideo = async (id: number, data: Partial<Video>) => {
    try {
      await indexedDBService.init();
      const existing = await indexedDBService.getVideo(id);

      if (existing) {
        const updated: StoredVideo = {
          ...existing,
          ...data,
        };

        await indexedDBService.saveVideo(updated);
        await loadVideos();
      }
    } catch (error) {
      console.error('Failed to update video:', error);
      throw error;
    }
  };

  const deleteVideo = async (id: number) => {
    try {
      await indexedDBService.init();
      await indexedDBService.deleteVideo(id);
      await loadVideos();
    } catch (error) {
      console.error('Failed to delete video:', error);
      throw error;
    }
  };

  const getVideo = async (id: number) => {
    try {
      await indexedDBService.init();
      const stored = await indexedDBService.getVideo(id);

      if (stored) {
        return {
          id: stored.id,
          title: stored.title,
          description: stored.description,
          videoUrl: stored.videoBlob ? URL.createObjectURL(stored.videoBlob) : undefined,
          thumbnailUrl: stored.thumbnailBlob ? URL.createObjectURL(stored.thumbnailBlob) : undefined,
          author: stored.author,
          duration: stored.duration,
          views: stored.views,
          createdAt: stored.createdAt,
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to get video:', error);
      return null;
    }
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

// 将 Data URL 转换为 Blob
function dataUrlToBlob(dataUrl: string): Blob {
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) {
      throw new Error('Invalid data URL');
    }

    const mime = parts[0].match(/:(.*?);/)?.[1] || 'video/mp4';
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const blob = new Blob([u8arr], { type: mime });
    console.log('Data URL to Blob:', {
      mimeType: blob.type,
      size: blob.size,
    });

    return blob;
  } catch (error) {
    console.error('Error converting data URL to blob:', error);
    throw error;
  }
}
