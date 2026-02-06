import { useState, useMemo } from 'react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import CertificateGallery from '../components/certificates/CertificateGallery';
import CertificateModal from '../components/certificates/CertificateModal';
import { certificates as staticCertificates } from '../data/certificates';
import { useUploads } from '../components/onboarding/UploadsContext';
import { getCertificateFileUrl, getCertificateMimeType } from '../components/onboarding/uploadsStorage';

export default function CertificatesPage() {
  const { certificates: uploadedCertificates, certificatesPageContent } = useUploads();
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const displayPageTitle = certificatesPageContent.pageTitle || 'Certificates';
  const displayPageSubtitle = certificatesPageContent.pageSubtitle || 'Professional certifications and achievements';

  const allCertificates = useMemo(() => {
    const uploaded = uploadedCertificates.map(cert => ({
      id: cert.id,
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      image: getCertificateFileUrl(cert),
      mimeType: getCertificateMimeType(cert),
    }));

    return uploaded.length > 0 ? uploaded : staticCertificates;
  }, [uploadedCertificates]);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {displayPageTitle}
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            {displayPageSubtitle}
          </p>
        </RevealOnScroll>

        <CertificateGallery 
          certificates={allCertificates}
          onSelect={setSelectedCertificate}
        />

        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />
      </div>
    </div>
  );
}
