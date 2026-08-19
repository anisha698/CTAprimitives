import { CSSProperties, PointerEvent, ReactNode, useRef, useState } from "react";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
};

export function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [point, setPoint] = useState({ x: "50%", y: "50%" });

  function move(event: PointerEvent<HTMLSpanElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPoint({
      x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
      y: `${((event.clientY - rect.top) / rect.height) * 100}%`
    });
  }

  const style: CSSProperties = {
    "--spot-x": point.x,
    "--spot-y": point.y
  } as CSSProperties;

  return (
    <span
      ref={ref}
      className={`spotlight-host${className ? ` ${className}` : ""}`}
      style={style}
      onPointerMove={move}
    >
      {children}
    </span>
  );
}
