'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { UploadComicDialog, EditComicDialog } from '@/components/comics-dialog';
import { Button } from '@/components/ui/button';
import { useComics } from '@/hooks/useComics';
import { Upload, Edit, Download, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ComicsPage() {
  const { comics, loading, addComic, updateComic, deleteComic } = useComics();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedComic, setSelectedComic] = useState<{ id: number; title: string; description: string } | null>(null);

  // 默认示例数据
  const defaultComics = [
    { id: 1, title: '古风漫剧', description: '传统与现代的完美融合', gradient: 'from-purple-100 to-blue-100' },
    { id: 2, title: '武侠漫剧', description: '江湖恩怨，刀光剑影', gradient: 'from-pink-100 to-amber-100' },
    { id: 3, title: '宫廷漫剧', description: '红墙绿瓦，宫廷秘闻', gradient: 'from-amber-100 to-purple-100' },
    { id: 4, title: '仙侠漫剧', description: '修仙问道，飞升成神', gradient: 'from-blue-100 to-pink-100' },
    { id: 5, title: '都市漫剧', description: '现代都市，情感交织', gradient: 'from-purple-100 to-amber-100' },
    { id: 6, title: '历史漫剧', description: '历史长河，风云变幻', gradient: 'from-pink-100 to-blue-100' },
  ];

  const displayComics = comics.length > 0 ? comics : defaultComics;

  const handleUpload = (data: { title: string; description: string; cover: File | null }) => {
    addComic({
      title: data.title,
      description: data.description,
      cover: data.cover ? URL.createObjectURL(data.cover) : undefined,
    });
  };

  const handleEdit = (data: { id: number; title: string; description: string }) => {
    updateComic(data.id, { title: data.title, description: data.description });
  };

  const openEditDialog = (comic: any) => {
    setSelectedComic({
      id: comic.id,
      title: comic.title,
      description: comic.description,
    });
    setEditOpen(true);
  };

  const handleDownload = (comic: any) => {
    const data = {
      title: comic.title,
      description: comic.description,
      cover: comic.cover || '',
      createdAt: comic.createdAt || new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${comic.title}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个漫剧吗？')) {
      deleteComic(id);
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
                漫剧世界
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                探索精心打造的漫剧作品，感受独特的视觉体验
              </p>
            </div>
            <Button onClick={() => setUploadOpen(true)} className="gap-2 shrink-0">
              <Upload className="w-4 h-4" />
              上传漫剧
            </Button>
          </div>

          {/* 漫剧列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {displayComics.map((comic: any) => (
              <div
                key={comic.id}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-gradient-to-br p-4 sm:p-6 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 border border-border/50 backdrop-blur-sm"
              >
                {/* 背景 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${comic.gradient || 'from-purple-100 to-blue-100'}`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

                {/* 科技光效 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />

                {/* 操作按钮 */}
                <div className="absolute top-3 right-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => { e.preventDefault(); openEditDialog(comic); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => { e.preventDefault(); handleDownload(comic); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => { e.preventDefault(); handleDelete(comic.id); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                </div>

                {/* 内容 */}
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 text-foreground">{comic.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{comic.description}</p>
                    <Link
                      href={`/comics/${comic.id}`}
                      className="inline-block mt-2 sm:mt-3 text-xs sm:text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      查看详情 →
                    </Link>
                  </div>
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
      <UploadComicDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUpload}
      />

      {/* 编辑弹窗 */}
      <EditComicDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        comic={selectedComic}
        onEdit={handleEdit}
      />
    </div>
  );
}
