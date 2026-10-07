import React from "react";
import { Award, Rocket } from "lucide-react";
import { useMessages } from "../i18n/localeStore";

const AboutMe: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const t = useMessages().about;
  return (
    <section id={sectionId} className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            {t.heading}{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {t.headingAccent}
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">{t.text}</p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Award className="text-amber-400" size={20} />
              <span>{t.degree}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Rocket className="text-amber-400" size={20} />
              <span>{t.experience}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
