import { RevealOnScroll } from "../RevealOnScroll";
import profileImage from "../../assets/profilbild.jpg"; // <-- Importera din bild

export const Home = () => {
    return (
        <section 
            id="home"
            className="min-h-screen flex items-center justify-center relative"
        >
            <RevealOnScroll>
                <div className="text-center z-10 px-4">
                    {/* Profilbild */}
                    <img 
                        src={profileImage} 
                        alt="Pierre Lundqvist" 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-6 shadow-lg"
                    />

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
                        Hej, Jag är Pierre Lundqvist
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
                        Jag är en UX-designer som älskar att skapa rena, genomtänkta gränssnitt och skalbara digitala produkter. 
                        Mitt mål är att ta fram lösningar som erbjuder både exceptionell användbarhet och en njutbar användarupplevelse.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <a 
                            href="#projects" 
                            className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                        >
                            Projekt
                        </a>
                        <a 
                            href="#contact" 
                            className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10"
                        >
                            Kontakt
                        </a>
                    </div>
                </div>
            </RevealOnScroll>
        </section>    
    );    
};
