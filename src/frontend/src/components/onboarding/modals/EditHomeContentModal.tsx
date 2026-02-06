import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface HomeContent {
  headline?: string;
  tagline?: string;
  description?: string;
}

interface EditHomeContentModalProps {
  open: boolean;
  onClose: () => void;
  initialContent: HomeContent;
  onSave: (content: HomeContent) => void;
}

export default function EditHomeContentModal({ open, onClose, initialContent, onSave }: EditHomeContentModalProps) {
  const [content, setContent] = useState<HomeContent>(initialContent);

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
          <DialogTitle>Edit Home Page Content</DialogTitle>
          <DialogDescription>
            Customize the hero section of your portfolio homepage
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              placeholder="e.g., Creative Developer & Designer"
              value={content.headline || ''}
              onChange={(e) => setContent({ ...content, headline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Welcome Tagline</Label>
            <Input
              id="tagline"
              placeholder="e.g., Welcome to my portfolio"
              value={content.tagline || ''}
              onChange={(e) => setContent({ ...content, tagline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description about what you do..."
              value={content.description || ''}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
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
