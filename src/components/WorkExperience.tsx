import React from "react";
import ExperienceCard from "./ExperienceCard";
import { EXPERIENCES } from "../data/experienceData";

const WorkExperience: React.FC = () => {
  return (
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
            <ExperienceCard
              key={index}
              id={exp.id}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              achievements={exp.achievements}
              location={exp.location}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
