import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { submitEmailToSheet, isValidEmail } from "@/lib/sheetApi";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

type EmailCaptureBarProps = {
  className?: string;
  /** Use footer token colors (dark section). Set false for light backgrounds. */
  variant?: "darkSection" | "lightOnDark";
  /** When false, omit the "Stay Updated" label (e.g. waitlist section has its own heading). */
  showLabel?: boolean;
};

/**
 * Same email collector as the footer "Stay Updated" block — posts to Google Sheet via sheetApi.
 */
const EmailCaptureBar = ({
  className,
  variant = "darkSection",
  showLabel = true,
}: EmailCaptureBarProps) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setSubmitError(null);
    if (!isValidEmail(trimmed)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    const result = await submitEmailToSheet(trimmed);
    setIsSubmitting(false);
    if (result.success) {
      setIsSubscribed(true);
      setEmail("");
      toast.success("Email added to subscription list");
      setTimeout(() => setIsSubscribed(false), 3000);
    } else {
      setSubmitError("error" in result ? result.error : "Could not subscribe. Try again.");
    }
  };

  const isLightOnDark = variant === "lightOnDark";

  return (
    <div className={cn("max-w-sm mx-auto", className)}>
      {showLabel && (
        <h3
          className={cn(
            "text-xs uppercase tracking-widest mb-3 text-center",
            isLightOnDark ? "text-white/60" : "text-section-dark-foreground/60",
          )}
        >
          Stay Updated
        </h3>
      )}
      <form onSubmit={handleSubscribe} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            "w-full px-4 py-2.5 pr-11 rounded-full border text-sm focus:outline-none transition-colors",
            isLightOnDark
              ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400/50"
              : "bg-section-dark-foreground/5 border-section-dark-foreground/20 text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:border-blue-400/50",
          )}
          required
          disabled={isSubmitting}
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          title="Please enter a valid email (e.g. name@example.com)"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
          ) : isSubscribed ? (
            <span className="text-white text-xs">✓</span>
          ) : (
            <Send className="w-3.5 h-3.5 text-white" />
          )}
        </button>
      </form>
      {submitError && (
        <p
          className={cn(
            "mt-2 text-center text-xs",
            isLightOnDark ? "text-white/70" : "text-section-dark-foreground/70",
          )}
        >
          {submitError}
        </p>
      )}
    </div>
  );
};

export default EmailCaptureBar;
