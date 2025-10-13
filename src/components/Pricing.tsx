import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "29",
    period: "month",
    description: "Perfect for families just getting started with SkillSphere",
    features: [
      "Access to 10 learning modules",
      "Basic AI personalization", 
      "Progress tracking for 2 children",
      "Email support",
      "Parent dashboard",
      "Mobile app access"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Family",
    price: "49",
    period: "month", 
    description: "Most popular choice for growing families",
    features: [
      "Access to ALL 50+ modules",
      "Advanced AI personalization",
      "Progress tracking for 5 children", 
      "Priority support + live chat",
      "Parent-child collaborative activities",
      "Detailed analytics & reports",
      "Offline mode",
      "Achievement certificates"
    ],
    buttonText: "Start Learning Now",
    buttonVariant: "hero" as const,
    popular: true
  },
  {
    name: "Premium",
    price: "79",
    period: "month",
    description: "For educators and large families who want it all",
    features: [
      "Everything in Family plan",
      "Unlimited children profiles",
      "1-on-1 learning consultant",
      "Custom learning paths",
      "Advanced reporting & insights",
      "Early access to new modules",
      "Educator tools & resources",
      "White-label options"
    ],
    buttonText: "Go Premium",
    buttonVariant: "accent" as const,
    popular: false
  }
];

const Pricing = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Simple, <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your family's learning journey. All plans include 
            our 30-day money-back guarantee.
          </p>
          
          {/* Guarantee Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full font-semibold">
            <Star className="w-5 h-5" />
            30-Day Money-Back Guarantee
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`
                relative bg-card rounded-3xl p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slide-up
                ${plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>
                
                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-primary">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <Button 
                  variant={plan.buttonVariant}
                  size="lg" 
                  className="w-full mb-6"
                  asChild
                >
                  <a href="/onboarding">
                    {plan.buttonText}
                  </a>
                </Button>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-accent rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-card-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Accent */}
              <div className={`
                mt-8 h-1 rounded-full
                ${plan.popular ? 'bg-gradient-to-r from-primary to-primary-glow' : 'bg-muted'}
              `}></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16 animate-fade-in">
          <p className="text-muted-foreground mb-6">
            Trusted by educators and parents worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;