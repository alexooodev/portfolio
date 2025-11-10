import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Background from "./components/Backfround";
import ContactModal from "./components/ContactModal";
import AboutMe from "./components/AboutMe";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import ContactInfo from "./components/ContactInfo";
import Footer from "./components/Footer";
import { useContactStore } from "./store/contactStore";
import { SECTIONS } from "./data/sectionsData";

export default function Portfolio() {
  const { isOpen, closeModal } = useContactStore();

  const { home, about, experience, skills, contact } = SECTIONS;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Background />
      <Navbar />
      <Hero sectionId={home} />
      <AboutMe sectionId={about} />
      <WorkExperience sectionId={experience} />
      <Skills sectionId={skills} />
      <ContactInfo sectionId={contact} />
      <ContactModal isOpen={isOpen} onClose={closeModal} />
      <Footer />

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
