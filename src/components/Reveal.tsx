import { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

/** Wrap any block to fade + slide it into view on scroll. */
export const Reveal = ({ children, delay = 0, className = "", as = "div" }: Props) => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag: any = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
};
