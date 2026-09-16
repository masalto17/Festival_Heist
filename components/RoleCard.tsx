type Role = "abre" | "rompe" | "cierra";

type Props = {
  role: Role;
  artistName?: string;
  onClick: () => void;
};

const ROLE_INFO: Record<Role, { label: string; subtitle: string; accent: string }> = {
  abre: { label: "Abre", subtitle: "El primer latido", accent: "border-magenta" },
  rompe: { label: "Rompe", subtitle: "El momento más fuerte", accent: "border-lime" },
  cierra: { label: "Cierra", subtitle: "El final que queda", accent: "border-cyan" }
};

export function RoleCard({ role, artistName, onClick }: Props) {
  const { label, subtitle, accent } = ROLE_INFO[role];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[7.5rem] w-full flex-col items-center justify-center gap-1 rounded-sm border-2 bg-case px-2 py-3 text-center transition active:scale-95 ${accent}`}
    >
      <span className="font-display text-lg uppercase tracking-wide text-paper">{label}</span>
      <span className="text-[0.65rem] text-muted">{subtitle}</span>
      <span className="mt-2 text-2xl">
        {artistName ? (
          <span className="block px-1 font-display text-sm normal-case leading-tight text-paper">{artistName}</span>
        ) : (
          <span aria-hidden className="text-paper/40">
            +
          </span>
        )}
      </span>
    </button>
  );
}
