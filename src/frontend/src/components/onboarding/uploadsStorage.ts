export interface CertificateUpload {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageDataUrl: string; // Kept for backward compatibility
  fileDataUrl?: string; // New: stores file content (image or PDF)
  mimeType?: string; // New: stores MIME type
}

export interface PersonalDetails {
  name?: string;
  headline?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  link?: string;
  github?: string;
}

export interface HomeContent {
  headline?: string;
  tagline?: string;
  description?: string;
}

export interface AboutContent {
  pageTitle?: string;
  pageSubtitle?: string;
  bio?: string;
  additionalInfo?: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ProjectsPageContent {
  pageTitle?: string;
  pageSubtitle?: string;
}

export interface CertificatesPageContent {
  pageTitle?: string;
  pageSubtitle?: string;
}

export interface ContactContent {
  pageTitle?: string;
  pageSubtitle?: string;
  ctaTitle?: string;
  ctaDescription?: string;
}

export interface OnboardingData {
  completed: boolean;
  skipped: boolean;
  welcomeCompleted?: boolean;
  profilePhotoDataUrl?: string;
  certificates: CertificateUpload[];
  personalDetails?: PersonalDetails;
  projects?: Project[];
  homeContent?: HomeContent;
  aboutContent?: AboutContent;
  experiences?: ExperienceEntry[];
  projectsPageContent?: ProjectsPageContent;
  certificatesPageContent?: CertificatesPageContent;
  contactContent?: ContactContent;
  siteTitle?: string;
}

const STORAGE_KEY = 'portfolio_onboarding_data';

// Maximum size for localStorage (5MB conservative limit)
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export function loadOnboardingData(): OnboardingData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Normalize certificates for backward compatibility
      const normalizedCertificates = (data.certificates || []).map(normalizeCertificate);
      
      return {
        completed: data.completed || false,
        skipped: data.skipped || false,
        welcomeCompleted: data.welcomeCompleted || false,
        certificates: normalizedCertificates,
        profilePhotoDataUrl: data.profilePhotoDataUrl,
        personalDetails: data.personalDetails || {},
        projects: data.projects || [],
        homeContent: data.homeContent || {},
        aboutContent: data.aboutContent || {},
        experiences: data.experiences || [],
        projectsPageContent: data.projectsPageContent || {},
        certificatesPageContent: data.certificatesPageContent || {},
        contactContent: data.contactContent || {},
        siteTitle: data.siteTitle || 'Ash-Resume',
      };
    }
  } catch (error) {
    console.error('Failed to load onboarding data:', error);
  }
  
  return {
    completed: false,
    skipped: false,
    welcomeCompleted: false,
    certificates: [],
    personalDetails: {},
    projects: [],
    homeContent: {},
    aboutContent: {},
    experiences: [],
    projectsPageContent: {},
    certificatesPageContent: {},
    contactContent: {},
    siteTitle: 'Ash-Resume',
  };
}

export function saveOnboardingData(data: OnboardingData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save onboarding data:', error);
    throw error;
  }
}

export function clearOnboardingData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear onboarding data:', error);
  }
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Normalize certificate for backward compatibility
export function normalizeCertificate(cert: CertificateUpload): CertificateUpload {
  // If new format exists, use it
  if (cert.fileDataUrl && cert.mimeType) {
    return cert;
  }
  
  // Otherwise, migrate from old format
  if (cert.imageDataUrl) {
    return {
      ...cert,
      fileDataUrl: cert.imageDataUrl,
      mimeType: inferMimeTypeFromDataUrl(cert.imageDataUrl),
    };
  }
  
  return cert;
}

// Infer MIME type from data URL
function inferMimeTypeFromDataUrl(dataUrl: string): string {
  const match = dataUrl.match(/^data:([^;]+);/);
  return match ? match[1] : 'image/jpeg';
}

// Get display file content (prioritize new format, fallback to old)
export function getCertificateFileUrl(cert: CertificateUpload): string {
  return cert.fileDataUrl || cert.imageDataUrl;
}

// Get MIME type with fallback
export function getCertificateMimeType(cert: CertificateUpload): string {
  if (cert.mimeType) return cert.mimeType;
  if (cert.fileDataUrl) return inferMimeTypeFromDataUrl(cert.fileDataUrl);
  if (cert.imageDataUrl) return inferMimeTypeFromDataUrl(cert.imageDataUrl);
  return 'image/jpeg';
}

// Check if certificate is a PDF
export function isCertificatePdf(cert: CertificateUpload): boolean {
  const mimeType = getCertificateMimeType(cert);
  return mimeType === 'application/pdf';
}

// Validate file size for localStorage
export function validateFileSize(dataUrl: string): { valid: boolean; error?: string } {
  const sizeInBytes = Math.ceil((dataUrl.length * 3) / 4);
  
  if (sizeInBytes > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (sizeInBytes / (1024 * 1024)).toFixed(1);
    const maxMB = (MAX_FILE_SIZE_BYTES / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeMB}MB). Maximum size is ${maxMB}MB. Please choose a smaller file.`,
    };
  }
  
  return { valid: true };
}
