import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { useContactStore } from "../store/contactStore.ts";

const ContactInfo: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { openModal } = useContactStore();

  return (
    <section id={sectionId} className="relative py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Let's Work{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Together</span>
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
            onClick={openModal}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:-translate-y-1 flex items-center gap-2"
          >
            <Mail size={20} />
            Send me a message
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/alex-silva-figueroa-5b62a4187/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500 hover:bg-amber-500/10 transition-all hover:-translate-y-1"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/alexooodev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500 hover:bg-amber-500/10 transition-all hover:-translate-y-1"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
