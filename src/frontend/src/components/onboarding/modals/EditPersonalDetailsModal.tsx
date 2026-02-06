import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PersonalDetails } from '../uploadsStorage';

interface EditPersonalDetailsModalProps {
  open: boolean;
  onClose: () => void;
  initialDetails: PersonalDetails;
  onSave: (details: PersonalDetails) => void;
}

export default function EditPersonalDetailsModal({
  open,
  onClose,
  initialDetails,
  onSave,
}: EditPersonalDetailsModalProps) {
  const [details, setDetails] = useState<PersonalDetails>(initialDetails);

  const handleSave = () => {
    onSave(details);
    onClose();
  };

  const handleCancel = () => {
    setDetails(initialDetails);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Personal Details</DialogTitle>
          <DialogDescription>
            Update your personal information that will be displayed across your portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g., John Doe"
              value={details.name || ''}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              placeholder="e.g., Creative Developer & Designer"
              value={details.headline || ''}
              onChange={(e) => setDetails({ ...details, headline: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              rows={4}
              value={details.bio || ''}
              onChange={(e) => setDetails({ ...details, bio: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@example.com"
                value={details.email || ''}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={details.phone || ''}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., San Francisco, CA"
              value={details.location || ''}
              onChange={(e) => setDetails({ ...details, location: e.target.value })}
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
