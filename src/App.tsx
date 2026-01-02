import Hero3D from "./components/Hero3D";
import ProjectsSection from "./components/projects/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Hero3D />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
