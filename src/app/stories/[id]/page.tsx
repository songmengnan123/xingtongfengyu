// 服务端组件 - 导出 generateStaticParams
import { StoryDetailContent } from './StoryDetailContent';

// 明确声明这是一个静态路由，不允许动态参数
export const dynamicParams = false;

// 为静态导出生成参数
export async function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <StoryDetailContent params={params} />;
}
