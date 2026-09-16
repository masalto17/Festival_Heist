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
};

export function PunkButton({ children, variant = "magenta", href, onClick, type = "button", className = "" }: Props) {
  const classes = `inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 font-display text-lg uppercase tracking-wide transition active:scale-95 ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
