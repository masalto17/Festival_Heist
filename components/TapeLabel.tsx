import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "dark" | "magenta";
  className?: string;
};

const TONE_CLASSES = {
  dark: "bg-case text-paper",
  magenta: "bg-magenta text-paper"
};

/** Etiqueta corta tipo cinta pegada — estados breves (ej. "Patrocinado", "Nuevo"). */
export function TapeLabel({ children, tone = "dark", className = "" }: Props) {
  return (
    <span
      className={`inline-block -rotate-2 rounded-[2px] px-2 py-0.5 text-xs font-bold uppercase tracking-wide shadow-sm shadow-black/30 ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
