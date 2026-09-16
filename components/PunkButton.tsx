import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "magenta" | "lime" | "cyan" | "orange";

const VARIANT_CLASSES: Record<Variant, string> = {
  magenta: "bg-magenta text-paper",
  cyan: "bg-cyan text-paper",
  orange: "bg-challenge-orange text-paper",
  // el lima es muy claro — texto oscuro para mantener contraste legible en mobile
  lime: "bg-lime text-bg"
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

export function PunkButton({
  children,
  variant = "magenta",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false
}: Props) {
  const classes = `inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 font-display text-lg uppercase tracking-wide transition active:scale-95 ${VARIANT_CLASSES[variant]} ${
    disabled ? "opacity-40 pointer-events-none" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
