import { CSSProperties, ReactNode } from "react";

type StickyProps = {
  children: ReactNode;
  top?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function Sticky({ children, top = 16, className, style }: StickyProps) {
  return (
    <div className={className} style={{ position: "sticky", top, zIndex: 10, ...style }}>
      {children}
    </div>
  );
}
