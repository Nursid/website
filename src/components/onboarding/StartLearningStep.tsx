import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowRight, Play } from "lucide-react";
import { OnboardingData } from "@/pages/OnboardingPage";

interface StartLearningStepProps {
  data: OnboardingData;
}

const StartLearningStep = ({ data }: StartLearningStepProps) => {
  const avatars = [
    { id: "robot", emoji: "🤖", name: "Robo Buddy" },
    { id: "cat", emoji: "🐱", name: "Curious Cat" },
    { id: "rocket", emoji: "🚀", name: "Space Explorer" },
    { id: "wizard", emoji: "🧙‍♂️", name: "Learning Wizard" },
    { id: "unicorn", emoji: "🦄", name: "Magic Unicorn" },
    { id: "dragon", emoji: "🐉", name: "Friendly Dragon" }
  ];

  const selectedAvatar = avatars.find(a => a.id === data.avatar);

  const completedTasks = [
    "Profile setup completed",
    "Learning module selected", 
    "Experience customized",
    "Payment processed",
    "Account activated"
  ];

  return (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      {/* Success Animation */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-accent to-accent-glow rounded-full flex items-center justify-center shadow-2xl animate-bounce-in">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        
        <div className="flex items-center justify-center gap-2 text-4xl mb-4">
          <span>🎉</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
            Welcome to SkillSphere!
          </h1>
          <span>🎉</span>
        </div>
        
        <p className="text-xl text-muted-foreground">
          Congratulations! {data.childName}'s personalized learning journey is ready to begin!
        </p>
      </div>

      {/* Setup Summary */}
      <div className="bg-card rounded-3xl p-8 shadow-lg mb-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          Your Learning Setup
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Child Info */}
          <div className="text-left">
            <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">{selectedAvatar?.emoji}</span>
              {data.childName}'s Profile
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Age: {data.childAge} years old</div>
              <div>Learning Buddy: {selectedAvatar?.name}</div>
              <div>Goals: {data.learningGoals.slice(0, 2).join(", ")}</div>
              {data.learningGoals.length > 2 && (
                <div className="text-primary">+{data.learningGoals.length - 2} more goals</div>
              )}
            </div>
          </div>
          
          {/* Module Info */}
          <div className="text-left">
            <h3 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Selected Module
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="font-medium text-card-foreground">
                {data.selectedModule === "math-adventures" && "Math Adventures"}
                {data.selectedModule === "science-explorers" && "Science Explorers"}
                {data.selectedModule === "reading-champions" && "Reading Champions"}
              </div>
              <div>Personalized for {data.childName}</div>
              <div>AI-powered learning path ready</div>
            </div>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl p-4">
          <h4 className="font-semibold text-card-foreground mb-3">Setup Complete ✅</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {completedTasks.map((task, index) => (
              <div 
                key={task}
                className="flex items-center gap-2 text-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-xl font-bold text-card-foreground mb-4">
          What Happens Next?
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl mx-auto mb-2">
              1
            </div>
            <div className="font-medium text-card-foreground">Quick Tour</div>
            <div className="text-muted-foreground">Learn the basics</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xl mx-auto mb-2">
              2
            </div>
            <div className="font-medium text-card-foreground">First Lesson</div>
            <div className="text-muted-foreground">Start learning immediately</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-warning text-white rounded-full flex items-center justify-center text-xl mx-auto mb-2">
              3
            </div>
            <div className="font-medium text-card-foreground">Track Progress</div>
            <div className="text-muted-foreground">See real-time results</div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-4 animate-bounce-in" style={{ animationDelay: "0.4s" }}>
        <Button variant="hero" size="xl" className="group">
          <Play className="w-5 h-5 mr-2" />
          Start {data.childName}'s First Lesson
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" size="lg">
            Take Dashboard Tour
          </Button>
          <Button variant="ghost" size="lg">
            View Parent Guide
          </Button>
        </div>
      </div>

      {/* Success Message */}
      <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <p className="text-muted-foreground">
          🌟 You're all set! {data.childName} is about to embark on an amazing learning adventure. 
          Get ready to see their confidence and skills grow every day!
        </p>
      </div>

      {/* Support */}
      <div className="mt-8 bg-card/50 rounded-2xl p-4 text-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <p className="text-sm text-muted-foreground">
          Need help getting started? Our support team is here 24/7 at{" "}
          <a href="mailto:support@skillsphere.com" className="text-primary hover:underline">
            support@skillsphere.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default StartLearningStep;