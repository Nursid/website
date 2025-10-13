import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-background to-primary/5 border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gradient">SkillSphere</h3>
              <p className="text-muted-foreground mt-2">
                Transforming learning into adventure with AI-powered skill development for kids and parents.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Browse Modules",
                "How It Works", 
                "Pricing",
                "Success Stories",
                "Blog",
                "Help Center"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-6">
              Learning
            </h4>
            <ul className="space-y-3">
              {[
                "Math Adventures",
                "Science Explorers", 
                "Reading Champions",
                "Creative Arts",
                "Coding for Kids",
                "View All Modules"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-card-foreground mb-6">
              Stay Connected
            </h4>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>hello@skillsphere.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>1-800-SKILLS-1</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-card rounded-2xl p-6 border">
              <h5 className="font-semibold text-card-foreground mb-3">
                Weekly Learning Tips
              </h5>
              <p className="text-sm text-muted-foreground mb-4">
                Get expert advice and fun activities delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                />
                <Button size="sm" variant="default">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-card/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              © {currentYear} SkillSphere. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;