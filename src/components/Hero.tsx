import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">
                Trusted by 10,000+ families
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-gradient">Transform</span><br />
              Learning Into<br />
              <span className="text-primary">Adventure</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              AI-powered skill development modules that make learning fun, interactive, 
              and engaging for both kids and parents. Gamified education that grows with your family.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="/onboarding">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button variant="outline" size="xl" className="group" asChild>
                <a href="/onboarding">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Get Started Free
                </a>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-muted-foreground">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary">50+</span>
                <span>Interactive Modules</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-accent">98%</span>
                <span>Parent Satisfaction</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-warning">AI</span>
                <span>Personalized</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img 
                src={heroImage}
                alt="Kids and parents learning together with SkillSphere"
                className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl"></div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-2xl shadow-lg animate-bounce-in font-semibold">
                🎯 98% Success Rate
              </div>
              <div className="absolute -bottom-4 -left-4 bg-warning text-white px-4 py-2 rounded-2xl shadow-lg animate-bounce-in font-semibold" style={{ animationDelay: "0.5s" }}>
                🚀 AI-Powered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;