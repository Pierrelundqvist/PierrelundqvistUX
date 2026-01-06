// src/components/sections/Projects.jsx
import { RevealOnScroll } from "../RevealOnScroll";
import { Link } from "react-router-dom";

// IMPORTERA COVERS (vägen stämmer från components/sections/)
import exCover from "../../assets/projects/examensarbete/cover.jpg";
import kurrCover from "../../assets/projects/kurr/cover.jpg";
import distCoverReal from "../../assets/projects/forskningsmetoder/cover.jpg";
import aiCoverReal from "../../assets/projects/aidesign/cover.jpg";

// Covers som används
const distCover = distCoverReal;
const aiCover = aiCoverReal;

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Mina Projekt
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Examensarbete */}
            <div className="group rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={exCover}
                  alt="Examensarbete cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Examensarbete</h3>
                <p className="text-gray-400 mb-4">
                  Spelifiering i bilsimulator – säkerhet och beteende
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Figma", "Unreal engine", "Simulator", "Prototyp"].map(
                    (tech, key) => (
                      <span
                        key={key}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <Link
                  to="/projects/examensarbete"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 inline-block"
                >
                  Visa Projekt →
                </Link>
              </div>
            </div>

            {/* Kurr */}
            <div className="group rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={kurrCover}
                  alt="Kurr cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Kurr</h3>
                <p className="text-gray-400 mb-4">
                  AI-drivna receptflöden – research och prototyp
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Figma", "UX", "Användaranalys", "Prototyp"].map(
                    (tech, key) => (
                      <span
                        key={key}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <Link
                  to="/projects/kurr"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 inline-block"
                >
                  Visa Projekt →
                </Link>
              </div>
            </div>

            {/* Forskningsmetoder */}
            <div className="group rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={distCover}
                  alt="Forskningsmetoder cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Forskningsmetoder</h3>
                <p className="text-gray-400 mb-4">
                  Eyetracking i fält – jämförelse av expresskassor
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["UX Research", "Eyetracking", "Self-Service Machine", "Fältstudie"].map(
                    (tech, key) => (
                      <span
                        key={key}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <Link
                  to="/projects/forskningsmetoder"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 inline-block"
                >
                  Visa Projekt →
                </Link>
              </div>
            </div>

            {/* AI och Design */}
            <div className="group rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={aiCover}
                  alt="AI och Design cover"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">AI och Design</h3>
                <p className="text-gray-400 mb-4">
                  Midjourney och Blender – experiment och design
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Midjourney", "Blender", "NERF", "Stable Diffusion"].map(
                    (tech, key) => (
                      <span
                        key={key}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <Link
                  to="/projects/ai-och-design"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4 inline-block"
                >
                  Visa Projekt →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
