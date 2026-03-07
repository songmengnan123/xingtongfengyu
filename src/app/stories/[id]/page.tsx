import { StoryDetailContent } from './StoryDetailContent';

export const dynamicParams = true; // 允许动态参数

export default function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <StoryDetailContent params={params} />;
}
