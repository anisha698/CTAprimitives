import { ReactNode } from "react";

type PulseProps = {
  children: ReactNode;
  className?: string;
};

export function Pulse({ children, className }: PulseProps) {
  return <span className={`pulse-host${className ? ` ${className}` : ""}`}>{children}</span>;
}
