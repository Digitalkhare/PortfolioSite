import React from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "../../data/projects";

export default function ProjectsSection() {
  const [open, setOpen] = React.useState<Project | null>(null);

  return (
    <section id="projects" className="mt-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Projects</h2>
          <p className="mt-2 max-w-2xl text-neutral-300">
            Two production-style apps focused on backend strength (Spring Boot)
            and modern UX (React).
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setOpen} />
        ))}
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
