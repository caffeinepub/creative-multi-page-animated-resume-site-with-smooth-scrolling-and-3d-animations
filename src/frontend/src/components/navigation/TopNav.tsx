import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, Upload, Edit, LogIn, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useUploads } from '../onboarding/UploadsContext';
import { useAuth } from '../auth/AuthContext';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import EditNameModal from '../onboarding/modals/EditNameModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/certificates', label: 'Certificates' },
  { path: '/contact', label: 'Contact' },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { reopenOnboarding, siteTitle } = useUploads();
  const { isMainUser, mainUserPrincipal, setAsMainUser, clearMainUser } = useAuth();
  const { login, clear, isLoggingIn, identity } = useInternetIdentity();

  const currentPrincipal = identity?.getPrincipal().toString();
  const isAuthenticated = !!currentPrincipal && currentPrincipal !== '2vxsx-fae';

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
  };

  const handleSetAsMainUser = () => {
    setAsMainUser();
  };

  const handleClearMainUser = () => {
    if (confirm('Are you sure you want to remove yourself as the main user? This will allow another user to become the main user.')) {
      clearMainUser();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {siteTitle}
            </Link>
            {isMainUser && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEditNameModal(true)}
                className="h-8 w-8"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      currentPath === item.path
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {isMainUser && (
              <Button
                variant="ghost"
                size="sm"
                onClick={reopenOnboarding}
                className="ml-2"
              >
                <Upload className="w-4 h-4 mr-2" />
                Edit Content
              </Button>
            )}

            {/* Auth Menu */}
            {!mainUserPrincipal ? (
              // No main user set yet
              isAuthenticated ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSetAsMainUser}
                  className="ml-2"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Set as Main User
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="ml-2"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>
              )
            ) : (
              // Main user is set
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-2">
                    {isMainUser ? (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Main User
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 mr-2" />
                        {isAuthenticated ? 'Viewer' : 'Login'}
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isMainUser ? (
                    <>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleClearMainUser} className="text-destructive">
                        Remove Main User
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      {!isAuthenticated && (
                        <DropdownMenuItem onClick={handleLogin} disabled={isLoggingIn}>
                          <LogIn className="w-4 h-4 mr-2" />
                          {isLoggingIn ? 'Logging in...' : 'Login as Main User'}
                        </DropdownMenuItem>
                      )}
                      {isAuthenticated && (
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden p-2 hover:bg-accent/10 rounded-md transition-colors">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                      currentPath === item.path
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isMainUser && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      reopenOnboarding();
                      setOpen(false);
                    }}
                    className="mt-4"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Edit Content
                  </Button>
                )}

                {/* Mobile Auth Buttons */}
                <div className="mt-4 pt-4 border-t border-border">
                  {!mainUserPrincipal ? (
                    isAuthenticated ? (
                      <Button
                        variant="default"
                        onClick={() => {
                          handleSetAsMainUser();
                          setOpen(false);
                        }}
                        className="w-full"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Set as Main User
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={() => {
                          handleLogin();
                          setOpen(false);
                        }}
                        disabled={isLoggingIn}
                        className="w-full"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                      </Button>
                    )
                  ) : (
                    <div className="space-y-2">
                      {isMainUser ? (
                        <>
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            Logged in as Main User
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              handleLogout();
                              setOpen(false);
                            }}
                            className="w-full"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              handleClearMainUser();
                              setOpen(false);
                            }}
                            className="w-full"
                          >
                            Remove Main User
                          </Button>
                        </>
                      ) : (
                        <>
                          {!isAuthenticated ? (
                            <Button
                              variant="default"
                              onClick={() => {
                                handleLogin();
                                setOpen(false);
                              }}
                              disabled={isLoggingIn}
                              className="w-full"
                            >
                              <LogIn className="w-4 h-4 mr-2" />
                              {isLoggingIn ? 'Logging in...' : 'Login as Main User'}
                            </Button>
                          ) : (
                            <>
                              <div className="px-3 py-2 text-sm text-muted-foreground">
                                Viewing as guest
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  handleLogout();
                                  setOpen(false);
                                }}
                                className="w-full"
                              >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {isMainUser && (
        <EditNameModal
          open={showEditNameModal}
          onClose={() => setShowEditNameModal(false)}
        />
      )}
    </>
  );
}
