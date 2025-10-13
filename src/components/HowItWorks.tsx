import { Search, UserPlus, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Choose Module",
    description: "Browse our library of 50+ interactive modules covering math, science, reading, and more. Find the perfect fit for your child's interests and skill level.",
    color: "primary"
  },
  {
    icon: UserPlus,
    number: "02", 
    title: "Interactive Onboarding",
    description: "Get personalized recommendations based on your child's age, learning style, and goals. Set up profiles for seamless family learning.",
    color: "accent"
  },
  {
    icon: Rocket,
    number: "03",
    title: "Start Learning",
    description: "Dive into gamified lessons with real-time progress tracking, AI-powered hints, and collaborative challenges for parents and kids.",
    color: "warning"
  }
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started with SkillSphere is simple. Follow these three easy steps to begin 
            your family's learning adventure.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-warning opacity-30"></div>
          
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="relative mb-8">
                <div className={`
                  w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg
                  ${step.color === 'primary' ? 'bg-gradient-to-r from-primary to-primary-glow' : ''}
                  ${step.color === 'accent' ? 'bg-gradient-to-r from-accent to-accent-glow' : ''}
                  ${step.color === 'warning' ? 'bg-gradient-to-r from-warning to-orange-500' : ''}
                `}>
                  {step.number}
                </div>
                
                {/* Connecting dot */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-12 w-2 h-2 bg-muted rounded-full"></div>
                )}
              </div>
              
              {/* Icon */}
              <div className={`
                w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300
                ${step.color === 'primary' ? 'bg-gradient-to-r from-primary/10 to-primary-glow/10 text-primary' : ''}
                ${step.color === 'accent' ? 'bg-gradient-to-r from-accent/10 to-accent-glow/10 text-accent' : ''}
                ${step.color === 'warning' ? 'bg-gradient-to-r from-warning/10 to-orange-500/10 text-warning' : ''}
              `}>
                <step.icon className="w-8 h-8" />
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;