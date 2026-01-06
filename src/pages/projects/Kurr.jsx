// src/pages/projects/Kurr.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ====== Bilder för Kurr ======
import profile from "../../assets/profilbild.jpg";
import profile2 from "../../assets/profilbild2.jpg";
import cover from "../../assets/projects/kurr/cover.jpg";
import shot1 from "../../assets/projects/kurr/shot1.jpg";
import shot2 from "../../assets/projects/kurr/shot2.jpg";
import shot3 from "../../assets/projects/kurr/shot3.jpg";
import telefon from "../../assets/projects/kurr/telefon.gif"; // GIF-import
import affinitet from "../../assets/projects/kurr/affinitet.jpg"; // Affinitetsdiagram-bild

// Samma card som i Examensarbete.jsx
const Card = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// Liten komponent för teammedlemmar
const TeamMember = ({ imgSrc, name, role, alt }) => (
  <div className="flex items-center gap-3">
    <img
      src={imgSrc}
      alt={alt ?? `Profilbild ${name}`}
      className="h-10 w-10 rounded-full object-cover ring-1 ring-white/20"
      loading="lazy"
    />
    <div className="leading-tight">
      <div className="text-sm font-semibold tracking-wide text-white uppercase">
        {name}
      </div>
      <div className="text-xs text-gray-400 italic">{role}</div>
    </div>
  </div>
);

