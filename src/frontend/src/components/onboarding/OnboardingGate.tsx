import { AuthProvider } from '../auth/AuthContext';
import { UploadsProvider, useUploads } from './UploadsContext';
import OnboardingScreen from './OnboardingScreen';
import WelcomeScreen from '../welcome/WelcomeScreen';
import SiteLayout from '../layout/SiteLayout';
import { useAuth } from '../auth/AuthContext';

function OnboardingGateContent() {
  const { 
    isOnboardingComplete, 
    isOnboardingSkipped,
    isWelcomeComplete,
    completeWelcome,
    saveUploads, 
    skipOnboarding,
    profilePhoto,
    certificates,
  } = useUploads();

  const { isMainUser } = useAuth();

  // Show Welcome screen first if not completed and user is main user
  if (!isWelcomeComplete && isMainUser) {
    return <WelcomeScreen onContinue={completeWelcome} />;
  }

  // Then show onboarding if not completed/skipped and user is main user
  const shouldShowOnboarding = !isOnboardingComplete && !isOnboardingSkipped && isMainUser;

  if (shouldShowOnboarding) {
    return (
      <OnboardingScreen
        onSave={saveUploads}
        onSkip={skipOnboarding}
        initialProfilePhoto={profilePhoto}
        initialCertificates={certificates}
      />
    );
  }

  return <SiteLayout />;
}

export default function OnboardingGate() {
  return (
    <AuthProvider>
      <UploadsProvider>
        <OnboardingGateContent />
      </UploadsProvider>
    </AuthProvider>
  );
}
