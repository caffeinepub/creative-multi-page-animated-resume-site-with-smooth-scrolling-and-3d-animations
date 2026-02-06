import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Plus, Image as ImageIcon, User, Briefcase, Award, Home, FileText, Mail, Type } from 'lucide-react';
import { fileToDataUrl, CertificateUpload, validateFileSize } from './uploadsStorage';
import { useUploads } from './UploadsContext';
import EditPersonalDetailsModal from './modals/EditPersonalDetailsModal';
import EditProjectsModal from './modals/EditProjectsModal';
import EditCertificatesListModal from './modals/EditCertificatesListModal';
import EditCertificateModal from './modals/EditCertificateModal';
import EditNameModal from './modals/EditNameModal';
import EditHomeContentModal from './modals/EditHomeContentModal';
import EditAboutContentModal from './modals/EditAboutContentModal';
import EditExperienceContentModal from './modals/EditExperienceContentModal';
import EditProjectsPageContentModal from './modals/EditProjectsPageContentModal';
import EditCertificatesPageContentModal from './modals/EditCertificatesPageContentModal';
import EditContactContentModal from './modals/EditContactContentModal';
import EditSiteTitleModal from './modals/EditSiteTitleModal';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface OnboardingScreenProps {
  onSave: (profilePhoto: string | undefined, certificates: CertificateUpload[]) => void;
  onSkip: () => void;
  initialProfilePhoto?: string;
  initialCertificates?: CertificateUpload[];
}

