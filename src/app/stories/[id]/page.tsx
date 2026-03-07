'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useStories } from '@/hooks/useStories';
import { ArrowLeft, Download, Calendar, User, BookOpen, FileText } from 'lucide-react';

// 为静态导出生成示例参数
export async function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { getStory, stories } = useStories();
  const [story, setStory] = useState<any>(null);
  const [storyId, setStoryId] = useState<number | null>(null);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setStoryId(parseInt(resolvedParams.id));
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!storyId) return;

    const loadStory = async () => {
      // 先从列表中查找
      const foundInList = stories.find((s) => s.id === storyId);
      if (foundInList) {
        setStory(foundInList);
      } else {
        // 从 IndexedDB 加载
        const foundInDB = await getStory(storyId);
        if (foundInDB) {
          setStory(foundInDB);
        }
      }
    };
    loadStory();
  }, [storyId, getStory, stories]);

  const handleDownload = () => {
    if (story?.documentUrl) {
      const a = document.createElement('a');
      a.href = story.documentUrl;
      let extension = '.txt';
      if (story.documentUrl.startsWith('data:application/pdf')) {
        extension = '.pdf';
      } else if (story.documentUrl.startsWith('data:application/vnd.openxmlformats-officedocument')) {
        extension = '.docx';
      } else if (story.documentUrl.startsWith('data:application/octet-stream')) {
        extension = '.md';
      }
      a.download = `${story.title}${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (story?.content) {
      const blob = new Blob([story.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${story.title}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!story) {
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
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
            {/* 左侧信息 */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {story.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4 text-foreground">
                {story.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                {story.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {story.author}
                  </div>
                )}
                {story.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(story.createdAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* 摘要 */}
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-3 text-foreground">摘要</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {story.excerpt}
                </p>
              </div>

              {/* 完整内容 */}
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">完整内容</h2>
                {story.content ? (
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {story.content}
                  </div>
                ) : (
                  <p className="text-muted-foreground">暂无文本内容，请下载文档查看</p>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-wrap gap-4">
                {story.documentUrl && (
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="w-4 h-4" />
                    下载文档
                  </Button>
                )}
                {story.content && !story.documentUrl && (
                  <Button onClick={handleDownload} variant="outline" className="gap-2">
                    <FileText className="w-4 h-4" />
                    下载文本
                  </Button>
                )}
              </div>
            </div>

            {/* 右侧侧边栏 */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h2 className="text-lg font-semibold mb-4">故事信息</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">标题</p>
                    <p className="font-medium">{story.title}</p>
                  </div>
                  {story.author && (
                    <div>
                      <p className="text-muted-foreground">作者</p>
                      <p className="font-medium">{story.author}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">分类</p>
                    <p className="font-medium">{story.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">字数</p>
                    <p className="font-medium">
                      {story.content ? story.content.length : 0} 字
                    </p>
                  </div>
                  {story.createdAt && (
                    <div>
                      <p className="text-muted-foreground">发布时间</p>
                      <p className="font-medium">
                        {new Date(story.createdAt).toLocaleDateString()}
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
