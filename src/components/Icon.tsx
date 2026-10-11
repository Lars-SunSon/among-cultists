import type { ReactElement } from "react";

// Handgezeichnetes, einheitliches Icon-Set (Strich, keine Emoji, kein Icon-Font).
// Ein Strichgewicht, runde Kappen/Ecken – passend zur Feder-Illustration der Vorlage.

export type IconName =
  | "lebend"
  | "geist"
  | "kultist"
  | "abstimmung"
  | "strom"
  | "kamera"
  | "pruefen"
  | "geheimtuer"
  | "bewegen"
  | "runde"
  | "setup"
  | "status"
  | "buch"
  | "plus"
  | "minus"
  | "check"
  | "close"
  | "chevronRight"
  | "chevronLeft"
  | "portal"
  | "waage"
  | "warnung"
  | "haken";

const paths: Record<IconName, ReactElement> = {
  lebend: (
    <path d="M12 20.2C7.4 16.6 3.6 13.1 3.6 9.1 3.6 6.4 5.7 4.3 8.4 4.3c1.6 0 3 .8 3.6 2 .6-1.2 2-2 3.6-2 2.7 0 4.8 2.1 4.8 4.8 0 4-3.8 7.5-8.4 11.1Z" />
  ),
  geist: (
    <>
      <path d="M12 3.5v3" />
      <path d="M9 5.2h6" />
      <path d="M6.5 20.5V12a5.5 5.5 0 0 1 11 0v8.5" />
      <path d="M6.5 20.5c1 .9 1.9-.9 2.9 0s1.9.9 2.9 0 1.9.9 2.9 0 1.9.9 2.8 0" />
    </>
  ),
  kultist: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.2c1.8 0 2.7 1.3 2.7 2.6 0 2-2.7 2.2-2.7 4.2 0 1 .6 1.6 1.4 1.6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  abstimmung: (
    <>
      <path d="M12 3.6 4 8v1.6h16V8Z" />
      <path d="M5.2 9.6v8.4M9.4 9.6v8.4M14.6 9.6v8.4M18.8 9.6v8.4" />
      <path d="M3.4 20.4h17.2" />
    </>
  ),
  strom: <path d="M13 3 5 13.2h5.4L10.6 21 19 9.8h-5.6Z" />,
  kamera: (
    <>
      <path d="M4 8.4h3l1.4-2h7.2l1.4 2h3v11.2H4Z" />
      <circle cx="12" cy="14" r="3.4" />
    </>
  ),
  pruefen: (
    <>
      <circle cx="10.4" cy="10.4" r="6" />
      <path d="M14.8 14.8 20 20" />
    </>
  ),
  geheimtuer: (
    <>
      <rect x="6" y="3.6" width="12" height="16.8" rx="0.6" />
      <path d="M14.4 12v.1" />
      <path d="M6 20.4h12" />
    </>
  ),
  bewegen: (
    <>
      <circle cx="14.2" cy="4.6" r="1.6" />
      <path d="M11 21l1.6-6.4-2.2-2 .8-4.6 3.4-1.4 2.6 2.6 3 .9M9.4 12.6 6 14l-1.4 4" />
    </>
  ),
  runde: (
    <>
      <circle cx="12" cy="12.4" r="8" />
      <path d="M12 7.6v4.8l3.4 2" />
      <path d="M9.6 3.2h4.8" />
    </>
  ),
  setup: (
    <>
      <path d="M4 20.5V6.2A2.2 2.2 0 0 1 6.2 4h6.4a2.2 2.2 0 0 1 2.2 2.2v14.3" />
      <path d="M4 20.5h10.8" />
      <path d="M17.4 9.4 20 12l-5.6 5.6-2.9.7.7-2.9Z" />
    </>
  ),
  status: (
    <path d="M3.2 13h3.4l2-5.4 3.6 10.8 2.4-8.6 1.6 3.2h4.6" />
  ),
  buch: (
    <>
      <path d="M12 6.4c-1.6-1.4-4-2-7.4-2v13.4c3.4 0 5.8.6 7.4 2 1.6-1.4 4-2 7.4-2V4.4c-3.4 0-5.8.6-7.4 2Z" />
      <path d="M12 6.4v13.4" />
    </>
  ),
  plus: <path d="M12 4.4v15.2M4.4 12h15.2" />,
  minus: <path d="M4.4 12h15.2" />,
  check: <path d="M4.4 12.6 9.2 17.4 19.6 6.6" />,
  close: <path d="M5.6 5.6 18.4 18.4M18.4 5.6 5.6 18.4" />,
  chevronRight: <path d="M9 4.8 16.2 12 9 19.2" />,
  chevronLeft: <path d="M15 4.8 7.8 12 15 19.2" />,
  portal: (
    <>
      <ellipse cx="12" cy="12" rx="7.2" ry="9" />
      <ellipse cx="12" cy="12" rx="3.4" ry="5.2" />
    </>
  ),
  waage: (
    <>
      <path d="M12 3.6v16.8M7 20.4h10" />
      <path d="M4.4 8.4h6M13.6 8.4h6" />
      <path d="M4.4 8.4 2.4 13a2.4 2.4 0 0 0 4.4 0Z" />
      <path d="M19.6 8.4 17.6 13a2.4 2.4 0 0 0 4.4 0Z" />
    </>
  ),
  warnung: (
    <>
      <path d="M12 4 3 20h18Z" />
      <path d="M12 10.4v4M12 17v.1" />
    </>
  ),
  haken: <path d="M4.4 12.6 9.2 17.4 19.6 6.6" />,
};

export function Icon({
  name,
  size = 22,
  className,
  title,
}: {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
