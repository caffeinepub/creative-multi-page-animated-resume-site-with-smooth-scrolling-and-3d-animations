import RevealOnScroll from '../motion/RevealOnScroll';
import { Award, FileText } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  mimeType?: string;
}

interface CertificateGalleryProps {
  certificates: Certificate[];
  onSelect: (certificate: Certificate) => void;
}

export default function CertificateGallery({ certificates, onSelect }: CertificateGalleryProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {certificates.map((cert, index) => {
        const isPdf = cert.mimeType === 'application/pdf';
        
        return (
          <RevealOnScroll key={cert.id} delay={index * 0.1}>
            <button
              onClick={() => onSelect(cert)}
              className="group relative w-full text-left p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <div className="aspect-[7/5] rounded-lg overflow-hidden mb-4 bg-muted">
                {isPdf ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                    <FileText className="w-20 h-20 text-accent mb-3" />
                    <p className="text-sm font-medium text-accent">PDF Certificate</p>
                  </div>
                ) : (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                </div>
              </div>
            </button>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
