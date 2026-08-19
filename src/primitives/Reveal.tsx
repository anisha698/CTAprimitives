import { ReactNode, useEffect, useRef, useState } from "react";

type RevealTrigger = "click" | "hover" | "delay" | "visibility";

type RevealProps = {
  trigger: ReactNode;
  children: ReactNode;
  mode?: RevealTrigger;
  delay?: number;
  className?: string;
  onReveal?: () => void;
};

export function Reveal({ trigger, children, mode = "click", delay = 1000, className, onReveal }: RevealProps) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function reveal() {
    if (revealed) return;
    setRevealed(true);
    onReveal?.();
  }

  useEffect(() => {
    if (mode !== "delay") return;
    const timer = window.setTimeout(reveal, delay);
    return () => window.clearTimeout(timer);
  }, [mode, delay]);

  useEffect(() => {
    if (mode !== "visibility") return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) reveal();
    }, { threshold: 0.6 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [mode]);

  return (
    <div ref={ref} className={className} onMouseEnter={() => mode === "hover" && reveal()}>
      {!revealed && <span onClick={() => mode === "click" && reveal()}>{trigger}</span>}
      {revealed && children}
    </div>
  );
}
