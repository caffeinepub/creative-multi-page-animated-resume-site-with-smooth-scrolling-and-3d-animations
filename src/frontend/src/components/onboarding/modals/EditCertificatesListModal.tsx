import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, Edit, FileText } from 'lucide-react';
import { CertificateUpload, getCertificateFileUrl, isCertificatePdf } from '../uploadsStorage';

interface EditCertificatesListModalProps {
  open: boolean;
  onClose: () => void;
  certificates: CertificateUpload[];
  onSelectCertificate: (certificate: CertificateUpload) => void;
  onAddNew: () => void;
}

export default function EditCertificatesListModal({
  open,
  onClose,
  certificates,
  onSelectCertificate,
  onAddNew,
}: EditCertificatesListModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Certificates</DialogTitle>
          <DialogDescription>
            Select a certificate to edit or add a new one
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button variant="outline" className="w-full" onClick={onAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Certificate
          </Button>

          {certificates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No certificates yet. Click "Add New Certificate" to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {certificates.map((cert) => {
                const fileUrl = getCertificateFileUrl(cert);
                const isPdf = isCertificatePdf(cert);
                
                return (
                  <button
                    key={cert.id}
                    onClick={() => {
                      onSelectCertificate(cert);
                      onClose();
                    }}
                    className="w-full p-4 border border-border rounded-lg hover:border-accent/50 transition-all text-left group"
                  >
                    <div className="flex items-start gap-4">
                      {fileUrl && (
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-muted">
                          {isPdf ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-10 h-10 text-accent" />
                            </div>
                          ) : (
                            <img
                              src={fileUrl}
                              alt={cert.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold group-hover:text-accent transition-colors">
                          {cert.title || 'Untitled Certificate'}
                        </h3>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">{cert.date}</p>
                        {isPdf && (
                          <p className="text-xs text-accent mt-1">PDF Document</p>
                        )}
                      </div>
                      <Edit className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
