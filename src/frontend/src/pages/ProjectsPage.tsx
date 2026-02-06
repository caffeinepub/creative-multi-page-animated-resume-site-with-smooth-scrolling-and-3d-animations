import { useMemo } from 'react';
import RevealOnScroll from '../components/motion/RevealOnScroll';
import SecondaryScene from '../components/three/SecondaryScene';
import { ExternalLink, Github } from 'lucide-react';
import { useUploads } from '../components/onboarding/UploadsContext';

export default function ProjectsPage() {
  const { projects: customProjects, projectsPageContent } = useUploads();

  const displayPageTitle = projectsPageContent.pageTitle || 'Projects';
  const displayPageSubtitle = projectsPageContent.pageSubtitle || 'A showcase of my recent work and creative experiments';

  const defaultProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: '#',
      github: '#',
    },
    {
      title: '3D Portfolio Website',
      description: 'Interactive portfolio featuring Three.js animations and smooth scroll-based transitions.',
      tags: ['React', 'Three.js', 'GSAP', 'Tailwind'],
      link: '#',
      github: '#',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates and team collaboration features.',
      tags: ['React', 'Firebase', 'TypeScript', 'Material-UI'],
      link: '#',
      github: '#',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with interactive maps and detailed forecasts.',
      tags: ['React', 'OpenWeather API', 'Chart.js', 'CSS'],
      link: '#',
      github: '#',
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics dashboard for tracking social media performance across multiple platforms.',
      tags: ['React', 'D3.js', 'Express', 'MongoDB'],
      link: '#',
      github: '#',
    },
    {
      title: 'AI Image Generator',
      description: 'Web application for generating images using AI models with custom prompts.',
      tags: ['React', 'Python', 'TensorFlow', 'FastAPI'],
      link: '#',
      github: '#',
    },
  ];

  const projects = useMemo(() => {
    if (customProjects.length > 0) {
      return customProjects.map(p => ({
        title: p.name,
        description: p.description || 'No description provided',
        tags: p.tags || [],
        link: p.link || '#',
        github: p.github || '#',
      }));
    }
    return defaultProjects;
  }, [customProjects]);

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

        {/* 3D Scene */}
        <div className="max-w-4xl mx-auto mb-16 h-64 rounded-2xl overflow-hidden">
          <SecondaryScene />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <RevealOnScroll key={index} delay={index * 0.05}>
              <div className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 pt-4 border-t border-border">
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
