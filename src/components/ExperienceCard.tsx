import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  description: string;
  companyDescription: string;
  technologies: string[];
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  position,
  duration,
  description,
  companyDescription,
  technologies,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="p-6 md:p-8">
        <div className="md:flex md:justify-between md:items-start">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white">{position}</h3>
            <p className="text-primary-400 font-medium mt-1">{company}</p>
            <p className="text-gray-400 text-sm mt-1">{duration}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-200 mb-2">About {company}</h4>
            <p className="text-gray-300">{companyDescription}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-200 mb-2">Responsibilities</h4>
            <p className="text-gray-300">{description}</p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-200 mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-700 text-primary-300 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;