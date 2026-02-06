import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import OnboardingGate from './components/onboarding/OnboardingGate';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import CertificatesPage from './pages/CertificatesPage';
import ContactPage from './pages/ContactPage';

const rootRoute = createRootRoute({
  component: OnboardingGate,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experience',
  component: ExperiencePage,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
});

const certificatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/certificates',
  component: CertificatesPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  experienceRoute,
  projectsRoute,
  certificatesRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <InternetIdentityProvider>
        <RouterProvider router={router} />
      </InternetIdentityProvider>
    </ThemeProvider>
  );
}
