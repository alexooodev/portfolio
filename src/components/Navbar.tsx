import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSidebarStore } from "../store/sidebarStore";
import { useNavigationStore } from "../store/navigationStore.ts";
import logoImg from "../assets/img/logo.png";
import { SECTIONS } from "../data/sectionsData.ts";

const Navbar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebarStore();
  const { activeSection, setActiveSection, scrollToSection } = useNavigationStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = Object.values(SECTIONS);
      const scrollPosition = window.scrollY + 80;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    if (isSidebarOpen) {
      closeSidebar();
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-900/80 backdrop-blur-lg border-b border-slate-800" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Alex Logo" className="h-12" />
          </div>

          <ul className="hidden md:flex items-center space-x-8">
            {Object.values(SECTIONS).map((section) => (
              <li key={section}>
                <button
                  onClick={() => handleNavClick(section)}
                  className={`capitalize hover:text-amber-400 transition-colors ${
                    activeSection === section ? "text-amber-400" : "text-slate-400"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>

          <button onClick={toggleSidebar} className="md:hidden text-slate-300 hover:text-white">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isSidebarOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              {Object.values(SECTIONS).map((section) => (
                <li key={section}>
                  <button
                    onClick={() => handleNavClick(section)}
                    className={`capitalize transition-colors w-full text-left ${
                      activeSection === section ? "text-amber-400" : "text-slate-300 hover:text-amber-400"
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
