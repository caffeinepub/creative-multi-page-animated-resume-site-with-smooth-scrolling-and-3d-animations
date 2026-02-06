import RevealOnScroll from '../components/motion/RevealOnScroll';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { useUploads } from '../components/onboarding/UploadsContext';

export default function ContactPage() {
  const { personalDetails, contactContent } = useUploads();

  const displayPageTitle = contactContent.pageTitle || 'Get In Touch';
  const displayPageSubtitle = contactContent.pageSubtitle || "Let's work together on your next project";
  const displayCtaTitle = contactContent.ctaTitle || 'Ready to Start a Project?';
  const displayCtaDescription = contactContent.ctaDescription || "I'm currently available for freelance work and exciting collaborations. Let's create something amazing together!";

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalDetails.email || 'hello@example.com',
      href: `mailto:${personalDetails.email || 'hello@example.com'}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalDetails.phone || '+1 (555) 123-4567',
      href: `tel:${personalDetails.phone?.replace(/\D/g, '') || '+15551234567'}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalDetails.location || 'San Francisco, CA',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: SiGithub, label: 'GitHub', href: 'https://github.com' },
    { icon: SiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: SiX, label: 'X (Twitter)', href: 'https://x.com' },
  ];

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

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <RevealOnScroll delay={0.1}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{method.label}</div>
                        <div className="font-medium">{method.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out through any of these platforms. I'm always open to 
                  discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.3}>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 border border-accent/20 text-center">
              <h3 className="text-2xl font-bold mb-3">{displayCtaTitle}</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {displayCtaDescription}
              </p>
              <a
                href={`mailto:${personalDetails.email || 'hello@example.com'}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-200 hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                Send Me an Email
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
}
