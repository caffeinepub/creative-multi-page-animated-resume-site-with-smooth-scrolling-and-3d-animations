import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EditSiteTitleModalProps {
  open: boolean;
  onClose: () => void;
  initialTitle: string;
  onSave: (title: string) => void;
}

export default function EditSiteTitleModal({ open, onClose, initialTitle, onSave }: EditSiteTitleModalProps) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
    }
  }, [open, initialTitle]);

  const handleSave = () => {
    onSave(title);
    onClose();
  };

  const handleCancel = () => {
    setTitle(initialTitle);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Site Title</DialogTitle>
          <DialogDescription>
            Change the title that appears in your navigation bar
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              placeholder="e.g., Portfolio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
