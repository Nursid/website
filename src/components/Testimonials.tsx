import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Parent of 2",
    avatar: "👩‍💼",
    rating: 5,
    text: "SkillSphere has transformed how my kids learn! The AI personalization keeps them engaged, and I love the parent-child activities. Math went from being a struggle to their favorite subject!",
    highlight: "Math went from struggle to favorite subject"
  },
  {
    id: 2,
    name: "Dr. Michael Chen", 
    role: "Elementary Teacher",
    avatar: "👨‍🏫",
    rating: 5,
    text: "As an educator, I'm impressed by the pedagogical approach. The gamification doesn't compromise learning quality - it enhances it. My students show remarkable improvement in engagement and retention.",
    highlight: "Remarkable improvement in engagement"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Homeschool Mom",
    avatar: "👩‍🎓",
    rating: 5,
    text: "The flexible modules fit perfectly into our homeschool routine. Each child can learn at their own pace, and the progress tracking helps me stay on top of their development. Absolutely worth it!",
    highlight: "Fits perfectly into homeschool routine"
  },
  {
    id: 4,
    name: "James Mitchell",
    role: "Working Dad",
    avatar: "👨‍💻",
    rating: 5,
    text: "Finally, quality time with my kids that's both fun and educational! The modules are well-designed and don't require constant supervision. My 7-year-old asks to do 'SkillSphere time' every day.",
    highlight: "Kids ask for SkillSphere time daily"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Special Ed Teacher",
    avatar: "👩‍🏫",
    rating: 5,
    text: "The AI adaptation is incredible for children with different learning needs. It adjusts automatically and provides the right level of challenge. I recommend it to all parents in my classes.",
    highlight: "Perfect for different learning needs"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-secondary/10 to-primary/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What <span className="text-gradient">Families Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of satisfied parents and educators who've seen remarkable 
            improvements in their children's learning journey.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden animate-fade-in">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
            
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-primary/20 mb-6" />
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-warning text-warning" />
              ))}
            </div>
            
            {/* Testimonial Text */}
            <blockquote className="text-xl lg:text-2xl font-medium text-card-foreground leading-relaxed mb-8">
              "{testimonials[currentIndex].text}"
            </blockquote>
            
            {/* Highlight */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 mb-8">
              <p className="text-primary font-semibold text-center">
                💡 "{testimonials[currentIndex].highlight}"
              </p>
            </div>
            
            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center text-2xl">
                {testimonials[currentIndex].avatar}
              </div>
              <div>
                <h4 className="text-lg font-bold text-card-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary w-8' 
                  : 'bg-muted hover:bg-primary/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center animate-slide-up">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Happy Families</div>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-muted-foreground">Parent Satisfaction</div>
          </div>
          <div className="text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl lg:text-4xl font-bold text-warning mb-2">4.9★</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;