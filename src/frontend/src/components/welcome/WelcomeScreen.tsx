import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUploads } from '../onboarding/UploadsContext';
import { useState } from 'react';
import EditNameModal from '../onboarding/modals/EditNameModal';
import { Sparkles, Edit } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  const { personalDetails } = useUploads();
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const userName = personalDetails.name || 'there';

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="border-2 border-accent/20">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-accent via-primary to-accent flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-background" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                Welcome, {userName}!
              </CardTitle>
              <CardDescription className="text-lg">
                You're logged in as the main user. Let's set up your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowEditNameModal(true)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Name
                </Button>
                <Button
                  onClick={onContinue}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditNameModal
        open={showEditNameModal}
        onClose={() => setShowEditNameModal(false)}
      />
    </>
  );
}
