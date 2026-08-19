import { ReactNode, useEffect, useRef, useState } from "react";

type IntentProps = {
  from: ReactNode;
  to: ReactNode;
  delay?: number;
  className?: string;
};

export function Intent({ from, to, delay = 450, className }: IntentProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const target = element.closest("button, a") ?? element;

    function enter() {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setActive(true), delay);
    }

    function leave() {
      window.clearTimeout(timer.current);
      setActive(false);
    }

    target.addEventListener("pointerenter", enter);
    target.addEventListener("pointerleave", leave);
    return () => {
      window.clearTimeout(timer.current);
      target.removeEventListener("pointerenter", enter);
      target.removeEventListener("pointerleave", leave);
    };
  }, [delay]);

  return (
    <span ref={ref} className={className}>
      {active ? to : from}
    </span>
  );
}
