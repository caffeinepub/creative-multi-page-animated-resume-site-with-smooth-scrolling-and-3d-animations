import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface EditExperienceContentModalProps {
  open: boolean;
  onClose: () => void;
  initialExperiences: ExperienceEntry[];
  onSave: (experiences: ExperienceEntry[]) => void;
}

export default function EditExperienceContentModal({ open, onClose, initialExperiences, onSave }: EditExperienceContentModalProps) {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>(initialExperiences);

  useEffect(() => {
    if (open) {
      setExperiences(initialExperiences.length > 0 ? initialExperiences : []);
    }
  }, [open, initialExperiences]);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        title: '',
        company: '',
        period: '',
        description: '',
        achievements: [],
      },
    ]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleUpdateExperience = (id: string, field: keyof ExperienceEntry, value: any) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleAddAchievement = (id: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === id ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    ));
  };

  const handleUpdateAchievement = (expId: string, index: number, value: string) => {
    setExperiences(experiences.map(exp =>
      exp.id === expId
        ? { ...exp, achievements: exp.achievements.map((a, i) => i === index ? value : a) }
        : exp
    ));
  };

  const handleRemoveAchievement = (expId: string, index: number) => {
    setExperiences(experiences.map(exp =>
      exp.id === expId
        ? { ...exp, achievements: exp.achievements.filter((_, i) => i !== index) }
        : exp
    ));
  };

  const handleSave = () => {
    onSave(experiences);
    onClose();
  };

  const handleCancel = () => {
    setExperiences(initialExperiences);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
          <DialogDescription>
            Manage your professional work history and achievements
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Experience Entries</Label>
            <Button variant="outline" size="sm" onClick={handleAddExperience}>
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </Button>
          </div>

          {experiences.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No experience entries yet. Click "Add Experience" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card key={exp.id}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <Label className="text-sm font-semibold">Experience #{index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExperience(exp.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                        <Input
                          id={`title-${exp.id}`}
                          placeholder="e.g., Senior Frontend Developer"
                          value={exp.title}
                          onChange={(e) => handleUpdateExperience(exp.id, 'title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`company-${exp.id}`}>Company</Label>
                        <Input
                          id={`company-${exp.id}`}
                          placeholder="e.g., Tech Innovations Inc."
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`period-${exp.id}`}>Period</Label>
                      <Input
                        id={`period-${exp.id}`}
                        placeholder="e.g., 2022 - Present"
                        value={exp.period}
                        onChange={(e) => handleUpdateExperience(exp.id, 'period', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${exp.id}`}>Description</Label>
                      <Textarea
                        id={`description-${exp.id}`}
                        placeholder="Brief description of your role..."
                        value={exp.description}
                        onChange={(e) => handleUpdateExperience(exp.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Key Achievements</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddAchievement(exp.id)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                      {exp.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex gap-2">
                          <Input
                            placeholder="Achievement..."
                            value={achievement}
                            onChange={(e) => handleUpdateAchievement(exp.id, achIndex, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveAchievement(exp.id, achIndex)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
