import { Heart } from "lucide-react";

export const FloatingHearts = ({ count = 14, color = "fill-primary text-primary" }: { count?: number; color?: string }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i * 1.3) % 8;
        const duration = 7 + (i % 5);
        const size = 12 + ((i * 7) % 24);
        return (
          <Heart
            key={i}
            className={`floating-heart ${color}`}
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: size,
              height: size,
            }}
          />
        );
      })}
    </div>
  );
};
