import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
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

// Move static data outside component
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

// Simplified animation variants - reduced complexity
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const skillItemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
};

const headerVariants = {
  hidden: { y: -15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Extracted SkillCard component with React.memo
const SkillCard = React.memo(({ group, index, isHovered, onHoverStart, onHoverLeave }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative transition-all duration-300 ${
        isHovered ? "-translate-y-1" : ""
      }`}
      onHoverStart={() => onHoverStart(index)}
      onHoverLeave={onHoverLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${group.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 hidden md:block`}
        style={{ willChange: 'opacity' }}
      />

      <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 h-full">
        {/* Header */}
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">{group.icon}</span>
          <h3 className="text-xl font-bold text-gray-200">
            {group.category}
          </h3>
        </div>

        {/* Skill List - tetap sebagai button tapi tanpa fungsionalitas */}
        <div className="space-y-2">
          {group.items.map((skill, idx) => (
            <SkillItem
              key={idx}
              skill={skill}
              idx={idx}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-800/50 flex justify-between text-xs text-gray-400">
          <span>{group.items.length} skills</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Proficient
          </span>
        </div>
      </div>
    </motion.div>
  );
});

SkillCard.displayName = 'SkillCard';

// Extracted SkillItem component - tetap sebagai button tanpa onClick
const SkillItem = React.memo(({ skill, idx }) => {
  return (
    <motion.button
      custom={idx}
      variants={skillItemVariants}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      disabled={true} // Menonaktifkan button
      className="w-full flex items-center p-3 rounded-xl bg-gray-800/50 text-gray-300 cursor-default opacity-100"
      style={{ willChange: 'transform' }}
      aria-disabled="true"
    >
      <div className="text-lg mr-3">
        {skill.icon}
      </div>
      <span className="flex-1 font-medium text-sm text-left">
        {skill.name}
      </span>
    </motion.button>
  );
});

SkillItem.displayName = 'SkillItem';

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const ref = useRef(null);
  
  // Optimized useInView with once and reduced amount
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });

  // Memoize handlers
  const handleHoverStart = useCallback((index) => {
    setHoveredCategory(index);
  }, []);

  const handleHoverLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  // Memoize the skills list to prevent re-renders
  const memoizedSkills = useMemo(() => skills, []);

  return (
    <section
      id="skills"
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={ref}
      style={{ 
        contentVisibility: 'auto',
        containIntrinsicSize: '0 500px',
        willChange: 'transform'
      }}
    >
      {/* Simplified backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/5 to-transparent" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        {isInView && (
          <motion.div
            className="text-center mb-12"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Skills & Competencies
              </span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              Teknologi dan tools yang saya gunakan dalam pengembangan aplikasi
            </p>
          </motion.div>
        )}

        {/* Cards Grid */}
        {isInView && (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {memoizedSkills.map((group, index) => (
              <SkillCard
                key={index}
                group={group}
                index={index}
                isHovered={hoveredCategory === index}
                onHoverStart={handleHoverStart}
                onHoverLeave={handleHoverLeave}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}