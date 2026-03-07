import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Cloudflare Pages 需要静态导出
  output: 'export',
  images: {
    unoptimized: true, // Cloudflare Pages 需要禁用图片优化
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lf-coze-web-cdn.coze.cn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'coze-coding-project.tos.coze.site',
        pathname: '/**',
      },
    ],
  },

  // 性能优化
  compress: true,

  // 生产环境优化
  productionBrowserSourceMaps: false,

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
