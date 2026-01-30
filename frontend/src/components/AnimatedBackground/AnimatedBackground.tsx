import React from "react";

interface AnimatedBackgroundProps {
  orbCount?: number;
  orbSize?: "sm" | "md" | "lg";
  showLargeCircles?: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  orbCount = 6,
  orbSize = "md",
  showLargeCircles = true,
}) => {
  const orbSizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colors = [
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#06b6d4",
    "#10b981",
    "#f97316",
    "#6366f1",
    "#ef4444",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {showLargeCircles && (
        <>
          <div className="absolute top-32 right-32 w-80 h-80 bg-gradient-to-br from-violet-300/20 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-80 h-80 bg-gradient-to-br from-rose-300/20 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-200/15 to-orange-300/25 rounded-full blur-3xl animate-pulse"></div>
        </>
      )}

      {Array.from({ length: orbCount }).map((_, i) => (
        <div
          key={i}
          className={`absolute ${orbSizeClasses[orbSize]} rounded-full animate-bounce opacity-60`}
          style={{
            background: `linear-gradient(135deg, ${
              colors[i % colors.length]
            }, transparent)`,
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
};

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
  orbCount?: number;
  orbSize?: "sm" | "md" | "lg";
  showLargeCircles?: boolean;
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  className = "",
  orbCount = 6,
  orbSize = "md",
  showLargeCircles = true,
}) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-amber-50 ${className}`}
    >
      <AnimatedBackground
        orbCount={orbCount}
        orbSize={orbSize}
        showLargeCircles={showLargeCircles}
      />
      {children}
    </div>
  );
};
