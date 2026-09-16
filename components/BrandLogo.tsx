type Props = {
  size?: "sm" | "lg";
  className?: string;
};

const SIZE = {
  sm: "text-2xl",
  lg: "text-5xl sm:text-6xl"
};

export function BrandLogo({ size = "lg", className = "" }: Props) {
  return (
    <span className={`inline-flex flex-col font-display uppercase leading-[0.85] tracking-tight ${SIZE[size]} ${className}`}>
      <span className="text-paper">Festival</span>
      <span className="text-magenta">Heist</span>
    </span>
  );
}
