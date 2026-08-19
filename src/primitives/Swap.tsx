import { ReactNode, useEffect, useRef, useState } from "react";

type SwapTrigger = "hover" | "click" | "delay" | "visibility";

type SwapProps = {
  from: ReactNode;
  to: ReactNode;
  trigger?: SwapTrigger | SwapTrigger[];
  delay?: number;
  className?: string;
  onSwap?: (active: boolean) => void;
};

function toList(trigger: SwapTrigger | SwapTrigger[]) {
  return Array.isArray(trigger) ? trigger : [trigger];
}

function mediaTarget(element: HTMLElement) {
  return element.closest("button, a") ?? element;
}

export function Swap({ from, to, trigger = "hover", delay = 1200, className, onSwap }: SwapProps) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const onSwapRef = useRef(onSwap);
  onSwapRef.current = onSwap;

  function update(value: boolean | ((previous: boolean) => boolean)) {
    setActive((previous) => {
      const next = typeof value === "function" ? value(previous) : value;
      if (next !== previous) onSwapRef.current?.(next);
      return next;
    });
  }

  const triggers = toList(trigger);

  useEffect(() => {
    if (!triggers.includes("delay")) return;
    const timer = window.setTimeout(() => update(true), delay);
    return () => window.clearTimeout(timer);
  }, [trigger, delay]);

  useEffect(() => {
    if (!triggers.includes("visibility")) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) update(true);
    }, { threshold: 0.6 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger]);

  useEffect(() => {
    const hover = triggers.includes("hover");
    const click = triggers.includes("click");
    if (!hover && !click) return;

    const element = ref.current;
    if (!element) return;
    const target = mediaTarget(element);

    const onEnter = () => hover && update(true);
    const onLeave = () => hover && update(false);
    const onClick = () => {
      if (click) update((value) => !value);
      else update(true);
    };

    if (hover) {
      target.addEventListener("pointerenter", onEnter);
      target.addEventListener("pointerleave", onLeave);
      target.addEventListener("mouseenter", onEnter);
      target.addEventListener("mouseleave", onLeave);
    }
    target.addEventListener("click", onClick);

    return () => {
      target.removeEventListener("pointerenter", onEnter);
      target.removeEventListener("pointerleave", onLeave);
      target.removeEventListener("mouseenter", onEnter);
      target.removeEventListener("mouseleave", onLeave);
      target.removeEventListener("click", onClick);
    };
  }, [trigger]);

  return (
    <span ref={ref} className={className}>
      {active ? to : from}
    </span>
  );
}
