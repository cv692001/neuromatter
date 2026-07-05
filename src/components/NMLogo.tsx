interface NMLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Render the logo in solid white — for use on dark backgrounds (e.g. the footer). */
  variant?: "default" | "white";
  /** Override the logo image source (defaults to the stacked logo). */
  src?: string;
}

const NMLogo = ({
  size = "md",
  className = "",
  variant = "default",
  src = "/neuromatter-logo.png",
}: NMLogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
  };

  const variantClass = variant === "white" ? "brightness-0 invert" : "";

  return (
    <img
      src={src}
      alt="NeuroMatter"
      className={`object-contain object-left ${sizeClasses[size]} ${variantClass} ${className}`}
    />
  );
};

export default NMLogo;
