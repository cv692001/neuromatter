import { useState } from "react";
import { Send, Loader2, User, Mail, Phone } from "lucide-react";
import { submitContactToSheet, isValidEmail } from "@/lib/sheetApi";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

type ContactCaptureBarProps = {
  className?: string;
  variant?: "darkSection" | "lightOnDark";
  showLabel?: boolean;
};

const EmailCaptureBar = ({
  className,
  variant = "darkSection",
  showLabel = true,
}: ContactCaptureBarProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    setSubmitError(null);

    if (!trimmedName) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!trimmedPhone) {
      setSubmitError("Please enter your phone number.");
      return;
    }

    setIsSubmitting(true);
    const result = await submitContactToSheet({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
    });
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      toast.success("Thank you! We'll be in touch soon.");
      setTimeout(() => setIsSubmitted(false), 4000);
    } else {
      setSubmitError("error" in result ? result.error : "Could not submit. Try again.");
    }
  };

  const isLightOnDark = variant === "lightOnDark";

  const inputClasses = cn(
    "w-full px-4 py-2.5 rounded-full border text-sm focus:outline-none transition-colors",
    isLightOnDark
      ? "bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400/50"
      : "bg-section-dark-foreground/5 border-section-dark-foreground/20 text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:border-blue-400/50",
  );

  const iconClasses = cn(
    "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
    isLightOnDark ? "text-white/30" : "text-section-dark-foreground/30",
  );

  return (
    <div className={cn("max-w-md mx-auto", className)}>
      {showLabel && (
        <h3
          className={cn(
            "text-xs uppercase tracking-widest mb-4 text-center",
            isLightOnDark ? "text-white/60" : "text-section-dark-foreground/60",
          )}
        >
          Get in Touch
        </h3>
      )}

      {isSubmitted ? (
        <div className={cn(
          "text-center py-6 rounded-2xl border",
          isLightOnDark ? "border-white/10 bg-white/5" : "border-section-dark-foreground/10 bg-section-dark-foreground/5",
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-lg">✓</span>
          </div>
          <p className={cn(
            "text-sm font-medium",
            isLightOnDark ? "text-white/80" : "text-section-dark-foreground/80",
          )}>
            Thank you! We'll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <User className={iconClasses} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name *"
              className={cn(inputClasses, "pl-10")}
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="relative">
            <Mail className={iconClasses} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email *"
              className={cn(inputClasses, "pl-10")}
              disabled={isSubmitting}
              required
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              title="Please enter a valid email (e.g. name@example.com)"
            />
          </div>

          <div className="relative">
            <Phone className={iconClasses} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number *"
              className={cn(inputClasses, "pl-10")}
              disabled={isSubmitting}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:pointer-events-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit
              </>
            )}
          </button>
        </form>
      )}

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
