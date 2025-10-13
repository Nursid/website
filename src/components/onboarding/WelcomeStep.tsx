import { Button } from "@/components/ui/button";
import { Sparkles, Star, Heart, ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center animate-fade-in">
      {/* Hero Icon */}
      <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-in">
        <Sparkles className="w-12 h-12 text-white" />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl lg:text-6xl font-bold mb-6">
        Friendly <span className="text-gradient">Welcome</span>! 🎉
      </h1>

      {/* Subheading */}
      <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
        Hey there, Wise One! 🌟 I'm Skillie, your child's superpower coach! Mind if we ask you a few fun questions to build your child's learning adventure?
      </p>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl p-6 shadow-lg animate-slide-up">
          <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold text-card-foreground mb-2">AI-Powered Learning</h3>
          <p className="text-sm text-muted-foreground">
            Smart algorithms that adapt to your child's unique learning style and pace.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-accent-glow/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Heart className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-bold text-card-foreground mb-2">Family Bonding</h3>
          <p className="text-sm text-muted-foreground">
            Interactive activities designed for parents and children to learn together.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="w-12 h-12 bg-gradient-to-r from-warning/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
            <Sparkles className="w-6 h-6 text-warning" />
          </div>
          <h3 className="font-bold text-card-foreground mb-2">Gamified Experience</h3>
          <p className="text-sm text-muted-foreground">
            Turn learning into an exciting game with points, badges, and achievements.
          </p>
        </div>
      </div>

      {/* Process Preview */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 mb-12 max-w-3xl mx-auto">
        <h3 className="text-xl font-bold text-card-foreground mb-4">
          What's Next? Just 5 Easy Steps! ⭐
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          {[
            "Setup Profile",
            "Choose Module", 
            "Customize",
            "Secure Payment",
            "Start Learning!"
          ].map((step, index) => (
            <div key={step} className="text-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">
                {index + 1}
              </div>
              <span className="text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-8 mb-12 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-warning text-warning" />
            ))}
          </div>
          <span>4.9/5 Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">10,000+</span>
          <span>Happy Families</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold">98%</span>
          <span>Parent Satisfaction</span>
        </div>
      </div>

      {/* CTA Button */}
      <Button 
        variant="hero" 
        size="xl" 
        onClick={onNext}
        className="group animate-bounce-in"
        style={{ animationDelay: "0.5s" }}
      >
        Let's Begin!
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
      </Button>

      {/* Encouraging Text */}
      <p className="text-sm text-muted-foreground mt-6 animate-fade-in" style={{ animationDelay: "0.7s" }}>
        Takes less than 3 minutes • No credit card required for trial
      </p>
    </div>
  );
};

export default WelcomeStep;