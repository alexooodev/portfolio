import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useSidebarStore } from "../store/sidebarStore";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const { toggleSidebar } = useSidebarStore();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background-dark/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <nav className="container-custom flex items-center justify-between">
        <div className="flex items-center">
          <img className="w-40" src={logo} />
          {/* <Code className="h-8 w-8 text-primary-500 mr-2" /> */}
          {/* <span className="text-xl font-semibold">Portfolio</span> */}
        </div>

        <div className="hidden md:flex space-x-8">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#experience" className="nav-link">
            Experience
          </a>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </div>

        <button
          onClick={toggleSidebar}
          className="flex md:hidden text-gray-300 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
