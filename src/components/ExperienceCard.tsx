import React from 'react';
import { motion } from 'framer-motion';
import { useModalStore } from '../store/modalStore';
import { ChevronRight } from 'lucide-react';

interface ExperienceCardProps {
  company: string;
  position: string;
  duration: string;
  description: string;
  companyDescription: string;
  technologies: string[];
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = (props) => {
  const { openModal } = useModalStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: props.index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => openModal(props)}
    >
      <div className="p-6 md:p-8">
        <div className="md:flex md:justify-between md:items-start">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white">{props.position}</h3>
            <p className="text-primary-400 font-medium mt-1">{props.company}</p>
            <p className="text-gray-400 text-sm mt-1">{props.duration}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-300 line-clamp-3">{props.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {props.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="bg-gray-700 text-primary-300 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
            {props.technologies.length > 3 && (
              <span className="text-gray-400 text-sm flex items-center">
                +{props.technologies.length - 3} more
              </span>
            )}
          </div>

          <button
            className="mt-6 flex items-center text-primary-400 hover:text-primary-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              openModal(props);
            }}
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;