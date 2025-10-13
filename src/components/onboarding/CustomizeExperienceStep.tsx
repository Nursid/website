import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingData } from "@/pages/OnboardingPage";

interface CustomizeExperienceStepProps {
  data: OnboardingData;
  updateData: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevModule: () => void;
  onProgress?: (current: number, total: number) => void;
  registerPrev?: (fn: () => void) => void;
}

const modulesQuestions = [
  {
    id: "emotional",
    title: "Learning Preferences",
    questions: [
      {
        id: "q1",
        text: "What usually comforts them the most?",
        layoutType: "withdescription",
        options: [
          {
            id: "quiet",
            title: "Quiet time",
            description: "They feel better when they can sit quietly, relax, or have some alone time.",
            icon: "🟨"
          },
          {
            id: "love",
            title: "Hugs & love",
            description: "They are comforted most by affection, hugs, and emotional warmth.",
            icon: "💖"
          },
          {
            id: "talking",
            title: "Talking it out",
            description: "They feel better when they can talk and express their feelings openly.",
            icon: "💬"
          },
          {
            id: "nothing",
            title: "Nothing seems to work",
            description: "No single comfort works well, so a balanced approach might be needed.",
            icon: "❌"
          }
        ]
      },
      {
        id: "q2",
        text: "Do they find it hard to name what they feel?",
        layoutType: "withoutdescription",
        options: [
          { id: "yes2", title: "Yes", icon: "✅" },
          { id: "no2", title: "No", icon: "❌" },
          { id: "sometimes", title: "Sometimes", icon: "🤷" }
        ]
      },
      {
        id: "q3",
        text: "When your child is upset, what helps them the most?",
        layoutType: "withdescription",
        options: [
          {
            id: "anger",
            title: "Anger",
            description: "They release their emotions through anger and strong reactions.",
            icon: "😡"
          },
          {
            id: "sadness",
            title: "Sadness",
            description: "They show their emotions by crying or becoming tearful.",
            icon: "😭"
          },
          {
            id: "anxiety",
            title: "Anxiety",
            description: "They become restless, worried, or nervous when upset.",
            icon: "😨"
          },
          {
            id: "withdrawal",
            title: "Withdrawal",
            description: "They prefer to stay quiet, isolate themselves, or shut down.",
            icon: "😑"
          },
          {
            id: "hyper",
            title: "Hyper energy",
            description: "They react with excessive energy, restlessness, or over-activity.",
            icon: "🙃"
          }
        ]
      },
      {
        id: "q4",
        text: "Have you tried anything for this before?",
        layoutType: "withoutdescription",
        options: [
          { id: "yes1", title: "Yes", icon: "✅" },
          { id: "no1", title: "No", icon: "❌" },
          { id: "unsure", title: "Not sure what to try", icon: "🙃" }
        ]
      }
    ]
  },
  {
    id: "money",
    title: "Learning Preferences",
    questions: [
      {
        id: "q1",
        text: "Does your child ask questions about money?",
        layoutType: "withdescription",
        options: [
          {
            id: "all_time",
            title: "All the time!",
            description: "They feel better when they can sit quietly, relax, or have some alone time.",
            icon: "🟨"
          },
          {
            id: "really",
            title: "Not really",
            description: "They are comforted most by affection, hugs, and emotional warmth.",
            icon: "💖"
          },
          {
            id: "confusing",
            title: "Sometimes, but it's confusing",
            description: "They feel better when they can talk and express their feelings openly.",
            icon: "💬"
          }
        ]
      },
      {
        id: "q2",
        text: "Have they ever earned or saved money on their own?",
        layoutType: "withoutdescription",
        options: [
          { id: "yes", title: "Yes", icon: "✅" },
          { id: "no", title: "No, but I want them to", icon: "😅" },
          { id: "young", title: "Too young", icon: "👶" }
        ]
      },
      {
        id: "q3",
        text: "When your child is upset, what helps them the most?",
        layoutType: "withdescription",
        options: [
          {
            id: "saving",
            title: "Saving",
            description: "They release their emotions through anger and strong reactions.",
            icon: "💵"
          },
          {
            id: "sharing",
            title: "Sharing",
            description: "They show their emotions by crying or becoming tearful.",
            icon: "🎁"
          },
          {
            id: "wisely",
            title: "Spending wisely",
            description: "They become restless, worried, or nervous when upset.",
            icon: "🛒"
          },
          {
            id: "talking",
            title: "Talking openly about it",
            description: "They prefer to stay quiet, isolate themselves, or shut down.",
            icon: "💬"
          }
        ]
      }
    ]
  },
  {
    id: "thinking",
    title: "Learning Preferences",
    questions: [
      {
        id: "q1",
        text: "How often does your child ask why?",
        layoutType: "withdescription",
        options: [
          {
            id: "constantly!",
            title: "Constantly!",
            description: "They feel better when they can sit quietly, relax, or have some alone time.",
            icon: "❓"
          },
          {
            id: "occasionally",
            title: "Occasionally",
            description: "They are comforted most by affection, hugs, and emotional warmth.",
            icon: "❓"
          },
          {
            id: "prefers",
            title: "Not much — prefers answers",
            description: "They feel better when they can talk and express their feelings openly.",
            icon: "❓"
          },
          {
            id: "avoids",
            title: "Rarely — avoids new questions",
            description: "No single comfort works well, so a balanced approach might be needed.",
            icon: "❓"
          }
        ]
      },
      {
        id: "q2",
        text: "Which best describes your child's decision-making?",
        layoutType: "withoutdescription",
        options: [
          { id: "quickly", title: "Impulsive — acts quickly", icon: "⚡" },
          { id: "reflects", title: "Thoughtful — pauses and reflects", icon: "🤔" },
          { id: "depends", title: "Depends on the situation", icon: "🔀" },
          { id: "dicisions", title: "Struggles with decisions", icon: "❌" }
        ]
      },
      {
        id: "q3",
        text: "What kind of problems does your child enjoy solving?",
        layoutType: "withdescription",
        options: [
          {
            id: "Riddles",
            title: "Puzzles / Riddles",
            description: "They release their emotions through anger and strong reactions.",
            icon: "🧩"
          },
          {
            id: "social",
            title: "Social problems (friend drama)",
            description: "They show their emotions by crying or becoming tearful.",
            icon: "👥"
          },
          {
            id: "dilemmas",
            title: "Real-life dilemmas (like saving time or money)",
            description: "They become restless, worried, or nervous when upset.",
            icon: "🏠"
          },
          {
            id: "withdrawal",
            title: "None really — avoids problem-solving",
            description: "They prefer to stay quiet, isolate themselves, or shut down.",
            icon: "🚫"
          }
        ]
      }
    ]
  },
  {
    id: "creativity",
    title: "Learning Preferences",
    questions: [
      {
        id: "q1",
        text: "How does your child like to express themselves?",
        layoutType: "withdescription",
        options: [
          {
            id: "drawing",
            title: "Drawing / art",
            description: "They feel better when they can sit quietly, relax, or have some alone time.",
            icon: "🎨"
          },
          {
            id: "drama",
            title: "Stories / drama",
            description: "They are comforted most by affection, hugs, and emotional warmth.",
            icon: "📖"
          },
          {
            id: "building",
            title: "Building / making things",
            description: "They feel better when they can talk and express their feelings openly.",
            icon: "🧱"
          },
          {
            id: "exploring",
            title: "They're still exploring",
            description: "No single comfort works well, so a balanced approach might be needed.",
            icon: "🔍"
          }
        ]
      },
      {
        id: "q2",
        text: "Does your child struggle with trying new things creatively?",
        layoutType: "withoutdescription",
        options: [
          { id: "yes", title: "Yes, needs a lot of encouragement", icon: "✅" },
          { id: "mood", title: "Sometimes — depends on mood", icon: "🔀" },
          { id: "nope", title: "Nope — always experimenting", icon: "❌" },
          { id: "try", title: "Haven't seen them try yet", icon: "❓" }
        ]
      },
      {
        id: "q3",
        text: "What are you hoping to build through creative thinking?",
        layoutType: "withdescription",
        options: [
          {
            id: "confidence",
            title: "Confidence",
            description: "They release their emotions through anger and strong reactions.",
            icon: "💪"
          },
          {
            id: "solving",
            title: "Problem-solving",
            description: "They show their emotions by crying or becoming tearful.",
            icon: "🧩"
          },
          {
            id: "original",
            title: "Original thinking",
            description: "They become restless, worried, or nervous when upset.",
            icon: "💡"
          },
          {
            id: "above",
            title: "All of the above",
            description: "They prefer to stay quiet, isolate themselves, or shut down.",
            icon: "🌟"
          }
        ]
      }
    ]
  }
];



