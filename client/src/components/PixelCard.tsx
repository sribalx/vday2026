import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  variant?: "pink" | "white" | "yellow";
}

export function PixelCard({ children, className, variant = "white" }: PixelCardProps) {
  const bgColors = {
    pink: "bg-pink-100",
    white: "bg-white",
    yellow: "bg-yellow-50",
  };

  return (
    <div className={cn(
      "relative p-8 border-4 border-black font-doodle",
      "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
      bgColors[variant],
      className
    )}>
      {/* Decorative corner pixels to simulate rounded-ish pixel corners */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-white z-10" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white z-10" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white z-10" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white z-10" />
      
      {/* Inner corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-black/10" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-black/10" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-black/10" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-black/10" />

      {children}
    </div>
  );
}
