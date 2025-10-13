import { Brain, GamepadIcon, Heart, Zap } from "lucide-react";

const features = [
  {
    icon: GamepadIcon,
    title: "Gamified Learning",
    description: "Turn education into an exciting adventure with points, badges, and interactive challenges that keep kids engaged.",
    gradient: "from-primary to-primary-glow"
  },
  {
    icon: Brain,
    title: "AI Personalization", 
    description: "Smart algorithms adapt to each child's learning pace and style, ensuring optimal progress and engagement.",
    gradient: "from-accent to-accent-glow"
  },
  {
    icon: Heart,
    title: "Parent-Kid Engagement",
    description: "Strengthen family bonds through collaborative learning experiences designed for both children and parents.",
    gradient: "from-warning to-orange-500"
  },
  {
    icon: Zap,
    title: "Flexible Modules",
    description: "Choose from 50+ self-contained courses covering different skills, subjects, and age groups with lifetime access.",
    gradient: "from-pink-500 to-rose-500"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="text-gradient">SkillSphere</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing education with cutting-edge technology and proven learning methodologies 
            that make skill development enjoyable for the whole family.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group bg-card rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;