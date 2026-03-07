'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { UploadShortDramaDialog, EditShortDramaDialog } from '@/components/short-dramas-dialog';
import { Button } from '@/components/ui/button';
import { useShortDramas } from '@/hooks/useShortDramas';
import { Upload, Edit, Download, Trash2, Plus, Play } from 'lucide-react';
import Link from 'next/link';

export default function ShortDramasPage() {
  const { dramas, loading, addDrama, updateDrama, deleteDrama } = useShortDramas();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedDrama, setSelectedDrama] = useState<{ id: number; title: string; episodes: number; duration: string; description: string } | null>(null);

  // 默认示例数据
  const defaultDramas = [
    { id: 1, title: '古风短剧', episodes: 12, views: '10万+', duration: '3分钟/集', description: '传统与现代的完美融合', thumbnail: 'bg-gradient-to-br from-purple-200 to-blue-200' },
    { id: 2, title: '宫廷短剧', episodes: 8, views: '8万+', duration: '5分钟/集', description: '红墙绿瓦，宫廷秘闻', thumbnail: 'bg-gradient-to-br from-pink-200 to-amber-200' },
    { id: 3, title: '武侠短剧', episodes: 10, views: '12万+', duration: '4分钟/集', description: '江湖恩怨，刀光剑影', thumbnail: 'bg-gradient-to-br from-amber-200 to-purple-200' },
    { id: 4, title: '仙侠短剧', episodes: 15, views: '15万+', duration: '3分钟/集', description: '修仙问道，飞升成神', thumbnail: 'bg-gradient-to-br from-blue-200 to-pink-200' },
    { id: 5, title: '都市短剧', episodes: 6, views: '6万+', duration: '5分钟/集', description: '现代都市，情感交织', thumbnail: 'bg-gradient-to-br from-purple-200 to-amber-200' },
    { id: 6, title: '历史短剧', episodes: 20, views: '20万+', duration: '2分钟/集', description: '历史长河，风云变幻', thumbnail: 'bg-gradient-to-br from-pink-200 to-blue-200' },
  ];

  const displayDramas = dramas.length > 0 ? dramas : defaultDramas;

  const handleUpload = (data: { title: string; episodes: number; duration: string; description: string; cover: File | null }) => {
    addDrama({
      title: data.title,
      episodes: data.episodes,
      duration: data.duration,
      description: data.description,
      cover: data.cover ? URL.createObjectURL(data.cover) : undefined,
    });
  };

  const handleEdit = (data: { id: number; title: string; episodes: number; duration: string; description: string }) => {
    updateDrama(data.id, data);
  };

  const openEditDialog = (drama: any) => {
    setSelectedDrama({
      id: drama.id,
      title: drama.title,
      episodes: drama.episodes,
      duration: drama.duration,
      description: drama.description || '',
    });
    setEditOpen(true);
  };

  const handleDownload = (drama: any) => {
    const data = {
      title: drama.title,
      episodes: drama.episodes,
      duration: drama.duration,
      description: drama.description || '',
      views: drama.views || '0',
      cover: drama.cover || '',
      createdAt: drama.createdAt || new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${drama.title}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个短剧吗？')) {
      deleteDrama(id);
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
                短剧时光
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                精彩短剧，随时随地的视觉盛宴
              </p>
            </div>
            <Button onClick={() => setUploadOpen(true)} className="gap-2 shrink-0">
              <Upload className="w-4 h-4" />
              上传短剧
            </Button>
          </div>

          {/* 短剧列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {displayDramas.map((drama: any) => (
              <div className="group relative overflow-hidden rounded-lg aspect-video bg-muted transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 border border-border/50 backdrop-blur-sm">
                {/* 缩略图背景 */}
                <div className={`absolute inset-0 ${drama.thumbnail || 'bg-gradient-to-br from-purple-200 to-blue-200'}`} />

                {/* 科技光效 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* 操作按钮 */}
                <div className="absolute top-3 right-3 flex gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => { e.preventDefault(); openEditDialog(drama); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => { e.preventDefault(); handleDownload(drama); }}
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => { e.preventDefault(); handleDelete(drama.id); }}
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
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{drama.title}</h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-white/80">
                    <span>{drama.episodes}集</span>
                    <span>{drama.views}观看</span>
                    <span>{drama.duration}</span>
                  </div>
                  <Link
                    href={`/short-dramas/${drama.id}`}
                    className="inline-block mt-1.5 sm:mt-2 text-[10px] sm:text-sm text-white/90 hover:text-white"
                  >
                    查看详情 →
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
      <UploadShortDramaDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUpload}
      />

      {/* 编辑弹窗 */}
      <EditShortDramaDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        drama={selectedDrama}
        onEdit={handleEdit}
      />
    </div>
  );
}
