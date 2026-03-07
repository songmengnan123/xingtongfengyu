import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AboutPage() {
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
          {/* 页面标题 */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
              关于我们
            </h1>
            <p className="text-lg text-muted-foreground">
              了解行同风与的故事与愿景
            </p>
          </div>

          {/* 品牌故事 */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">品牌故事</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  行同风与成立于2024年，我们致力于打造一个融合东方美学与现代科技的文化创意平台。
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  "与风同行"取自诗句，寓意着自由、轻盈与灵动。我们希望通过精心的漫剧、动人的故事、精彩的短剧，
                  让用户感受到传统文化的魅力与现代创意的碰撞。
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  在这里，每一部作品都是一次与风的对话，每一次阅读都是一场心灵的旅行。
                </p>
              </div>
              <div className="relative aspect-square bg-gradient-to-br from-muted/50 to-background rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-serif text-muted-foreground/20 mb-2">
                      风
                    </div>
                    <p className="text-sm text-muted-foreground/60">自由 · 灵动 · 优雅</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 价值观 */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center text-foreground">我们的价值观</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: '传承', description: '传承东方文化精髓' },
                { title: '创新', description: '融合现代科技创意' },
                { title: '品质', description: '精心打磨每一部作品' },
              ].map((value) => (
                <div
                  key={value.title}
                  className="p-6 border border-border rounded-lg bg-card hover:border-foreground/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 联系我们 */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center text-foreground">联系我们</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-lg bg-card">
                <h3 className="text-lg font-semibold mb-4 text-foreground">商务合作</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  邮箱：business@withwind.com
                </p>
                <p className="text-sm text-muted-foreground">
                  电话：400-123-4567
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg bg-card">
                <h3 className="text-lg font-semibold mb-4 text-foreground">用户反馈</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  邮箱：feedback@withwind.com
                </p>
                <p className="text-sm text-muted-foreground">
                  感谢您的宝贵意见
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
