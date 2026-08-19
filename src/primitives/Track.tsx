import { ReactNode } from "react";

type TrackProps = {
  children: ReactNode;
  className?: string;
};

export function Track({ children, className }: TrackProps) {
  return (
    <button type="button" className={`cta track-cta${className ? ` ${className}` : ""}`}>
      <span className="track-fill" />
      <span className="track-label">{children}</span>
    </button>
  );
}
