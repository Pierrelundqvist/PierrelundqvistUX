import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// ====== Bilder (AI & Design) ======
import profile from "../../assets/profilbild.jpg";
import cover from "../../assets/projects/aidesign/cover.jpg";

// ✅ Robust laddning av shots (slipper “Failed to resolve import” om någon fil saknas eller har annan ext)
const useShotLoader = () => {
  const shotsJpg = import.meta.glob("../../assets/projects/aidesign/shot*.jpg", {
    eager: true,
    import: "default",
  });
  const shotsJpeg = import.meta.glob("../../assets/projects/aidesign/shot*.jpeg", {
    eager: true,
    import: "default",
  });
  const shotsPng = import.meta.glob("../../assets/projects/aidesign/shot*.png", {
    eager: true,
    import: "default",
  });
  const shotsWebp = import.meta.glob("../../assets/projects/aidesign/shot*.webp", {
    eager: true,
    import: "default",
  });

  const all = { ...shotsJpg, ...shotsJpeg, ...shotsPng, ...shotsWebp };

  const get = (n) => {
    const matchKey = Object.keys(all).find((k) =>
      k.match(new RegExp(`shot${n}\\.(jpg|jpeg|png|webp)$`, "i"))
    );
    return matchKey ? all[matchKey] : null;
  };

  return { get };
};

// Samma card som i Examensarbete.jsx
const Card = ({ children, className = "" }) => (
  <div
    className={`p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

// Liten "callout"-ruta
const Callout = ({ title, children }) => (
  <div className="rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
    {title ? <div className="text-sm font-semibold text-white mb-2">{title}</div> : null}
    <div className="text-gray-200 leading-relaxed">{children}</div>
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
      <div className="text-sm font-semibold tracking-wide text-white uppercase">{name}</div>
      <div className="text-xs text-gray-400 italic">{role}</div>
    </div>
  </div>
);

// ✅ Enhetlig "Prompt:"-stil (samma som i Object details-raden)
const PromptLine = ({ text, className = "" }) => (
  <div className={`text-gray-200 text-sm leading-snug ${className}`}>
    <span className="font-semibold text-white">Prompt:</span>{" "}
    <span className="text-gray-300">{text}</span>
  </div>
);

/**
 * Prompt-sektion (som i din bild):
 * - 3 bilder i rad
 * - stor bildkort med rundning/border
 * - stor label under varje bild (ex: Midjourney / Dreamshaper / DALL·E)
 *
 * ✅ NYTT:
 * - Prompt-raden använder PromptLine (enhetlig stil/storlek)
 */
const PromptSectionWithLabels = ({
  title,
  items, // [{src, alt, pos?, label, subtitleAfterLabel?}]
  openLightbox,
  columnsClassName = "grid-cols-1 sm:grid-cols-3",
  roundedClassName = "rounded-2xl",
  thumbHeightClassName = "h-[240px] sm:h-[260px] md:h-[280px]",
}) => (
  <section className="space-y-4">
    <div className="border-b border-white/10 pb-2">
      <PromptLine text={title} />
    </div>

    <div className={`grid ${columnsClassName} gap-6 items-start`}>
      {items.map((it, idx) => (
        <div key={`${it.alt}-${idx}`} className="space-y-3">
          <button
            type="button"
            onClick={() => openLightbox(it.src, it.alt)}
            className={`w-full overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${roundedClassName}`}
            aria-label={`Öppna bild ${idx + 1}`}
          >
            <div className={`w-full ${thumbHeightClassName} bg-black/20`}>
              <img
                src={it.src}
                alt={it.alt}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                style={{ objectPosition: it.pos ?? "50% 50%" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </button>

          {/* ✅ Stor label under bilden */}
          <div className="text-center font-extrabold tracking-tight text-white text-3xl sm:text-4xl">
            {it.label}
          </div>

          {/* (Valfri text under labeln, kvar för framtida bruk) */}
          {it.subtitleAfterLabel ? (
            <div className="text-center text-sm sm:text-base font-semibold text-white/90">
              {it.subtitleAfterLabel}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  </section>
);

/**
 * Sektion med per-bild prompts
 * + ✅ Rubrikstöd (asHeading)
 * + ✅ Prompt-rader i enhetlig stil via PromptLine
 *
 * ✅ NYTT:
 * - showHeader: låter dig visa rubriken EN gång och stapla flera grids under samma card utan att rubriken upprepas
 * - item.below: om du vill ersätta prompt-raden med egen rad (t.ex. "3D Scene")
 */
const PromptSectionWithPerImagePrompts = ({
  title,
  items, // [{src, alt, pos?, prompt?, below?}]
  openLightbox,
  columnsClassName = "grid-cols-1 sm:grid-cols-3",
  roundedClassName = "rounded-2xl",
  thumbHeightClassName = "h-[240px] sm:h-[260px] md:h-[280px]",
  asHeading = false,
  showHeader = true,
  // ✅ default objectPosition för alla bilder i sektionen (kan overridas per item.pos)
  defaultObjectPosition = "50% 50%",
  // ✅ extra class på img (t.ex. zoom)
  imgClassName = "",
}) => (
  <section className="space-y-4">
    {showHeader ? (
      <div className="border-b border-white/10 pb-2">
        {asHeading ? (
          <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
        ) : (
          <PromptLine text={title} />
        )}
      </div>
    ) : null}

    <div className={`grid ${columnsClassName} gap-6 items-start`}>
      {items.map((it, idx) => (
        <div key={`${it.alt}-${idx}`} className="space-y-3">
          <button
            type="button"
            onClick={() => openLightbox(it.src, it.alt)}
            className={`w-full overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${roundedClassName}`}
            aria-label={`Öppna bild ${idx + 1}`}
          >
            <div className={`w-full ${thumbHeightClassName} bg-black/20`}>
              <img
                src={it.src}
                alt={it.alt}
                className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02] ${imgClassName}`}
                style={{ objectPosition: it.pos ?? defaultObjectPosition }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </button>

          {/* ✅ Antingen custom-rad (t.ex. 3D Scene) eller vanlig prompt */}
          {it.below ? it.below : it.prompt ? <PromptLine text={it.prompt} /> : null}
        </div>
      ))}
    </div>
  </section>
);

