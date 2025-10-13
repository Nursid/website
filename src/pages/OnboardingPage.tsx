import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

import LogoutButton from "@/components/LogoutButton";

import WelcomeStep from "@/components/onboarding/WelcomeStep";
import ModuleSelectionStep from "@/components/onboarding/ModuleSelectionStep";
import CustomizeExperienceStep from "@/components/onboarding/CustomizeExperienceStep";
import PaymentStep from "@/components/onboarding/PaymentStep";
import StartLearningStep from "@/components/onboarding/StartLearningStep";
import SignupStep from "@/components/onboarding/SignupStep";
import ChildProfileSetupStep from "@/components/onboarding/ProfileSetupStep";

export interface OnboardingData {
  name: string;
  email: string;
  childName: string;
  childAge: string;
  learningGoals: string[];
  childDescription: string;
  selectedModule: string;
  avatar: string;
  triedBefore: string;
  feelingDifficulty: string;
  learningStyle: string;
  plan: string;
}

type ModuleType = "single" | "multi";
type ModuleDef = {
  key: string;
  label: string;
  type: ModuleType;
  render: () => JSX.Element;
};

const OnboardingPage = () => {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: "",
    email: "",
    childName: "",
    childAge: "",
    learningGoals: [],
    childDescription: "",
    selectedModule: "",
    avatar: "",
    triedBefore: "",
    feelingDifficulty: "",
    learningStyle: "",
    plan: "",
  });

  // Add session state
  const [hasSession, setHasSession] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const [moduleProgress, setModuleProgress] = useState<
    Record<string, { current: number; total: number }>
  >({});

  // Move currentModuleIndex declaration BEFORE any effects that use it
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  // Check session on component mount and when current module changes
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔍 Checking session from OnboardingPage...");
        const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("📋 Session data received:", data);
          const sessionExists = !!(data.user && data.user.id);
          setHasSession(sessionExists);
          console.log("✅ Session exists:", sessionExists);
        } else {
          console.log("❌ No active session found");
          setHasSession(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setHasSession(false);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, [currentModuleIndex]); // Now currentModuleIndex is declared before this

  const updateData = (newData: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  };

  const updateModuleProgress = useCallback(
    (key: string, current: number, total: number) => {
      setModuleProgress((prev) => {
        const old = prev[key];
        if (old && old.current === current && old.total === total) return prev;
        return { ...prev, [key]: { current, total } };
      });
    },
    []
  );

  const onProgressHandlers = useMemo(() => {
  return {
    signup: (current: number, total: number) =>
      updateModuleProgress("signup", current, total),
    "child-profile": (current: number, total: number) =>
      updateModuleProgress("child-profile", current, total),
    customize: (current: number, total: number) =>
      updateModuleProgress("customize", current, total),
    "module-selection": (current: number, total: number) =>
      updateModuleProgress("module-selection", current, total),
  } as Record<string, (current: number, total: number) => void>;
}, [updateModuleProgress]);

  const prevRegistry = useRef<Record<string, () => void>>({});

  // Function to update session state (can be called from child components)
  const updateSessionStatus = useCallback((status: boolean) => {
    console.log("🔄 Updating session status to:", status);
    setHasSession(status);
  }, []);

  const nextModule = () => {
    const current = modules[currentModuleIndex];
    if (!current) return;

    if (current.type === "single") {
      // Leaving a single-step module -> mark it complete
      setModuleProgress((prev) => ({
        ...prev,
        [current.key]: { current: 1, total: 1 },
      }));
    } else if (current.type === "multi") {
      // FIX: When leaving a multi-step module, mark it fully complete.
      // Previously we set current to (total - 1), which delayed completion
      // and caused the next module's first step to show inconsistent progress.
      setModuleProgress((prev) => {
        const total = Math.max(1, prev[current.key]?.total ?? 1);
        return {
          ...prev,
          [current.key]: { current: total, total },
        };
      });
    }

    setCurrentModuleIndex((i) => Math.min(i + 1, modules.length - 1));
  };

  const prevModule = () => {
    setCurrentModuleIndex((i) => (i <= 0 ? 0 : i - 1));
  };

  const modules: ModuleDef[] = useMemo(
    () => [
      {
        key: "welcome-1",
        label: "Welcome",
        type: "single",
        render: () => <WelcomeStep onNext={nextModule} />,
      },
      {
        key: "signup",
        label: "Signup",
        type: "multi",
        render: () => (
          <SignupStep
            data={onboardingData}
            updateData={updateData}
            onNext={nextModule}
            onPrevModule={prevModule}
            onProgress={onProgressHandlers["signup"]}
            registerPrev={(fn) => {
              prevRegistry.current["signup"] = fn;
            }}
            // Pass the session update function to SignupStep
            updateSessionStatus={updateSessionStatus}
          />
        ),
      },
      {
        key: "child-profile",
        label: "Child Profile",
        type: "multi",
        render: () => (
          <ChildProfileSetupStep
            data={onboardingData}
            updateData={updateData}
            onNext={nextModule}
            onPrevModule={prevModule}
            onProgress={onProgressHandlers["child-profile"]}
            registerPrev={(fn: () => void) => {
              prevRegistry.current["child-profile"] = fn;
            }}
          />
        ),
      },
      {
        key: "module-selection",
        label: "Select Module",
        type: "multi",
        render: () => (
          <ModuleSelectionStep
            data={onboardingData}
            updateData={updateData}
            onNext={nextModule}
            onPrevModule={prevModule}
            onProgress={onProgressHandlers["module-selection"]}
            registerPrev={(fn: () => void) => {
              prevRegistry.current["module-selection"] = fn;
            }}
          />
        ),
      },
      {
        key: "customize",
        label: "Customize",
        type: "multi",
        render: () => (
          <CustomizeExperienceStep
            data={onboardingData}
            updateData={updateData}
            onNext={nextModule}
            onPrevModule={prevModule} // ✅ add this
            onProgress={onProgressHandlers["customize"]}
            registerPrev={(fn: () => void) => {
              prevRegistry.current["customize"] = fn;
            }}
          />
        ),
      },
      {
        key: "payment",
        label: "Payment",
        type: "single",
        render: () => (
          <PaymentStep
            data={onboardingData}
            updateData={updateData}
            onNext={nextModule}
          />
        ),
      },
      {
        key: "start-learning",
        label: "Start Learning",
        type: "single",
        render: () => <StartLearningStep data={onboardingData} />,
      },
    ],
    [onboardingData, onProgressHandlers, updateSessionStatus]
  );

  const currentModule = modules[currentModuleIndex];

  // Compute overall progress aligned with node positions
  const progressPercent = (() => {
    const n = modules.length;
    if (n <= 1) return 100;

    const completedCount = currentModuleIndex; // nodes before + current node position
    const p = moduleProgress[currentModule?.key ?? ""];

    let subFraction = 0;
      if (p?.total) {
        if (currentModule?.type === "multi") {
          const denom = Math.max(1, p.total);
          // Progress stays within the current node until fully done
          subFraction = Math.min(p.current / denom, 1);

          // When all steps are done, push progress to the next node
          if (p.current >= p.total) {
            subFraction = 1;
          }
        }
      }

    const normalized = (completedCount + subFraction) / Math.max(1, n - 1);
    return Math.max(0, Math.min(normalized * 100, 100));
  })();

  const handleUniversalBack = () => {
    const handler = prevRegistry.current[currentModule.key];
    if (handler) {
      handler();
    } else {
      prevModule();
    }
  };

  // Determine if we should show logout button
  const shouldShowLogout = hasSession && !checkingSession;
  console.log("👤 Should show logout:", shouldShowLogout, "hasSession:", hasSession, "checkingSession:", checkingSession);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <header className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-lg font-bold text-gradient">SkillSphere</span>
            </div>

            <div className="flex items-center gap-4">
              {/* <Button variant="ghost" size="sm">Exit</Button> */}
              
              {/* Conditionally render LogoutButton */}
              {shouldShowLogout && (
                <LogoutButton 
                  onLogout={() => {
                    console.log("User logged out");
                    setHasSession(false); // Update local state on logout
                  }}
                  variant="outline"
                  size="sm"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">

        {/* Progress bar with module nodes */}
        <div className="relative max-w-lg mx-auto h-0.5 bg-primary/20 rounded-full mb-8 mx-6">
          <div
            className="absolute left-0 top-0 h-0.5 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
            {modules.map((m, index) => {
              const isActive = index === currentModuleIndex;
              const isCompleted = index < currentModuleIndex;

              // Avoid conflicting classes: choose exactly one state
              const nodeClasses = isCompleted
                ? "bg-primary border-primary"
                : isActive
                ? "bg-white border-primary"
                : "bg-white border-gray-400";

              return (
                <button
                  key={m.key}
                  className="relative flex flex-col items-center focus:outline-none group"
                  title={m.label}
                >
                  <div
                    className={`w-2 h-2 rounded-full border-2 transition-colors duration-300 ${nodeClasses}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {currentModule.render()}
        </div>

      </main>

      {currentModuleIndex > 0 && currentModuleIndex < modules.length - 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between max-w-4xl mx-auto">
              <div className="text-sm text-muted-foreground flex items-center">
                Almost there! 🎉
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;