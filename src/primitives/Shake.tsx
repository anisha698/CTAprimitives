import { ReactNode } from "react";

type ShakeProps = {
  children: ReactNode;
  className?: string;
};

export function Shake({ children, className }: ShakeProps) {
  return <span className={`shake-host${className ? ` ${className}` : ""}`}>{children}</span>;
}
