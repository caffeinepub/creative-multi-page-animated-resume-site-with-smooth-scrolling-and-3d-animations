import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  loadOnboardingData, 
  saveOnboardingData, 
  OnboardingData, 
  CertificateUpload, 
  PersonalDetails, 
  Project,
  HomeContent,
  AboutContent,
  ExperienceEntry,
  ProjectsPageContent,
  CertificatesPageContent,
  ContactContent
} from './uploadsStorage';

interface UploadsContextValue {
  profilePhoto?: string;
  certificates: CertificateUpload[];
  personalDetails: PersonalDetails;
  projects: Project[];
  homeContent: HomeContent;
  aboutContent: AboutContent;
  experiences: ExperienceEntry[];
  projectsPageContent: ProjectsPageContent;
  certificatesPageContent: CertificatesPageContent;
  contactContent: ContactContent;
  siteTitle: string;
  isOnboardingComplete: boolean;
  isOnboardingSkipped: boolean;
  isWelcomeComplete: boolean;
  saveUploads: (profilePhoto: string | undefined, certificates: CertificateUpload[]) => void;
  skipOnboarding: () => void;
  reopenOnboarding: () => void;
  completeWelcome: () => void;
  updatePersonalDetails: (details: PersonalDetails) => void;
  updateProjects: (projects: Project[]) => void;
  updateCertificate: (certificate: CertificateUpload) => void;
  addCertificate: (certificate: CertificateUpload) => void;
  removeCertificate: (id: string) => void;
  updateHomeContent: (content: HomeContent) => void;
  updateAboutContent: (content: AboutContent) => void;
  updateExperiences: (experiences: ExperienceEntry[]) => void;
  updateProjectsPageContent: (content: ProjectsPageContent) => void;
  updateCertificatesPageContent: (content: CertificatesPageContent) => void;
  updateContactContent: (content: ContactContent) => void;
  updateSiteTitle: (title: string) => void;
}

const UploadsContext = createContext<UploadsContextValue | undefined>(undefined);

export function UploadsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(() => loadOnboardingData());

  const siteTitle = data.siteTitle || 'Ash-Resume';

  // Sync document.title with current siteTitle
  useEffect(() => {
    document.title = siteTitle;
  }, [siteTitle]);

  const saveUploads = (profilePhoto: string | undefined, certificates: CertificateUpload[]) => {
    const newData: OnboardingData = {
      ...data,
      completed: true,
      skipped: false,
      profilePhotoDataUrl: profilePhoto,
      certificates,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const skipOnboarding = () => {
    const newData: OnboardingData = {
      ...data,
      completed: false,
      skipped: true,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const reopenOnboarding = () => {
    setData({
      ...data,
      completed: false,
      skipped: false,
    });
  };

  const completeWelcome = () => {
    const newData: OnboardingData = {
      ...data,
      welcomeCompleted: true,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updatePersonalDetails = (details: PersonalDetails) => {
    const newData: OnboardingData = {
      ...data,
      personalDetails: details,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateProjects = (projects: Project[]) => {
    const newData: OnboardingData = {
      ...data,
      projects,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateCertificate = (certificate: CertificateUpload) => {
    const newData: OnboardingData = {
      ...data,
      certificates: data.certificates.map(cert => 
        cert.id === certificate.id ? certificate : cert
      ),
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const addCertificate = (certificate: CertificateUpload) => {
    const newData: OnboardingData = {
      ...data,
      certificates: [...data.certificates, certificate],
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const removeCertificate = (id: string) => {
    const newData: OnboardingData = {
      ...data,
      certificates: data.certificates.filter(cert => cert.id !== id),
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateHomeContent = (content: HomeContent) => {
    const newData: OnboardingData = {
      ...data,
      homeContent: content,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateAboutContent = (content: AboutContent) => {
    const newData: OnboardingData = {
      ...data,
      aboutContent: content,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateExperiences = (experiences: ExperienceEntry[]) => {
    const newData: OnboardingData = {
      ...data,
      experiences,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateProjectsPageContent = (content: ProjectsPageContent) => {
    const newData: OnboardingData = {
      ...data,
      projectsPageContent: content,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateCertificatesPageContent = (content: CertificatesPageContent) => {
    const newData: OnboardingData = {
      ...data,
      certificatesPageContent: content,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateContactContent = (content: ContactContent) => {
    const newData: OnboardingData = {
      ...data,
      contactContent: content,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  const updateSiteTitle = (title: string) => {
    const newData: OnboardingData = {
      ...data,
      siteTitle: title,
    };
    setData(newData);
    saveOnboardingData(newData);
  };

  return (
    <UploadsContext.Provider
      value={{
        profilePhoto: data.profilePhotoDataUrl,
        certificates: data.certificates,
        personalDetails: data.personalDetails || {},
        projects: data.projects || [],
        homeContent: data.homeContent || {},
        aboutContent: data.aboutContent || {},
        experiences: data.experiences || [],
        projectsPageContent: data.projectsPageContent || {},
        certificatesPageContent: data.certificatesPageContent || {},
        contactContent: data.contactContent || {},
        siteTitle,
        isOnboardingComplete: data.completed,
        isOnboardingSkipped: data.skipped,
        isWelcomeComplete: data.welcomeCompleted || false,
        saveUploads,
        skipOnboarding,
        reopenOnboarding,
        completeWelcome,
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
      }}
    >
      {children}
    </UploadsContext.Provider>
  );
}

export function useUploads() {
  const context = useContext(UploadsContext);
  if (!context) {
    throw new Error('useUploads must be used within UploadsProvider');
  }
  return context;
}
