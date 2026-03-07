import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';

// 为静态导出生成示例参数
export async function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function ComicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comicId = parseInt(id);

  // 默认示例数据
  const comic = {
    id: comicId,
    title: '古风漫剧',
    description: '传统与现代的完美融合。这部漫剧以精妙的画面和动人的故事，展现了中华文化的博大精深。从古典建筑到传统服饰，从古琴诗词到书法绘画，每一个细节都充满了东方韵味。',
    cover: '',
    gradient: 'from-purple-100 to-blue-100',
    createdAt: new Date(),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 科技感背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="container mx-auto px-6">
          {/* 返回按钮 */}
          <Link href="/comics">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回列表
            </Button>
          </Link>

          {/* 漫剧详情 */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 左侧封面 */}
            <div className="md:col-span-1">
              <div
                className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${comic.gradient} flex items-center justify-center shadow-lg`}
              >
                {comic.cover ? (
                  <img
                    src={comic.cover}
                    alt={comic.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-6xl text-foreground/20">漫剧</div>
                )}
              </div>
            </div>

            {/* 右侧信息 */}
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
                {comic.title}
              </h1>

              <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                {comic.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(comic.createdAt).toLocaleDateString('zh-CN')}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {Math.floor(Math.random() * 10000) + 1000} 次查看
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">简介</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {comic.description}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                  开始观看
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  收藏
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  分享
                </Button>
              </div>
            </div>
          </div>

          {/* 相关推荐 */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group aspect-[3/4] rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors flex items-center justify-center"
                >
                  <span className="text-sm text-muted-foreground">推荐漫剧 {i}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
