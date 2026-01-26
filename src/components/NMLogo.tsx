interface NMLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "dark" | "light" | "auto";
  showText?: boolean;
}

const NMLogo = ({ size = "md", className = "", variant = "auto", showText = false }: NMLogoProps) => {
  const sizes = {
    sm: { width: 28, height: 28, text: "text-sm" },
    md: { width: 36, height: 36, text: "text-base" },
    lg: { width: 48, height: 48, text: "text-lg" },
  };

  const { width, height } = sizes[size];
  const color = variant === "light" ? "#ffffff" : variant === "dark" ? "#1a1a1a" : "currentColor";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Minimalist NM Monogram */}
      <div style={{ width, height }} className="relative">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* N letter */}
          <path
            d="M6 32 L6 8 L18 24 L18 8"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          
          {/* M letter */}
          <path
            d="M22 32 L22 8 L28 20 L34 8 L34 32"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      
      {/* Text - optional */}
      {showText && (
        <span 
          className={`font-bold tracking-tight ${sizes[size].text}`}
          style={{ color }}
        >
          NeuroMatter
        </span>
      )}
    </div>
  );
};

export default NMLogo;
