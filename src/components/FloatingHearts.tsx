import { Heart } from "lucide-react";

export const FloatingHearts = ({ count = 12, color = "hsl(var(--primary))" }: { count?: number; color?: string }) => {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const left = (i * 8.3) % 100;
        const delay = (i * 0.7) % 8;
        const duration = 7 + (i % 5);
        const size = 12 + ((i * 3) % 18);
        return (
          <Heart
            key={i}
            className="floating-heart"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: size,
              height: size,
              color,
              fill: color,
            }}
          />
        );
      })}
    </div>
  );
};
