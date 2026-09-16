import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** leve inclinacion fisica, como un afiche pegado a mano */
  tilt?: "none" | "left" | "right";
  className?: string;
};

const TILT_CLASSES = {
  none: "",
  left: "-rotate-1",
  right: "rotate-1"
};

export function PaperCard({ children, tilt = "none", className = "" }: Props) {
  return (
    <div
      className={`bg-paper-texture rounded-sm border border-paper-aged/60 p-4 text-bg shadow-lg shadow-black/40 ${TILT_CLASSES[tilt]} ${className}`}
    >
      {children}
    </div>
  );
}
