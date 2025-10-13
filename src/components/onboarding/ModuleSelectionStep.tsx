import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/pages/OnboardingPage";
import { ArrowRight, Users, Clock, Check, ArrowLeft, Star } from "lucide-react";
import mathImage from "@/assets/math-module.jpg";
import scienceImage from "@/assets/science-module.jpg";
import readingImage from "@/assets/reading-module.jpg";

interface ModuleSelectionStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevModule?: () => void;
  onProgress?: (current: number, total: number) => void;
  registerPrev?: (fn: () => void) => void;
}

const modules = [
  {
    id: "emotional",
    title: "Emotional Superpowers",
    subtitle: "Emotional Regulation",
    icon: <span className="text-4xl">❤️</span>,
    image: mathImage,
    description:
      "Help your child recognize emotions, manage stress, and build resilience through playful activities.",
    goals: ["Build Resilience", "Handle Emotions", "Boost Confidence"],
    topics: [
      { label: "Emotional Awareness", value: "Feelings 101" },
      { label: "Mindful Practices", value: "Breathing, Relaxation" },
      { label: "Social Skills", value: "Friendship & Empathy" },
      { label: "Self-Regulation", value: "Anger Management" },
    ],
    duration: "6-8 weeks",
    students: "2.1k",
    pricing: "Free + Premium",
    courses: [
      { id: 1, title: "Feelings 101", free: true, desc: "Recognize and name emotions easily." },
      { id: 2, title: "Mindful Breathing", free: true, desc: "Learn calming breathing techniques." },
      { id: 3, title: "Handling Anger", free: true, desc: "Turn anger into positive energy." },
      { id: 4, title: "Friendship Challenges", free: false, desc: "Build empathy & solve conflicts." },
      { id: 5, title: "Resilience Mastery", free: false, desc: "Bounce back stronger from setbacks." },
    ],
  },
  {
    id: "money",
    title: "Money Magic",
    subtitle: "Financial Literacy",
    icon: <span className="text-4xl">💰</span>,
    image: scienceImage,
    description:
      "Teach your child to save, spend, and share wisely with interactive money games.",
    goals: ["Financial Awareness", "Saving Habits", "Smart Spending"],
    topics: [
      { label: "What is Money?", value: "Coins & Digital Money" },
      { label: "Budgeting", value: "Plan Expenses" },
      { label: "Saving Habits", value: "Piggy Bank Challenge" },
      { label: "Investing Basics", value: "Grow Your Money" },
    ],
    duration: "8-10 weeks",
    students: "1.8k",
    pricing: "Free + Premium",
    courses: [
      { id: 1, title: "What is Money?", free: true, desc: "Coins, notes, and digital money basics." },
      { id: 2, title: "Saving Game", free: true, desc: "A fun game about saving pocket money." },
      { id: 3, title: "Smart Spending", free: true, desc: "Learn the difference between wants & needs." },
      { id: 4, title: "Budget Challenge", free: false, desc: "Plan a budget for daily expenses." },
      { id: 5, title: "Investing Basics", free: false, desc: "Intro to growing money smartly." },
    ],
  },
  {
    id: "thinking",
    title: "Thinking Smarts",
    subtitle: "Critical Thinking",
    icon: <span className="text-4xl">🧠</span>,
    image: readingImage,
    description:
      "Sharpen reasoning skills, attention, and creativity with problem-solving games.",
    goals: ["Critical Thinking", "Problem Solving", "Logical Reasoning"],
    topics: [
      { label: "Puzzle Play", value: "Logic Games" },
      { label: "Creative Tasks", value: "Imagination Challenges" },
      { label: "Reasoning", value: "Step-by-step Thinking" },
      { label: "Decision Making", value: "Smart Choices" },
    ],
    duration: "4-6 weeks",
    students: "3.2k",
    pricing: "Free + Premium",
    courses: [
      { id: 1, title: "Puzzle Play", free: true, desc: "Solve puzzles to boost problem-solving." },
      { id: 2, title: "Logic Games", free: true, desc: "Practice reasoning with fun challenges." },
      { id: 3, title: "Creative Problems", free: true, desc: "Think outside the box with tasks." },
      { id: 4, title: "Reasoning Challenge", free: false, desc: "Advanced logic training activities." },
      { id: 5, title: "Critical Thinking Lab", free: false, desc: "Structured reasoning workshops." },
    ],
  },
  {
    id: "creativity",
    title: "Creativity & Confidence",
    subtitle: "Creativity",
    icon: <span className="text-4xl">🎨</span>,
    image: readingImage,
    description:
      "Boost your child's imagination, expression, and confidence through creative play.",
    goals: ["Boost Creativity", "Express Ideas", "Build Confidence"],
    topics: [
      { label: "Drawing", value: "Basics & Practice" },
      { label: "Storytelling", value: "Creative Writing" },
      { label: "Improv Play", value: "Confidence Games" },
      { label: "Projects", value: "Hands-on Activities" },
    ],
    duration: "4-6 weeks",
    students: "2.9k",
    pricing: "Free + Premium",
    courses: [
      { id: 1, title: "Drawing Basics", free: true, desc: "Learn to sketch simple ideas." },
      { id: 2, title: "Storytelling Fun", free: true, desc: "Create and share imaginative stories." },
      { id: 3, title: "Improv Play", free: true, desc: "Boost confidence with improv games." },
      { id: 4, title: "Creative Projects", free: false, desc: "Hands-on projects for self-expression." },
      { id: 5, title: "Confidence Mastery", free: false, desc: "Build stage presence and communication." },
    ],
  },
];