export default function OnboardingScreen({ 
  onSave, 
  onSkip,
  initialProfilePhoto,
  initialCertificates = [],
}: OnboardingScreenProps) {
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(initialProfilePhoto);
  const [certificates, setCertificates] = useState<CertificateUpload[]>(initialCertificates);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [showPersonalDetailsModal, setShowPersonalDetailsModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [showCertificatesListModal, setShowCertificatesListModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showHomeContentModal, setShowHomeContentModal] = useState(false);
  const [showAboutContentModal, setShowAboutContentModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showProjectsPageModal, setShowProjectsPageModal] = useState(false);
  const [showCertificatesPageModal, setShowCertificatesPageModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSiteTitleModal, setShowSiteTitleModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateUpload | null>(null);
  
  const profileInputRef = useRef<HTMLInputElement>(null);
  const { 
    personalDetails, 
    projects, 
    homeContent,
    aboutContent,
    experiences,
    projectsPageContent,
    certificatesPageContent,
    contactContent,
    siteTitle,
    updatePersonalDetails, 
    updateProjects, 
    updateCertificate, 
    addCertificate, 
    removeCertificate,
    updateHomeContent,
    updateAboutContent,
    updateExperiences,
    updateProjectsPageContent,
    updateCertificatesPageContent,
    updateContactContent,
    updateSiteTitle,
  } = useUploads();

  const hasExistingData = initialProfilePhoto || initialCertificates.length > 0 || 
    Object.keys(personalDetails).length > 0 || projects.length > 0;

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      setError(null);
      try {
        const dataUrl = await fileToDataUrl(file);
        const validation = validateFileSize(dataUrl);
        if (!validation.valid) {
          setError(validation.error || 'File is too large');
          setIsProcessing(false);
          return;
        }
        setProfilePhoto(dataUrl);
      } catch (error) {
        console.error('Failed to process profile photo:', error);
        setError('Failed to process profile photo. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleAddCertificate = () => {
    setCertificates([
      ...certificates,
      {
        id: Date.now().toString(),
        title: '',
        issuer: '',
        date: '',
        imageDataUrl: '',
      },
    ]);
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const handleCertificateChange = (id: string, field: keyof CertificateUpload, value: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const handleCertificateImageChange = async (id: string, file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const dataUrl = await fileToDataUrl(file);
      const validation = validateFileSize(dataUrl);
      if (!validation.valid) {
        setError(validation.error || 'File is too large');
        setIsProcessing(false);
        return;
      }
      handleCertificateChange(id, 'imageDataUrl', dataUrl);
    } catch (error) {
      console.error('Failed to process certificate file:', error);
      setError('Failed to process certificate file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = () => {
    const validCertificates = certificates.filter(
      cert => cert.title && cert.issuer && cert.date && cert.imageDataUrl
    );
    onSave(profilePhoto, validCertificates);
  };

  const handleEditCertificate = (cert: CertificateUpload) => {
    setSelectedCertificate(cert);
    setShowCertificateModal(true);
  };

  const handleAddNewCertificate = () => {
    const newCert: CertificateUpload = {
      id: Date.now().toString(),
      title: '',
      issuer: '',
      date: '',
      imageDataUrl: '',
    };
    setSelectedCertificate(newCert);
    setShowCertificateModal(true);
  };

  const handleSaveCertificate = (cert: CertificateUpload) => {
    if (certificates.find(c => c.id === cert.id)) {
      updateCertificate(cert);
      setCertificates(certificates.map(c => c.id === cert.id ? cert : c));
    } else {
      addCertificate(cert);
      setCertificates([...certificates, cert]);
    }
  };

  const handleDeleteCertificate = (id: string) => {
    removeCertificate(id);
    setCertificates(certificates.filter(c => c.id !== id));
  };

  const canSave = profilePhoto || certificates.some(cert => 
    cert.title && cert.issuer && cert.date && cert.imageDataUrl
  );

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Card className="border-2 border-accent/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                {hasExistingData ? 'Edit Your Portfolio' : 'Welcome to Your Portfolio'}
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                {hasExistingData 
                  ? 'Update your profile photo, certificates, and personal information'
                  : "Let's personalize your portfolio by uploading your profile photo and certificates"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Profile Photo Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Profile Photo</Label>
                  {profilePhoto && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProfilePhoto(undefined)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>
                
                {profilePhoto ? (
                  <div className="relative w-48 h-48 mx-auto rounded-xl overflow-hidden border-4 border-accent/20">
                    <img
                      src={profilePhoto}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => profileInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-accent/50 rounded-xl p-12 text-center cursor-pointer transition-colors"
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Click to upload your profile photo</p>
                    <p className="text-sm text-muted-foreground mt-2">PNG, JPG up to 5MB</p>
                  </div>
                )}
                <input
                  ref={profileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                />
              </div>

              {/* Certificates Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Certificates</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddCertificate}
                    disabled={isProcessing}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Certificate
                  </Button>
                </div>

                {certificates.length === 0 ? (
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No certificates added yet</p>
                    <p className="text-sm text-muted-foreground mt-2">Click "Add Certificate" to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {certificates.map((cert) => (
                      <Card key={cert.id} className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => handleRemoveCertificate(cert.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <CardContent className="pt-6 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`title-${cert.id}`}>Certificate Title</Label>
                              <Input
                                id={`title-${cert.id}`}
                                placeholder="e.g., Advanced Web Development"
                                value={cert.title}
                                onChange={(e) => handleCertificateChange(cert.id, 'title', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`issuer-${cert.id}`}>Issuer</Label>
                              <Input
                                id={`issuer-${cert.id}`}
                                placeholder="e.g., Tech Academy"
                                value={cert.issuer}
                                onChange={(e) => handleCertificateChange(cert.id, 'issuer', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`date-${cert.id}`}>Date</Label>
                            <Input
                              id={`date-${cert.id}`}
                              placeholder="e.g., January 2024"
                              value={cert.date}
                              onChange={(e) => handleCertificateChange(cert.id, 'date', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Certificate File (Image or PDF)</Label>
                            {cert.imageDataUrl ? (
                              <div className="relative rounded-lg overflow-hidden border-2 border-border">
                                <img
                                  src={cert.imageDataUrl}
                                  alt={cert.title || 'Certificate'}
                                  className="w-full h-48 object-cover"
                                />
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="absolute bottom-2 right-2"
                                  onClick={() => {
                                    const input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = 'image/*,application/pdf';
                                    input.onchange = (e) => {
                                      const file = (e.target as HTMLInputElement).files?.[0];
                                      if (file) handleCertificateImageChange(cert.id, file);
                                    };
                                    input.click();
                                  }}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = 'image/*,application/pdf';
                                  input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) handleCertificateImageChange(cert.id, file);
                                  };
                                  input.click();
                                }}
                                className="border-2 border-dashed border-border hover:border-accent/50 rounded-lg p-8 text-center cursor-pointer transition-colors"
                              >
                                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload certificate</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or PDF up to 5MB</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Edit Options Section - Always show */}
              <div className="space-y-4 pt-4 border-t border-border">
                <Label className="text-lg font-semibold">Edit Your Information</Label>
                <div className="grid md:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowNameModal(true)}
                  >
                    <User className="w-6 h-6 text-accent" />
                    <span className="font-medium">Name</span>
                    <span className="text-xs text-muted-foreground">Edit your name</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowPersonalDetailsModal(true)}
                  >
                    <User className="w-6 h-6 text-accent" />
                    <span className="font-medium">Personal Details</span>
                    <span className="text-xs text-muted-foreground">Bio, contact info</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowHomeContentModal(true)}
                  >
                    <Home className="w-6 h-6 text-accent" />
                    <span className="font-medium">Home Page</span>
                    <span className="text-xs text-muted-foreground">Hero content</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowAboutContentModal(true)}
                  >
                    <FileText className="w-6 h-6 text-accent" />
                    <span className="font-medium">About Page</span>
                    <span className="text-xs text-muted-foreground">About content</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowExperienceModal(true)}
                  >
                    <Briefcase className="w-6 h-6 text-accent" />
                    <span className="font-medium">Experience</span>
                    <span className="text-xs text-muted-foreground">Work history</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowProjectsModal(true)}
                  >
                    <Briefcase className="w-6 h-6 text-accent" />
                    <span className="font-medium">Projects</span>
                    <span className="text-xs text-muted-foreground">Manage projects</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowProjectsPageModal(true)}
                  >
                    <FileText className="w-6 h-6 text-accent" />
                    <span className="font-medium">Projects Page</span>
                    <span className="text-xs text-muted-foreground">Page copy</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowCertificatesListModal(true)}
                  >
                    <Award className="w-6 h-6 text-accent" />
                    <span className="font-medium">Certificates</span>
                    <span className="text-xs text-muted-foreground">Edit existing</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowCertificatesPageModal(true)}
                  >
                    <FileText className="w-6 h-6 text-accent" />
                    <span className="font-medium">Certificates Page</span>
                    <span className="text-xs text-muted-foreground">Page copy</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowContactModal(true)}
                  >
                    <Mail className="w-6 h-6 text-accent" />
                    <span className="font-medium">Contact Page</span>
                    <span className="text-xs text-muted-foreground">Contact content</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => setShowSiteTitleModal(true)}
                  >
                    <Type className="w-6 h-6 text-accent" />
                    <span className="font-medium">Site Title</span>
                    <span className="text-xs text-muted-foreground">Navigation title</span>
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={onSkip}
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {hasExistingData ? 'Close' : 'Skip for Now'}
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!canSave || isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? 'Processing...' : 'Save & Continue'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <EditNameModal
        open={showNameModal}
        onClose={() => setShowNameModal(false)}
      />

      <EditPersonalDetailsModal
        open={showPersonalDetailsModal}
        onClose={() => setShowPersonalDetailsModal(false)}
        initialDetails={personalDetails}
        onSave={updatePersonalDetails}
      />

      <EditHomeContentModal
        open={showHomeContentModal}
        onClose={() => setShowHomeContentModal(false)}
        initialContent={homeContent}
        onSave={updateHomeContent}
      />

      <EditAboutContentModal
        open={showAboutContentModal}
        onClose={() => setShowAboutContentModal(false)}
        initialContent={aboutContent}
        onSave={updateAboutContent}
      />

      <EditExperienceContentModal
        open={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        initialExperiences={experiences}
        onSave={updateExperiences}
      />

      <EditProjectsModal
        open={showProjectsModal}
        onClose={() => setShowProjectsModal(false)}
        initialProjects={projects}
        onSave={updateProjects}
      />

      <EditProjectsPageContentModal
        open={showProjectsPageModal}
        onClose={() => setShowProjectsPageModal(false)}
        initialContent={projectsPageContent}
        onSave={updateProjectsPageContent}
      />

      <EditCertificatesListModal
        open={showCertificatesListModal}
        onClose={() => setShowCertificatesListModal(false)}
        certificates={certificates}
        onSelectCertificate={handleEditCertificate}
        onAddNew={handleAddNewCertificate}
      />

      <EditCertificatesPageContentModal
        open={showCertificatesPageModal}
        onClose={() => setShowCertificatesPageModal(false)}
        initialContent={certificatesPageContent}
        onSave={updateCertificatesPageContent}
      />

      <EditContactContentModal
        open={showContactModal}
        onClose={() => setShowContactModal(false)}
        initialContent={contactContent}
        onSave={updateContactContent}
      />

      <EditSiteTitleModal
        open={showSiteTitleModal}
        onClose={() => setShowSiteTitleModal(false)}
        initialTitle={siteTitle}
        onSave={updateSiteTitle}
      />

      <EditCertificateModal
        open={showCertificateModal}
        onClose={() => {
          setShowCertificateModal(false);
          setSelectedCertificate(null);
        }}
        certificate={selectedCertificate}
        onSave={handleSaveCertificate}
        onDelete={handleDeleteCertificate}
      />
    </>
  );
}
