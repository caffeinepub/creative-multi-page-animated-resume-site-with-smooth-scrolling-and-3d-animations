import { Outlet } from '@tanstack/react-router';
import TopNav from '../navigation/TopNav';
import { SiFacebook, SiGithub, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function SiteLayout() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background texture */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/generated/bg-texture.dim_2048x2048.png)',
          backgroundSize: '512px 512px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <div className="relative z-10">
        <TopNav />
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
        <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>© 2026. Built with</span>
                <Heart className="w-4 h-4 text-accent fill-accent" />
                <span>using</span>
                <a 
                  href="https://caffeine.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-accent transition-colors font-medium"
                >
                  caffeine.ai
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
