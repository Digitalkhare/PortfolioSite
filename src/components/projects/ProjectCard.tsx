import React from "react";
import type { Project } from "../../data/projects";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    const rotateY = (px - 0.5) * 10; // subtle
    const rotateX = (0.5 - py) * 10;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`,
    });
  }

  function handleLeave() {
    setStyle({
      transform:
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
    });
  }

  function getLiveHref() {
    return (
      project.links.find((l) => l.label.toLowerCase().includes("live"))?.href ||
      ""
    );
  }
  function hasLiveDemo() {
    return project.links.some((l) => l.label.toLowerCase().includes("live"));
  }

  return (
    <button
      onClick={() => onOpen(project)}
      className="group text-left"
      aria-label={`Open case study for ${project.title}`}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative h-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg transition-transform duration-200 will-change-transform"
        style={style}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-white">
                {project.title}
              </h3>

              {hasLiveDemo() && (
                <span className="flex items-center gap-1 rounded-full border border-green-400/30 bg-green-400/10 px-2 py-0.5 text-xs font-medium text-green-300">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-neutral-300">{project.tagline}</p>
          </div>

          {/* <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-neutral-200">
            Case Study
          </span> */}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 6).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-sm text-neutral-300 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const href = getLiveHref();
              if (href) window.open(href, "_blank", "noreferrer");
            }}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
            aria-label={`Open live demo for ${project.title}`}
          >
            Live Demo
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            aria-label={`Open case study for ${project.title}`}
          >
            Case Study
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>
    </button>
  );
}
