'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface UploadShortVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (data: {
    title: string;
    description: string;
    videoFile: File | null;
    thumbnailFile: File | null;
    author: string;
    duration?: string;
  }) => void;
}

export function UploadShortVideoDialog({
  open,
  onOpenChange,
  onUpload,
}: UploadShortVideoDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (title && description && videoFile) {
      onUpload({
        title,
        description,
        videoFile,
        thumbnailFile,
        author,
        duration,
      });
      // 重置表单
      setTitle('');
      setDescription('');
      setAuthor('');
      setDuration('');
      setVideoFile(null);
      setThumbnailFile(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>上传短视频</DialogTitle>
          <DialogDescription>
            上传您的短视频作品，分享给更多人观看
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">视频标题 *</Label>
            <Input
              id="title"
              placeholder="请输入视频标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">视频简介 *</Label>
            <Textarea
              id="description"
              placeholder="请输入视频简介"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="author">作者</Label>
              <Input
                id="author"
                placeholder="请输入作者名"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">视频时长</Label>
              <Input
                id="duration"
                placeholder="如：1分30秒"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="video">视频文件 * (支持 mp4, webm, mov 格式)</Label>
            <Input
              id="video"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
            {videoFile && (
              <p className="text-xs text-muted-foreground">
                已选择: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="thumbnail">视频封面图片 (推荐)</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            />
            {thumbnailFile && (
              <p className="text-xs text-muted-foreground">
                已选择: {thumbnailFile.name}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!title || !description || !videoFile}
          >
            上传视频
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface EditShortVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: {
    id: number;
    title: string;
    description: string;
    author?: string;
    duration?: string;
  } | null;
  onEdit: (data: {
    id: number;
    title: string;
    description: string;
    author?: string;
    duration?: string;
  }) => void;
}

export function EditShortVideoDialog({
  open,
  onOpenChange,
  video,
  onEdit,
}: EditShortVideoDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [duration, setDuration] = useState('');

  useState(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setAuthor(video.author || '');
      setDuration(video.duration || '');
    }
  });

  const handleEdit = () => {
    if (video && title && description) {
      onEdit({
        id: video.id,
        title,
        description,
        author,
        duration,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>编辑短视频</DialogTitle>
          <DialogDescription>修改短视频信息</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">视频标题 *</Label>
            <Input
              id="edit-title"
              placeholder="请输入视频标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">视频简介 *</Label>
            <Textarea
              id="edit-description"
              placeholder="请输入视频简介"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-author">作者</Label>
              <Input
                id="edit-author"
                placeholder="请输入作者名"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-duration">视频时长</Label>
              <Input
                id="edit-duration"
                placeholder="如：1分30秒"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleEdit} disabled={!title || !description}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
