'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { UploadStoryDialog, EditStoryDialog } from '@/components/stories-dialog';
import { Button } from '@/components/ui/button';
import { useStories } from '@/hooks/useStories';
import { Upload, Edit, Download, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function StoriesPage() {
  const { stories, loading, addStory, updateStory, deleteStory } = useStories();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<{ id: number; title: string; author: string; category: string; excerpt: string; content: string } | null>(null);

  // 默认示例数据
  const defaultStories = [
    { id: 1, title: '春江花月夜', author: '张若虚', excerpt: '春江潮水连海平，海上明月共潮生', category: '古诗词', content: '春江潮水连海平，海上明月共潮生。' },
    { id: 2, title: '长恨歌', author: '白居易', excerpt: '汉皇重色思倾国，御宇多年求不得', category: '古诗词', content: '汉皇重色思倾国，御宇多年求不得。' },
    { id: 3, title: '牡丹亭', author: '汤显祖', excerpt: '情不知所起，一往而深', category: '戏曲', content: '情不知所起，一往而深。' },
    { id: 4, title: '红楼梦', author: '曹雪芹', excerpt: '满纸荒唐言，一把辛酸泪', category: '古典小说', content: '满纸荒唐言，一把辛酸泪。' },
    { id: 5, title: '水浒传', author: '施耐庵', excerpt: '路见不平一声吼，该出手时就出手', category: '古典小说', content: '路见不平一声吼，该出手时就出手。' },
    { id: 6, title: '西游记', author: '吴承恩', excerpt: '敢问路在何方，路在脚下', category: '古典小说', content: '敢问路在何方，路在脚下。' },
  ];

  const displayStories = stories.length > 0 ? stories : defaultStories;

  const handleUpload = (data: { title: string; author: string; category: string; excerpt: string; content: string; documentFile: File | null }) => {
    const storyData = {
      title: data.title,
      author: data.author,
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      documentUrl: data.documentFile ? URL.createObjectURL(data.documentFile) : undefined,
    };
    addStory(storyData);
  };

  const handleEdit = (data: { id: number; title: string; author: string; category: string; excerpt: string; content: string }) => {
    updateStory(data.id, data);
  };

  const openEditDialog = (story: any) => {
    setSelectedStory({
      id: story.id,
      title: story.title,
      author: story.author,
      category: story.category,
      excerpt: story.excerpt,
      content: story.content || '',
    });
    setEditOpen(true);
  };

  const handleDownload = (story: any) => {
    if (story.documentUrl) {
      // 下载文档文件
      const a = document.createElement('a');
      a.href = story.documentUrl;
      a.download = `${story.title}${story.documentUrl.includes('.pdf') ? '.pdf' : story.documentUrl.includes('.docx') ? '.docx' : story.documentUrl.includes('.txt') ? '.txt' : '.md'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (story.content) {
      // 下载文本内容
      const blob = new Blob([story.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${story.title}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // 下载元数据
      const data = {
        title: story.title,
        author: story.author,
        category: story.category,
        excerpt: story.excerpt,
        content: story.content || '',
        createdAt: story.createdAt || new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${story.title}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个故事吗？')) {
      deleteStory(id);
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
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">
          {/* 页面标题 */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-2 md:mb-4 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                故事海洋
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                阅读经典故事，感受文学之美
              </p>
            </div>
            <Button onClick={() => setUploadOpen(true)} className="gap-2 shrink-0">
              <Upload className="w-4 h-4" />
              上传故事
            </Button>
          </div>

          {/* 故事列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {displayStories.map((story: any) => (
              <div className="group p-4 sm:p-6 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10 bg-card relative backdrop-blur-sm">
                {/* 科技光效 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* 操作按钮 */}
                <div className="absolute top-3 right-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => { e.preventDefault(); openEditDialog(story); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => { e.preventDefault(); handleDownload(story); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => { e.preventDefault(); handleDelete(story.id); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {story.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground group-hover:text-primary/80 transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2">作者：{story.author}</p>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{story.excerpt}</p>
                <Link
                  href={`/stories/${story.id}`}
                  className="inline-block text-xs sm:text-sm text-primary hover:text-primary/80 font-medium"
                >
                  阅读全文 →
                </Link>
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
      <UploadStoryDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUpload}
      />

      {/* 编辑弹窗 */}
      <EditStoryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        story={selectedStory}
        onEdit={handleEdit}
      />
    </div>
  );
}
