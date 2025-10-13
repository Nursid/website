import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import LoginPopup from "./LoginPopup";
import LogoutButton from "./LogoutButton";

const API_BASE = import.meta.env.VITE_API_BASE;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check session status on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setHasSession(!!(data.user && data.user.id));
        } else {
          setHasSession(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setHasSession(false);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const handleLoginSuccess = () => {
    console.log("User logged in successfully");
    setHasSession(true); // Update session state after successful login
  };

  const handleLogout = () => {
    console.log("User logged out");
    setHasSession(false); // Update session state after logout
  };

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Modules", href: "#modules" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" }
  ];

  // Don't show anything while checking session
  if (checkingSession) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">SkillSphere</span>
            </div>
            <div className="w-20 h-8 bg-muted rounded animate-pulse"></div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">SkillSphere</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA - Conditionally show Sign In or Logout */}
            <div className="hidden lg:flex items-center gap-4">
              {hasSession ? (
                // Show Logout button when session exists
                <LogoutButton 
                  onLogout={handleLogout}
                  variant="ghost"
                  size="sm"
                  showIcon={false}
                  buttonText="Logout"
                />
              ) : (
                // Show Sign In button when no session
                <Button variant="ghost" size="sm" onClick={openLogin}>
                  Sign In
                </Button>
              )}
              <Button variant="hero" size="sm" asChild>
                <a href="/onboarding">
                  Start Free Trial
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col gap-4 pt-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col gap-3 pt-4">
                  {/* Mobile - Conditionally show Sign In or Logout */}
                  {hasSession ? (
                    <LogoutButton 
                      onLogout={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      showIcon={false}
                      buttonText="Logout"
                    />
                  ) : (
                    <Button variant="ghost" size="sm" className="justify-start" onClick={openLogin}>
                      Sign In
                    </Button>
                  )}
                  <Button variant="hero" size="sm" asChild>
                    <a href="/onboarding" onClick={toggleMenu}>
                      Start Free Trial
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Login Popup */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Header;