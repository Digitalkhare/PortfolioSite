//import React from "react";

type Props = {
  title?: string;
  // Labels
  frontend?: string;
  coreApi?: string;
  chatbot?: string;
  recommender?: string;
  data?: string;

  // Small notes under boxes (optional)
  frontendNote?: string;
  coreApiNote?: string;
  chatbotNote?: string;
  recommenderNote?: string;
  dataNote?: string;
  footerNotes?: string[];
};

export default function ArchitectureDiagram({
  title = "Mini Architecture Diagram",
  frontend = "Frontend (React)",
  coreApi = "Core API (Spring Boot)",
  chatbot = "AI Chatbot (Python)",
  recommender = "Recommender (Python)",
  data = "PostgreSQL",
  frontendNote = "UI + calls API",
  coreApiNote = "Auth • Catalog • Cart • Orders",
  chatbotNote = "Voice → intent → response",
  recommenderNote = "Recommendations endpoint",
  dataNote = "Core data store",
  footerNotes,
}: Props) {
  // SVG viewBox coords (easy layout, scales nicely)
  // Boxes:
  //   Frontend (top left) -> Core API (top right)
  //   Core API -> Chatbot (bottom left)
  //   Core API -> Recommender (bottom right)
  //   Core API -> DB (right side)
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-neutral-300">REST calls + fallbacks</p>
      </div>

      <div className="mt-3 w-full overflow-hidden">
        <svg
          viewBox="0 0 900 420"
          className="h-auto w-full"
          role="img"
          aria-label="Microservice architecture diagram"
        >
          {/* Background grid (very subtle) */}
          <defs>
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            </pattern>

            {/* Arrow marker */}
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.55)" />
            </marker>

            {/* Box shadow-ish */}
            <filter
              id="softShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="10"
                floodColor="rgba(0,0,0,0.55)"
              />
            </filter>
          </defs>

          <rect x="0" y="0" width="900" height="420" fill="url(#grid)" />

          {/* Connections */}
          {/* Frontend -> Core API */}
          <path
            d="M 290 120 C 360 120, 390 120, 460 120"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2.5"
            markerEnd="url(#arrow)"
          />
          <text x="360" y="105" fontSize="14" fill="rgba(255,255,255,0.55)">
            HTTPS / REST
          </text>

          {/* Core API -> Chatbot */}
          <path
            d="M 610 180 C 610 245, 330 235, 330 275"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2.5"
            markerEnd="url(#arrow)"
          />
          <text x="500" y="235" fontSize="14" fill="rgba(255,255,255,0.55)">
            /chat
          </text>

          {/* Core API -> Recommender */}
          <path
            d="M 610 180 C 610 245, 700 235, 700 275"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2.5"
            markerEnd="url(#arrow)"
          />
          <text x="635" y="235" fontSize="14" fill="rgba(255,255,255,0.55)">
            /recommend
          </text>

          {/* Core API -> DB */}
          <path
            d="M 740 135 C 800 135, 815 135, 855 135"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2.5"
            markerEnd="url(#arrow)"
          />
          <text x="785" y="118" fontSize="14" fill="rgba(255,255,255,0.55)">
            SQL
          </text>

          {/* Boxes */}
          <Box
            x={60}
            y={70}
            w={230}
            h={130}
            title={frontend}
            note={frontendNote}
          />
          <Box
            x={460}
            y={60}
            w={280}
            h={140}
            title={coreApi}
            note={coreApiNote}
          />
          <Box
            x={190}
            y={260}
            w={280}
            h={130}
            title={chatbot}
            note={chatbotNote}
          />
          <Box
            x={520}
            y={260}
            w={280}
            h={130}
            title={recommender}
            note={recommenderNote}
          />
          <DB x={860} y={70} title={data} note={dataNote} />
        </svg>
      </div>

      {footerNotes?.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-300">
          {footerNotes.map((note) => (
            <span
              key={note}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1"
            >
              {note}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Box({
  x,
  y,
  w,
  h,
  title,
  note,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  note?: string;
}) {
  return (
    <g filter="url(#softShadow)">
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="20"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <text x={x + 18} y={y + 40} fontSize="20" fill="white" fontWeight="600">
        {title}
      </text>
      {note ? (
        <text x={x + 18} y={y + 70} fontSize="14" fill="rgba(255,255,255,0.7)">
          {note}
        </text>
      ) : null}
    </g>
  );
}

function DB({
  x,
  y,
  title,
  note,
}: {
  x: number;
  y: number;
  title: string;
  note?: string;
}) {
  // Simple DB cylinder
  return (
    <g filter="url(#softShadow)">
      <ellipse
        cx={x}
        cy={y}
        rx="35"
        ry="12"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <rect
        x={x - 35}
        y={y}
        width="70"
        height="80"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <ellipse
        cx={x}
        cy={y + 80}
        rx="35"
        ry="12"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      <text x={x - 28} y={y + 40} fontSize="16" fill="white" fontWeight="600">
        DB
      </text>
      <text x={x - 48} y={y + 62} fontSize="12" fill="rgba(255,255,255,0.75)">
        {title}
      </text>
      {note ? (
        <text x={x - 48} y={y + 80} fontSize="12" fill="rgba(255,255,255,0.6)">
          {note}
        </text>
      ) : null}
    </g>
  );
}
