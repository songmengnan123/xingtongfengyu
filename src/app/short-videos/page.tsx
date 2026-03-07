'use client';

import { useState, lazy, Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  UploadShortVideoDialog,
  EditShortVideoDialog,
} from '@/components/short-videos-dialog';
import { Button } from '@/components/ui/button';
import { useShortVideos } from '@/hooks/useShortVideos';
import { Upload, Edit, Download, Trash2, Plus, Play, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

// 懒加载对话框组件
const UploadDialogLazy = lazy(() => Promise.resolve({ default: UploadShortVideoDialog }));
const EditDialogLazy = lazy(() => Promise.resolve({ default: EditShortVideoDialog }));

export default function ShortVideosPage() {
  const { videos, loading, addVideo, updateVideo, deleteVideo, incrementViews } = useShortVideos();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    id: number;
    title: string;
    description: string;
    author?: string;
    duration?: string;
  } | null>(null);

  // 默认示例数据
  const defaultVideos = [
    {
      id: 1,
      title: '古风舞蹈',
      description: '传统舞蹈，优美的动作',
      thumbnailUrl: '',
      gradient: 'from-purple-200 to-blue-200',
      duration: '1分30秒',
      author: '舞蹈爱好者',
      views: 12000,
    },
    {
      id: 2,
      title: '汉服展示',
      description: '精美的汉服展示',
      thumbnailUrl: '',
      gradient: 'from-pink-200 to-amber-200',
      duration: '2分钟',
      author: '汉服爱好者',
      views: 8900,
    },
    {
      id: 3,
      title: '书法教学',
      description: '学习传统书法',
      thumbnailUrl: '',
      gradient: 'from-amber-200 to-purple-200',
      duration: '3分钟',
      author: '书法大师',
      views: 15600,
    },
    {
      id: 4,
      title: '茶道演示',
      description: '优雅的茶道表演',
      thumbnailUrl: '',
      gradient: 'from-blue-200 to-pink-200',
      duration: '2分30秒',
      author: '茶艺师',
      views: 9800,
    },
    {
      id: 5,
      title: '古琴演奏',
      description: '悠扬的古琴音乐',
      thumbnailUrl: '',
      gradient: 'from-purple-200 to-amber-200',
      duration: '4分钟',
      author: '音乐人',
      views: 7500,
    },
    {
      id: 6,
      title: '传统美食',
      description: '制作传统美食',
      thumbnailUrl: '',
      gradient: 'from-pink-200 to-blue-200',
      duration: '3分30秒',
      author: '厨师',
      views: 11200,
    },
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;

  const handleUpload = async (data: {
    title: string;
    description: string;
    videoFile: File | null;
    thumbnailFile: File | null;
    author: string;
    duration?: string;
  }) => {
    try {
      let videoUrl: string | undefined;
      let thumbnailUrl: string | undefined;

      // 上传视频文件
      if (data.videoFile) {
        if (data.videoFile.size > 500 * 1024 * 1024) {
          alert('视频文件过大，请上传小于 500MB 的视频');
          return;
        }
        const formData = new FormData();
        formData.append('file', data.videoFile);
        console.log('Uploading video:', data.videoFile.name);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        console.log('Video upload response:', result);
        if (result.success) {
          videoUrl = result.url;
        } else {
          throw new Error(result.message || result.error || '视频上传失败');
        }
      }

      // 上传缩略图文件
      if (data.thumbnailFile) {
        if (data.thumbnailFile.size > 10 * 1024 * 1024) {
          alert('缩略图文件过大，请上传小于 10MB 的图片');
          return;
        }
        const formData = new FormData();
        formData.append('file', data.thumbnailFile);
        console.log('Uploading thumbnail:', data.thumbnailFile.name);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        console.log('Thumbnail upload response:', result);
        if (result.success) {
          thumbnailUrl = result.url;
        } else {
          throw new Error(result.message || result.error || '缩略图上传失败');
        }
      }

      const videoData = {
        title: data.title,
        description: data.description,
        videoUrl,
        thumbnailUrl,
        author: data.author || undefined,
        duration: data.duration || undefined,
      };

      await addVideo(videoData);
      alert('上传成功！');
    } catch (error) {
      console.error('Upload error:', error);
      alert('上传失败，请重试');
    }
  };

  const handleEdit = (data: {
    id: number;
    title: string;
    description: string;
    author?: string;
    duration?: string;
  }) => {
    updateVideo(data.id, data);
  };

  const openEditDialog = (video: any) => {
    setSelectedVideo({
      id: video.id,
      title: video.title,
      description: video.description,
      author: video.author,
      duration: video.duration,
    });
    setEditOpen(true);
  };

  const handleDownload = (video: any) => {
    if (video.videoUrl) {
      // 下载视频文件
      const a = document.createElement('a');
      a.href = video.videoUrl;
      a.download = `${video.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // 下载元数据
      const data = {
        title: video.title,
        description: video.description,
        author: video.author,
        duration: video.duration,
        views: video.views,
        createdAt: video.createdAt || new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${video.title}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个视频吗？')) {
      deleteVideo(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 text-center">
            <p>加载中...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 科技感背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">
          {/* 页面标题 */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 md:mb-4 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                短视频
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                分享精彩瞬间，记录美好生活
              </p>
            </div>
            <Button onClick={() => setUploadOpen(true)} className="gap-2 shrink-0">
              <Upload className="w-4 h-4" />
              上传视频
            </Button>
          </div>

          {/* 短视频列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {displayVideos.map((video: any) => (
              <div key={video.id} className="group relative overflow-hidden rounded-lg aspect-[9/16] bg-muted transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 border border-border/50 backdrop-blur-sm">
                {/* 缩略图/视频预览 */}
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${video.gradient || 'from-purple-200 to-blue-200'}`}
                  />
                )}

                {/* 科技光效 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* 操作按钮 */}
                <div className="absolute top-3 right-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      openEditDialog(video);
                    }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(video);
                    }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(video.id);
                    }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {/* 播放按钮覆盖层 */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 cursor-pointer shadow-lg">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-foreground ml-1" />
                  </div>
                </div>

                {/* 信息覆盖层 */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/80">
                    {video.author && <span>{video.author}</span>}
                    {video.duration && <span>{video.duration}</span>}
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {(video.views || 0).toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href={`/short-videos/${video.id}`}
                    onClick={() => incrementViews(video.id)}
                    className="inline-block mt-1.5 sm:mt-2 text-[10px] sm:text-sm text-white/90 hover:text-white"
                  >
                    观看视频 →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="mt-8 md:mt-12 text-center">
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              加载更多
            </Button>
          </div>
        </div>
      </main>
      <Footer />

      {/* 上传弹窗 */}
      {uploadOpen && (
        <Suspense fallback={<div>加载中...</div>}>
          <UploadShortVideoDialog
            open={uploadOpen}
            onOpenChange={setUploadOpen}
            onUpload={handleUpload}
          />
        </Suspense>
      )}

      {/* 编辑弹窗 */}
      {editOpen && (
        <Suspense fallback={<div>加载中...</div>}>
          <EditShortVideoDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            video={selectedVideo}
            onEdit={handleEdit}
          />
        </Suspense>
      )}
    </div>
  );
}
