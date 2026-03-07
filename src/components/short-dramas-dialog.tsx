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

export interface UploadShortDramaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (data: { title: string; episodes: number; duration: string; description: string; cover: File | null }) => void;
}

export function UploadShortDramaDialog({ open, onOpenChange, onUpload }: UploadShortDramaDialogProps) {
  const [title, setTitle] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState<File | null>(null);

  const handleUpload = () => {
    if (title && episodes && duration && description) {
      onUpload({
        title,
        episodes: parseInt(episodes),
        duration,
        description,
        cover,
      });
      setTitle('');
      setEpisodes('');
      setDuration('');
      setDescription('');
      setCover(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>上传短剧</DialogTitle>
          <DialogDescription>
            填写短剧信息并上传封面图片
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              placeholder="请输入短剧标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="episodes">集数 *</Label>
              <Input
                id="episodes"
                type="number"
                placeholder="如：10"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">时长 *</Label>
              <Input
                id="duration"
                placeholder="如：3分钟/集"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">简介 *</Label>
            <Textarea
              id="description"
              placeholder="请输入短剧简介"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cover">封面图片</Label>
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={(e) => setCover(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleUpload} disabled={!title || !episodes || !duration || !description}>
            上传
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface EditShortDramaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  drama: { id: number; title: string; episodes: number; duration: string; description: string } | null;
  onEdit: (data: { id: number; title: string; episodes: number; duration: string; description: string }) => void;
}

export function EditShortDramaDialog({ open, onOpenChange, drama, onEdit }: EditShortDramaDialogProps) {
  const [title, setTitle] = useState('');
  const [episodes, setEpisodes] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  useState(() => {
    if (drama) {
      setTitle(drama.title);
      setEpisodes(drama.episodes.toString());
      setDuration(drama.duration);
      setDescription(drama.description);
    }
  });

  const handleEdit = () => {
    if (drama && title && episodes && duration && description) {
      onEdit({
        id: drama.id,
        title,
        episodes: parseInt(episodes),
        duration,
        description,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑短剧</DialogTitle>
          <DialogDescription>
            修改短剧信息
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">标题 *</Label>
            <Input
              id="edit-title"
              placeholder="请输入短剧标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-episodes">集数 *</Label>
              <Input
                id="edit-episodes"
                type="number"
                placeholder="如：10"
                value={episodes}
                onChange={(e) => setEpisodes(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-duration">时长 *</Label>
              <Input
                id="edit-duration"
                placeholder="如：3分钟/集"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">简介 *</Label>
            <Textarea
              id="edit-description"
              placeholder="请输入短剧简介"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleEdit} disabled={!title || !episodes || !duration || !description}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
