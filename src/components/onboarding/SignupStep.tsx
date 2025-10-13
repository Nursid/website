import { useEffect, useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import type { OnboardingData } from "@/pages/OnboardingPage";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE;

interface SignupStepProps {
  data: OnboardingData;
  updateData: (patch: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrevModule: () => void;
  onProgress?: (current: number, total: number) => void;
  registerPrev?: (fn: () => void) => void;
  updateSessionStatus?: (status: boolean) => void; // Add this
}

const SignupStep = ({
  data,
  updateData,
  onNext,
  onPrevModule,
  onProgress,
  registerPrev,
  updateSessionStatus, 
}: SignupStepProps) => {
  const [subStep, setSubStep] = useState(0);
  const [totalSubSteps, setTotalSubSteps] = useState(5);

  // local state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    "addChild" | "selectModule" | null
  >(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [sessionUser, setSessionUser] = useState<{name: string, email: string, phone: string} | null>(null);
  const [hasSessionData, setHasSessionData] = useState(false);

  // Use ref to track if we've already fetched session data
  const hasFetchedSession = useRef(false);

  // Fetch session data only once on component mount
  useEffect(() => {
    // If we've already fetched, don't fetch again
    if (hasFetchedSession.current) return;

    const fetchSession = async () => {
      try {
        const resp = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!resp.ok) return;

        const sessionData = await resp.json();
        console.log("Session data:", sessionData);

        if (sessionData?.user?.name || sessionData?.user?.email || sessionData?.user?.phone) {
          const userData = sessionData.user;
          
          // Update parent data with session values
          updateData({
            name: userData.name || "",
            email: userData.email || "",
          });
          setPhone(userData.phone || "");
          
          setSessionUser({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          });
          
          setHasSessionData(true);
          // Update parent component about session status
          updateSessionStatus?.(true);
          
          // Skip directly to step 4 (congratulations) for session users
          setSubStep(4);
          setTotalSubSteps(5);
          
          console.log("Session user detected, skipping to step 4");
          
          // Mark as fetched to prevent future calls
          hasFetchedSession.current = true;
        } else {
          console.log("No valid session user data found");
          hasFetchedSession.current = true;
          updateSessionStatus?.(false);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
        hasFetchedSession.current = true;
        updateSessionStatus?.(false);
      }
    };

    fetchSession();
  }, [updateData, updateSessionStatus]); // Only depend on updateData which should be stable

  useEffect(() => {
    onProgress?.(subStep, totalSubSteps);
  }, [subStep, totalSubSteps, onProgress]);

  const handleBack = useCallback(() => {
    if (hasSessionData) {
      // For session users, back should go to the beginning or previous module
      onProgress?.(0, totalSubSteps);
      onPrevModule();
    } else if (subStep > 0) {
      setErrors({});
      setSubStep((s) => s - 1);
    } else {
      onProgress?.(0, totalSubSteps);
      onPrevModule();
    }
  }, [subStep, onPrevModule, onProgress, totalSubSteps, hasSessionData]);

  useEffect(() => {
    registerPrev?.(handleBack);
  }, [registerPrev, handleBack]);

  const emailValid = (val: string) => /\S+@\S+\.\S+/.test(val);
  const phoneValid = (val: string) => /^[0-9]{10}$/.test(val);
  const pinValid = (val: string) => /^[0-9]{4,}$/.test(val);

  const validateCurrentAndShow = (): boolean => {
    const e: Record<string, string> = {};
    
    if (hasSessionData) {
      // Only validate the choice step for session users
      if (subStep === 4) {
        if (selectedOption !== "addChild") e.choice = "Please choose 'Add Child' to continue.";
      }
    } else {
      // Original validation for new users
      if (subStep === 0) {
        if (!data.name.trim()) e.name = "Full Name is required.";
      }
      if (subStep === 1) {
        if (!data.email.trim()) e.email = "Email is required.";
        else if (!emailValid(data.email)) e.email = "Please enter a valid email address.";
        if (!phone.trim()) e.phone = "Phone number is required.";
        else if (!phoneValid(phone)) e.phone = "Enter a valid 10-digit phone number.";
      }
      if (subStep === 2) {
        if (!otp.trim()) e.otp = "OTP is required.";
        else if (otp !== "1234") e.otp = "Invalid OTP. Use 1234.";
        if (otp === "1234" && !isOtpVerified) {
          e.otp = "Please click Verify to confirm the OTP.";
        }
      }
      if (subStep === 3) {
        if (!pin.trim()) e.pin = "PIN is required.";
        else if (!pinValid(pin)) e.pin = "PIN must be at least 4 digits.";
        if (!confirmPin.trim()) e.confirmPin = "Please confirm your PIN.";
        else if (pin !== confirmPin) e.confirmPin = "PIN and Confirm PIN must match.";
      }
      if (subStep === 4) {
        if (selectedOption !== "addChild") e.choice = "Please choose 'Add Child' to continue.";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const tryNext = async () => {
    if (hasSessionData) {
      // For session users, directly validate and proceed from step 4
      if (validateCurrentAndShow()) {
        onProgress?.(4, 5);
        onNext();
      }
      return;
    }

    // Original flow for new users
    if (subStep === 3) {
      if (!validateCurrentAndShow()) return;
      setLoading(true);
      try {
        // 🔹 Register API call
        const resp = await fetch(`${API_BASE}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone,
            pin,
          }),
        });

        const json = await resp.json();

        if (!resp.ok) {
          setErrors((prev) => ({ ...prev, server: json.message || "Registration failed" }));
          toast.error(json.message || "Registration failed ❌");
          return;
        }

        // ✅ Show success toast
        toast.success(json.message || "Registration successful ✅");

        // 🔹 CRITICAL: Update session status in parent component
        console.log("🎯 Registration successful, updating session status");
        updateSessionStatus?.(true);
        setHasSessionData(true);

        // 🔹 Fetch session data after successful registration
        const sessionResp = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        const sessionData = await sessionResp.json();

        // 🔹 Update input fields with session values
        if (sessionData?.user) {
          updateData({
            name: sessionData.user.name || "",
            email: sessionData.user.email || "",
          });
          setPhone(sessionData.user.phone || "");
          setSessionUser({
            name: sessionData.user.name || "",
            email: sessionData.user.email || "",
            phone: sessionData.user.phone || "",
          });
        }

        // ✅ Advance to next step
        setSubStep((s) => s + 1);
      } catch (err: any) {
        setErrors((prev) => ({ ...prev, server: err.message }));
        toast.error(err.message || "Something went wrong ❌");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Other steps for new users
    if (subStep < totalSubSteps - 1) {
      if (validateCurrentAndShow()) setSubStep(s => s + 1);
    } else {
      if (validateCurrentAndShow()) {
        onProgress?.(totalSubSteps - 1, totalSubSteps);
        onNext();
      }
    }
  };

  const handleOtpVerify = () => {
    if (otp === "1234") {
      setIsOtpVerified(true);
      setErrors((prev) => {
        const { otp: _omit, ...rest } = prev;
        return rest;
      });
    } else {
      setIsOtpVerified(false);
      setErrors((prev) => ({ ...prev, otp: "Invalid OTP. Use 1234." }));
    }
  };

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <div className="flex flex-col min-h-[66vh]">
        {/* STEP 0: Full Name (only for new users) */}
        {subStep === 0 && !hasSessionData && (
          <>
            <h3 className="text-xl font-bold text-center mb-4">Enter Your Full Name</h3>

            <div className="text-center mb-4">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                🌈 Welcome{" "}
                {data.name ? (
                  <span className="text-accent font-semibold">{data.name}</span>
                ) : (
                  "little explorer"
                )}
                ! Every superhero needs a name, and yours will sparkle like magic across this fun-filled adventure.
              </p>
              <p className="text-6xl sm:text-7xl mt-2">🧸</p>
            </div>

            <div className="space-y-2 mt-auto bg-card rounded-xl p-4 shadow-md">
              <Label className="text-sm">Full Name</Label>
              <Input
                placeholder="John Doe"
                value={data.name}
                aria-invalid={!!errors.name}
                onChange={(e) => {
                  updateData({ name: e.target.value });
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                className="text-base"
              />
              {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
            </div>
          </>
        )}

        {/* STEP 1: Email + Phone (only for new users) */}
        {subStep === 1 && !hasSessionData && (
          <>
            <h3 className="text-xl font-bold text-center mb-4">Enter Your Contact Details</h3>

            <div className="text-center mb-4">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                ☎️ Just like sending letters to Hogwarts, we'll use your contact to share surprises, updates,  
                and magical invites for{" "}
                {data.name && <span className="text-accent font-semibold">{data.name}</span>}.
              </p>
              <p className="text-6xl sm:text-7xl mt-2">📮</p>
            </div>

            <div className="space-y-3 mt-auto bg-card rounded-xl p-4 shadow-md">
              <div className="space-y-2">
                <Label className="text-sm">Email</Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={data.email}
                  aria-invalid={!!errors.email}
                  onChange={(e) => {
                    updateData({ email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className="text-base"
                />
                {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="10-digit phone"
                  value={phone}
                  aria-invalid={!!errors.phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  className="text-base"
                />
                {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
              </div>
            </div>
          </>
        )}

        {/* STEP 2: OTP (only for new users) */}
        {subStep === 2 && !hasSessionData && (
          <>
            <h3 className="text-xl font-bold text-center mb-4">Verify OTP</h3>

            <div className="text-center mb-4">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                ✨ This secret code is like a golden key,{" "}
                {data.name && <span className="text-accent font-semibold">{data.name}</span>},  
                opening the enchanted gate to the next magical stage of your adventure.
              </p>
              <p className="text-6xl sm:text-7xl mt-2">🔑</p>
            </div>

            <div className="mt-auto bg-card rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter OTP (1234)"
                  value={otp}
                  aria-invalid={!!errors.otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (errors.otp) setErrors((prev) => ({ ...prev, otp: "" }));
                  }}
                  className="text-base flex-1"
                />
                <Button onClick={handleOtpVerify} size="sm" className="text-sm">
                  Verify
                </Button>
                {isOtpVerified && <CheckCircle2 className="text-green-600 w-5 h-5" />}
              </div>
              {errors.otp && <p className="text-red-600 text-xs mt-2">{errors.otp}</p>}
            </div>
          </>
        )}

        {/* STEP 3: PIN (only for new users) */}
        {subStep === 3 && !hasSessionData && (
          <>
            <h3 className="text-xl font-bold text-center mb-4">Create PIN</h3>

            <div className="text-center mb-4">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                🛡️ Every young hero needs a shield! Create your secret PIN to guard your treasure chest  
                filled with games, stars, and surprises.
              </p>
              <p className="text-6xl sm:text-7xl mt-2">🎠</p>
            </div>

            <div className="space-y-3 mt-auto bg-card rounded-xl p-4 shadow-md">
              <div className="space-y-2">
                <Label className="text-sm">PIN</Label>
                <Input
                  type="password"
                  placeholder="Min 4 digits"
                  value={pin}
                  aria-invalid={!!errors.pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (errors.pin) setErrors((prev) => ({ ...prev, pin: "" }));
                  }}
                  className="text-base"
                />
                {errors.pin && <p className="text-red-600 text-xs">{errors.pin}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Confirm PIN</Label>
                <Input
                  type="password"
                  placeholder="Confirm PIN"
                  value={confirmPin}
                  aria-invalid={!!errors.confirmPin}
                  onChange={(e) => {
                    setConfirmPin(e.target.value);
                    if (errors.confirmPin)
                      setErrors((prev) => ({ ...prev, confirmPin: "" }));
                  }}
                  className="text-base"
                />
                {errors.confirmPin && (
                  <p className="text-red-600 text-xs">{errors.confirmPin}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* STEP 4: Congratulations (shown for both, but session users come directly here) */}
        {(subStep === 4) && (
          <>
            <h3 className="text-xl font-bold text-center mb-3">
              {hasSessionData ? "Welcome Back!" : "🎉 Congratulations!"}
            </h3>
            <p className="text-center pb-4 text-muted-foreground text-sm">
              {hasSessionData 
                ? "Your account is ready to continue." 
                : "You have successfully signed up."
              }
            </p>
            <div className="text-center mb-4">
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                {hasSessionData ? (
                  <>
                    🌟 Welcome back{" "}
                    {sessionUser?.name && <span className="text-accent font-semibold">{sessionUser.name}</span>}!  
                    We're thrilled to continue your magical learning adventure. Your journey awaits!
                  </>
                ) : (
                  <>
                    🌟 Hooray{" "}
                    {data.name && <span className="text-accent font-semibold">{data.name}</span>}!  
                    You've completed your quest, unlocked your powers, and joined the league of playful champions.  
                    Let the fun begin!
                  </>
                )}
              </p>
              <p className="text-6xl sm:text-7xl mt-2">
                {hasSessionData ? "🎯" : "🚀"}
              </p>
            </div>

            {hasSessionData && sessionUser && (
              <div className="mb-4 p-4 bg-muted/30 rounded-lg text-sm">
                <p className="font-medium text-center mb-2">Your Account Details:</p>
                <div className="grid grid-cols-1 gap-1 text-center">
                  <p><strong>Name:</strong> {sessionUser.name}</p>
                  <p><strong>Email:</strong> {sessionUser.email}</p>
                  <p><strong>Phone:</strong> {sessionUser.phone}</p>
                </div>
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 mt-auto gap-4">
              {/* Add Child Option */}
              <div
                onClick={() => {
                  setSelectedOption("addChild");
                  if (errors.choice) setErrors((prev) => ({ ...prev, choice: "" }));
                }}
                className={`cursor-pointer flex flex-col items-center justify-between rounded-xl border-2 overflow-hidden transition-all duration-300
                  ${selectedOption === "addChild" ? "border-accent bg-accent/10 shadow-lg" : "border-muted"}
                `}
              >
                <img
                  src="/images/butterfly_animation.gif"
                  alt="Add Child"
                  className="w-full h-32 object-cover"
                />
                <span className="text-sm font-medium p-2 text-center">Add Child</span>
              </div>

              {/* Select Module Option (Disabled) */}
              <div
                className={`flex flex-col items-center justify-between rounded-xl border-2 overflow-hidden opacity-50 cursor-not-allowed`}
              >
                <img
                  src="/images/module.png"
                  alt="Select Module"
                  className="w-full h-32 object-cover"
                />
                <span className="text-sm font-medium p-2 text-center">Select Module</span>
              </div>
            </div>

            {errors.choice && (
              <p className="text-red-600 text-xs text-center mt-3">{errors.choice}</p>
            )}
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
          onClick={tryNext}
          className="flex items-center text-sm text-gray-700 hover:text-black transition-colors"
          disabled={loading}
        >
          {loading 
            ? 'Creating account…' 
            : (hasSessionData ? 'Continue' : (subStep === totalSubSteps - 1 ? 'Next' : 'Next'))
          }
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default SignupStep;