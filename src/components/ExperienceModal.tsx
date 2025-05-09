import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModalStore } from '../store/modalStore';

const ExperienceModal: React.FC = () => {
  const { isOpen, experienceDetails, closeModal } = useModalStore();

  if (!experienceDetails) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={closeModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                     bg-gray-800 rounded-lg shadow-xl z-50 md:w-[600px] max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{experienceDetails.position}</h3>
                  <p className="text-primary-400">{experienceDetails.company}</p>
                  <p className="text-gray-400 text-sm">{experienceDetails.duration}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">About the Company</h4>
                  <p className="text-gray-300">{experienceDetails.companyDescription}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Responsibilities</h4>
                  <p className="text-gray-300">{experienceDetails.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {experienceDetails.technologies.map((tech, index) => (
                      <span
                        key={index}
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
        </>
      )}
    </AnimatePresence>
  );
};

export default ExperienceModal;