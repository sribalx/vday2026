import { cn } from "@/lib/utils";

interface CatDecorationProps {
  type: 1 | 2 | 3;
  className?: string;
}

export function CatDecoration({ type, className }: CatDecorationProps) {
  const images = {
    1: "/images/penguin1.png",
    2: "/images/penguin3.jpg",
    3: "/images/penguin2.jpg",
    4: "/images/penguin3.jpg"
  };

  return (
    <div className={cn("absolute pointer-events-none select-none z-0", className)}>
      <img 
        src={images[type]} 
        alt="Decorative pixel art cat" 
        className="w-32 h-32 md:w-48 md:h-48 object-contain pixelated drop-shadow-md"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
