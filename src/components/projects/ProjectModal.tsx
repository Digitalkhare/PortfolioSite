import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../../data/projects";
import ArchitectureDiagram from "./ArchitectureDiagram";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  React.useEffect(() => {
    if (!project) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl"
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-white/10 p-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-neutral-300">{project.tagline}</p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto p-6">
              <section>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">
                  Overview
                </h4>
                <p className="mt-3 text-neutral-300">{project.description}</p>
              </section>

              <section className="mt-8">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">
                  Highlights
                </h4>
                <ul className="mt-3 space-y-2 text-neutral-300">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {project.architecture && (
                <section className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">
                    Architecture
                  </h4>
                  {project.id === "smartcommerce" ? (
                    <ArchitectureDiagram
                      title="Architecture (SmartCommerce)"
                      frontend="Frontend (React)"
                      coreApi="Core API (Spring Boot)"
                      chatbot="Chat & TTS (Spring Boot)"
                      recommender="Recommender (Python / FastAPI)"
                      data="Oracle Database (XE)"
                      frontendNote="Voice UI + chat + checkout"
                      coreApiNote="Commerce + orchestration"
                      chatbotNote="/api/chat + /tts"
                      recommenderNote="POST :8001/recommend"
                      dataNote="Users, products, orders"
                      footerNotes={[
                        "Voice input via react-speech-recognition; messages sent to /api/chat",
                        "Spring Boot calls Python recommender at http://localhost:8001/recommend",
                        "WebSockets (/ws, /topic/orders/{userId}) used for real-time order updates",
                        "Add timeouts + fallbacks (e.g., popular items) if recommender is unavailable",
                      ]}
                    />
                  ) : (
                    <ArchitectureDiagram
                      title="System Architecture (StreamVibe)"
                      frontend="Frontend (React)"
                      coreApi="API (Spring Boot)"
                      chatbot="Media Storage (Local FS)"
                      recommender="Cache Layer (Redis)"
                      data="PostgreSQL"
                      frontendNote="Browse + player UI"
                      coreApiNote="Metadata + file endpoints"
                      chatbotNote="Uploads stored under ./uploads"
                      recommenderNote="@Cacheable + evictions"
                      dataNote="Videos, users, categories"
                      footerNotes={[
                        "Videos served via /api/files/videos/{fileName} as an inline Resource (simple streaming)",
                        "Redis caching used for common reads (published/videoById/genre/topViewed)",
                        "Bucket4j rate limiting applied to /api/**; JWT + role checks for admin upload/publish",
                      ]}
                    />
                  )}

                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">
                        How it fits together
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                        {project.architecture.overview.map((o) => (
                          <li key={o} className="flex gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">
                        Services
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                        {project.architecture.services.map((s) => (
                          <li key={s} className="flex gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {project.architecture.notes?.length ? (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">
                        Engineering notes
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                        {project.architecture.notes.map((n) => (
                          <li key={n} className="flex gap-3">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/70" />
                            <span>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              )}

              <section className="mt-8">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">
                  Tech
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">
                  Links
                </h4>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
