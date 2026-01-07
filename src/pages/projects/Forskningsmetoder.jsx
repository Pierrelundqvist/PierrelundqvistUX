import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ====== Bilder (Forskningsmetoder) ======
import profile from "../../assets/profilbild.jpg";
import profile2 from "../../assets/profilbild2.jpg";
import profile4 from "../../assets/profilbild4.jpg";
import profile5 from "../../assets/profilbild5.jpg";

import cover from "../../assets/projects/forskningsmetoder/cover.jpg";
import shot1 from "../../assets/projects/forskningsmetoder/shot1.jpg";
import shot2 from "../../assets/projects/forskningsmetoder/shot2.jpg";
import shot3 from "../../assets/projects/forskningsmetoder/shot3.jpg";
import shot4 from "../../assets/projects/forskningsmetoder/shot4.jpg";

// Lämnas som i din snippet (du har dem i kurr just nu)
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

// Liten "callout"-ruta (för att få key takeaways att poppa)
const Callout = ({ title, children }) => (
  <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
    {title ? (
      <div className="text-sm font-semibold text-white mb-2">{title}</div>
    ) : null}
    <div className="text-gray-200 leading-relaxed">{children}</div>
  </div>
);

// Liten "stat"-ruta
const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
    <div className="text-xs text-gray-400">{label}</div>
    <div className="mt-1 text-lg font-semibold text-white">{value}</div>
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

