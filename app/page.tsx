import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-between px-6 py-10 text-center">
      <header className="w-full pt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">MVP en preparación</p>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="font-display text-6xl leading-none tracking-tight text-ink">
          FESTIVAL<br />
          <span className="text-neon-magenta">HEIST</span>
        </h1>
        <p className="max-w-xs text-balance text-base text-ink/80">
          Armá tu festival ideal. Elegí quién abre, quién rompe la noche y quién la cierra.
          Compartí el póster y desafiá a un amigo a adivinarlo.
        </p>

        <Link
          href="/crear"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-neon-lima px-8 py-4 font-display text-xl uppercase tracking-wide text-bg transition active:scale-95"
        >
          Armá tu festival
        </Link>
      </section>

      <footer className="w-full pb-4 text-xs text-muted">
        Powered by <span className="text-ink/70">MasAlto</span>
      </footer>
    </main>
  );
}
