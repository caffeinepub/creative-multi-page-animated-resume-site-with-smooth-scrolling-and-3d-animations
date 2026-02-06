import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContactContent {
  pageTitle?: string;
  pageSubtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
}

interface EditContactContentModalProps {
  open: boolean;
  onClose: () => void;
  initialContent: ContactContent;
  onSave: (content: ContactContent) => void;
}

export default function EditContactContentModal({ open, onClose, initialContent, onSave }: EditContactContentModalProps) {
  const [content, setContent] = useState<ContactContent>(initialContent);

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Contact Page Content</DialogTitle>
          <DialogDescription>
            Customize your contact page headings and call-to-action
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              placeholder="e.g., Get In Touch"
              value={content.pageTitle || ''}
              onChange={(e) => setContent({ ...content, pageTitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageSubtitle">Page Subtitle</Label>
            <Textarea
              id="pageSubtitle"
              placeholder="e.g., Let's work together on your next project"
              value={content.pageSubtitle || ''}
              onChange={(e) => setContent({ ...content, pageSubtitle: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaTitle">Call-to-Action Title</Label>
            <Input
              id="ctaTitle"
              placeholder="e.g., Ready to Start a Project?"
              value={content.ctaTitle || ''}
              onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaDescription">Call-to-Action Description</Label>
            <Textarea
              id="ctaDescription"
              placeholder="e.g., I'm currently available for freelance work..."
              value={content.ctaDescription || ''}
              onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
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
