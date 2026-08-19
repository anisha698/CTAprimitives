import { ReactNode, useEffect, useState } from "react";

type VariantProps = {
  id: string;
  variants: Record<string, ReactNode>;
  force?: string;
  onView?: (data: { experimentId: string; variant: string }) => void;
};

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function assignVariant(id: string, keys: string[], force?: string) {
  if (force && keys.includes(force)) return force;
  if (typeof window === "undefined") return keys[0];

  const storageKey = `experiment:${id}`;
  const existing = window.localStorage.getItem(storageKey);
  if (existing && keys.includes(existing)) return existing;

  const visitorKey = window.localStorage.getItem("experiment:visitor") ?? crypto.randomUUID();
  window.localStorage.setItem("experiment:visitor", visitorKey);

  const chosen = keys[hashString(visitorKey + id) % keys.length];
  window.localStorage.setItem(storageKey, chosen);
  return chosen;
}

export function Variant({ id, variants, force, onView }: VariantProps) {
  const keys = Object.keys(variants);
  const [selected, setSelected] = useState(() => assignVariant(id, keys, force));

  useEffect(() => {
    setSelected(assignVariant(id, keys, force));
  }, [id, force, keys.join("|")]);

  useEffect(() => {
    onView?.({ experimentId: id, variant: selected });
  }, [id, selected]);

  return <>{variants[selected] ?? variants[keys[0]]}</>;
}
