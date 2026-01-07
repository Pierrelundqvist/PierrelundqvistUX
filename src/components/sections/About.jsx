import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const uxSkills = [ "Service design", "UX-Research", "User Research", "Gränssnittsdesign", "Prototyping", "Wireframing", "AI" ];
  const backendSkills = ["React", "TailwindCSS", "Node.js", "HTML", "CSS", "Figma", "Photoshop", "Blender"];
  const relevantCourses = [
    "Service design",
    "Prototyping & gränssnittsdesign",
    "Utvärderingsmetoder inom UX",
    "Webbutveckling – mobilapplikationsdesign",
    "Webbutveckling – webbplatsdesign",
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center tracking-tight">
          Om mig
        </h2>

        <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <p className="text-gray-300 mb-8 leading-relaxed">
            Passionerad UX-designer med expertis i att skapa skalbara digitala upplevelser och utveckla innovativa lösningar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl p-6 bg-white/5 border border-white/10 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">UX-Design</h3>
              <div className="flex flex-wrap gap-2">
                {uxSkills.map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-300 py-1.5 px-3 rounded-full text-sm ring-1 ring-blue-400/20
                               hover:bg-blue-500/20 hover:ring-blue-400/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6 bg-white/5 border border-white/10 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-300 py-1.5 px-3 rounded-full text-sm ring-1 ring-blue-400/20
                               hover:bg-blue-500/20 hover:ring-blue-400/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* Utbildning */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4">📖 Utbildning</h3>
            <ul className="space-y-3">
              <li>
                <p className="font-semibold leading-tight">Kandidat i UX-design</p>
                <p className="text-gray-400 leading-tight">
                  Högskolan i Skövde <span className="mx-1">•</span>
                  <time dateTime="2021">2021</time>–<time dateTime="2024">2024</time>
                </p>
              </li>

              {/* Relevanta kurser – en per rad */}
              <li className="mt-2">
                <h4 className="text-sm uppercase tracking-wide text-gray-400 mb-2">
                  Relevanta kurser
                </h4>
                <ul className="space-y-1.5">
                  {relevantCourses.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/80"></span>
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          {/* Erfarenhet, kanske på autoliv, kurr? */}
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold mb-4">🧰 Erfarenhet</h3>
            <div className="space-y-4 text-gray-300">
                <div>
                    <h4 className="font-semibold"> Stationsvärd och bemanningskoordinator på MTR Nordic (2018-Nu) </h4>
                    <p>Har hand om försäljning, information och säkerhet för resande inom tunnelbanan. Schemalägger personal i
                         alla spärrar i Stockholms tunnelbana.</p>
                </div>
                <div>
                    <h4 className="font-semibold"> Servitör på Le Petit Prince (2017-2018) </h4>
                    <p>Jobbade som servitör i Frankrike på ett hotell under skidsäsong fram tills April</p>
                </div>
            </div>
            {/* Lägg poster här när du vill */}
          </div>
        </div>
      </div>
      </RevealOnScroll>
    </section>
  );
};
