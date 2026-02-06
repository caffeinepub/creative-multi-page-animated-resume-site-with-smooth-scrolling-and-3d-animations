import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProjectsPageContent {
  pageTitle?: string;
  pageSubtitle?: string;
}

interface EditProjectsPageContentModalProps {
  open: boolean;
  onClose: () => void;
  initialContent: ProjectsPageContent;
  onSave: (content: ProjectsPageContent) => void;
}

export default function EditProjectsPageContentModal({ open, onClose, initialContent, onSave }: EditProjectsPageContentModalProps) {
  const [content, setContent] = useState<ProjectsPageContent>(initialContent);

  useEffect(() => {
    if (open) {
      setContent(initialContent);
    }
  }, [open, initialContent]);

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  const handleCancel = () => {
    setContent(initialContent);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Projects Page Content</DialogTitle>
          <DialogDescription>
            Customize the title and subtitle for your projects page
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              placeholder="e.g., Projects"
              value={content.pageTitle || ''}
              onChange={(e) => setContent({ ...content, pageTitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageSubtitle">Page Subtitle</Label>
            <Textarea
              id="pageSubtitle"
              placeholder="e.g., A showcase of my recent work and creative experiments"
              value={content.pageSubtitle || ''}
              onChange={(e) => setContent({ ...content, pageSubtitle: e.target.value })}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
