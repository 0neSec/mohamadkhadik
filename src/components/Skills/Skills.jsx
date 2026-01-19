import React, { useState, useEffect, useRef } from "react";
import {
  FaReact,
  FaLaravel,
  FaPython,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiPostman,
} from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { motion, useInView, useAnimation } from "framer-motion";

const skills = [
  {
    category: "Programming Framework",
    icon: "💻",
    gradient: "from-cyan-400 to-blue-500",
    items: [
      { name: "React.js", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Laravel", icon: <FaLaravel /> },
      { name: "Python", icon: <FaPython /> },
      { name: "PHP Native", icon: <FaPhp /> },
    ],
  },
  {
    category: "Development Tools",
    icon: "🛠️",
    gradient: "from-purple-400 to-pink-500",
    items: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "VS Code", icon: <TbBrandVscode /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Figma", icon: <FaFigma /> },
    ],
  },
  {
    category: "Core Competencies",
    icon: "🚀",
    gradient: "from-orange-400 to-red-500",
    items: [
      { name: "Responsive Design", icon: "📱" },
      { name: "Team Collaboration", icon: "🤝" },
      { name: "Project Management", icon: "📊" },
      { name: "API Development", icon: "🔌" },
      { name: "Database Management", icon: "🗄️" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const skillItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleSkillClick = (skill) => {
    setActiveSkill(skill);
    console.log(`Skill clicked: ${skill}`);

    setTimeout(() => {
      setActiveSkill(null);
    }, 2000);
  };

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header dengan animasi */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Competencies
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Teknologi dan tools yang saya gunakan dalam pengembangan aplikasi
          </p>
        </motion.div>

        {/* Cards dengan animasi staggered */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skills.map((group, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`relative transition-all duration-500 ${
                hoveredCategory === index ? "-translate-y-2" : ""
              }`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Glow */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${group.gradient} rounded-2xl blur opacity-0 hover:opacity-30 transition duration-300`}
              ></div>

              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 h-full">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-4">{group.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-200">
                    {group.category}
                  </h3>
                </div>

                {/* Skill List dengan animasi individual */}
                <div className="space-y-3">
                  {group.items.map((skill, idx) => {
                    const isActive = activeSkill === skill.name;

                    return (
                      <motion.button
                        key={idx}
                        custom={idx}
                        variants={skillItemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSkillClick(skill.name)}
                        className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-r ${group.gradient} text-white`
                            : "bg-gray-800/50 hover:bg-gray-800/80 text-gray-300 hover:text-white"
                        }`}
                      >
                        {/* Icon Skill */}
                        <div className="text-xl mr-4">
                          {skill.icon}
                        </div>

                        {/* Nama Skill */}
                        <span className="flex-1 font-medium">
                          {skill.name}
                        </span>

                        {/* Arrow */}
                        <motion.span
                          animate={{ x: isActive ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Footer */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-800/50 flex justify-between text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span>{group.items.length} skills</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Proficient
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Notification */}
        {activeSkill && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="bg-gray-900/90 backdrop-blur rounded-full px-6 py-3 border border-gray-700 shadow-xl">
              <span className="text-white">
                Selected:{" "}
                <span className="text-cyan-300 font-semibold">
                  {activeSkill}
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}