/**
 * ✅ NYTT: "Länk-card" för shot 24–25
 * - två stora tiles med bild + overlay
 * - klick på bilden öppnar lightbox
 * - separat knapp öppnar extern länk i ny flik
 */
const LinkedShotsSection = ({
  title,
  items, // [{src, alt, href, label, subtitle?}]
  openLightbox,
  columnsClassName = "grid-cols-1 sm:grid-cols-2",
  thumbHeightClassName = "h-[280px] sm:h-[320px] md:h-[360px]",
}) => (
  <section className="space-y-4">
    <div className="border-b border-white/10 pb-2">
      <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
    </div>

    <div className={`grid ${columnsClassName} gap-6 items-start`}>
      {items.map((it, idx) => (
        <div key={`${it.alt}-${idx}`} className="space-y-3">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            {/* Bild (lightbox) */}
            <button
              type="button"
              onClick={() => openLightbox(it.src, it.alt)}
              className="relative w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              aria-label={`Öppna bild ${idx + 1}`}
            >
              <div className={`w-full ${thumbHeightClassName} bg-black/20`}>
                <img
                  src={it.src}
                  alt={it.alt}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Overlay label */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-cyan-300/90" />
                  <span className="text-white font-semibold">{it.label}</span>
                </div>
                {it.subtitle ? <div className="mt-2 text-sm text-gray-200">{it.subtitle}</div> : null}
              </div>
            </button>

            {/* CTA-rad */}
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">Extern länk:</span>{" "}
                <span className="text-gray-400">öppnas i ny flik</span>
              </div>

              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-blue-500/20 hover:bg-blue-500/30 ring-1 ring-blue-400/30 hover:ring-blue-400/40 px-4 py-2 text-sm font-semibold text-blue-200 transition-all"
                aria-label={`Öppna ${it.label}`}
                title={`Öppna ${it.label}`}
              >
                Öppna ↗
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export const AiDesign = () => {
  const tags = ["AI", "Midjourney", "Blender", "NeRF", "2022"];
  const team = [{ name: "Pierre Lundqvist", role: "UX/UI-Designer", img: profile }];

  const { get: getShot } = useShotLoader();

  // Lightbox
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const openLightbox = (src, alt) => setLightbox({ open: true, src, alt });
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = lightbox.open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox.open]);

  // Gallery (1–6)
  const gallery = useMemo(() => {
    const items = [
      { n: 1, alt: "AI & Design – Bild 1", caption: "hyperrealistic portrait of a native front view" },
      { n: 2, alt: "AI & Design – Bild 2", caption: "tribal tatoos, earring, necklace" },
      { n: 3, alt: "AI & Design – Bild 3", caption: "open jungle + teepee + campfire (long shot)" },
      { n: 4, alt: "AI & Design – Bild 4", caption: "crouching body, dog" },
      { n: 5, alt: "AI & Design – Bild 5", caption: "art nouveau speakers, innovative design, product photography" },
      { n: 6, alt: "AI & Design – Bild 6", caption: "necklace, hat, beanie. west, sunglases" },
    ];

    return items
      .map((it) => {
        const src = getShot(it.n);
        return src ? { n: it.n, src, alt: it.alt, caption: it.caption } : null;
      })
      .filter(Boolean);
  }, [getShot]);

  // ✅ Dela upp galleri: 1–4 (Firefly/PS) och 5–6 (Midjourney/PS)
  const gallery_1_4 = useMemo(() => gallery.filter((x) => x.n <= 4), [gallery]);
  const gallery_5_6 = useMemo(() => gallery.filter((x) => x.n >= 5), [gallery]);

  /**
   * ✅ Shot 7–9: med labels
   */
  const promptSection_7_9_labeled = useMemo(() => {
    const src7 = getShot(7);
    const src8 = getShot(8);
    const src9 = getShot(9);

    const posByN = { 7: "50% 55%", 8: "50% 55%", 9: "50% 55%" };

    const items = [
      src7 ? { src: src7, alt: "AI & Design – Bild 7", pos: posByN[7], label: "Midjourney" } : null,
      src8 ? { src: src8, alt: "AI & Design – Bild 8", pos: posByN[8], label: "Dreamshaper" } : null,
      src9 ? { src: src9, alt: "AI & Design – Bild 9", pos: posByN[9], label: "DALL·E" } : null,
    ];

    return items.filter(Boolean);
  }, [getShot]);

  /**
   * ✅ Shot 10–12: labels (samma modeller)
   */
  const promptSection_10_12_labeled = useMemo(() => {
    const src10 = getShot(10);
    const src11 = getShot(11);
    const src12 = getShot(12);

    const posByN = { 10: "50% 35%", 11: "50% 35%", 12: "50% 35%" };

    const items = [
      src10 ? { src: src10, alt: "AI & Design – Bild 10", pos: posByN[10], label: "Midjourney" } : null,
      src11 ? { src: src11, alt: "AI & Design – Bild 11", pos: posByN[11], label: "Dreamshaper" } : null,
      src12 ? { src: src12, alt: "AI & Design – Bild 12", pos: posByN[12], label: "DALL·E" } : null,
    ];

    return items.filter(Boolean);
  }, [getShot]);

  /**
   * ✅ Shot 13–15: per-bild prompts (mouse-set)
   */
  const promptSection_13_15_perPrompts = useMemo(() => {
    const posByN = { 13: "50% 50%", 14: "50% 55%", 15: "50% 55%" };

    const promptByN = {
      13: "futuristic computer mouse with led lights, colorful, symetrical composition, pure white background",
      14: "computer mouse made of wood,moss, stone, symetrical composition, pure white background",
      15: "computer mouse made of black carbon, symetrical composition, pure white background",
    };

    return [13, 14, 15]
      .map((n) => {
        const src = getShot(n);
        if (!src) return null;
        return { src, alt: `AI & Design – Bild ${n}`, pos: posByN[n], prompt: promptByN[n] ?? null };
      })
      .filter(Boolean);
  }, [getShot]);

  /**
   * ✅ Blender + Stable Diffusion (16–23) — ALLT I SAMMA CARD (staplade grids)
   */
  const promptSection_16_17_perPrompts = useMemo(() => {
    const posByN = { 16: "50% 60%", 17: "50% 60%" };
    const promptByN = { 16: "Luna pearl granite", 17: "Fire" };

    return [16, 17]
      .map((n) => {
        const src = getShot(n);
        if (!src) return null;
        return { src, alt: `AI & Design – Bild ${n}`, pos: posByN[n], prompt: promptByN[n] ?? null };
      })
      .filter(Boolean);
  }, [getShot]);

  const promptSection_18_19_perPrompts = useMemo(() => {
    const posByN = { 18: "50% 60%", 19: "50% 60%" };
    const promptByN = { 18: "Black marble", 19: "Magma stone" };

    return [18, 19]
      .map((n) => {
        const src = getShot(n);
        if (!src) return null;
        return { src, alt: `AI & Design – Bild ${n}`, pos: posByN[n], prompt: promptByN[n] ?? null };
      })
      .filter(Boolean);
  }, [getShot]);

  /**
   * ✅ Shot 20–21: gör dem "ut till kanten" som 18–19
   * -> mer “zoom/edge-to-edge” via högre scale + lite mer centrerad pos
   */
  const promptSection_20_21_perPrompts = useMemo(() => {
    const posByN = { 20: "50% 52%", 21: "50% 52%" };
    const promptByN = {
      20: "Rustic metal",
      21: "Translucent green glass, Natural cork, blue and white ornamental pattern, aged steel, worn paint",
    };

    return [20, 21]
      .map((n) => {
        const src = getShot(n);
        if (!src) return null;
        return { src, alt: `AI & Design – Bild ${n}`, pos: posByN[n], prompt: promptByN[n] ?? null };
      })
      .filter(Boolean);
  }, [getShot]);

  /**
   * ✅ Shot 22–23 under 20–21
   * - 22: ingen prompt, visa "3D Scene" i bold
   * - 23: prompt enligt dig
   *
   * + samma “ut till kanten”-känsla som 18–19
   */
  const promptSection_22_23_perPrompts = useMemo(() => {
    const posByN = { 22: "50% 50%", 23: "50% 50%" };
    const promptByN = {
      23: "a cupcake with sparkle, high energy, oil paint",
    };

    return [22, 23]
      .map((n) => {
        const src = getShot(n);
        if (!src) return null;

        if (n === 22) {
          return {
            src,
            alt: `AI & Design – Bild ${n}`,
            pos: posByN[n],
            // 👇 ersätter prompt-raden
            below: <div className="text-white font-semibold">3D Scene</div>,
          };
        }

        return {
          src,
          alt: `AI & Design – Bild ${n}`,
          pos: posByN[n],
          prompt: promptByN[n] ?? null,
        };
      })
      .filter(Boolean);
  }, [getShot]);

  /**
   * ✅ NYTT: Shot 24–25 som eget card med externa länkar
   */
  const linkedShots_24_25 = useMemo(() => {
    const src24 = getShot(24);
    const src25 = getShot(25);

    const items = [
      src24
        ? {
            src: src24,
            alt: "AI & Design – Bild 24",
            label: "Luma Capture",
            href: "https://lumalabs.ai/capture/c772e914-8afe-4555-9e75-8ce72062071f",
          }
        : null,
      src25
        ? {
            src: src25,
            alt: "AI & Design – Bild 25",
            label: "CapCut Presentation",
            href: "https://www.capcut.com/presentation/7324081078610935810?workspaceId=7323754156819447809&utm_source=share&utm_medium=product",
          }
        : null,
    ];

    return items.filter(Boolean);
  }, [getShot]);

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div>
          <Link to="/#projects" className="text-blue-400 hover:text-blue-300">
            ← Tillbaka till projekt
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            AI och Design
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-6">
            {team.map((m) => (
              <TeamMember key={m.name} imgSrc={m.img} name={m.name} role={m.role} />
            ))}
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">{/* intro */}</p>

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

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src={cover}
              alt="Översiktsbild för AI och Design"
              className="w-full h-60 sm:h-72 md:h-80 object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* ====== CARD 1: Generativ AI ====== */}
            <Card className="md:col-span-3">
              <h2 className="text-xl font-bold mb-3">Generativ AI</h2>

              <div className="text-gray-300 leading-relaxed space-y-6">
                <Callout title="Kurs & upplägg">
                  Denna kurs handlade om att använda olika typer av AI för att skapa AI-genererade bilder, texturer till
                  3D-objekt i Blender, AI-animationer och NeRFs. Fokus låg på att lära sig skriva bra prompts och
                  kombinera resultaten med 3D-grafik i Blender.
                </Callout>

                {/* ====== 1–4: Adobe Firefly + Adobe Photoshop Beta ====== */}
                <div className="space-y-3">
                  <div className="flex items-end justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-white">Adobe Firefly + Adobe Photoshop Beta</h3>
                  </div>

                  <div className="space-y-3 text-gray-300 leading-relaxed">
                    <p>
                      Jag började med att hitta ett vanligt porträtt av en urfolksperson i Firefly. Efter att ha hittat
                      ett bra porträtt fortsatte jag att redigera bilden i Photoshop Beta. Personen fick
                      ansiktstatueringar samt ett halsband och fler örhängen.
                    </p>
                    <p>
                      Därefter behövde jag ett sammanhang för porträttet och sökte efter en miljö som passade, en öppen
                      djungel med en tipi och en lägereld.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery_1_4.map((img, idx) => (
                      <figure key={`${img.alt}-${idx}`} className="space-y-2">
                        <button
                          type="button"
                          onClick={() => openLightbox(img.src, img.alt)}
                          className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          aria-label={`Öppna bild ${idx + 1}`}
                        >
                          <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] bg-black/20">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                              style={{ objectPosition: "50% 50%" }}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </button>

                        {img.caption ? <PromptLine text={img.caption} className="text-xs" /> : null}
                      </figure>
                    ))}
                  </div>
                </div>

                {/* ====== 5–6: Midjourney + Adobe Photoshop Beta ====== */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-end justify-between gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-white">Midjourney + Adobe Photoshop Beta</h3>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    Arbetet inleddes i Midjourney där grundbilden och kompositionen genererades utifrån ett urbant
                    stadslanskap i ett fisheye perspektiv. Därefter bearbetades bilden i Adobe Photoshop Beta, med
                    accessoarer som kedjor, hattar och solglasögon på duvorna. Typografi lades till och justerades.
                    Genom redigering och finjustering skapades en sammanhållen visuell identitet med fokus på kontrast,
                    karaktär och ett albumomslagsliknande uttryck.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery_5_6.map((img, idx) => (
                      <figure key={`${img.alt}-${idx}`} className="space-y-2">
                        <button
                          type="button"
                          onClick={() => openLightbox(img.src, img.alt)}
                          className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          aria-label={`Öppna bild ${idx + 1}`}
                        >
                          <div className="w-full h-[220px] sm:h-[240px] md:h-[260px] bg-black/20">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                              style={{ objectPosition: "50% 50%" }}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </button>

                        {img.caption ? <PromptLine text={img.caption} className="text-xs" /> : null}
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* ====== CARD 2: Samma prompt... (cenote + selfie) ====== */}
            <Card className="md:col-span-3">
              <h2 className="text-xl font-bold mb-3">Samma prompt, Olika AI modeller.</h2>

              <div className="text-gray-300 leading-relaxed space-y-8">
                <PromptSectionWithLabels
                  title="a mexican cenote, bright daylight, high energy, 32k, Nikon Z 9"
                  items={promptSection_7_9_labeled}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-3"
                  thumbHeightClassName="h-[240px] sm:h-[260px] md:h-[280px]"
                />

                <PromptSectionWithLabels
                  title="a cute monkey taking a selfie, Low angle, Medium shot, Iphone 14 pro"
                  items={promptSection_10_12_labeled}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-3"
                  thumbHeightClassName="h-[240px] sm:h-[260px] md:h-[280px]"
                />
              </div>
            </Card>

            {/* ====== CARD 3: Object details ====== */}
            <Card className="md:col-span-3">
              <div className="text-gray-300 leading-relaxed">
                <PromptSectionWithPerImagePrompts
                  title="Object details - Midjourney"
                  asHeading
                  items={promptSection_13_15_perPrompts}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-3"
                  thumbHeightClassName="h-[240px] sm:h-[260px] md:h-[280px]"
                />
              </div>
            </Card>

            {/* ====== CARD 4: Blender + stable diffusion (16–23 i samma card, under varandra) ====== */}
            <Card className="md:col-span-3">
              <div className="text-gray-300 leading-relaxed space-y-10">
                {/* 16–17 (rubrik visas en gång) */}
                <PromptSectionWithPerImagePrompts
                  title="Blender + stable diffusion"
                  asHeading
                  showHeader
                  items={promptSection_16_17_perPrompts}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-2"
                  thumbHeightClassName="h-[280px] sm:h-[320px] md:h-[360px]"
                  imgClassName="scale-[1.12]"
                  defaultObjectPosition="50% 60%"
                />

                {/* 18–19 */}
                <PromptSectionWithPerImagePrompts
                  title="Blender + stable diffusion"
                  asHeading
                  showHeader={false}
                  items={promptSection_18_19_perPrompts}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-2"
                  thumbHeightClassName="h-[280px] sm:h-[320px] md:h-[360px]"
                  imgClassName="scale-[1.12]"
                  defaultObjectPosition="50% 60%"
                />

                {/* 20–21 (✅ mer “till kanten” som 18–19) */}
                <PromptSectionWithPerImagePrompts
                  title="Blender + stable diffusion"
                  asHeading
                  showHeader={false}
                  items={promptSection_20_21_perPrompts}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-2"
                  thumbHeightClassName="h-[280px] sm:h-[320px] md:h-[360px]"
                  // 👇 lite mer edge-to-edge
                  imgClassName="scale-[1.22]"
                  defaultObjectPosition="50% 52%"
                />

                {/* 22–23 under 20–21 (✅ samma “till kanten”-känsla) */}
                <PromptSectionWithPerImagePrompts
                  title="Blender + stable diffusion"
                  asHeading
                  showHeader={false}
                  items={promptSection_22_23_perPrompts}
                  openLightbox={openLightbox}
                  columnsClassName="grid-cols-1 sm:grid-cols-2"
                  thumbHeightClassName="h-[280px] sm:h-[320px] md:h-[360px]"
                  imgClassName="scale-[1.22]"
                  defaultObjectPosition="50% 52%"
                />
              </div>
            </Card>

            {/* ====== CARD 5: Shot 24–25 med länkar ====== */}
            {linkedShots_24_25.length ? (
              <Card className="md:col-span-3">
                <div className="text-gray-300 leading-relaxed">
                  <LinkedShotsSection
                    title="Nerfs + Video Generator"
                    items={linkedShots_24_25}
                    openLightbox={openLightbox}
                    columnsClassName="grid-cols-1 sm:grid-cols-2"
                    thumbHeightClassName="h-[280px] sm:h-[320px] md:h-[360px]"
                  />
                </div>
              </Card>
            ) : null}
          </div>

          <div className="mt-12 flex justify-between">
            <Link to="/projects/forskningsmetoder" className="text-blue-400 hover:text-blue-300">
              ← Föregående
            </Link>
            <Link to="/projects/examensarbete" className="text-blue-400 hover:text-blue-300">
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
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
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
