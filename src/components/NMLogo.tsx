interface NMLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const NMLogo = ({ size = "md", className = "" }: NMLogoProps) => {
  const sizes = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
  };

  const { width, height } = sizes[size];

  return (
    <div 
      className={`rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-lg ${className}`}
      style={{ width, height }}
    >
      {/* 
        NM Logo - MG Hector style
        Outer edges: full height (y: 4 to 36 = 32 units)
        Middle edges: ~65% height (y: 9 to 30 = 21 units)
      */}
      <svg
        viewBox="0 0 48 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/4 h-3/4"
      >
        {/* N - Left vertical stroke (tall - full height) */}
        <path
          d="M6 36 L6 4"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* N - Diagonal stroke */}
        <path
          d="M6 4 L18 22"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* N - Right vertical stroke (65% height - starts at y=9) */}
        <path
          d="M18 22 L18 9"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* M - Left vertical stroke (65% height - starts at y=9) */}
        <path
          d="M24 9 L24 22"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* M - Left diagonal going down */}
        <path
          d="M24 9 L30 20"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* M - Right diagonal going up */}
        <path
          d="M30 20 L36 9"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* M - Right inner vertical (65% height) */}
        <path
          d="M36 9 L36 22"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* M - Final right vertical stroke (tall - full height) */}
        <path
          d="M42 36 L42 4"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* M - Connect to final stroke */}
        <path
          d="M36 9 L42 4"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default NMLogo;
