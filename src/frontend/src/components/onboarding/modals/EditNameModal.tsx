import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUploads } from '../UploadsContext';

interface EditNameModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditNameModal({ open, onClose }: EditNameModalProps) {
  const { personalDetails, updatePersonalDetails } = useUploads();
  const [name, setName] = useState('');

  useEffect(() => {
    if (open) {
      setName(personalDetails.name || '');
    }
  }, [open, personalDetails.name]);

  const handleSave = () => {
    updatePersonalDetails({
      ...personalDetails,
      name: name.trim(),
    });
    onClose();
  };

  const handleCancel = () => {
    setName(personalDetails.name || '');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Name</DialogTitle>
          <DialogDescription>
            Update your name as it appears throughout your portfolio
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