export const Kurr = () => {
  const tags = ["UX Research", "Prototyp", "UX/UI", "User flow", "Figma", "2023"];

  const team = [
    { name: "Pierre Lundqvist", role: "UX/UI-Designer", img: profile },
    { name: "Jonatan Akyol", role: "UX/UI-Designer", img: profile2 },
  ];

  const galleryImages = [
    { src: shot1, alt: "Kurr skärmdump 1" },
    { src: shot2, alt: "Kurr skärmdump 2" },
    { src: shot3, alt: "Kurr skärmdump 3" },
  ];

  // Lightbox state
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  // Karusell-state
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  // Stäng med ESC + lås scroll när modalen är öppen
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox.open]);

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div>
          {/* Tillbaka */}
          <Link to="/#projects" className="text-blue-400 hover:text-blue-300">
            ← Tillbaka till projekt
          </Link>

          {/* Titel */}
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Kurr Foodtech Startup
          </h1>

          {/* Team */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            {team.map((m) => (
              <TeamMember
                key={m.name}
                imgSrc={m.img}
                name={m.name}
                role={m.role}
              />
            ))}
          </div>

          {/* Ingress */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            Kurr är ett teknikföretag som förenklar middagsval med AI-drivna,
            personliga förslag. Genom att använda Tinders swipe-funktionalitet
            och recept från populära sociala medieskapare löser Kurr den
            dagliga frågan: "Vad ska vi äta?"
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Vår forskning undersökte hur användare lagrar recept och vilka
            verktyg de kan behöva.
          </p>

          {/* Taggar */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((t) => (
              <span
                key={t}
                className="bg-blue-500/10 text-blue-300 py-1.5 px-3 rounded-full text-sm ring-1 ring-blue-400/20 hover:bg-blue-500/20 hover:ring-blue-400/30 hover:-translate-y-0.5 transition-all"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Hero-bild */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src={cover}
              alt="Översiktsbild för Kurr"
              className="w-full h-60 sm:h-72 md:h-80 object-cover"
              loading="lazy"
            />
          </div>

          {/* Innehållssektioner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="md:col-span-2">
              <h2 className="text-xl font-bold mb-3">Översikt</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Vår studie undersöker hur människor föredrar att ladda upp
                  och organisera sina recept – vare sig det gäller handskrivna
                  familjefavoriter eller sparade från olika plattformar.
                  Genom att erbjuda ett intuitivt gränssnitt kan användare
                  effektivt hantera sina recept, förenkla måltidsplaneringen
                  och fatta välgrundade matval.
                </p>
                <p>
                  Målet är att förstå var användare hittar
                  receptinspiration, hur de lagrar dem och vilka
                  uppladdningsmetoder de föredrar (t.ex. foton, skärmdumpar,
                  inlägg). Vi undersöker också utmaningar i att växla mellan
                  olika appar och verktyg för recepthantering.
                </p>
                <p>För att stödja detta fokuserar studien på tre nyckelfrågor:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Q1:</strong> Vilka telefonverktyg som kamera,
                    röstinspelning, galleri är mest användbara för att samla
                    in och ladda upp recept?
                  </li>
                  <li>
                    <strong>Q2:</strong> Hur kan ett gränssnitt utformas för
                    att stödja smidiga receptuppladdningar?
                  </li>
                </ul>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3">Snabbfakta</h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  <span className="text-gray-400">Roll:</span> UX-designer /
                  researcher
                </li>
                <li>
                  <span className="text-gray-400">Team:</span> 2 personer
                </li>
                <li>
                  <span className="text-gray-400">Tidsram:</span> 11 veckor
                </li>
                <li>
                  <span className="text-gray-400">Leverabler:</span> research,
                  prototyp, testresultat
                </li>
              </ul>
            </Card>

            <Card className="md:col-span-2">
              <h3 className="text-xl font-bold mb-3">Process & Metodologi</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  För att säkerställa ett användarcentrerat angreppssätt
                  kombinerade vi kvalitativa och kvantitativa metoder,
                  inklusive en enkät med 37 deltagare och semistrukturerade
                  intervjuer med 8 användare. Detta gav värdefulla insikter om
                  hur människor sparar och laddar upp recept.
                </p>
                <p>
                  Vi följde <em>Design Thinking</em>-processen, ett iterativt
                  UX-ramverk som består av fem nyckelsteg:
                </p>
                <ul className="list-none space-y-2">
                  <li>
                    🔍 <strong>Empatisera</strong> – Förstå Kurrs mål och
                    användarnas behov genom enkäter och intervjuer.
                  </li>
                  <li>
                    🎯 <strong>Definiera</strong> – Identifiera nyckelproblem
                    och möjligheter baserat på insamlad data.
                  </li>
                  <li>
                    💡 <strong>Idealisera</strong> – Utforska och skissa
                    koncept för en intuitiv process för
                    receptuppladdning.
                  </li>
                  <li>
                    📱 <strong>Prototyp</strong> – Utveckla interaktiva
                    modeller i Figma för att visualisera potentiella
                    lösningar.
                  </li>
                  <li>
                    📝 <strong>Test</strong> – Samla in feedback för att
                    förfina och förbättra användarupplevelsen.
                  </li>
                </ul>
                <p>
                  Genom kontinuerlig iteration skapade vi en design som ligger
                  i linje med användarbeteenden och förbättrar upplevelsen av
                  recepthantering.
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3">Min roll</h3>
              <ul className="text-gray-300 space-y-1">
                <li>Projektplanering och strukturering av tidsplan</li>
                <li>Insamling och analys av data genom enkäter och intervjuer</li>
                <li>
                  Bearbetning och organisering av resultat (affinitetsdiagram,
                  jämförelser)
                </li>
                <li>Rapportskrivning och arbete med forskningsetiska aspekter</li>
                <li>Utveckling av user flows, skisser och prototyper i Figma</li>
                <li>Förberedelse och genomförande av presentationer</li>
              </ul>
            </Card>

            <Card className="md:col-span-3">
              <h3 className="text-xl font-bold mb-3">Datainsamling</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>
                  Datainsamlingen i detta arbete omfattar både kvantitativa och
                  kvalitativa metoder för att studera potentiella användares
                  beteenden, attityder och förmågor kopplade till recept,
                  specifikt uppladdning av recept. Genom att använda båda
                  metoderna skapas en djupare och mer detaljerad förståelse för
                  användarna, vilket ger trovärdighet åt designförslag som
                  bygger på datan.
                </p>
                <p>
                  Syftet med datainsamlingen är att definiera användarna.
                  Eftersom Kurrs app ännu inte har lanserats går det inte att
                  använda faktiska användare. Fokus ligger därför på att
                  identifiera potentiella användare och förstå deras behov och
                  önskemål. De valda metoderna kan samla in både kvalitativa
                  och kvantitativa svar, vilket möjliggör en djupare förståelse
                  av användarnas problem.
                </p>
                <p>
                  De initiala definitionerna baseras på en samlad förståelse av
                  Kurrs verksamhet, och dessa kan utvecklas vidare genom att
                  samla in mål och egenskaper som olika användargrupper kan ha.
                  Kurr tillhandahöll en hypotetisk användargrupp som
                  inkluderade kvinnor benämnda{" "}
                  <span className="italic">"DINKS"</span> (double income, no kids).
                </p>
              </div>
            </Card>

            {/* Resultat-kort med Prototyp överst */}
            <Card className="md:col-span-3">
              <h3 className="text-xl font-bold mb-3">Resultat</h3>
              <div className="text-gray-300 leading-relaxed space-y-5">
                {/* Prototyp-bild överst */}
                <section className="space-y-3">
                  <img
                    src={telefon}
                    alt="Kurr telefonflöde"
                    className="mx-auto block w-40 sm:w-48 md:w-56 lg:w-64 rounded-lg object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </section>

                {/* Prototyp-text på samma sätt som Affinitetsdiagram */}
                <section className="space-y-2">
                  <h4 className="font-semibold">Prototyp</h4>
                  <p>
                    Prototypen, som skapades i Figma med Kurrs befintliga komponenter, visar hur
                    användare på ett flexibelt sätt kan samla och ladda upp recept från olika
                    plattformar – via URL, formulär eller bilder från kamera/galleri. När en URL
                    klistras in konverteras innehållet till receptdelar där AI-systemet föreslår
                    ingredienser och steg, som användaren sedan kan granska och korrigera vid behov.
                    I steg-för-steg-flödet går det att se vilka ingredienser som hör till respektive
                    steg samt lägga till nya steg manuellt eller via bilder. Prototypen inkluderar
                    även en AI-genererad beskrivning av rätten, där användaren kan justera texten
                    samt ange kategori (t.ex. vegetarisk/vegansk), typ av måltid och antal portioner.
                    Målet är att uppladdningen ska upplevas som snabb och hjälpsam, och att ett
                    recept ska kunna vara konverterat och färdigt inom cirka 5–10 minuter.
                  </p>
                </section>

                {/* Bild ovanför affinitetsdiagrammet */}
                <button
                  type="button"
                  onClick={() =>
                    openLightbox(affinitet, "Affinitetsdiagram för Kurr")
                  }
                  className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                  aria-label="Öppna affinitetsdiagram"
                >
                  <img
                    src={affinitet}
                    alt="Affinitetsdiagram för Kurr"
                    className="w-full max-h-80 object-cover cursor-zoom-in"
                    loading="lazy"
                  />
                </button>

                <section className="space-y-2">
                  <h4 className="font-semibold">Affinitetsdiagram</h4>
                  <p>
                    För att analysera enkätmaterialet skapades ett
                    affinitetsdiagram i Figma, där svaren kondenserades till
                    mer hanterbara teman. Analysen genomfördes induktivt,
                    vilket innebar att mönster och kategorier växte fram
                    direkt ur datan. Genom arbetet identifierades bland annat
                    teman som tidsaspekter, användarupplevelse,
                    matlagningsbeteenden och inspirationskällor. Dessa teman
                    låg sedan till grund för vidare analys och designbeslut.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-semibold">Resultat från enkäten</h4>
                  <p>
                    Enkäten besvarades av 37 deltagare och gav en överblick
                    över deras beteenden kring matlagning och
                    receptinsamling. Många söker inspiration via internet och
                    sociala medier och sparar ofta recept genom skärmdumpar.
                    De flesta hade inte tidigare försökt samla alla sina recept
                    på en plattform, och de som gjort det upplevde processen
                    som svår och tidskrävande. En rimlig uppladdningstid
                    ansågs vara cirka 5–10 minuter, och användarna efterfrågade
                    enkelhet samt tydligt systemstöd.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="font-semibold">Resultat från intervjuerna</h4>
                  <p>
                    Åtta uppföljande intervjuer genomfördes för att fördjupa
                    förståelsen för användarnas behov. Resultaten visade stor
                    variation i hur användarna samlar och strukturerar sina
                    recept, till exempel via mappar, anteckningar eller
                    skärmdumpar. Deltagarna uttryckte en tydlig önskan om att
                    systemet ska hjälpa till i uppladdningsprocessen, men
                    samtidigt ge dem viss kontroll. De betonade också vikten av
                    tydlighet kring vilken information som krävs vid
                    uppladdning och att flödet ska kännas smidigt.
                  </p>
                </section>

                {/* Galleri-karusell precis ovanför Artefakter */}
                <section className="space-y-3">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          galleryImages[currentSlide].src,
                          galleryImages[currentSlide].alt
                        )
                      }
                      className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                      aria-label={`Öppna ${galleryImages[currentSlide].alt}`}
                    >
                      <img
                        src={galleryImages[currentSlide].src}
                        alt={galleryImages[currentSlide].alt}
                        className="w-full max-h-80 object-cover cursor-zoom-in"
                        loading="lazy"
                      />
                    </button>

                    {/* Föregående / Nästa */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="hidden sm:flex absolute inset-y-0 left-2 my-auto h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-white text-lg backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                      aria-label="Föregående bild"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className="hidden sm:flex absolute inset-y-0 right-2 my-auto h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-white text-lg backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                      aria-label="Nästa bild"
                    >
                      ›
                    </button>

                    {/* Små indikatorer */}
                    <div className="flex justify-center gap-2 mt-3">
                      {galleryImages.map((img, index) => (
                        <button
                          key={img.alt}
                          type="button"
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2.5 w-2.5 rounded-full transition-all ${
                            index === currentSlide
                              ? "bg-blue-400 scale-110"
                              : "bg-white/30 hover:bg-white/60"
                          }`}
                          aria-label={`Visa ${img.alt}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section className="space-y-2">
                  <h4 className="font-semibold">Artefakter</h4>
                  <p>
                    Baserat på analysen skapades flera artefakter för att
                    konkretisera lösningen. En persona togs fram för att
                    representera den typiska användaren och hennes behov. User
                    flows användes för att kartlägga hur användaren steg för
                    steg tar sig genom olika uppgifter och för att identifiera
                    de mest effektiva och smidiga flödena i systemet. Den
                    interaktiva prototypen visualiserade därefter lösningen i
                    praktiken och gjorde det möjligt att testa funktioner samt
                    utvärdera användarupplevelsen innan vidare utveckling.
                  </p>
                </section>
              </div>
            </Card>
          </div>

          {/* Navigering mellan projekt */}
          <div className="mt-12 flex justify-between">
            <Link
              to="/projects/examensarbete"
              className="text-blue-400 hover:text-blue-300"
            >
              ← Föregående
            </Link>
            <Link
              to="/projects/Forskningsmetoder"
              className="text-blue-400 hover:text-blue-300"
            >
              Nästa →
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur text-white text-2xl leading-none flex items-center justify-center shadow-lg"
              aria-label="Stäng bild"
              title="Stäng (Esc)"
            >
              ×
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10 bg-black/10"
            />
          </div>
        </div>
      )}
    </main>
  );
};
