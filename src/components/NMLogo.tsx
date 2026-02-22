interface NMLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const NMLogo = ({ size = "md", className = "" }: NMLogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
  };

  return (
    <img
      src="/neuromatter-logo.png"
      alt="NeuroMatter"
      className={`object-contain object-left ${sizeClasses[size]} ${className}`}
    />
  );
};

export default NMLogo;
