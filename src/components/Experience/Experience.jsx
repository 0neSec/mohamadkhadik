// components/Experience/Experience.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCode, 
  FaServer, 
  FaLaptopCode, 
  FaCalendarAlt,
  FaChevronRight,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaRocket
} from "react-icons/fa";

const experiences = [
  {
    title: "Frontend Developer",
    company: "Politeknik Harapan Bersama",
    period: "Oktober 2022 - Januari 2023",
    description: "Membangun Website Event Infovest 2022 dengan teknologi React.js modern dan optimasi performa",
    type: "Frontend",
    tech: ["React.js", "Bootstrap", "CSS3", "HTML5"],
    achievements: ["Performance score 95+ Lighthouse", "Mobile-first design", "Real-time updates"],
    link: "#",
    icon: <FaLaptopCode />
  },
  {
    title: "Fullstack Developer",
    company: "Politeknik Harapan Bersama",
    period: "Oktober 2023 - Desember 2023",
    description: "Mengembangkan sistem pendaftaran event dengan dashboard admin dan manajemen data real-time",
    type: "Fullstack",
    tech: ["React.js", "Node.js", "Firebase", "JWT"],
    achievements: ["400+ peserta terdaftar", "Auto-email system", "Dashboard analytics"],
    link: "#",
    icon: <FaLayerGroup />
  },
  {
    title: "Backend Developer",
    company: "Keluaran Desa Selapura",
    period: "Januari 2023 - Mei 2023",
    description: "Membangun CMS custom untuk pengelolaan konten desa dengan sistem autentikasi multi-level",
    type: "Backend",
    tech: ["PHP Native", "MySQL", "jQuery", "Bootstrap"],
    achievements: ["SEO optimized", "Fast loading <2s", "User-friendly admin"],
    link: "#",
    icon: <FaServer />
  },
  {
    title: "Backend Developer",
    company: "PT. Toekang Digital Indonesia",
    period: "12 Agustus 2024 - 12 Januari 2025",
    description: "Mengembangkan multiple enterprise systems dengan architecture microservices dan CI/CD pipeline",
    type: "Backend",
    tech: ["Laravel", "Next.js", "PostgreSQL"],
    achievements: ["3 sistem terintegrasi", "API documentation", "Automated testing 90%"],
    link: "#",
    icon: <FaRocket />
  },
  {
    title: "Frontend Developer",
    company: "Wisata Kesehatan Jamu",
    period: "11 Oktober 2024 - Sekarang",
    description: "Membuat E-commerce dengan real-time features dan integrasi API modern untuk wisata kesehatan",
    type: "Frontend",
    tech: ["React.js", "Go",  "WebSockets"],
    achievements: ["Offline capability", "Real-time booking"],
    link: "#",
    icon: <FaCode />
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const buttonVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  tap: {
    scale: 0.98
  }
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: -30,
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const glowVariants = {
  initial: { 
    opacity: 0.3,
    scale: 0.8 
  },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [0.8, 1.1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState(null);
  const [activeType, setActiveType] = useState("All");

  const filteredExperiences = experiences.filter(exp => 
    activeType === "All" || exp.type === activeType
  );

  const typeStats = {
    All: experiences.length,
    Frontend: experiences.filter(e => e.type === "Frontend").length,
    Backend: experiences.filter(e => e.type === "Backend").length,
    Fullstack: experiences.filter(e => e.type === "Fullstack").length
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/20 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-purple-900/10"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={titleVariants}
          className="text-center mb-16 relative"
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-full"
            />
            
            <h2 className="text-5xl md:text-7xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Experiences
              </span>
            </h2>
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 180 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 mx-auto rounded-full mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed"
          >
            Perjalanan pengembangan teknologi yang membentuk keahlian dan visi saya dalam dunia digital
          </motion.p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {Object.keys(typeStats).map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveType(type);
                setSelectedExp(null);
              }}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300
                flex items-center gap-3 relative overflow-hidden group
                ${activeType === type 
                  ? type === "Frontend" 
                    ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white shadow-lg shadow-cyan-500/25"
                    : type === "Backend"
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25"
                    : type === "Fullstack"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/25"
                    : "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg"
                  : "bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600"
                }
              `}
            >
              <span className="relative z-10">{type}</span>
              <span className={`
                text-xs px-2 py-1 rounded-full relative z-10
                ${activeType === type 
                  ? "bg-white/20" 
                  : "bg-gray-800"
                }
              `}>
                {typeStats[type]}
              </span>
              
              {/* Active indicator */}
              {activeType === type && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Experience Buttons Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {filteredExperiences.map((exp, index) => (
            <motion.button
              key={index}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setSelectedExp(selectedExp === index ? null : index)}
              className={`
                relative rounded-2xl p-6 text-left overflow-hidden
                border-2 transition-all duration-300
                ${selectedExp === index 
                  ? exp.type === "Frontend" 
                    ? "border-cyan-500 bg-cyan-500/5 shadow-lg shadow-cyan-500/20" 
                    : exp.type === "Backend" 
                    ? "border-purple-500 bg-purple-500/5 shadow-lg shadow-purple-500/20" 
                    : "border-green-500 bg-green-500/5 shadow-lg shadow-green-500/20"
                  : exp.type === "Frontend" 
                    ? "border-cyan-500/20 bg-gray-900/50 hover:border-cyan-500/40 hover:bg-cyan-500/5" 
                    : exp.type === "Backend" 
                    ? "border-purple-500/20 bg-gray-900/50 hover:border-purple-500/40 hover:bg-purple-500/5" 
                    : "border-green-500/20 bg-gray-900/50 hover:border-green-500/40 hover:bg-green-500/5"
                }
              `}
            >
              {/* Background gradient */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                ${exp.type === "Frontend" 
                  ? "bg-gradient-to-br from-cyan-500/5 via-transparent to-cyan-500/2" 
                  : exp.type === "Backend" 
                  ? "bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/2" 
                  : "bg-gradient-to-br from-green-500/5 via-transparent to-green-500/2"
                }
              `} />

              <div className="relative z-10">
                {/* Icon and Type */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    exp.type === "Frontend" 
                      ? "bg-cyan-500/10 text-cyan-400" 
                      : exp.type === "Backend" 
                      ? "bg-purple-500/10 text-purple-400" 
                      : "bg-green-500/10 text-green-400"
                  }`}>
                    {exp.icon}
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${exp.type === "Frontend" 
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30" 
                      : exp.type === "Backend" 
                      ? "bg-purple-500/10 text-purple-300 border border-purple-500/30" 
                      : "bg-green-500/10 text-green-300 border border-green-500/30"
                    }
                  `}>
                    {exp.type}
                  </span>
                </div>

                {/* Title and Company */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {exp.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-lg text-cyan-300 font-medium">
                    {exp.company}
                  </p>
                  <FaChevronRight className="text-cyan-400/60 text-sm" />
                </div>

                {/* Period */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <FaCalendarAlt className="text-xs" />
                  {exp.period}
                </div>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className={`
                        px-3 py-1 rounded-full text-xs
                        ${exp.type === "Frontend" 
                          ? "bg-cyan-500/5 text-cyan-400 border border-cyan-500/20" 
                          : exp.type === "Backend" 
                          ? "bg-purple-500/5 text-purple-400 border border-purple-500/20" 
                          : "bg-green-500/5 text-green-400 border border-green-500/20"
                        }
                      `}
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.tech.length > 3 && (
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-400">
                      +{exp.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* View Details Arrow */}
                <div className="absolute bottom-4 right-4">
                  <FaChevronRight className={`
                    transition-transform duration-300
                    ${selectedExp === index ? "rotate-90" : ""}
                    ${exp.type === "Frontend" ? "text-cyan-400" : 
                      exp.type === "Backend" ? "text-purple-400" : 
                      "text-green-400"}
                  `} />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Detailed View */}
        <AnimatePresence>
          {selectedExp !== null && filteredExperiences[selectedExp] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`
                rounded-2xl p-8 mb-12 overflow-hidden
                border-2
                ${filteredExperiences[selectedExp].type === "Frontend" 
                  ? "border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-cyan-500/2" 
                  : filteredExperiences[selectedExp].type === "Backend" 
                  ? "border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-purple-500/2" 
                  : "border-green-500/20 bg-gradient-to-br from-green-500/5 to-green-500/2"
                }
              `}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Details */}
                <div className="lg:w-2/3">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`
                      p-4 rounded-2xl
                      ${filteredExperiences[selectedExp].type === "Frontend" 
                        ? "bg-cyan-500/10 text-cyan-400" 
                        : filteredExperiences[selectedExp].type === "Backend" 
                        ? "bg-purple-500/10 text-purple-400" 
                        : "bg-green-500/10 text-green-400"
                      }
                    `}>
                      {filteredExperiences[selectedExp].icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {filteredExperiences[selectedExp].title}
                      </h3>
                      <p className="text-xl text-cyan-300 font-medium">
                        {filteredExperiences[selectedExp].company}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                    {filteredExperiences[selectedExp].description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {filteredExperiences[selectedExp].tech.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium
                            ${filteredExperiences[selectedExp].type === "Frontend" 
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                              : filteredExperiences[selectedExp].type === "Backend" 
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                              : "bg-green-500/10 text-green-400 border border-green-500/20"
                            }
                          `}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                    <ul className="space-y-3">
                      {filteredExperiences[selectedExp].achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div className={`
                            w-2 h-2 rounded-full mt-2
                            ${filteredExperiences[selectedExp].type === "Frontend" 
                              ? "bg-cyan-500" 
                              : filteredExperiences[selectedExp].type === "Backend" 
                              ? "bg-purple-500" 
                              : "bg-green-500"
                            }
                          `} />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Action Button */}
                <div className="lg:w-1/3 lg:border-l lg:border-gray-800 lg:pl-8">
                  <div className="sticky top-8">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <FaCalendarAlt />
                        <span className="text-sm">Duration</span>
                      </div>
                      <p className="text-lg text-white">
                        {filteredExperiences[selectedExp].period}
                      </p>
                    </div>

                    <motion.a
                      href={filteredExperiences[selectedExp].link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        w-full py-4 rounded-xl font-medium flex items-center justify-center gap-3
                        ${filteredExperiences[selectedExp].type === "Frontend" 
                          ? "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800" 
                          : filteredExperiences[selectedExp].type === "Backend" 
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800" 
                          : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                        }
                        shadow-lg transition-all duration-300 group
                      `}
                    >
                      View Project Details
                      <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Orbital elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-500/20 rounded-full"
              animate={{
                x: [
                  `calc(${Math.cos(i * 30 * Math.PI / 180) * 200}px + 50%)`,
                  `calc(${Math.cos((i * 30 + 180) * Math.PI / 180) * 200}px + 50%)`,
                  `calc(${Math.cos(i * 30 * Math.PI / 180) * 200}px + 50%)`
                ],
                y: [
                  `calc(${Math.sin(i * 30 * Math.PI / 180) * 200}px + 50%)`,
                  `calc(${Math.sin((i * 30 + 180) * Math.PI / 180) * 200}px + 50%)`,
                  `calc(${Math.sin(i * 30 * Math.PI / 180) * 200}px + 50%)`
                ],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`p${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0 
              }}
              animate={{ 
                y: [null, -100, 0],
                opacity: [0, 0.4, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Projects", value: experiences.length, color: "cyan" },
            { label: "Years", value: "2+", color: "purple" },
            { label: "Technologies", value: "15+", color: "green" },
            { label: "Satisfaction", value: "100%", color: "cyan" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`
                rounded-2xl p-6 text-center
                bg-gradient-to-br from-gray-900/50 to-black/50
                border border-gray-800 backdrop-blur-sm
                relative overflow-hidden group
              `}
            >
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/5
              `} />
              
              <div className="text-4xl md:text-5xl font-bold mb-2 relative">
                <span className={`
                  bg-gradient-to-r from-${stat.color}-400 to-white bg-clip-text text-transparent
                `}>
                  {stat.value}
                </span>
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}