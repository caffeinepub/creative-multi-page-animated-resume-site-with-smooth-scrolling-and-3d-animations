import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { Project } from '../uploadsStorage';

interface EditProjectsModalProps {
  open: boolean;
  onClose: () => void;
  initialProjects: Project[];
  onSave: (projects: Project[]) => void;
}

export default function EditProjectsModal({
  open,
  onClose,
  initialProjects,
  onSave,
}: EditProjectsModalProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        tags: [],
        link: '',
        github: '',
      },
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string | string[]) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSave = () => {
    const validProjects = projects.filter(p => p.name.trim() !== '');
    onSave(validProjects);
    onClose();
  };

  const handleCancel = () => {
    setProjects(initialProjects);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Projects</DialogTitle>
          <DialogDescription>
            Manage your project portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">Your Projects</Label>
            <Button variant="outline" size="sm" onClick={handleAddProject}>
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No projects yet. Click "Add Project" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={project.id} className="p-4 border border-border rounded-lg space-y-3 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${project.id}`}>Project Name *</Label>
                    <Input
                      id={`project-name-${project.id}`}
                      placeholder="e.g., E-Commerce Platform"
                      value={project.name}
                      onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`project-desc-${project.id}`}>Description</Label>
                    <Textarea
                      id={`project-desc-${project.id}`}
                      placeholder="Brief description of your project..."
                      rows={2}
                      value={project.description || ''}
                      onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`project-link-${project.id}`}>Live Demo URL</Label>
                      <Input
                        id={`project-link-${project.id}`}
                        placeholder="https://..."
                        value={project.link || ''}
                        onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`project-github-${project.id}`}>GitHub URL</Label>
                      <Input
                        id={`project-github-${project.id}`}
                        placeholder="https://github.com/..."
                        value={project.github || ''}
                        onChange={(e) => handleProjectChange(project.id, 'github', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`project-tags-${project.id}`}>Tags (comma-separated)</Label>
                    <Input
                      id={`project-tags-${project.id}`}
                      placeholder="e.g., React, Node.js, PostgreSQL"
                      value={project.tags?.join(', ') || ''}
                      onChange={(e) => handleProjectChange(
                        project.id, 
                        'tags', 
                        e.target.value.split(',').map(t => t.trim()).filter(t => t)
                      )}
                    />
                  </div>
                </div>
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
