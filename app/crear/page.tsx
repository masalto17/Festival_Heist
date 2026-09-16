"use client";

import { useMemo, useState } from "react";
import { PunkButton } from "@/components/PunkButton";
import { RoleCard } from "@/components/RoleCard";
import { EmergingArtistCard } from "@/components/EmergingArtistCard";
import { TapeLabel } from "@/components/TapeLabel";
import artistasData from "@/data/artistas.json";
import emergentesData from "@/data/emergentes.json";
import microdecisionesData from "@/data/microdecisiones.json";

type RoleKey = "abre" | "rompe" | "cierra";

const ROLES: RoleKey[] = ["abre", "rompe", "cierra"];
const STEP_LABELS = ["Lineup", "Emergente", "Estilo", "Confirmar"];

export default function Crear() {
  const [step, setStep] = useState(1);
  const [lineup, setLineup] = useState<Record<RoleKey, string | null>>({
    abre: null,
    rompe: null,
    cierra: null
  });
  const [pickerOpenFor, setPickerOpenFor] = useState<RoleKey | null>(null);
  const [emergenteId, setEmergenteId] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string | null>>(
    Object.fromEntries(microdecisionesData.preguntas.map((p) => [p.id, null]))
  );

  const pool = useMemo(
    () => [...artistasData.internacionales, ...artistasData.argentinos],
    []
  );

  const lineupCompleto = ROLES.every((r) => lineup[r] !== null);
  const respuestasCompletas = Object.values(respuestas).every((v) => v !== null);
  const emergenteElegido = emergentesData.artistas.find((a) => a.id === emergenteId);

  function elegirArtista(role: RoleKey, name: string) {
    setLineup((prev) => ({ ...prev, [role]: name }));
    setPickerOpenFor(null);
  }

  function irA(nextStep: number) {
    setStep(nextStep);
    setPickerOpenFor(null);
  }

  return (
    <main className="bg-grain min-h-dvh bg-bg px-5 py-8 text-paper">
      <div className="z-10 relative mx-auto flex max-w-md flex-col gap-6">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => irA(step - 1)}
                aria-label="Volver"
                className="text-lg text-paper/70"
              >
                ←
              </button>
            )}
            <h1 className="font-display text-2xl uppercase tracking-tight">Armá tu festival</h1>
          </div>

          <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-wide text-muted">
            {STEP_LABELS.map((label, i) => (
              <span
                key={label}
                className={`flex items-center gap-2 ${i + 1 === step ? "text-lime" : ""}`}
              >
                {i > 0 && <span className="text-metal">—</span>}
                {i + 1}. {label}
              </span>
            ))}
          </div>
        </header>

        {step === 1 && (
          <section className="flex flex-col gap-4">
            <div>
              <h2 className="font-display text-xl">Elegí tus artistas</h2>
              <p className="text-sm text-muted">
                Completá tu lineup con tres roles. Cada rol le da personalidad a tu festival.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((role) => (
                <RoleCard
                  key={role}
                  role={role}
                  artistName={lineup[role] ?? undefined}
                  onClick={() => setPickerOpenFor(pickerOpenFor === role ? null : role)}
                />
              ))}
            </div>

            {pickerOpenFor && (
              <TapeLabel className="w-fit">Elegí para {ROLES_LABEL[pickerOpenFor]}</TapeLabel>
            )}
            {pickerOpenFor && (
              <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto rounded-sm bg-case/60 p-2">
                {pool.map((artista) => (
                  <button
                    key={artista.id}
                    type="button"
                    onClick={() => elegirArtista(pickerOpenFor, artista.name)}
                    className="rounded-sm bg-case px-2 py-2 text-left text-sm text-paper/90 transition active:scale-95"
                  >
                    {artista.name}
                    <span className="block text-[0.6rem] uppercase text-muted">{artista.genre}</span>
                  </button>
                ))}
              </div>
            )}

            <PunkButton variant="lime" onClick={() => irA(2)} className={!lineupCompleto ? "opacity-40 pointer-events-none" : ""}>
              Seguir
            </PunkButton>
          </section>
        )}

        {step === 2 && (
          <section className="flex flex-col gap-4">
            <div>
              <h2 className="font-display text-xl">Descubrí emergentes</h2>
              <p className="text-sm text-muted">
                Sumá un artista emergente a tu festival. Es opcional — podés omitirlo.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {emergentesData.artistas.map((artista) => (
                <EmergingArtistCard
                  key={artista.id}
                  name={artista.name}
                  genre={artista.genre}
                  origin={artista.origin}
                  tagline={artista.tagline}
                  selected={emergenteId === artista.id}
                  onClick={() => setEmergenteId(emergenteId === artista.id ? null : artista.id)}
                />
              ))}
            </div>

            <PunkButton variant="lime" onClick={() => irA(3)}>
              {emergenteId ? "Seguir" : "Omitir y seguir"}
            </PunkButton>
          </section>
        )}

        {step === 3 && (
          <section className="flex flex-col gap-4">
            <div>
              <h2 className="font-display text-xl">Tres decisiones rápidas</h2>
              <p className="text-sm text-muted">Van a armar el desafío para tus amigos.</p>
            </div>

            {microdecisionesData.preguntas.map((pregunta) => (
              <div key={pregunta.id} className="flex flex-col gap-2">
                <p className="text-sm text-paper/90">{pregunta.texto}</p>
                <div className="flex flex-col gap-2">
                  {pregunta.opciones.map((opcion) => (
                    <button
                      key={opcion}
                      type="button"
                      onClick={() =>
                        setRespuestas((prev) => ({ ...prev, [pregunta.id]: opcion }))
                      }
                      className={`rounded-sm border-2 px-3 py-2 text-left text-sm transition active:scale-95 ${
                        respuestas[pregunta.id] === opcion
                          ? "border-lime text-paper"
                          : "border-metal/50 text-paper/80"
                      }`}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <PunkButton
              variant="lime"
              onClick={() => irA(4)}
              className={!respuestasCompletas ? "opacity-40 pointer-events-none" : ""}
            >
              Seguir
            </PunkButton>
          </section>
        )}

        {step === 4 && (
          <section className="flex flex-col gap-4">
            <div>
              <h2 className="font-display text-xl">Tu festival</h2>
              <p className="text-sm text-muted">Así quedó armado. El póster compartible llega en la próxima etapa.</p>
            </div>

            <div className="flex flex-col gap-2 rounded-sm bg-case p-3">
              <p className="text-xs uppercase tracking-wide text-muted">Lineup</p>
              {ROLES.map((role) => (
                <p key={role} className="text-sm">
                  <span className="text-paper/60">{ROLES_LABEL[role]}:</span> {lineup[role]}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-2 rounded-sm bg-case p-3">
              <p className="text-xs uppercase tracking-wide text-muted">Emergente</p>
              <p className="text-sm">{emergenteElegido ? emergenteElegido.name : "Ninguno elegido"}</p>
            </div>

            <div className="flex flex-col gap-2 rounded-sm bg-case p-3">
              <p className="text-xs uppercase tracking-wide text-muted">Tus decisiones</p>
              {microdecisionesData.preguntas.map((p) => (
                <p key={p.id} className="text-sm">
                  <span className="text-paper/60">{p.texto}</span> {respuestas[p.id]}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

const ROLES_LABEL: Record<RoleKey, string> = {
  abre: "Abre",
  rompe: "Rompe",
  cierra: "Cierra"
};
