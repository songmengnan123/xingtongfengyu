import { ShortVideoDetailContent } from './ShortVideoDetailContent';

export const dynamicParams = true; // 允许动态参数

export default function ShortVideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ShortVideoDetailContent params={params} />;
}
