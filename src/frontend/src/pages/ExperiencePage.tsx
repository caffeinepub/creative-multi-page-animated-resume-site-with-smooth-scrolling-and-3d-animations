import RevealOnScroll from '../components/motion/RevealOnScroll';
import { Briefcase, Calendar } from 'lucide-react';
import { useUploads } from '../components/onboarding/UploadsContext';

export default function ExperiencePage() {
  const { experiences } = useUploads();

  const defaultExperiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      description: 'Leading frontend development for enterprise applications, implementing modern React patterns and 3D visualizations.',
      achievements: [
        'Reduced page load time by 40% through optimization',
        'Mentored 5 junior developers',
        'Implemented design system used across 10+ products',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Co.',
      period: '2020 - 2022',
      description: 'Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL.',
      achievements: [
        'Built 15+ client projects from concept to deployment',
        'Improved API response time by 60%',
        'Introduced automated testing practices',
      ],
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Agency',
      period: '2019 - 2020',
      description: 'Created responsive websites and interactive experiences for various clients in different industries.',
      achievements: [
        'Delivered 20+ responsive websites',
        'Achieved 95+ Lighthouse scores consistently',
        'Collaborated with design team on UI/UX improvements',
      ],
    },
  ];

  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Experience
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            My professional journey and achievements
          </p>
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-12">
              {displayExperiences.map((exp, index) => (
                <RevealOnScroll key={index} delay={index * 0.1}>
                  <div className="relative pl-0 md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-accent border-4 border-background hidden md:block" />
                    
                    <div className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-accent font-medium">
                            <Briefcase className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-accent">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
