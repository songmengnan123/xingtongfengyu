import { StoryDetailContent } from './StoryDetailContent';

export default function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <StoryDetailContent params={params} />;
}
