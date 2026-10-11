import { useEffect, useRef, useState } from "react";

// Persistenz nur im eigenen Browser/Gerät – bewusst kein Sync zwischen Handys.
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Speicher voll oder gesperrt – Zustand bleibt nur für die Session erhalten. */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
