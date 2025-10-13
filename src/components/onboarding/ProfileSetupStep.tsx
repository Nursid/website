import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Brain, Baby, Target, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { OnboardingData } from "@/pages/OnboardingPage";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProfileSetupStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevModule: () => void;
  onProgress?: (current: number, total: number) => void;
  registerPrev?: (fn: () => void) => void;
}

const learningGoalOptions = [
  "🧘 Calm but Curious",
  "💪 Seeking Better Habits",
  "🌀 Overwhelmed but Hopeful",
  "🎯 Focused & Ready",
];

const childDescriptionOptions = [
  "🎨 Creative explorer",
  "💬 Sensitive thinker",
  "🔍 Curious & questioning",
  "🏃‍♂️ High energy, low patience",
];

const avatars = [
  { id: "robot", emoji: "🤖", name: "Robo Buddy" },
  { id: "cat", emoji: "🐱", name: "Curious Cat" },
  { id: "rocket", emoji: "🚀", name: "Space Explorer" },
  { id: "wizard", emoji: "🧙‍♂️", name: "Learning Wizard" },
  { id: "unicorn", emoji: "🦄", name: "Magic Unicorn" },
  { id: "dragon", emoji: "🐉", name: "Friendly Dragon" }
];

const learningStyles = [
  { id: "visual", title: "Visual Learner", description: "Learns best with pictures, diagrams, and colorful graphics", icon: "👁️" },
  { id: "auditory", title: "Auditory Learner", description: "Learns best through listening and verbal instructions", icon: "🎧" },
  { id: "kinesthetic", title: "Hands-On Learner", description: "Learns best through movement and physical activities", icon: "✋" },
  { id: "mixed", title: "Mixed Style", description: "Let our AI determine the best combination of learning styles", icon: "🧠" }
];

