type Props = {
  name: string;
  genre: string;
  origin: string;
  tagline: string;
  selected: boolean;
  onClick: () => void;
};

export function EmergingArtistCard({ name, genre, origin, tagline, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[9rem] w-full flex-col items-center justify-between gap-2 rounded-sm border-2 bg-case px-2 py-3 text-center transition active:scale-95 ${
        selected ? "border-lime" : "border-metal/60"
      }`}
    >
      <span aria-hidden className="text-2xl text-paper/40">
        ♪
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-display text-sm uppercase leading-tight text-paper">{name}</span>
        <span className="text-[0.6rem] uppercase tracking-wide text-muted">
          {genre} · {origin}
        </span>
      </span>
      <span className="text-[0.65rem] leading-tight text-paper/70">{tagline}</span>
    </button>
  );
}
