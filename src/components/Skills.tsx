import React from "react";
import { SKILLS } from "../data/experienceData";
import { useMessages } from "../i18n/localeStore";

const Skills: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const t = useMessages().skills;
  return (
    <section id={sectionId} className="relative py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t.heading}{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            {t.headingAccent}
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {SKILLS.map((skillGroup) => (
            <div
              key={skillGroup.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300"
            >
              <h3 className="text-amber-400 font-semibold mb-4 text-lg">{t.categories[skillGroup.id]}</h3>
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
            <h3 className="text-amber-400 font-semibold mb-4 text-lg text-center">{t.methodologies}</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {t.methods.map((method) => (
                <span
                  key={method}
                  className="px-4 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-sm text-slate-200"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
