import { ReactNode, useState } from "react";

type InlineProps = {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export function Inline({ trigger, children, className, onOpen, onClose }: InlineProps) {
  const [open, setOpen] = useState(false);

  function show() {
    setOpen(true);
    onOpen?.();
  }

  function hide() {
    setOpen(false);
    onClose?.();
  }

  return (
    <div className={className}>
      {!open ? (
        <span onClick={show}>{trigger}</span>
      ) : (
        <div>
          {children}
          <button type="button" className="inline-reset" onClick={hide}>Reset</button>
        </div>
      )}
    </div>
  );
}
