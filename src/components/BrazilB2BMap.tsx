import { useMemo } from "react";

// Estados ativos no programa B2B (códigos UF)
const ACTIVE_STATES = ["SP", "RJ", "MG", "PR", "SC", "RS"];

// Coordenadas (em viewBox 600x600) calibradas para o path do Brasil abaixo
const STATE_MARKERS: Record<string, { x: number; y: number; label: string }> = {
  MG: { x: 410, y: 360, label: "Minas Gerais" },
  RJ: { x: 440, y: 405, label: "Rio de Janeiro" },
  SP: { x: 380, y: 410, label: "São Paulo" },
  PR: { x: 350, y: 445, label: "Paraná" },
  SC: { x: 355, y: 480, label: "Santa Catarina" },
  RS: { x: 320, y: 520, label: "Rio Grande do Sul" },
};

// Path simplificado mas reconhecível do Brasil (viewBox 600x600)
const BRAZIL_PATH =
  "M255 70 L295 60 L335 75 L380 70 L420 90 L445 120 L470 105 L495 125 L505 160 L490 195 L510 220 L525 255 L520 290 L500 315 L515 345 L495 375 L470 395 L455 425 L470 450 L450 470 L420 460 L395 480 L370 470 L345 490 L325 525 L300 540 L275 535 L255 510 L240 480 L220 470 L200 445 L185 415 L170 380 L155 345 L140 310 L130 275 L120 240 L115 205 L125 175 L145 150 L165 125 L185 105 L210 90 L235 78 Z";

export const BrazilB2BMap = () => {
  const markers = useMemo(
    () => ACTIVE_STATES.map((uf) => ({ uf, ...STATE_MARKERS[uf] })),
    []
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mapa do Brasil mostrando estados onde a Madbucks já vende B2B"
      >
        {/* Silhueta do Brasil */}
        <path
          d={BRAZIL_PATH}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Marcadores dos estados ativos */}
        {markers.map(({ uf, x, y, label }) => (
          <g key={uf}>
            <circle cx={x} cy={y} r="14" fill="hsl(var(--foreground))" opacity="0.15">
              <animate attributeName="r" values="8;20;8" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx={x} cy={y} r="7" fill="hsl(var(--foreground))" />
            <circle cx={x} cy={y} r="3" fill="hsl(var(--background))" />
            <title>{label}</title>
          </g>
        ))}
      </svg>

      {/* Legenda dos estados */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {markers.map(({ uf, label }) => (
          <span
            key={uf}
            className="inline-flex items-center gap-1.5 bg-foreground text-background text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-background" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};
