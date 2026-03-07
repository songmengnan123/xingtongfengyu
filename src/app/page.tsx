import { Navbar } from '@/components/navbar';
import { HeroCarousel } from '@/components/hero-carousel';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* 科技感背景装饰 */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <HeroCarousel />

        {/* 内容推荐区域 */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-foreground">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                精选内容
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: '短视频', subtitle: '热门视频', href: '/short-videos', gradient: 'from-purple-50/50 via-pink-50/50 to-blue-50/50', icon: '📱' },
                { title: '故事精选', subtitle: '原创故事', href: '/stories', gradient: 'from-pink-50/50 via-amber-50/50 to-purple-50/50', icon: '📖' },
                { title: '关于我们', subtitle: '了解更多', href: '/about', gradient: 'from-blue-50/50 via-pink-50/50 to-amber-50/50', icon: '💡' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative overflow-hidden rounded-xl p-8 bg-gradient-to-br transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/10 border border-border/50 backdrop-blur-sm"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity ${item.gradient}`} />
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 品牌介绍区域 */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  与风同行
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                我们致力于打造一个融合东方美学与现代科技的文化创意平台。
                在这里，你可以欣赏精美的漫剧、阅读动人的故事、观看精彩的短剧，
                感受传统文化的魅力与现代创意的碰撞。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/comics"
                  className="px-8 py-3 bg-gradient-to-r from-foreground to-foreground/90 text-background hover:from-foreground/90 hover:to-foreground transition-all rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
                >
                  开始探索
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3 border border-border hover:bg-muted transition-all rounded-lg hover:scale-105 backdrop-blur-sm"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
