import React, { useEffect } from "react";
import { X, Home, Briefcase, FolderKanban, Mail } from "lucide-react";
import { useSidebarStore } from "../store/sidebarStore";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen, closeSidebar]);

  const sidebarVariants = {
    open: { x: 0, transition: { type: "tween" } },
    closed: { x: "-100%", transition: { type: "tween" } },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full w-64 bg-gray-800 z-50 shadow-xl overflow-y-auto"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={closeSidebar} className="text-gray-400 hover:text-white" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-6">
            <a
              href="#home"
              onClick={closeSidebar}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </a>
            <a
              href="#experience"
              onClick={closeSidebar}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <Briefcase className="h-5 w-5" />
              <span>Experience</span>
            </a>
            <a
              href="#projects"
              onClick={closeSidebar}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <FolderKanban className="h-5 w-5" />
              <span>Projects</span>
            </a>
            <a
              href="#contact"
              onClick={closeSidebar}
              className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </a>
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
