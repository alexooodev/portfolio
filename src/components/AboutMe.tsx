import React from "react";
import { motion } from "framer-motion";
import { Code, Coffee, Gamepad, Book, Plane, Camera, Award, Rocket } from "lucide-react";

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
    <section id="about" className="relative py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            About{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Frontend developer with experience in creating and optimizing e-commerce applications, specialized in
            migration strategies, development, and product scalability at leading companies. Passionate about teamwork
            and continuous learning, I constantly seek new challenges that strengthen my technical skills and contribute
            to the growth of the projects I participate in.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Award className="text-amber-400" size={20} />
              <span>Computer Engineering</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Rocket className="text-amber-400" size={20} />
              <span>4+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
