'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const carouselSlides = [
  {
    id: 1,
    title: '与风同行',
    subtitle: '探索东方美学的无限可能',
    gradient: 'from-primary/20 via-secondary/20 to-primary/20',
    textColor: 'text-foreground'
  },
  {
    id: 2,
    title: '漫剧世界',
    subtitle: '沉浸式视听体验',
    gradient: 'from-secondary/20 via-accent/20 to-primary/20',
    textColor: 'text-foreground'
  },
  {
    id: 3,
    title: '故事海洋',
    subtitle: '每一个故事都值得被讲述',
    gradient: 'from-accent/20 via-primary/20 to-secondary/20',
    textColor: 'text-foreground'
  },
  {
    id: 4,
    title: '短剧时光',
    subtitle: '精彩瞬间，触手可及',
    gradient: 'from-primary/20 via-secondary/20 to-accent/20',
    textColor: 'text-foreground'
  },
];

export function HeroCarousel() {
  return (
    <section className="pt-20 relative">
      <div className="container mx-auto px-6">
        <Carousel className="w-full" opts={{ loop: true, align: 'start' }}>
          <CarouselContent>
            {carouselSlides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div
                  className={`relative h-[500px] md:h-[600px] bg-gradient-to-br ${slide.gradient} rounded-lg overflow-hidden border border-border/50`}
                >
                  {/* 装饰性背景元素 */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
                  </div>

                  {/* 内容区域 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 px-4">
                      <h2 className={`text-5xl md:text-7xl font-serif font-bold ${slide.textColor} tracking-wider`}>
                        {slide.title}
                      </h2>
                      <p className={`text-xl md:text-2xl ${slide.textColor}/80 font-light`}>
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* 底部装饰线 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12 top-1/2 -translate-y-1/2" />
          <CarouselNext className="-right-4 md:-right-12 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
