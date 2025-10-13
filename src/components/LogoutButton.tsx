// components/LogoutButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_API_BASE;

interface LogoutButtonProps {
  onLogout?: () => void;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  buttonText?: string;
}

const LogoutButton = ({ 
  onLogout, 
  className = "", 
  variant = "outline",
  size = "default",
  showIcon = true,
  buttonText = "Logout"
}: LogoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      await response.json();
      toast.success("Logged out successfully");
      
      // Call the onLogout callback if provided
      onLogout?.();
      
      // Redirect to home page
      window.location.href = "/";
      
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
    >
      {showIcon && <LogOut className="w-4 h-4" />}
      {loading ? "Logging out..." : buttonText}
    </Button>
  );
};

export default LogoutButton;