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

export interface UploadComicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (data: { title: string; description: string; cover: File | null }) => void;
}

export function UploadComicDialog({ open, onOpenChange, onUpload }: UploadComicDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cover, setCover] = useState<File | null>(null);

  const handleUpload = () => {
    if (title && description) {
      onUpload({ title, description, cover });
      setTitle('');
      setDescription('');
      setCover(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>上传漫剧</DialogTitle>
          <DialogDescription>
            填写漫剧信息并上传封面图片
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              placeholder="请输入漫剧标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">简介 *</Label>
            <Textarea
              id="description"
              placeholder="请输入漫剧简介"
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
          <Button onClick={handleUpload} disabled={!title || !description}>
            上传
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface EditComicDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comic: { id: number; title: string; description: string } | null;
  onEdit: (data: { id: number; title: string; description: string }) => void;
}

export function EditComicDialog({ open, onOpenChange, comic, onEdit }: EditComicDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useState(() => {
    if (comic) {
      setTitle(comic.title);
      setDescription(comic.description);
    }
  });

  const handleEdit = () => {
    if (comic && title && description) {
      onEdit({ id: comic.id, title, description });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑漫剧</DialogTitle>
          <DialogDescription>
            修改漫剧信息
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">标题 *</Label>
            <Input
              id="edit-title"
              placeholder="请输入漫剧标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">简介 *</Label>
            <Textarea
              id="edit-description"
              placeholder="请输入漫剧简介"
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
          <Button onClick={handleEdit} disabled={!title || !description}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
