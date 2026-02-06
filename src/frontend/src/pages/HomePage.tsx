import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import HeroScene from '../components/three/HeroScene';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import { useUploads } from '../components/onboarding/UploadsContext';

export default function HomePage() {
  const { personalDetails, homeContent } = useUploads();
  
  const displayName = personalDetails.name || 'Creative Developer';
  const displayHeadline = homeContent.headline || personalDetails.headline || 'Creative Developer & Designer';
  const displayTagline = homeContent.tagline || 'Welcome to my portfolio';
  const displayDescription = homeContent.description || 'Crafting beautiful digital experiences with modern technologies, creative animations, and attention to detail.';

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroScene />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">{displayTagline}</span>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                {displayHeadline.split('&')[0].trim()}
                <br />
                <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                  {displayHeadline.includes('&') ? `& ${displayHeadline.split('&')[1].trim()}` : ''}
                </span>
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {displayDescription}
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-200 hover:scale-105"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-border hover:bg-accent/10 font-medium transition-all duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              What I Do
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Web Development',
                description: 'Building responsive, performant web applications with modern frameworks and best practices.',
              },
              {
                title: 'UI/UX Design',
                description: 'Creating intuitive and beautiful user interfaces that delight users and drive engagement.',
              },
              {
                title: '3D & Animation',
                description: 'Adding depth and motion to digital experiences with creative 3D elements and smooth animations.',
              },
            ].map((feature, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
