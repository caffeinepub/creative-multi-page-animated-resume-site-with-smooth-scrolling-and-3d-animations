import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AboutContent {
  pageTitle?: string;
  pageSubtitle?: string;
  bio?: string;
  additionalInfo?: string;
}

interface EditAboutContentModalProps {
  open: boolean;
  onClose: () => void;
  initialContent: AboutContent;
  onSave: (content: AboutContent) => void;
}

export default function EditAboutContentModal({ open, onClose, initialContent, onSave }: EditAboutContentModalProps) {
  const [content, setContent] = useState<AboutContent>(initialContent);

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
          <DialogTitle>Edit About Page Content</DialogTitle>
          <DialogDescription>
            Customize your about page information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              placeholder="e.g., About Me"
              value={content.pageTitle || ''}
              onChange={(e) => setContent({ ...content, pageTitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageSubtitle">Page Subtitle</Label>
            <Input
              id="pageSubtitle"
              placeholder="e.g., Passionate about creating exceptional digital experiences"
              value={content.pageSubtitle || ''}
              onChange={(e) => setContent({ ...content, pageSubtitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              placeholder="Tell your story..."
              value={content.bio || ''}
              onChange={(e) => setContent({ ...content, bio: e.target.value })}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Additional details about yourself..."
              value={content.additionalInfo || ''}
              onChange={(e) => setContent({ ...content, additionalInfo: e.target.value })}
              rows={4}
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
