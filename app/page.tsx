import { BrandLogo } from "@/components/BrandLogo";
import { PunkButton } from "@/components/PunkButton";
import { TapeLabel } from "@/components/TapeLabel";

export default function Home() {
  return (
    <main className="bg-grain bg-landing-backstage mx-auto flex min-h-dvh max-w-md flex-col items-center justify-between px-6 py-10 text-center">
      <header className="z-10 w-full pt-4">
        <TapeLabel>MVP en preparación</TapeLabel>
      </header>

      <section className="z-10 flex flex-1 flex-col items-center justify-center gap-6">
        <BrandLogo />
        <p className="max-w-xs text-balance text-base text-paper/80">
          Armá tu festival ideal. Elegí quién abre, quién rompe la noche y quién la cierra.
          Compartí el póster y desafiá a un amigo a adivinarlo.
        </p>

        <PunkButton href="/crear" variant="lime" className="mt-4">
          Armá tu festival
        </PunkButton>
      </section>

      <footer className="z-10 w-full pb-4 text-xs text-muted">
        Powered by <span className="text-paper/70">MasAlto</span>
      </footer>
    </main>
  );
}
