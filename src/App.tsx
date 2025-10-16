import { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Menu, X, Award, Rocket, Send } from "lucide-react";
import logoImg from "./assets/img/logo.png";
import { EXPERIENCES, SKILLS } from "./data/experienceData";
// Contact Modal Component
function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form data:", formData);
      setSubmitStatus("success");
      setIsSubmitting(false);

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitStatus(null);
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold">Get in Touch</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white"
              placeholder="Project Opportunity"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 transition-colors text-white resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          {submitStatus === "success" && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400 text-center">
              ✓ Message sent successfully! I'll get back to you soon.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "experience", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
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
                    onClick={() => scrollToSection(section)}
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
                      onClick={() => scrollToSection(section)}
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

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
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
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:-translate-y-1"
                >
                  Get in Touch
                </button>
                <button
                  onClick={() => scrollToSection("experience")}
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
                  <span className="ml-2 text-sm text-slate-400">developer.js</span>
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
                    <span className="text-amber-400">'React'</span>,{" "}
                    <span className="text-amber-400">'TypeScript'</span>,
                  </div>
                  <div className="pl-8">
                    <span className="text-amber-400">'Next.js'</span>,{" "}
                    <span className="text-amber-400">'Tailwind'</span>
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

      {/* About Section */}
      <section id="about" className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              About{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Frontend developer with experience in creating and optimizing e-commerce applications, specialized in
              migration strategies, development, and product scalability at leading companies. Passionate about teamwork
              and continuous learning, I constantly seek new challenges that strengthen my technical skills and
              contribute to the growth of the projects I participate in.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="text-amber-400" size={20} />
                <span>Computer Engineering</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Rocket className="text-amber-400" size={20} />
                <span>4+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Work{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <div className="space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-l-2xl"></div>

                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                    <p className="text-amber-400 font-semibold text-lg">{exp.company}</p>
                  </div>
                  <div className="text-slate-400 mt-2 md:mt-0">
                    <p>{exp.period}</p>
                    <p className="text-sm">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="text-amber-400 mt-1">▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Technical{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Skills</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {SKILLS.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300"
              >
                <h3 className="text-amber-400 font-semibold mb-4 text-lg">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300">
              <h3 className="text-amber-400 font-semibold mb-4 text-lg text-center">Methodologies</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-sm text-slate-200">
                  Scrum
                </span>
                <span className="px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-sm text-slate-200">
                  Kanban
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Let's Work{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Available for remote work. Focused on continuous improvement and innovation in frontend development.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-2xl">🇪🇸</span>
              <span>Spanish (Native)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-2xl">🇬🇧</span>
              <span>English (C1)</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              <Mail size={20} />
              Send me a message
            </button>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500 hover:bg-amber-500/10 transition-all hover:-translate-y-1"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500 hover:bg-amber-500/10 transition-all hover:-translate-y-1"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Footer */}
      <footer className="relative py-8 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>© 2025 Alex Silva Figueroa. Built with React & Tailwind CSS.</p>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
