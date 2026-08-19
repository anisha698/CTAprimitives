import { CSSProperties, PointerEvent, ReactNode, useRef, useState } from "react";
import { prefersReducedMotion } from "./reducedMotion";

type TiltProps = {
  children: ReactNode;
  max?: number;
  className?: string;
};

export function Tilt({ children, max = 10, className }: TiltProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function move(event: PointerEvent<HTMLSpanElement>) {
    if (prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const y = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * max;
    const x = ((event.clientY - rect.top) / rect.height - 0.5) * -2 * max;
    setTilt({ x, y });
  }

  const style: CSSProperties = {
    transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
  };

  return (
    <span
      ref={ref}
      className={`tilt-host${className ? ` ${className}` : ""}`}
      style={style}
      onPointerMove={move}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {children}
    </span>
  );
}