export const Forskningsmetoder = () => {
  const tags = [
    "UX Research",
    "Eyetracking",
    "Self-Service Machine",
    "Fältstudie",
    "2022",
  ];

  const team = [
    { name: "Pierre Lundqvist", role: "UX Researcher", img: profile },
    { name: "Jonatan Akyol", role: "UX Researcher", img: profile2 },
    { name: "Martina Quach", role: "UX Researcher", img: profile4 },
    { name: "Elsa Hinders", role: "UX Researcher", img: profile5 },
  ];

  // Karusellbilder (shot2 först, sedan shot1)
  const galleryImages = [
    { src: shot2, alt: "" },
    { src: shot1, alt: "" },
  ];

  // Lightbox state
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  // Karusell-state (för stora galleriet längre ner)
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

  // Karusell-state för "Process & Metodologi"
  const [methodSlide, setMethodSlide] = useState(0);
  const nextMethodSlide = () =>
    setMethodSlide((prev) => (prev + 1) % galleryImages.length);
  const prevMethodSlide = () =>
    setMethodSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );

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
            Forskningsmetoder
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

          {/* Ingress – lämna tom / placeholder */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            {/* Lägg till en kort introduktion till projektet här. */}
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {/* Ytterligare ingress-text kan du lägga till här. */}
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
              alt="Översiktsbild för Forskningsmetoder"
              className="w-full h-60 sm:h-72 md:h-80 object-cover"
              loading="lazy"
            />
          </div>

          {/* Innehållssektioner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Översikt */}
            <Card className="md:col-span-2">
              <h2 className="text-xl font-bold mb-3">Översikt</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                Expresskassor blir allt vanligare i snabbmatsrestauranger, men
                deras utformning skiljer sig. Denna studie jämförde
                effektiviteten mellan Max mindre, liggande skärm och McDonalds
                större, stående skärm. Totalt 20 deltagare genomförde
                beställningar medan deras ögonrörelser och tid mättes med
                eyetracking-glasögon. Resultatet visade ingen signifikant
                skillnad i effektivitet mellan kassorna, även om det kan finnas
                skillnader som inte kunde bevisas med den insamlade datan.
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3">Snabbfakta</h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  <span className="text-gray-400">Roll:</span> UX Reseach
                </li>
                <li>
                  <span className="text-gray-400">Team:</span> 4 studenter
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

            {/* Process & Metodologi */}
            <Card className="md:col-span-2">
              <h3 className="text-xl font-bold mb-3">Process & Metodologi</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <ul className="space-y-3 list-disc pl-5">
                  <li>
                    <span className="font-semibold text-white">Metodupplägg:</span>{" "}
                    Studien genomfördes som ett experiment med{" "}
                    <span className="font-medium">mellanindividsdesign</span> för
                    att jämföra två expresskassor med olika skärmstorlek och
                    format. Effektivitet mättes kvantitativt genom{" "}
                    <span className="font-medium">tid</span> och{" "}
                    <span className="font-medium">antal ögonrörelser</span> med
                    eyetracking. Upplägget var hypotesprövande med noll- och
                    alternativhypotes. Genomförandet skedde i verklig miljö för
                    att fånga naturliga beteenden.
                  </li>

                  <li>
                    <span className="font-semibold text-white">
                      Forskningsdesign & hypotes:
                    </span>{" "}
                    Den oberoende variabeln var kassans utformning
                    (skärmstorlek/format) och de beroende variablerna var tid och
                    ögonrörelser. Mellanindividsdesign minskade risken för
                    ordningseffekter och gjorde jämförelsen mer rättvis.
                    Resultatet analyserades som en jämförelse mellan två oberoende
                    grupper med fokus på effektivitet.
                  </li>

                  <li>
                    <span className="font-semibold text-white">Pilotstudie:</span>{" "}
                    Piloten säkerställde att utrustning, instruktioner och
                    beställningsflöde fungerade på plats. Vi testade även QR-koder
                    för att kunna skapa heatmaps, men det fungerade olika bra
                    beroende på skärmformat. Justeringarna gjorde datainsamlingen
                    mer robust inför fältstudien.
                  </li>

                  {/* Karusell: centrerad i kortet + ingen caption + hög/smal */}
                  <li className="list-none pl-0">
                    <div className="relative mt-3 flex justify-center">
                      <div className="relative w-full max-w-sm sm:max-w-md">
                        <button
                          type="button"
                          onClick={() =>
                            openLightbox(galleryImages[methodSlide].src, "")
                          }
                          className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          aria-label="Öppna bild"
                        >
                          <div className="w-full aspect-[3/4] bg-black/20">
                            <img
                              src={galleryImages[methodSlide].src}
                              alt=""
                              className="w-full h-full object-cover cursor-zoom-in"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={prevMethodSlide}
                          className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/55 hover:bg-black/75 border border-white/20 text-white text-lg backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                          aria-label="Föregående bild"
                          title="Föregående"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={nextMethodSlide}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/55 hover:bg-black/75 border border-white/20 text-white text-lg backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                          aria-label="Nästa bild"
                          title="Nästa"
                        >
                          ›
                        </button>

                        <div className="flex justify-center gap-2 mt-3">
                          {galleryImages.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setMethodSlide(index)}
                              className={`h-2.5 w-2.5 rounded-full transition-all ${
                                index === methodSlide
                                  ? "bg-blue-400 scale-110"
                                  : "bg-white/30 hover:bg-white/60"
                              }`}
                              aria-label={`Visa bild ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <span className="font-semibold text-white">
                      Deltagare & design:
                    </span>{" "}
                    Totalt <span className="font-medium">20 deltagare (18+)</span>{" "}
                    rekryterades på plats och fördelades jämnt mellan Max och
                    McDonalds. Varje deltagare genomförde en beställning på endast
                    en kassa, vilket ökade jämförbarheten. Beställningar delades
                    upp i menybeställningar och enstaka varor för att hantera
                    variation i uppgiften.
                  </li>

                  <li>
                    <span className="font-semibold text-white">Dataanalys:</span>{" "}
                    Vi definierade tydliga start- och slutpunkter för varje
                    beställning och analyserade materialet i eyetracking-mjukvaran.
                    Datan sammanställdes i kalkylblad och analyserades med
                    deskriptiv statistik (medelvärde och standardavvikelse).
                  </li>
                </ul>
              </div>
            </Card>

            {/* Min roll */}
            <Card>
              <h3 className="text-xl font-bold mb-3">Min roll</h3>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <div>
                  <div className="font-semibold text-white">
                    Litteratur- och kunskapsinsamling
                  </div>
                  <p>
                    Sökte och sammanfattade forskning kring experimentdesign,
                    effektivitet och eyetracking inom UX.
                  </p>
                </div>

                <div>
                  <div className="font-semibold text-white">
                    Skrivarbete och rapportutveckling
                  </div>
                  <p>
                    Skrev och förfinade delar av bakgrund, metod, resultat och
                    diskussion.
                  </p>
                </div>

                <div>
                  <div className="font-semibold text-white">
                    Planering, fältstudie & analys
                  </div>
                  <p>
                    Deltog i pilotstudie och genomförde datainsamling på plats.
                    Bidrog till sammanställning, analys och tolkning.
                  </p>
                </div>

                <div>
                  <div className="font-semibold text-white">
                    Kommunikation & presentation
                  </div>
                  <p>
                    Samarbetade tätt med teamet och tog fram underlag till
                    redovisning.
                  </p>
                </div>
              </div>
            </Card>

            {/* Datainsamling */}
            <Card className="md:col-span-3">
              <h3 className="text-xl font-bold mb-3">Datainsamling</h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Datainsamlingsverktyg</h4>
                  <p>
                    Datainsamlingen gjordes med eyetracking-glasögon som registrerade
                    blickpunkter, ögonrörelser och deltagarens synfält under hela
                    beställningen.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Datainsamlingsprocess</h4>
                  <p>
                    Inspelningen startade när menyn visades och avslutades när en
                    vara eller meny lagts i varukorgen. Betalning exkluderades.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Etiska överväganden</h4>
                  <p>
                    Deltagarna informerades om syfte och datahantering och gav
                    informerat samtycke. Data anonymiserades.
                  </p>
                </div>
              </div>
            </Card>

            {/* Resultat-kort (ALTERNATIV STIL) */}
            <Card className="md:col-span-3">
              <h3 className="text-xl font-bold mb-3">Resultat</h3>

              <div className="text-gray-300 leading-relaxed space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white">
                    Skärmstorlekens roll vid expresskassor
                  </h4>

                  <p>
                    Studien genomfördes med{" "}
                    <span className="font-semibold text-white">20 deltagare</span>{" "}
                    (10 per expresskassa) där Max och McDonalds jämfördes.
                    Effektivitet mättes genom tid och antal ögonrörelser med
                    eyetracking-glasögon.
                  </p>
                </div>

                <Callout title="Key takeaway">
                  Ingen statistiskt signifikant skillnad i effektivitet mellan
                  Max och McDonalds. Samtliga t-test visade p-värden &gt; 0,05 →
                  nollhypotesen behölls.
                </Callout>

                {/* Menybeställningar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h5 className="font-semibold text-white">Menybeställningar</h5>
                    <span className="text-xs text-gray-400">
                      (tid &amp; ögonrörelser)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Bild */}
                    <div className="md:col-span-3">
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(shot3, "Resultat: Menybeställningar")
                        }
                        className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        aria-label="Öppna bild: Menybeställningar"
                      >
                        <img
                          src={shot3}
                          alt="Resultat: Menybeställningar"
                          className="w-full max-h-96 object-contain cursor-zoom-in bg-black/10"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-2 grid grid-cols-1 gap-3">
                      <Stat label="Max" value="ca 47 sek · 111 ögonrörelser" />
                      <Stat
                        label="McDonalds"
                        value="ca 44 sek · 121 ögonrörelser"
                      />
                    </div>
                  </div>
                </div>

                {/* Enstaka vara */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h5 className="font-semibold text-white">Enstaka vara</h5>
                    <span className="text-xs text-gray-400">
                      (tid &amp; ögonrörelser)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Bild */}
                    <div className="md:col-span-3">
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(shot4, "Resultat: Enstaka vara")
                        }
                        className="w-full rounded-xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                        aria-label="Öppna bild: Enstaka vara"
                      >
                        <img
                          src={shot4}
                          alt="Resultat: Enstaka vara"
                          className="w-full max-h-96 object-contain cursor-zoom-in bg-black/10"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-2 grid grid-cols-1 gap-3">
                      <Stat label="Max" value="ca 20 sek · 48 ögonrörelser" />
                      <Stat
                        label="McDonalds"
                        value="ca 16 sek · 39 ögonrörelser"
                      />
                    </div>
                  </div>
                </div>

                {/* Kvalitativt + slutsats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <h5 className="font-semibold text-white">
                      Kvalitativa observationer
                    </h5>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        McDonalds större skärm gav fler ögonrörelser men något
                        kortare tid.
                      </li>
                      <li>
                        Max expresskassa upplevdes som långsammare, vilket kan ha
                        påverkat effektiviteten negativt.
                      </li>
                      <li>
                        Stor variation i beställningar (meny vs flera varor) gjorde
                        jämförelser svårare.
                      </li>
                      <li>
                        Eyetracking i naturlig miljö gav realistiska data men
                        introducerade störmoment (stress, andra personer).
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-white">Slutsats</h5>
                    <p>
                      Skärmstorlek i sig gav ingen mätbar skillnad i effektivitet.
                      Resultatet antyder att gränssnittets utformning och systemets
                      responsivitet sannolikt har större påverkan än skärmstorleken
                      ensam.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Navigering mellan projekt */}
          <div className="mt-12 flex justify-between">
            <Link to="/projects/kurr" className="text-blue-400 hover:text-blue-300">
              ← Föregående
            </Link>
            <Link
              to="/projects/ai-och-design"
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
