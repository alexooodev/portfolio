import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { experienceData } from "../data/experienceData";

const WorkExperience: React.FC = () => {
  return (
    <section id="experience" className="section bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            I’ve contributed to some of the largest e-commerce platforms in Latin America, delivering scalable front-end
            solutions and high-performance digital experiences at enterprise level.
          </p>
        </motion.div>

        <div className="space-y-12">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={index}
              company={experience.company}
              position={experience.position}
              duration={experience.duration}
              description={experience.description}
              companyDescription={experience.companyDescription}
              technologies={experience.technologies}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
