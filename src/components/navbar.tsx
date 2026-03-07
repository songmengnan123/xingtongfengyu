'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: '首页', href: '/' },
  { name: '短视频', href: '/short-videos' },
  { name: '故事', href: '/stories' },
  { name: '关于我们', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <nav className="flex items-center justify-between">
          {/* 左侧品牌区 */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            {/* 楼阁线稿 - Logo */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl shadow-md flex items-center justify-center border border-border/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105">
              <Image
                src="/logo.png"
                alt="行同风与"
                width={56}
                height={56}
                className="object-contain p-1.5"
                priority
              />
            </div>

            {/* 品牌标识文字 */}
            <div className="flex flex-col items-start gap-0.5">
              {/* 品牌中文名 */}
              <h1 className="text-xl sm:text-2xl font-serif tracking-widest text-foreground font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                行|同|风|与
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground tracking-wider">
                Run with the wind
              </p>
            </div>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all relative py-1.5 px-2 ${
                  pathname === item.href
                    ? 'text-primary font-bold'
                    : 'text-foreground/70 hover:text-foreground hover:scale-105'
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-border/50 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-all py-2 px-3 rounded-lg ${
                    pathname === item.href
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
