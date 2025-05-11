import React from "react";
import { motion } from "framer-motion";
import { Code, Coffee, Gamepad, Book, Plane, Camera } from "lucide-react";

const AboutMe: React.FC = () => {
  const interests = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Coding",
      description: "Passionate about creating elegant solutions to complex problems.",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Coffee",
      description: "Exploring different brewing methods and coffee origins.",
    },
    {
      icon: <Gamepad className="h-6 w-6" />,
      title: "Gaming",
      description: "Enjoying strategy games and indie titles in my free time.",
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Reading",
      description: "Tech blogs, sci-fi novels, and personal development books.",
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Travel",
      description: "Exploring new cultures and gathering diverse perspectives.",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Photography",
      description: "Capturing moments and practicing mobile photography.",
    },
  ];

  return (
    <section id="aboutme" className="section bg-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">More About Me</h2>
          <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Beyond coding, I'm passionate about various interests that shape who I am and influence my creative approach
            to problem-solving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center mb-4">
                <div className="text-primary-400 mr-3">{interest.icon}</div>
                <h3 className="text-xl font-semibold">{interest.title}</h3>
              </div>
              <p className="text-gray-300">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
