import { PointerEvent, ReactNode, useRef, useState } from "react";

type RippleProps = {
  children: ReactNode;
  className?: string;
};

type RippleMark = { id: number; x: number; y: number };

export function Ripple({ children, className }: RippleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [marks, setMarks] = useState<RippleMark[]>([]);
  const nextId = useRef(0);

  function press(event: PointerEvent<HTMLSpanElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const id = ++nextId.current;
    setMarks((current) => [...current, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }]);
    window.setTimeout(() => {
      setMarks((current) => current.filter((mark) => mark.id !== id));
    }, 650);
  }

  return (
    <span
      ref={ref}
      className={`ripple-host${className ? ` ${className}` : ""}`}
      onPointerDown={press}
    >
      {children}
      {marks.map((mark) => (
        <span key={mark.id} className="ripple" style={{ left: mark.x, top: mark.y }} />
      ))}
    </span>
  );
}
