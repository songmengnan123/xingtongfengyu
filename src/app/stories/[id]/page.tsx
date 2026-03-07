import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

// 为静态导出生成示例参数
export async function generateStaticParams() {
  return Array.from({ length: 3 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  // 默认示例数据
  const story = {
    id: id,
    title: '古风故事',
    author: '作者名',
    description: '一个关于古代文人墨客的故事，讲述了他们在风雨飘摇的时代中坚守理想、追求真理的历程。故事充满了诗意和哲思，展现了中华文化的深厚底蕴。',
    cover: '',
    gradient: 'from-emerald-100 to-teal-100',
    createdAt: new Date(),
    wordCount: 5000,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 科技感背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Navbar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="container mx-auto px-6">
          {/* 返回按钮 */}
          <Link href="/stories">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回列表
            </Button>
          </Link>

          {/* 故事详情 */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 左侧封面 */}
            <div className="md:col-span-1">
              <div
                className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${story.gradient} flex items-center justify-center shadow-lg`}
              >
                {story.cover ? (
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-6xl text-foreground/20">故事</div>
                )}
              </div>
            </div>

            {/* 右侧信息 */}
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
                {story.title}
              </h1>

              <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                {story.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {story.author}
                  </div>
                )}
                {story.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(story.createdAt).toLocaleDateString('zh-CN')}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {story.wordCount.toLocaleString()} 字
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">简介</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {story.description}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                  开始阅读
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
                  <span className="text-sm text-muted-foreground">推荐故事 {i}</span>
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
