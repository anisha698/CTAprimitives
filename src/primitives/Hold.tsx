import { ReactNode, useEffect, useRef, useState } from "react";

type HoldProps = {
  label?: ReactNode;
  doneLabel?: ReactNode;
  duration?: number;
  className?: string;
  onComplete?: () => void;
};

export function Hold({
  label = "Hold to start",
  doneLabel = "You're in",
  duration = 850,
  className,
  onComplete
}: HoldProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const frame = useRef(0);
  const started = useRef(0);
  const doneRef = useRef(false);

  function stop() {
    window.cancelAnimationFrame(frame.current);
    if (!doneRef.current) setProgress(0);
  }

  function start() {
    if (doneRef.current) return;
    started.current = performance.now();

    function tick(now: number) {
      const next = Math.min(1, (now - started.current) / duration);
      setProgress(next);
      if (next >= 1) {
        doneRef.current = true;
        setDone(true);
        onComplete?.();
        return;
      }
      frame.current = window.requestAnimationFrame(tick);
    }

    frame.current = window.requestAnimationFrame(tick);
  }

  useEffect(() => () => window.cancelAnimationFrame(frame.current), []);

  return (
    <button
      type="button"
      className={`cta hold-cta${className ? ` ${className}` : ""}`}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
    >
      <span className="hold-fill" style={{ transform: `scaleX(${progress})` }} />
      <span className="hold-label">{done ? doneLabel : label}</span>
    </button>
  );
}
