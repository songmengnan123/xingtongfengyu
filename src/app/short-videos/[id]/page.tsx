import { ShortVideoDetailContent } from './ShortVideoDetailContent';

export default function ShortVideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <ShortVideoDetailContent params={params} />;
}
