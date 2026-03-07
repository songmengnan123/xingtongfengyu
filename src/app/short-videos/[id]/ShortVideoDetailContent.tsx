'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useShortVideos } from '@/hooks/useShortVideos';
import { ArrowLeft, Download, Eye, Calendar, User } from 'lucide-react';

export function ShortVideoDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { getVideo, videos } = useShortVideos();
  const [video, setVideo] = useState<any>(null);
  const [videoId, setVideoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 清理 Blob URL
  useEffect(() => {
    return () => {
      if (video?.videoUrl) {
        URL.revokeObjectURL(video.videoUrl);
      }
      if (video?.thumbnailUrl) {
        URL.revokeObjectURL(video.thumbnailUrl);
      }
    };
  }, [video]);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setVideoId(parseInt(resolvedParams.id));
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!videoId) return;

    const loadVideo = async () => {
      setLoading(true);
      try {
        // 先从列表中查找
        const foundInList = videos.find((v) => v.id === videoId);
        if (foundInList) {
          console.log('Found video in list:', {
            id: foundInList.id,
            hasVideoUrl: !!foundInList.videoUrl,
            videoUrlPrefix: foundInList.videoUrl?.substring(0, 50),
          });
          setVideo(foundInList);
        } else {
          // 从 IndexedDB 加载
          console.log('Loading video from IndexedDB, id:', videoId);
          const foundInDB = await getVideo(videoId);
          if (foundInDB) {
            console.log('Loaded video from DB:', {
              id: foundInDB.id,
              hasVideoUrl: !!foundInDB.videoUrl,
              videoUrlPrefix: foundInDB.videoUrl?.substring(0, 50),
            });
            setVideo(foundInDB);
          } else {
            console.log('Video not found');
          }
        }
      } catch (error) {
        console.error('Error loading video:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVideo();
  }, [videoId, getVideo, videos]);

  const handleDownload = () => {
    if (video?.videoUrl) {
      const a = document.createElement('a');
      a.href = video.videoUrl;
      a.download = `${video.title}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      alert('视频文件不可下载');
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

  if (!video) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 text-center">
            <p>视频不存在</p>
            <Button onClick={() => router.back()} className="mt-4">
              返回
            </Button>
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
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* 返回按钮 */}
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 视频播放区域 */}
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden bg-black shadow-xl">
                {video.videoUrl ? (
                  <div>
                    <video
                      controls
                      className="w-full aspect-video"
                      preload="auto"
                      playsInline
                      onError={(e) => {
                        const videoEl = e.target as HTMLVideoElement;
                        console.error('Video error:', {
                          code: videoEl.error?.code,
                          message: videoEl.error?.message,
                        });
                        alert(`视频加载失败: ${videoEl.error?.message || '未知错误'}`);
                      }}
                      onLoadStart={() => console.log('Video loading started')}
                      onCanPlay={() => console.log('Video can play')}
                      onLoadedData={() => console.log('Video data loaded')}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      <source src={video.videoUrl} type="video/webm" />
                      您的浏览器不支持视频播放，请尝试其他浏览器
                    </video>
                    {process.env.NODE_ENV === 'development' && (
                      <div className="p-2 text-xs text-muted-foreground bg-muted break-all">
                        Debug URL: {video.videoUrl}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">暂无视频文件</p>
                  </div>
                )}
              </div>

              {/* 视频信息 */}
              <div className="mt-6 space-y-4">
                <h1 className="text-2xl sm:text-3xl font-serif text-foreground">
                  {video.title}
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>

                {/* 视频元信息 */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {video.author && (
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {video.author}
                    </span>
                  )}
                  {video.duration && (
                    <span className="flex items-center gap-2">
                      <span>时长: {video.duration}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {(video.views || 0).toLocaleString()} 次观看
                  </span>
                  {video.createdAt && (
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* 下载按钮 */}
                {video.videoUrl && (
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="w-4 h-4" />
                    下载视频
                  </Button>
                )}
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-lg font-semibold mb-4">视频信息</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">标题</p>
                    <p className="font-medium">{video.title}</p>
                  </div>
                  {video.author && (
                    <div>
                      <p className="text-muted-foreground">作者</p>
                      <p className="font-medium">{video.author}</p>
                    </div>
                  )}
                  {video.duration && (
                    <div>
                      <p className="text-muted-foreground">时长</p>
                      <p className="font-medium">{video.duration}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">观看次数</p>
                    <p className="font-medium">
                      {(video.views || 0).toLocaleString()} 次
                    </p>
                  </div>
                  {video.createdAt && (
                    <div>
                      <p className="text-muted-foreground">上传时间</p>
                      <p className="font-medium">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
