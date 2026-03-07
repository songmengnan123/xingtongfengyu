import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // 静态导出配置，用于 Netlify 部署
  output: 'export',
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
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
  allowedDevOrigins: ['*.dev.coze.site'],

  // 性能优化
  compress: true, // 启用 gzip 压缩

  // 生产环境优化
  productionBrowserSourceMaps: false, // 禁用生产环境的 source maps

  // 编译优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除 console
  },

  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react'], // 优化 lucide-react 的导入
  },
};

export default nextConfig;
