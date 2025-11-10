import React from "react";

import { useContactStore } from "../store/contactStore";
import { useNavigationStore } from "../store/navigationStore";
import { useSidebarStore } from "../store/sidebarStore";
import { SECTIONS } from "../data/sectionsData";

const Hero: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { openModal } = useContactStore();
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const { scrollToSection } = useNavigationStore();

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    if (isSidebarOpen) {
      closeSidebar();
    }
  };
  return (
    <section id={sectionId} className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-amber-400 font-semibold">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                Alex Silva{" "}
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Figueroa
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-400 font-light">Frontend Software Engineer</h2>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed">
              Specialized in building scalable e-commerce solutions and optimizing user experiences for leading retail
              companies. Passionate about clean code, modern frameworks, and continuous innovation.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={openModal}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:-translate-y-1"
              >
                Get in Touch
              </button>
              <button
                onClick={() => handleNavClick(SECTIONS.experience)}
                className="px-8 py-3 border-2 border-amber-500 rounded-lg font-semibold hover:bg-amber-500/10 transition-all"
              >
                View Work
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="relative">
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm text-slate-400">alexooo.js</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2">
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span>{" "}
                  <span className="text-slate-400">=</span> {"{"}
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span> <span className="text-amber-400">'Alex Silva'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">role:</span>{" "}
                  <span className="text-amber-400">'Frontend Engineer'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">skills:</span> [
                </div>
                <div className="pl-8">
                  <span className="text-amber-400">'React'</span>, <span className="text-amber-400">'TypeScript'</span>,
                </div>
                <div className="pl-8">
                  <span className="text-amber-400">'Next.js'</span>, <span className="text-amber-400">'Tailwind'</span>
                </div>
                <div className="pl-4">],</div>
                <div className="pl-4">
                  <span className="text-slate-400">passion:</span>{" "}
                  <span className="text-amber-400">'Building amazing UX'</span>
                </div>
                <div>{"};"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
