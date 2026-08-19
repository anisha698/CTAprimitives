import { CSSProperties, PointerEvent, ReactNode, useRef, useState } from "react";
import { prefersReducedMotion } from "./reducedMotion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 14, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function move(event: PointerEvent<HTMLSpanElement>) {
    if (prefersReducedMotion() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2 * strength;
    setOffset({ x, y });
  }

  const style: CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
  };

  return (
    <span
      ref={ref}
      className={`magnetic-host${className ? ` ${className}` : ""}`}
      style={style}
      onPointerMove={move}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </span>
  );
}