const ModuleSelectionStep: React.FC<ModuleSelectionStepProps> = ({
  data,
  updateData,
  onNext,
  onPrevModule,
  registerPrev,
  onProgress,
}) => {
  const [subStep, setSubStep] = useState<number>(0);
  const totalSubSteps = 2;
  const [selected, setSelected] = useState<string | null>(data.selectedModule || null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    onProgress?.(subStep, totalSubSteps);
  }, [subStep, totalSubSteps, onProgress]);

  useEffect(() => {
    setSelected(data.selectedModule || null);
  }, [data.selectedModule]);

  const handleSelect = (id: string) => {
    setSelected(id);
    updateData({ selectedModule: id });
    setError("");
  };

  const handleNext = () => {
    if (subStep === 0) {
      if (!selected) {
        setError("Please select a module to continue.");
        return;
      }
      setSubStep(1);
      return;
    }

    if (selected) {
      updateData({ selectedModule: selected });
      onNext();
    } else {
      setError("No module selected.");
    }
  };

  const handleBack = () => {
    if (subStep > 0) {
      setSubStep((s) => s - 1);
      setError("");
    } else {
      if (onPrevModule) onPrevModule();
    }
  };

  useEffect(() => {
    registerPrev?.(handleBack);
  }, [registerPrev, handleBack]);

  const currentModule = modules.find((m) => m.id === selected) ?? null;

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-4 ">
        <h2 className="text-base font-medium  mb-1">
          {subStep === 0 ? (
            <>
              <div className="text-center mb-4 min-h-[20vh]">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
                  🌟 Pick Your First Adventure
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Every hero’s journey begins with a choice! Select the super skill your child wants to unlock first—  
                  don’t worry, the other magical worlds will be waiting later.  
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </h2>
      </div>

      <div className="flex flex-col min-h-[45vh]">

        <div className="mt-auto">
          {/* Step 0: selection grid */}
          {subStep === 0 && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {modules.map((module) => {
                  const isSelected = selected === module.id;
                  return (
                    <button
                      key={module.id}
                      onClick={() => handleSelect(module.id)}
                      className={`bg-card rounded-xl p-3 shadow-md text-left flex flex-col gap-2 transition-all duration-200 h-full
                        ${isSelected ? "border-primary ring-2 ring-primary bg-primary/5" : "border-border hover:ring-1 hover:ring-primary/10"}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 flex items-center justify-center rounded-lg bg-primary/5 text-xl flex-shrink-0">
                            {module.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                          {/* Title */}
                          <div className="text-xs sm:text-sm font-semibold leading-tight  text-card-foreground 
                                          max-w-[6rem] sm:max-w-[8rem] md:max-w-[12rem]">
                            {module.title}
                          </div>

                          {/* Subtitle */}
                          <div className="text-[9px] sm:text-[10px] md:text-[11px] text-muted-foreground  mt-0.5 
                                          max-w-[6rem] sm:max-w-[8rem] md:max-w-[12rem]">
                            {module.subtitle}
                          </div>
                        </div>

                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                          <Star className="w-3 h-3" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground  leading-snug">
                        {module.description}
                      </p>


                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <div className="text-[9px] sm:text-[10px] md:text-[11px]">
                        {module.duration}
                      </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {error && <p className="text-xs text-destructive mb-3">{error}</p>}
            </>
          )}

          {/* Step 1: details and confirm */}
          {subStep === 1 && currentModule && (
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center mb-4 min-h-[12vh]">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
                🎉 Great Choice!
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                You’ve unlocked the <span className="text-primary font-semibold">{currentModule.title}</span> world!   
              </p>
            </div>
            <div
              key={currentModule.id}
              className={`
                group  overflow-hidden transition-all duration-300 cursor-pointer
              `}
            >
  <div className="h-[55vh] overflow-y-auto p-4">
    <div
      key={currentModule.id}
      className={`
        relative bg-card rounded-3xl p-8 shadow-lg transition-all duration-500 
         hover:-translate-y-2 animate-slide-up
      `}
    >
      {/* Students Badge */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-[10px] sm:text-xs font-semibold">
            {currentModule.students}
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 mt-6">
        <h3 className="text-2xl font-bold text-card-foreground mb-2">
          {currentModule.title}
        </h3>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {currentModule.description}
        </p>

        {/* Goals (moved here, new design) */}
        {currentModule.goals && currentModule.goals.length > 0 && (
          <div className="mb-8">
            <p className="text-sm font-semibold text-card-foreground mb-3">
              🎯 Matches your goals
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {currentModule.goals.map((goal) => (
                <div
                  key={goal}
                  className="px-3 py-1 rounded-full bg-accent/20 text-primary text-xs font-medium"
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Courses in this module */}
      {currentModule.courses?.some((c) => c.free) && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">Courses in this module:</h4>
          <div className="grid gap-3">
            {currentModule.courses
              .filter((course) => course.free)
              .map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between border rounded-lg p-3 bg-card/40 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Left: Icon + Title */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-card-foreground font-medium">
                      {course.title}
                    </span>
                  </div>

                  {/* Right: Free Badge */}
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 text-[11px] rounded-md px-2 py-0.5"
                  >
                    Free
                  </Badge>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CTA Button */}
     <Button 
        size="lg" 
        variant="outline"
        className="w-full mb-6"
        onClick={() => onNext()}
      >
        Start With Free
      </Button>

      {currentModule.courses?.some((c) => !c.free) && (
        <div className="mb-6">
          <div className="grid gap-3">
            {currentModule.courses
              .filter((course) => !course.free)
              .map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between border rounded-lg p-3 bg-card/40 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Left: Icon + Title */}
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-card-foreground font-medium">
                      {course.title}
                    </span>
                  </div>
                  {/* No Badge for Enroll */}
                </div>
              ))}
          </div>
        </div>
      )}

      <Button 
        size="lg" 
        className="w-full mb-6"
        onClick={() => onNext()}
      >
        Enroll
      </Button>


      {/* Bottom Accent */}
      {/* <div className="mt-8 h-1 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div> */}
    </div>
  </div>
              
            </div>
          </div>

          )}
        </div>


      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleBack}
          className="flex items-center text-sm text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back
        </button>

        <div className="flex items-center gap-2">
          {subStep === 0 ? (
            <button
              onClick={handleNext}
              disabled={!selected}
              className={`flex items-center text-sm transition-colors ${
                selected ? "text-gray-700 hover:text-black" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center text-sm text-gray-700 hover:text-black transition-colors"
            >
              Next
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ModuleSelectionStep;