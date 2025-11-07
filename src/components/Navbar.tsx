import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
// import { useSidebarStore } from "../store/sidebarStore";
import logoImg from "../assets/img/logo.png";

const Navbar: React.FC = () => {
  // const { toggleSidebar } = useSidebarStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {["home", "about", "experience", "skills", "contact"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => console.log(" section ")}
                  className={`capitalize hover:text-amber-400 transition-colors ${
                    activeSection === section ? "text-amber-400" : "text-slate-400"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300 hover:text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <ul className="flex flex-col space-y-4">
              {["home", "about", "experience", "skills", "contact"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => console.log(" section ")}
                    className="capitalize text-slate-300 hover:text-amber-400 transition-colors w-full text-left"
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
