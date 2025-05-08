import React from 'react';
import { Code, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-primary-500 mr-2" />
              <span className="text-xl font-semibold text-white">Portfolio</span>
            </div>
            <p className="text-gray-400">
              Creating elegant, user-friendly interfaces and exceptional digital experiences.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#experience" className="hover:text-primary-400 transition-colors">Experience</a></li>
              <li><a href="#projects" className="hover:text-primary-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:example@example.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;