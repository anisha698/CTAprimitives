import { Children, ReactNode, useState } from "react";

type SequenceProps = {
  children: ReactNode;
  className?: string;
  loop?: boolean;
  advanceOnClick?: boolean;
  onStepChange?: (index: number) => void;
};

export function Sequence({
  children,
  className,
  loop = false,
  advanceOnClick = true,
  onStepChange
}: SequenceProps) {
  const steps = Children.toArray(children);
  const [index, setIndex] = useState(0);

  function goTo(nextIndex: number) {
    setIndex(nextIndex);
    onStepChange?.(nextIndex);
  }

  function next() {
    const isLast = index === steps.length - 1;
    goTo(isLast ? (loop ? 0 : index) : index + 1);
  }

  function previous() {
    goTo(Math.max(0, index - 1));
  }

  return (
    <div className={className}>
      <div onClick={advanceOnClick ? next : undefined}>{steps[index]}</div>
      <div className="sequence-controls" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={previous} disabled={index === 0} aria-label="Previous step">←</button>
        <span>{index + 1} / {steps.length}</span>
        <button type="button" onClick={next} disabled={!loop && index === steps.length - 1} aria-label="Next step">→</button>
      </div>
    </div>
  );
}
