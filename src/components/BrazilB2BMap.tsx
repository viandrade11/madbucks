import { useMemo } from "react";

// Estados ativos no programa B2B (códigos UF)
const ACTIVE_STATES = ["SP", "RJ", "MG", "PR", "SC", "RS"];

// Coordenadas aproximadas (em viewBox 500x500) para marcadores
const STATE_MARKERS: Record<string, { x: number; y: number; label: string }> = {
  SP: { x: 285, y: 360, label: "São Paulo" },
  RJ: { x: 330, y: 350, label: "Rio de Janeiro" },
  MG: { x: 320, y: 320, label: "Minas Gerais" },
  PR: { x: 265, y: 390, label: "Paraná" },
  SC: { x: 270, y: 415, label: "Santa Catarina" },
  RS: { x: 245, y: 445, label: "Rio Grande do Sul" },
};

export const BrazilB2BMap = () => {
  const markers = useMemo(
    () => ACTIVE_STATES.map((uf) => ({ uf, ...STATE_MARKERS[uf] })),
    []
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-auto"
        aria-label="Mapa do Brasil mostrando estados onde a Madbucks já vende B2B"
      >
        {/* Silhueta simplificada do Brasil */}
        <path
          d="M180 80 Q220 60 260 70 Q310 75 340 95 Q370 110 380 145 Q395 165 400 195 Q415 215 420 245 Q415 270 405 290 Q420 310 410 335 Q395 360 370 370 Q360 395 345 410 Q325 430 305 440 Q285 460 260 460 Q235 470 215 460 Q195 455 180 440 Q160 425 150 405 Q135 385 130 360 Q115 340 110 315 Q100 290 105 265 Q95 240 100 215 Q105 190 115 170 Q125 145 140 125 Q155 100 180 80 Z"
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth="1.5"
        />

        {/* Marcadores dos estados ativos */}
        {markers.map(({ uf, x, y, label }) => (
          <g key={uf}>
            {/* Pulso animado */}
            <circle
              cx={x}
              cy={y}
              r="14"
              fill="hsl(var(--foreground))"
              opacity="0.15"
            >
              <animate
                attributeName="r"
                values="8;18;8"
                dur="2.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Ponto sólido */}
            <circle
              cx={x}
              cy={y}
              r="6"
              fill="hsl(var(--foreground))"
            />
            {/* Anel branco */}
            <circle
              cx={x}
              cy={y}
              r="3"
              fill="hsl(var(--background))"
            />
            <title>{label}</title>
          </g>
        ))}
      </svg>

      {/* Legenda dos estados */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
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
