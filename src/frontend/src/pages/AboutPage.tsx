import RevealOnScroll from '../components/motion/RevealOnScroll';
import ProfilePhotoCard from '../components/media/ProfilePhotoCard';
import { Code, Palette, Zap, Award } from 'lucide-react';
import { useUploads } from '../components/onboarding/UploadsContext';

export default function AboutPage() {
  const { personalDetails, aboutContent } = useUploads();
  
  const displayName = personalDetails.name || 'a Creative Developer';
  const displayPageTitle = aboutContent.pageTitle || 'About Me';
  const displayPageSubtitle = aboutContent.pageSubtitle || 'Passionate about creating exceptional digital experiences';
  const displayBio = aboutContent.bio || personalDetails.bio || `With over 5 years of experience in web development and design, I specialize in 
    creating beautiful, functional, and user-friendly digital experiences. My passion 
    lies in combining technical expertise with creative vision to build products that 
    make a difference.`;
  const displayAdditionalInfo = aboutContent.additionalInfo || `I believe in continuous learning and staying up-to-date with the latest technologies 
    and design trends. When I'm not coding, you can find me exploring new creative tools, 
    contributing to open-source projects, or sharing knowledge with the developer community.`;

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Motoko', 'Python', 'PostgreSQL'] },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'Blender', 'After Effects'] },
    { category: 'Tools', items: ['Git', 'Docker', 'VS Code', 'Webpack'] },
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
          <RevealOnScroll delay={0.1}>
            <ProfilePhotoCard />
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-3xl font-bold">Hello, I'm {displayName}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {displayBio}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {displayAdditionalInfo}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-accent">
                  <Code className="w-5 h-5" />
                  <span className="font-medium">Clean Code</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Palette className="w-5 h-5" />
                  <span className="font-medium">Creative Design</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Fast Performance</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Best Practices</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-4 text-accent">{skillGroup.category}</h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, i) => (
                      <li key={i} className="text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
