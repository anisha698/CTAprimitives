import { ReactNode, useRef, useState } from "react";

type SlideProps = {
  label?: ReactNode;
  doneLabel?: ReactNode;
  className?: string;
  onComplete?: () => void;
};

export function Slide({
  label = "Slide to start",
  doneLabel = "You're in",
  className,
  onComplete
}: SlideProps) {
  const track = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [done, setDone] = useState(false);
  const dragging = useRef(false);

  function maxOffset() {
    const node = track.current;
    if (!node) return 0;
    return Math.max(0, node.clientWidth - 36);
  }

  function setFromClientX(clientX: number) {
    const node = track.current;
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    const next = Math.min(maxOffset(), Math.max(0, clientX - rect.left - 18));
    setOffset(next);
    return next;
  }

  function finish(value: number) {
    dragging.current = false;
    if (value >= maxOffset() * 0.86) {
      setOffset(maxOffset());
      if (!done) {
        setDone(true);
        onComplete?.();
      }
      return;
    }
    setOffset(0);
  }

  return (
    <div
      ref={track}
      className={`slide-track${className ? ` ${className}` : ""}`}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={done ? 100 : Math.round((offset / Math.max(maxOffset(), 1)) * 100)}
      aria-label={typeof label === "string" ? label : "Slide to confirm"}
      onPointerDown={(event) => {
        if (done) return;
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFromClientX(event.clientX);
      }}
      onPointerMove={(event) => {
        if (!dragging.current || done) return;
        setFromClientX(event.clientX);
      }}
      onPointerUp={(event) => finish(setFromClientX(event.clientX))}
      onPointerCancel={() => finish(offset)}
    >
      <span className="slide-copy">{done ? doneLabel : label}</span>
      <span className="slide-thumb" style={{ transform: `translateX(${offset}px)` }} />
    </div>
  );
}
