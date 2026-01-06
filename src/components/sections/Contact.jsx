// src/components/sections/Contact.jsx
import { RevealOnScroll } from "../RevealOnScroll";

export const Contact = () => {
    return (
        <section
            id="contact"
            className="min-h-[60vh] flex items-center justify-center py-24"
        >
            <RevealOnScroll>
                <div className="max-w-4xl mx-auto text-center px-4">
                    {/* Stor titel – som "Contact Buffalo" */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        Kontakta mig
                    </h2>

                    {/* Introtext */}
                    <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
                        Hör av dig så kan vi prata om ditt nästa projekt, en potentiell
                        anställning eller bara bolla idéer kring UX och digitala produkter.
                    </p>

                    {/* Ikoner / kontakt-sätt */}
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
                        {/* E-post */}
                        <a
                            href="mailto:Pierre.lundqvist@gmail.com"
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-900/80 border border-slate-700/70 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.75)] group-hover:border-blue-500/80">
                                {/* Enkel “ikon” */}
                                <span className="text-3xl md:text-4xl">✉️</span>
                            </div>
                            <span className="mt-4 text-[11px] tracking-[0.25em] uppercase text-gray-500">
                                E-post
                            </span>
                            <span className="text-sm text-blue-400 font-medium mt-1 group-hover:text-blue-300">
                                Pierre.lundqvist@gmail.com
                            </span>
                        </a>

                        {/* Telefon */}
                        <a
                            href="tel:+46736186815"
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-900/80 border border-slate-700/70 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.75)] group-hover:border-blue-500/80">
                                <span className="text-3xl md:text-4xl">📱</span>
                            </div>
                            <span className="mt-4 text-[11px] tracking-[0.25em] uppercase text-gray-500">
                                Telefon
                            </span>
                            <span className="text-sm text-blue-400 font-medium mt-1 group-hover:text-blue-300">
                                +46 73 618 68 15
                            </span>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/pierre-lundqvist/"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-900/80 border border-slate-700/70 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.75)] group-hover:border-blue-500/80">
                                <span className="text-3xl md:text-4xl font-semibold">
                                    in
                                </span>
                            </div>
                            <span className="mt-4 text-[11px] tracking-[0.25em] uppercase text-gray-500">
                                LinkedIn
                            </span>
                            <span className="text-sm text-blue-400 font-medium mt-1 group-hover:text-blue-300">
                                Följ / Connecta
                            </span>
                        </a>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
};
