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

export interface UploadStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (data: { title: string; author: string; category: string; excerpt: string; content: string; documentFile: File | null }) => void;
}

export function UploadStoryDialog({ open, onOpenChange, onUpload }: UploadStoryDialogProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!title || !author || !category || !excerpt) {
      alert('请填写必填项');
      return;
    }

    setIsUploading(true);
    try {
      await onUpload({ title, author, category, excerpt, content, documentFile });
      setTitle('');
      setAuthor('');
      setCategory('');
      setExcerpt('');
      setContent('');
      setDocumentFile(null);
      onOpenChange(false);
    } catch (error) {
      alert('上传失败，请重试');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>上传故事</DialogTitle>
          <DialogDescription>
            填写故事信息并上传内容
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-2">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              placeholder="请输入故事标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">作者 *</Label>
            <Input
              id="author"
              placeholder="请输入作者"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">分类 *</Label>
            <Input
              id="category"
              placeholder="请输入分类，如：古诗词、戏曲、古典小说"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">简介 *</Label>
            <Textarea
              id="excerpt"
              placeholder="请输入故事简介"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">内容 (可选，或上传文档)</Label>
            <Textarea
              id="content"
              placeholder="请输入故事完整内容，或直接上传文档文件"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="document">文档文件 (支持 txt, pdf, docx, md 格式，最大 500MB)</Label>
            <Input
              id="document"
              type="file"
              accept=".txt,.pdf,.docx,.md"
              onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
            />
            {documentFile && (
              <p className="text-xs text-muted-foreground">
                已选择: {documentFile.name} ({(documentFile.size / 1024 / 1024).toFixed(2)} MB)
                {documentFile.size > 500 * 1024 * 1024 && (
                  <span className="text-destructive ml-2">⚠️ 文件超过 500MB 限制</span>
                )}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
            取消
          </Button>
          <Button onClick={handleUpload} disabled={!title || !author || !category || !excerpt || isUploading}>
            {isUploading ? '上传中...' : '上传'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface EditStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  story: { id: number; title: string; author: string; category: string; excerpt: string; content: string } | null;
  onEdit: (data: { id: number; title: string; author: string; category: string; excerpt: string; content: string }) => void;
}

export function EditStoryDialog({ open, onOpenChange, story, onEdit }: EditStoryDialogProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  useState(() => {
    if (story) {
      setTitle(story.title);
      setAuthor(story.author);
      setCategory(story.category);
      setExcerpt(story.excerpt);
      setContent(story.content);
    }
  });

  const handleEdit = () => {
    if (story && title && author && category && excerpt && content) {
      onEdit({ id: story.id, title, author, category, excerpt, content });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>编辑故事</DialogTitle>
          <DialogDescription>
            修改故事信息
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">标题 *</Label>
            <Input
              id="edit-title"
              placeholder="请输入故事标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-author">作者 *</Label>
            <Input
              id="edit-author"
              placeholder="请输入作者"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-category">分类 *</Label>
            <Input
              id="edit-category"
              placeholder="请输入分类"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-excerpt">简介 *</Label>
            <Textarea
              id="edit-excerpt"
              placeholder="请输入故事简介"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-content">内容 *</Label>
            <Textarea
              id="edit-content"
              placeholder="请输入故事完整内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleEdit} disabled={!title || !author || !category || !excerpt || !content}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
