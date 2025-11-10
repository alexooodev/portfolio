import React from "react";
interface ExperienceCardProps {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = (props) => {
  const exp = props;

  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-yellow-500 rounded-l-2xl"></div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
          <p className="text-amber-400 font-semibold text-lg">{exp.company}</p>
        </div>
        <div className="text-slate-400 mt-2 md:mt-0">
          <p>{exp.period}</p>
          <p className="text-sm">{exp.location}</p>
        </div>
      </div>

      <ul className="space-y-3 mt-6">
        {exp.achievements.map((achievement, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-300">
            <span className="text-amber-400 mt-1">▹</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
