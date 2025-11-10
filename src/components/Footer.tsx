import React from "react";
import { Code, Github, Linkedin, Mail } from "lucide-react";
import { useSidebarStore } from "../store/sidebarStore";
import { useNavigationStore } from "../store/navigationStore";
import { SECTIONS } from "../data/sectionsData";
import { capitalize } from "../utils/utils";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isSidebarOpen, closeSidebar } = useSidebarStore();
  const { scrollToSection } = useNavigationStore();

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    if (isSidebarOpen) {
      closeSidebar();
    }
  };

  return (
    <footer className="relative border-t border-slate-800 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-primary-500 mr-2" />
              <span className="text-xl font-semibold text-white">Alexooodev</span>
            </div>
            <p className="text-slate-400">
              Creating elegant, user-friendly interfaces and exceptional digital experiences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {Object.values(SECTIONS).map((section) => (
                <li key={section} className="text-slate-400 hover:text-primary-400 transition-colors">
                  <button onClick={() => handleNavClick(section)}>{capitalize(section)}</button>
                </li>
              ))}
              {/* <li>
                <a href="#home" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:example@example.com"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} Alex Silva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
