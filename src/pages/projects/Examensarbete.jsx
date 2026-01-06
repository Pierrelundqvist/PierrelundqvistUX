// src/pages/projects/Examensarbete.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ====== Team-bilder ======
import profile from "../../assets/profilbild.jpg";
import profile3 from "../../assets/profilbild3.jpg";

// ====== Bild-imports ======
import cover from "../../assets/projects/examensarbete/cover.jpg";
import shot1 from "../../assets/projects/examensarbete/shot1.jpg";
import shot2 from "../../assets/projects/examensarbete/shot2.jpg";
import shot3 from "../../assets/projects/examensarbete/shot3.jpg";

// ====== Prototyp-bilder ======
import prototyp1 from "../../assets/projects/examensarbete/prototyp1.jpg";
import prototyp2 from "../../assets/projects/examensarbete/prototyp2.jpg";
import prototyp3 from "../../assets/projects/examensarbete/prototyp3.jpg";

// Card-komponent
const Card = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// Teammedlem
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

export const Examensarbete = () => {
  const tags = ["Figma", "Unreal Engine", "Simulator", "Prototyp"];

  const team = [
    { name: "Pierre Lundqvist", role: "UX/UI-Designer", img: profile },
    { name: "Dias Begicevic", role: "UX/UI-Designer", img: profile3 },
  ];

  // (Valfritt men bra) säkerställ att sidan hamnar högst upp när du öppnar routen
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  // Prototyp-karusell
  const prototypeImages = [prototyp1, prototyp2, prototyp3];
  const [prototypeIndex, setPrototypeIndex] = useState(0);
  const nextPrototype = () =>
    setPrototypeIndex((prev) => (prev + 1) % prototypeImages.length);
  const prevPrototype = () =>
    setPrototypeIndex((prev) =>
      prev === 0 ? prototypeImages.length - 1 : prev - 1
    );

  // Resultat-karusell
  const resultImages = [shot1, shot2, shot3];
  const [resultIndex, setResultIndex] = useState(0);
  const nextResult = () =>
    setResultIndex((prev) => (prev + 1) % resultImages.length);
  const prevResult = () =>
    setResultIndex((prev) =>
      prev === 0 ? resultImages.length - 1 : prev - 1
    );

  // Lightbox
  const [lightboxImage, setLightboxImage] = useState(null); // { src, alt } | null
  const openLightbox = (src, alt) => setLightboxImage({ src, alt });
  const closeLightbox = () => setLightboxImage(null);

  // ESC + lås scroll när lightbox är öppen
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = lightboxImage ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Backlink */}
        <Link to="/#projects" className="text-blue-400 hover:text-blue-300">
          ← Tillbaka till projekt
        </Link>

        {/* Titel */}
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-1 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Examensarbete
        </h1>

        {/* Underrubrik */}
        <h2 className="text-lg text-gray-400 mb-4">
          Spelifiering i semi-autonoma fordon – i samarbete med Autoliv
        </h2>

        {/* Team */}
        <div className="flex flex-wrap items-center gap-6 mb-6">
          {team.map((m) => (
            <TeamMember key={m.name} imgSrc={m.img} name={m.name} role={m.role} />
          ))}
        </div>

        {/* Introduktion */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          Examensarbetet fokuserar på att förbättra trafiksäkerhet med hjälp av
          spelifiering. Genom återkoppling via ljud, ljus och vibrationer testade
          vi om spelmekanismer kan påverka förarbeteende i en bilsimulator.
          Projektet riktar sig mot framtidens fordon där föraren behöver hållas
          engagerad – även när bilen kör själv.
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
            alt="Översiktsbild för examensarbetet"
            className="w-full h-60 sm:h-72 md:h-80 object-cover cursor-zoom-in"
            onClick={() => openLightbox(cover, "Översiktsbild för examensarbetet")}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Innehåll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Översikt */}
          <Card className="md:col-span-2">
            <h2 className="text-xl font-bold mb-3">Översikt</h2>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                Examensarbetet genomfördes i samarbete mellan två studenter vid
                Högskolan i Skövde och företaget Autoliv. Målet var att undersöka
                om <strong>spelifiering</strong> kan användas för att uppmuntra
                bilförare att inta och behålla en{" "}
                <strong>korrekt sittställning</strong> under körning.
              </p>
              <p>
                Intresset väcktes genom en inledande litteraturgenomgång där vi
                identifierade ett tydligt <strong>kunskapsgap</strong>.
              </p>
              <p>
                För att bidra med ny kunskap genomfördes ett empiriskt experiment
                i en bilsimulator med fokus på tid i icke optimal position.
              </p>
            </div>
          </Card>

          {/* Snabbfakta */}
          <Card>
            <h3 className="text-xl font-bold mb-3">Snabbfakta</h3>
            <ul className="text-gray-300 space-y-2">
              <li>
                <span className="text-gray-400">Roll:</span> UX-designer /
                prototypskapare
              </li>
              <li>
                <span className="text-gray-400">Team:</span> 2 studenter
              </li>
              <li>
                <span className="text-gray-400">Tidsram:</span> 12 veckor
              </li>
              <li>
                <span className="text-gray-400">Leverabler:</span> research,
                wireframes, spel-prototyp
              </li>
            </ul>
          </Card>

          {/* Process */}
          <Card className="md:col-span-2">
            <h3 className="text-xl font-bold mb-3">Process</h3>

            <ul className="list-disc list-inside text-gray-300 space-y-3">
              <li>
                <strong>Metodupplägg:</strong> Studien använde en kombination av
                kvantitativa och kvalitativa metoder för att undersöka effekten av
                spelifiering i en körsimulator. För att möjliggöra detta utvecklades
                flera datainsamlingsverktyg baserade på tidigare forskning: en enkät
                för demografiska uppgifter, två prototyper (med och utan spelifiering)
                samt en intervjuguide för att fånga deltagarnas upplevelser.
              </li>

              <li>
                <strong>Pilotstudie:</strong> En pilotstudie genomfördes först med två
                deltagare för att testa utrustning, simulatorinställningar, spelmekanik
                och frågeformulär. Under pilotfasen justerades bland annat den haptiska
                återkopplingen, och fokus riktades mot att mäta förarnas handposition
                istället för sittställning.
              </li>

              <li>
                <strong>Deltagare & design:</strong> Därefter rekryterades deltagare via
                företagets nätverk. Kraven var minst 18 år och B-körkort. Studien
                genomfördes med 16 deltagare i åldrarna 24–65 år. Studien hade en
                mellanindividdesign, där deltagarna slumpades in i två grupper: en med
                spelifiering (visuell, auditiv och haptisk återkoppling) och en utan
                spelifiering (visuell och auditiv återkoppling).
              </li>
            </ul>

            {/* Prototyp-karusell */}
            <div className="mt-4 mb-4">
              <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={prototypeImages[prototypeIndex]}
                  alt={`Prototypbild ${prototypeIndex + 1}`}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() =>
                    openLightbox(
                      prototypeImages[prototypeIndex],
                      `Prototypbild ${prototypeIndex + 1}`
                    )
                  }
                  loading="lazy"
                  decoding="async"
                />

                <button
                  type="button"
                  onClick={prevPrototype}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                  aria-label="Föregående prototypbild"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextPrototype}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                  aria-label="Nästa prototypbild"
                >
                  ›
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-2">
                {prototypeImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPrototypeIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === prototypeIndex
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Visa prototypbild ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <ul className="list-disc list-inside text-gray-300 space-y-3">
              <li>
                <strong>Genomförande i simulator:</strong> Deltagarna körde i en
                körsimulator i ett scenario på en ”oändlig motorväg”. Den kvantitativa
                datan samlades in genom att mäta hur länge förarna inte höll korrekt
                handposition. Parallellt genomfördes semistrukturerade intervjuer för
                att förstå deltagarnas upplevelser, svårigheter, hur de tolkade
                uppmaningar och hur de uppfattade återkopplingen.
              </li>

              <li>
                <strong>Kvalitativ analys:</strong> Den kvalitativa analysen genomfördes
                genom transkribering och tematisering, där återkommande mönster
                identifierades och sorterades i kategorier som exempelvis svårigheter,
                uppmaningar, utmaningar och återkoppling.
              </li>
            </ul>
          </Card>

          {/* Min roll */}
          <Card>
            <h3 className="text-xl font-bold mb-3">Min roll</h3>
            <ul className="text-gray-300 space-y-4">
              <li>
                <p className="font-semibold">Litteratur- och kunskapsinsamling</p>
                <p className="text-sm text-gray-400">
                  Sökte, läste och sammanfattade forskning kring ADAS, driver monitoring,
                  förarbeteende, situationell medvetenhet och gamification som grund för
                  studiens teoretiska ramverk.
                </p>
              </li>
              <li>
                <p className="font-semibold">Skrivarbete och rapportutveckling</p>
                <p className="text-sm text-gray-400">
                  Skrev och vidareutvecklade bakgrund, problemformulering, metod, resultat
                  och diskussion samt förfinade texter för tydlighet, struktur och kvalitet.
                </p>
              </li>
              <li>
                <p className="font-semibold">Planering och genomförande av experiment</p>
                <p className="text-sm text-gray-400">
                  Var med och tog fram metodplan, scenarier, enkät- och intervjufrågor samt
                  genomförde pilotstudie och datainsamling i simulatorn.
                </p>
              </li>
              <li>
                <p className="font-semibold">Arbete med teknik och användarupplevelse</p>
                <p className="text-sm text-gray-400">
                  Kopplade teori till praktik genom att arbeta med eyetracking, DMS och olika
                  typer av återkoppling (ljud, ljus, vibration) och hur dessa påverkar förarens
                  upplevelse.
                </p>
              </li>
              <li>
                <p className="font-semibold">Samarbete och kommunikation</p>
                <p className="text-sm text-gray-400">
                  Samarbetade nära med teamet, handledare och Autoliv genom regelbundna
                  avstämningar, planering och presentation av delresultat.
                </p>
              </li>
              <li>
                <p className="font-semibold">Visualisering och presentationer</p>
                <p className="text-sm text-gray-400">
                  Tog fram slides, visuella förklaringar av experimentet och manus till
                  presentationer för både lärosätet och Autoliv.
                </p>
              </li>
              <li>
                <p className="font-semibold">Analys och resultatbearbetning</p>
                <p className="text-sm text-gray-400">
                  Deltog i både kvantitativ och kvalitativ analys av insamlad data,
                  identifierade mönster och formulerade slutsatser.
                </p>
              </li>
            </ul>
          </Card>

          {/* Resultat */}
          <Card className="md:col-span-3">
            <h3 className="text-xl font-bold mb-3">Resultat</h3>

            <div className="mt-2 mb-6">
              <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={resultImages[resultIndex]}
                  alt={`Resultatbild ${resultIndex + 1}`}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() =>
                    openLightbox(
                      resultImages[resultIndex],
                      `Resultatbild ${resultIndex + 1}`
                    )
                  }
                  loading="lazy"
                  decoding="async"
                />

                <button
                  type="button"
                  onClick={prevResult}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                  aria-label="Föregående resultatbild"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextResult}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg"
                  aria-label="Nästa resultatbild"
                >
                  ›
                </button>
              </div>

              <div className="flex justify-center gap-2 mt-2">
                {resultImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setResultIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === resultIndex ? "bg-white" : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Visa resultatbild ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-gray-300 space-y-4 leading-relaxed">
              <p>
                Studien genomfördes med <strong>14 förare</strong> (24–65 år), där
                majoriteten hade <strong>20+ års körerfarenhet</strong>. Två prototyper
                jämfördes: en med spelifiering (visuell, auditiv och haptisk återkoppling)
                och en utan spelifiering.
              </p>

              <div>
                <p className="font-semibold mb-1">Kvantitativa resultat</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>
                    Tiden utan optimal handposition var i snitt <strong>14,28 s</strong>{" "}
                    med spelifiering och <strong>7,71 s</strong> utan spelifiering.
                  </li>
                  <li>
                    Ett t-test visade{" "}
                    <strong>ingen statistiskt signifikant skillnad</strong> mellan
                    grupperna (p = 0,145).
                  </li>
                  <li>
                    Slutsats: spelifieringen gav{" "}
                    <strong>ingen tydlig förbättring</strong> av handposition i detta
                    experiment.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-1">Kvalitativa insikter</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>
                    <strong>Svårigheter:</strong> utmanande att hålla jämn hastighet och
                    skillnader mellan simulator och verklig bil påverkade upplevelsen.
                  </li>
                  <li>
                    <strong>Uppmaningar:</strong> placering av skärm och textläsbarhet
                    gjorde instruktioner svåra att se, men ikonerna för handposition
                    upplevdes som tydliga.
                  </li>
                  <li>
                    <strong>Utmaning:</strong> många tyckte att svårighetsgraden var låg
                    och monoton, med behov av mer variation och progression i spelet.
                  </li>
                  <li>
                    <strong>Återkoppling:</strong> den haptiska massagen upplevdes både
                    som distraherande och som en “morot” – den hjälpte flera att korrigera
                    sittställning men var ibland väl intensiv.
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-400">
                Sammantaget visar studien att spelifiering i den här formen inte gav någon
                mätbar effekt på handposition, men gav viktiga insikter om hur feedback,
                svårighetsgrad och simulatorupplevelse behöver utformas för att stödja
                förare på ett bättre sätt.
              </p>
            </div>
          </Card>
        </div>

        {/* Nav */}
        <div className="mt-12 flex justify-between">
          <Link
            to="/projects/Forskningsmetoder"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Föregående
          </Link>
          <Link to="/projects/kurr" className="text-blue-400 hover:text-blue-300">
            Nästa →
          </Link>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl leading-none px-2"
            aria-label="Stäng bild"
            title="Stäng (Esc)"
          >
            ×
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};
