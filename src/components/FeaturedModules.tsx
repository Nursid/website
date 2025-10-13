import { Button } from "@/components/ui/button";
import { Clock, Star, Users, ArrowRight } from "lucide-react";
import mathImage from "@/assets/math-module.jpg";
import scienceImage from "@/assets/science-module.jpg";
import readingImage from "@/assets/reading-module.jpg";

const modules = [
  {
    id: 1,
    title: "Math Adventures",
    description: "Interactive mathematics learning with fun puzzles, visual problem-solving, and real-world applications.",
    image: mathImage,
    level: "Beginner to Advanced",
    duration: "6-8 weeks",
    rating: 4.9,
    students: "2.1k",
    skills: ["Number Recognition", "Basic Operations", "Problem Solving", "Geometry"],
    gradient: "from-primary to-primary-glow"
  },
  {
    id: 2,
    title: "Science Explorers",
    description: "Discover the wonders of science through hands-on experiments, virtual labs, and interactive simulations.",
    image: scienceImage,
    level: "Elementary to Middle",
    duration: "8-10 weeks", 
    rating: 4.8,
    students: "1.8k",
    skills: ["Scientific Method", "Experiments", "Physics", "Chemistry"],
    gradient: "from-accent to-accent-glow"
  },
  {
    id: 3,
    title: "Reading Champions",
    description: "Build strong reading foundations with phonics, comprehension, vocabulary, and storytelling adventures.",
    image: readingImage,
    level: "Pre-K to Grade 5",
    duration: "4-6 weeks",
    rating: 4.9,
    students: "3.2k",
    skills: ["Phonics", "Reading Fluency", "Comprehension", "Creative Writing"],
    gradient: "from-warning to-orange-500"
  }
];

const FeaturedModules = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Learning Modules</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore our most popular skill development modules designed to engage young minds 
            and foster a lifelong love of learning.
          </p>
          <Button variant="outline" size="lg" className="group">
            View All 50+ Modules
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <div 
              key={module.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Module Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={module.image}
                  alt={module.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`}></div>
                
                {/* Level Badge */}
                <div className="absolute top-4 left-4 bg-white/90 text-card-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {module.level}
                </div>
                
                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-semibold text-card-foreground">{module.rating}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                  {module.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {module.description}
                </p>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {module.skills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {module.skills.length > 3 && (
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      +{module.skills.length - 3} more
                    </span>
                  )}
                </div>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{module.students} students</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <Button className="w-full group" variant="default">
                  Start Learning
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModules;