import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '行同风与',
    template: '%s | 行同风与',
  },
  description:
    '行同风与 - 融合东方美学与现代科技的文化创意平台。探索精美漫剧、动人故事、精彩短剧，感受传统文化的魅力。',
  keywords: [
    '行同风与',
    '漫剧',
    '故事',
    '短剧',
    '东方美学',
    '文化创意',
    '传统文化',
    '古典文学',
  ],
  authors: [{ name: '行同风与 Team' }],
  generator: 'Next.js',
  openGraph: {
    title: '行同风与 | 与风同行',
    description:
      '探索精美漫剧、动人故事、精彩短剧，感受传统文化的魅力',
    url: 'https://withwind.com',
    siteName: '行同风与',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
