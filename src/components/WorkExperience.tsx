import React from "react";
import ExperienceCard from "./ExperienceCard";
import { EXPERIENCES } from "../data/experienceData";
import { useMessages } from "../i18n/localeStore";

const WorkExperience: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const t = useMessages().experience;
  return (
    <section id={sectionId} className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          {t.heading}{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            {t.headingAccent}
          </span>
        </h2>

        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <ExperienceCard
              key={exp.id}
              id={exp.id}
              company={exp.company}
              role={t.items[exp.id].role}
              period={t.items[exp.id].period}
              achievements={t.items[exp.id].achievements}
              location={exp.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
