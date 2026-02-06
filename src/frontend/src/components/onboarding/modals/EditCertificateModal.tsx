import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText } from 'lucide-react';
import { CertificateUpload, fileToDataUrl, validateFileSize, getCertificateFileUrl, isCertificatePdf } from '../uploadsStorage';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EditCertificateModalProps {
  open: boolean;
  onClose: () => void;
  certificate: CertificateUpload | null;
  onSave: (certificate: CertificateUpload) => void;
  onDelete?: (id: string) => void;
}

export default function EditCertificateModal({
  open,
  onClose,
  certificate,
  onSave,
  onDelete,
}: EditCertificateModalProps) {
  const [editedCert, setEditedCert] = useState<CertificateUpload | null>(certificate);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedCert(certificate);
    setError(null);
  }, [certificate]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedCert) {
      setIsProcessing(true);
      setError(null);
      try {
        const dataUrl = await fileToDataUrl(file);
        
        // Validate file size
        const validation = validateFileSize(dataUrl);
        if (!validation.valid) {
          setError(validation.error || 'File is too large');
          setIsProcessing(false);
          return;
        }
        
        setEditedCert({ 
          ...editedCert, 
          fileDataUrl: dataUrl,
          mimeType: file.type,
          imageDataUrl: dataUrl, // Keep for backward compatibility
        });
      } catch (error) {
        console.error('Failed to process file:', error);
        setError('Failed to process file. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSave = () => {
    if (editedCert && editedCert.title && editedCert.issuer && editedCert.date) {
      const fileUrl = getCertificateFileUrl(editedCert);
      if (fileUrl) {
        onSave(editedCert);
        onClose();
      }
    }
  };

  const handleCancel = () => {
    setEditedCert(certificate);
    setError(null);
    onClose();
  };

  const handleDelete = () => {
    if (editedCert && onDelete) {
      onDelete(editedCert.id);
      onClose();
    }
  };

  if (!editedCert) return null;

  const fileUrl = getCertificateFileUrl(editedCert);
  const isPdf = isCertificatePdf(editedCert);
  const canSave = editedCert.title && editedCert.issuer && editedCert.date && fileUrl;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {certificate?.title ? 'Edit Certificate' : 'Add New Certificate'}
          </DialogTitle>
          <DialogDescription>
            Update certificate details and upload an image or PDF
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="cert-title">Certificate Title *</Label>
            <Input
              id="cert-title"
              placeholder="e.g., Advanced Web Development"
              value={editedCert.title}
              onChange={(e) => setEditedCert({ ...editedCert, title: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cert-issuer">Issuer *</Label>
              <Input
                id="cert-issuer"
                placeholder="e.g., Tech Academy"
                value={editedCert.issuer}
                onChange={(e) => setEditedCert({ ...editedCert, issuer: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cert-date">Date *</Label>
              <Input
                id="cert-date"
                placeholder="e.g., January 2024"
                value={editedCert.date}
                onChange={(e) => setEditedCert({ ...editedCert, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Certificate File * (Image or PDF)</Label>
            {fileUrl ? (
              <div className="relative rounded-lg overflow-hidden border-2 border-border">
                {isPdf ? (
                  <div className="w-full h-64 bg-muted flex flex-col items-center justify-center">
                    <FileText className="w-16 h-16 text-accent mb-4" />
                    <p className="text-sm font-medium">PDF Certificate</p>
                    <p className="text-xs text-muted-foreground mt-1">{editedCert.title || 'Certificate'}</p>
                  </div>
                ) : (
                  <img
                    src={fileUrl}
                    alt={editedCert.title || 'Certificate'}
                    className="w-full h-64 object-cover"
                  />
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-3 right-3"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Replace File'}
                </Button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border hover:border-accent/50 rounded-lg p-12 text-center cursor-pointer transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Click to upload certificate</p>
                <p className="text-sm text-muted-foreground mt-2">PNG, JPG, or PDF up to 5MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {onDelete && certificate?.id && (
            <Button variant="destructive" onClick={handleDelete} className="sm:mr-auto">
              Delete Certificate
            </Button>
          )}
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave || isProcessing}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
