// components/LoginPopup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE;

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }: LoginPopupProps) => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !pin) {
      toast.error("Please enter both email and PIN");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!/^[0-9]{4,}$/.test(pin)) {
      toast.error("PIN must be at least 4 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful! 🎉");
      onLoginSuccess();
      resetForm();
      onClose();
      
      // Redirect to onboarding page
      window.location.href = "/onboarding";
      
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPin("");
    setShowPin(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-gradient">Welcome Back!</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin" className="text-sm font-medium">
                PIN
              </Label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  placeholder="Enter your PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full pr-10"
                  required
                  disabled={loading}
                  //maxLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPin(!showPin)}
                  disabled={loading}
                >
                  {showPin ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the PIN you created during signup
              </p>
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => {
                  handleClose();
                  window.location.href = "/onboarding";
                }}
              >
                Create one here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;