const Question = ({ question, data, updateData }: any) => {
  const fieldKey = `${data.selectedModule}_${question.id}`;
  const value =
    (data as any)[fieldKey] ?? (question.layoutType == "checkbox" ? [] : "");

  if (question.layoutType == "withdescription") {
    return (
      <div className="flex flex-col min-h-[53vh]">
        <h3 className="text-lg font-semibold text-card-foreground flex justify-center items-center gap-2">
          <HelpCircle className="text-warning" />
          {question.text}
        </h3>

        <RadioGroup
          value={value}
          onValueChange={(v) => updateData({ [fieldKey]: v })}
          className="grid grid-cols-1 gap-3 mt-auto bg-card p-4 rounded-xl shadow-md"
        >
          {question.options.map((opt: any) => (
            <div key={opt.id} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id} className="flex-1 cursor-pointer">
                <div className="flex items-start gap-2 p-3 rounded-xl border hover:border-primary/50 transition-colors">
                  <div className="text-xl">{opt.icon}</div>
                  <div>
                    <div className="font-medium text-card-foreground mb-1 text-sm">
                      {opt.title}
                    </div>
                    {opt.description && (
                      <div className="text-xs text-muted-foreground">
                        {opt.description}
                      </div>
                    )}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

      </div>
    );
  }

  if (question.layoutType == "withoutdescription") {
    return (
      <div className="flex flex-col min-h-[53vh]">
        <h3 className="text-lg font-semibold text-card-foreground flex justify-center items-center gap-2">
          <HelpCircle className="text-primary" />
          {question.text}
        </h3>

        <RadioGroup
          value={value}
          onValueChange={(v) => updateData({ [fieldKey]: v })}
          className="flex flex-wrap gap-2 mt-auto bg-card p-4 rounded-xl shadow-md"
        >
          {question.options.map((opt: any) => (
            <Label
              key={opt.id}
              htmlFor={`${fieldKey}_${opt.id}`}
              className={`px-4 py-2 rounded-full border cursor-pointer select-none transition-all duration-300 text-xs font-medium flex items-center gap-2
                ${
                  value == opt.id
                    ? "bg-primary text-white border-primary shadow-sm scale-105"
                    : " bg-gradient-to-r from-primary/5 to-accent/5 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {/* Hidden radio */}
              <RadioGroupItem
                value={opt.id}
                id={`${fieldKey}_${opt.id}`}
                className="hidden"
              />
              <span
                className={`text-lg ${
                  value == opt.id ? "text-white" : "text-primary"
                }`}
              >
                {opt.icon}
              </span>
              <span>{opt.title}</span>
            </Label>
          ))}
        </RadioGroup>
      </div>
    );
  }

  return null;
};

const CustomizeExperienceStep = ({
  data,
  updateData,
  onNext,
  onPrevModule,
  onProgress,
  registerPrev,
}: CustomizeExperienceStepProps) => {

  const currentModule = modulesQuestions.find((m) => m.id == data.selectedModule);

  const [currentSubStep, setCurrentSubStep] = useState(0);

  if (!currentModule) {
    return <div>Please select a module first.</div>;
  }

  const questions = currentModule.questions;
  const totalSubSteps = questions.length;

  useEffect(() => {
    onProgress?.(currentSubStep, totalSubSteps);
  }, [currentSubStep, totalSubSteps, onProgress]);

  const handleNext = () => {
    if (currentSubStep < totalSubSteps - 1) {
      setCurrentSubStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep((prev) => prev - 1);
    } else {
      onProgress?.(0, totalSubSteps);
      onPrevModule?.();
    }
  };

  const moduleTaglines: Record<string, { title: string; tagline: string }> = {
      emotional: {
        title: "🧩 Feelings Detective",
        tagline: `Let’s help ${data.childName} unlock the secret language of emotions1!`,
      },
      money: {
        title: "💰 Little Money Explorer",
        tagline: `Join ${data.childName} on an exciting treasure hunt to learn how coins, saving, and sharing shape!`,
      },
      thinking: {
        title: "🧠 Curious Thinker",
        tagline: `Fuel ${data.childName}’s curiosity with puzzles, questions, and choices that train a clever!`,
      },
      creativity: {
        title: "🎨 Creative Dreamer",
        tagline: `Celebrate ${data.childName}’s imagination with colors, stories, and wild ideas that spark bold and joyful!`,
      },
    };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6 min-h-[10vh]">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2 mb-2">
          {moduleTaglines[currentModule.id].title}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {moduleTaglines[currentModule.id].tagline}
        </p>
      </div>


      {/* Current Question */}
      <Question
        question={questions[currentSubStep]}
        data={data}
        updateData={updateData}
      />

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
          className="flex items-center text-sm text-gray-700 hover:text-black transition-colors group"
        >
          {currentSubStep === totalSubSteps - 1 ? "Next" : "Next"}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default CustomizeExperienceStep;