import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./reducedMotion";

type CountProps = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function Count({ to, from = 0, duration = 1200, prefix = "", suffix = "", className }: CountProps) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [from, to, duration]);

  return (
    <span className={className}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