const ProfileSetupStep = ({ data, updateData, onNext, onPrevModule, onProgress }: ProfileSetupStepProps) => {
  const [subStep, setSubStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSubSteps = 5;

  useEffect(() => {
    onProgress?.(subStep, totalSubSteps);
  }, [subStep, totalSubSteps, onProgress]);

  const validateSubStep = () => {
    const newErrors: Record<string, string> = {};

    if (subStep === 0) {
      if (!data.childName.trim()) newErrors.childName = "Child's name is required";
      if (!data.childAge) newErrors.childAge = "Please select child's age";
    }
    if (subStep === 1 && !data.avatar) newErrors.avatar = "Please choose an avatar";
    if (subStep === 2 && !data.learningStyle) newErrors.learningStyle = "Please choose a learning style";
    if (subStep === 3 && data.learningGoals.length === 0) newErrors.learningGoals = "Select at least one goal";
    if (subStep === 4 && !data.childDescription) newErrors.childDescription = "Please select a description";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSubStep()) {
      if (subStep < totalSubSteps - 1) {
        setSubStep((prev) => prev + 1);
      } else {
        onNext();
      }
    }
  };

  const handleBack = () => {
    if (subStep > 0) {
      setSubStep((prev) => prev - 1);
    } else {
      onPrevModule();
    }
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      
      {/* Step Screens */}
      <div className="flex flex-col min-h-[66vh]">
        {/* Step 1: Child Info */}
        {subStep === 0 && (
          <>
            <h3 className="text-2xl font-bold text-center justify-center items-center flex gap-2 mb-2">
              <Baby className="w-8 h-8 text-pink-500" /> Meet Your Little Explorer
            </h3>
            <p className="text-center text-base sm:text-lg mb-4 leading-relaxed">
              🌟 Every adventure begins with a hero’s name and age! Let’s unlock the magical world where{" "}
              <span className="text-accent font-semibold">your child</span> becomes the star of the journey.  
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto bg-card rounded-xl p-4 shadow-md">
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-sm">Child's Name *</Label>
                <Input
                  id="childName"
                  value={data.childName}
                  placeholder="Enter child's name"
                  onChange={(e) => updateData({ childName: e.target.value })}
                  className={errors.childName ? "border-destructive text-base" : "text-base"}
                />
                {errors.childName && <p className="text-xs text-destructive">{errors.childName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="childAge" className="text-sm">How old is your child? *</Label>
                <Select value={data.childAge} onValueChange={(value) => updateData({ childAge: value })}>
                  <SelectTrigger className={errors.childAge ? "border-destructive text-sm" : "text-sm"}>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-8" className="text-sm">5-8 years</SelectItem>
                    <SelectItem value="9-12" className="text-sm">9-12 years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.childAge && <p className="text-xs text-destructive">{errors.childAge}</p>}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Avatar */}
        {subStep === 1 && (
          <>
            <h3 className="text-2xl font-bold text-center justify-center flex items-center gap-2 mb-2">
              <User className="w-8 h-8 text-primary" /> Choose Your Magical Buddy
            </h3>
            <p className="text-center text-base sm:text-lg mb-4 leading-relaxed">
              🧸 Every great hero travels with a sidekick! Pick an avatar friend who will cheer, guide,  
              and sparkle on this learning quest.  
            </p>
            <div className="grid grid-cols-2 gap-2 mt-auto bg-card rounded-xl p-4 shadow-md">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => updateData({ avatar: avatar.id })}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105
                    ${data.avatar === avatar.id ? "border-primary bg-primary/10 shadow-md" : "border-border hover:border-primary/50"}
                  `}
                >
                  <div className="text-2xl mb-1">{avatar.emoji}</div>
                  <div className="text-xs font-medium">{avatar.name}</div>
                </button>
              ))}
              {errors.avatar && <p className="text-xs text-destructive col-span-2 mt-2">{errors.avatar}</p>}
            </div>
          </>
        )}

        {/* Step 3: Learning Style */}
        {subStep === 2 && (
          <>
            <h3 className="text-2xl font-bold text-center justify-center flex items-center gap-2 mb-2">
              <Brain className="w-8 h-8 text-yellow-500" /> Discover Learning Superpowers
            </h3>
            <p className="text-center text-base sm:text-lg mb-4 leading-relaxed">
              🎯 Every child has a unique way to shine—whether through colors, sounds, or hands-on play.  
              Let’s find how your child learns best and unlock their superpower!  
            </p>
            <RadioGroup 
              value={data.learningStyle} 
              onValueChange={(v) => updateData({ learningStyle: v })} 
              className="grid grid-cols-1 gap-3 mt-auto bg-card rounded-xl p-4 shadow-md"
            >
              {learningStyles.map((style) => (
                <div key={style.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                  <Label htmlFor={style.id} className="flex-1 cursor-pointer">
                    <div className="flex items-start gap-2 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                      <div className="text-xl">{style.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{style.title}</div>
                        <div className="text-xs text-muted-foreground">{style.description}</div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
              {errors.learningStyle && <p className="text-xs text-destructive">{errors.learningStyle}</p>}
            </RadioGroup>
          </>
        )}

        {/* Step 4: Parenting Vibe */}
        {subStep === 3 && (
          <>
            <h3 className="text-2xl font-bold text-center justify-center flex items-center gap-2 mb-2">
              <Target className="w-8 h-8 text-green-600" /> What’s Your Parenting Vibe?
            </h3>
            <p className="text-center text-base sm:text-lg mb-4 leading-relaxed">
              💖 Every parent is a guide on this adventure. Choose the vibe that matches your hopes,  
              dreams, and wishes for your child’s journey.  
            </p>
            <div className="grid grid-cols-1 gap-2 mt-auto bg-card rounded-xl p-4 shadow-md">
              {learningGoalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={data.learningGoals.includes(goal)}
                    onCheckedChange={() =>
                      updateData({ learningGoals: data.learningGoals.includes(goal) ? [] : [goal] })
                    }
                  />
                  <Label htmlFor={goal} className="cursor-pointer text-sm">{goal}</Label>
                </div>
              ))}
              {errors.learningGoals && <p className="text-xs text-destructive">{errors.learningGoals}</p>}
            </div>
          </>
        )}

        {/* Step 5: Child Description */}
        {subStep === 4 && (
          <>
            <h3 className="text-2xl font-bold text-center justify-center flex items-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 text-purple-500" /> Describe Your Little Star
            </h3>
            <p className="text-center text-base sm:text-lg mb-4 leading-relaxed">
              🌈 Is your child a curious thinker, a playful dreamer, or a whirlwind of energy?  
              Pick the description that paints their magical personality best.  
            </p>
            <div className="grid grid-cols-1 gap-2 mt-auto bg-card rounded-xl p-4 shadow-md">
              {childDescriptionOptions.map((desc) => (
                <div key={desc} className="flex items-center space-x-2">
                  <Checkbox
                    id={desc}
                    checked={data.childDescription === desc}
                    onCheckedChange={() => updateData({ childDescription: data.childDescription === desc ? "" : desc })}
                  />
                  <Label htmlFor={desc} className="cursor-pointer text-sm">{desc}</Label>
                </div>
              ))}
              {errors.childDescription && <p className="text-xs text-destructive">{errors.childDescription}</p>}
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="flex items-center text-sm text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <button
          onClick={handleNext}
          className="flex items-center text-sm text-gray-700 hover:text-black transition-colors"
        >
          {subStep === totalSubSteps - 1 ? "Next" : "Next"}
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

    </div>
  );
};

export default ProfileSetupStep;