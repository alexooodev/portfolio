import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { useContactStore } from "../store/contactStore";

const Hero: React.FC = () => {
  const { openModal } = useContactStore();
  return (
    <section id="home" className="section pt-28 md:pt-32 min-h-[90vh] flex items-center">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-white">Hello, I'm </span>
            <span className="text-primary-500">Alex Silva</span>
          </h1>

          <h2 className="mb-6 text-2xl md:text-3xl text-gray-300">Frontend Software Engineer</h2>

          <p className="mb-8 text-lg text-gray-300 max-w-2xl">
            I create exceptional digital experiences with clean, efficient code. Specializing in modern JavaScript
            frameworks, I build responsive, high-performance web applications that users love.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <button onClick={openModal} className="btn btn-primary flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Me
            </button>
            <a
              href="https://drive.google.com/file/d/1GoLwIkEq8PPiuiHAvd77kG-G8EFt7kFi/view?usp=drive_link"
              download="cv.pdf"
              target="_blank"
              className="btn btn-secondary flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:example@example.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
