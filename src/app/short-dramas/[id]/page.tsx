import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Eye, Play, Clock } from 'lucide-react';

// 为静态导出生成示例参数
export async function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function ShortDramaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dramaId = parseInt(id);

  // 默认示例数据
  const drama = {
    id: dramaId,
    title: '古风短剧',
    description: '一部精致短剧，以独特的视角展现了古代生活的美好与智慧。每一帧画面都如诗如画，每一个故事都触动人心。',
    cover: '',
    gradient: 'from-rose-100 to-orange-100',
    createdAt: new Date(),
    duration: 15,
    episodes: 12,
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
          <Link href="/short-dramas">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回列表
            </Button>
          </Link>

          {/* 短剧详情 */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 左侧封面 */}
            <div className="md:col-span-1">
              <div
                className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${drama.gradient} flex items-center justify-center shadow-lg`}
              >
                {drama.cover ? (
                  <img
                    src={drama.cover}
                    alt={drama.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-6xl text-foreground/20">短剧</div>
                )}
              </div>
            </div>

            {/* 右侧信息 */}
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
                {drama.title}
              </h1>

              <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                {drama.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(drama.createdAt).toLocaleDateString('zh-CN')}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {drama.duration} 分钟
                </div>
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {drama.episodes} 集
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {Math.floor(Math.random() * 10000) + 1000} 次查看
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">简介</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {drama.description}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
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

          {/* 剧集列表 */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">剧集列表</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: drama.episodes }).map((_, i) => (
                <Link
                  key={i}
                  href={`/short-dramas/${id}?episode=${i + 1}`}
                  className="aspect-video rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors flex items-center justify-center group"
                >
                  <Play className="w-8 h-8 text-muted-foreground group-hover:text-foreground" />
                </Link>
              ))}
            </div>
          </section>

          {/* 相关推荐 */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">相关推荐</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group aspect-[3/4] rounded-lg bg-muted hover:bg-muted/80 cursor-pointer transition-colors flex items-center justify-center"
                >
                  <span className="text-sm text-muted-foreground">推荐短剧 {i}</span>
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
