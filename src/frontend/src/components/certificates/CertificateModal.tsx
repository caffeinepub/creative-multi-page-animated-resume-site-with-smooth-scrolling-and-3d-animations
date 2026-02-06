import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, Calendar, Building } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  mimeType?: string;
}

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  const isPdf = certificate.mimeType === 'application/pdf';

  return (
    <Dialog open={!!certificate} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Award className="w-6 h-6 text-accent" />
            {certificate.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden border border-border">
            {isPdf ? (
              <iframe
                src={certificate.image}
                className="w-full h-[600px]"
                title={certificate.title}
              />
            ) : (
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-auto"
              />
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Building className="w-5 h-5 text-accent" />
              <div>
                <div className="text-xs text-muted-foreground">Issued By</div>
                <div className="font-medium">{certificate.issuer}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Calendar className="w-5 h-5 text-accent" />
              <div>
                <div className="text-xs text-muted-foreground">Date</div>
                <div className="font-medium">{certificate.date}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
