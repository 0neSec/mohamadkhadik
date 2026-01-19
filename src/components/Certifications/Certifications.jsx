// components/Certifications/Certifications.jsx
import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  FaCertificate, 
  FaTrophy, 
  FaAward, 
  FaGraduationCap,
  FaMedal,
  FaStar,
  FaRocket,
  FaCrown,
  FaFire,
  FaShieldAlt,
  FaCheckCircle,
  FaCloud,
  FaArrowDown,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa";

const certifications = [
  { 
    title: "ID Camp learning path React Developer (Dicoding)", 
    issuer: "Dicoding Indonesia",
    year: "2023",
    level: "Advanced",
    icon: <FaRocket />,
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  { 
    title: "Mathematical For Computing (Bisa AI)", 
    issuer: "Bisa AI",
    year: "2023",
    level: "Intermediate",
    icon: <FaShieldAlt />,
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  { 
    title: "Responsive Web Design (freecodecamp)", 
    issuer: "freeCodeCamp",
    year: "2022",
    level: "Advanced",
    icon: <FaCertificate />,
    gradient: "from-green-500 to-emerald-500",
    delay: 0.3
  },
  { 
    title: "Alibaba Cloud Developer", 
    issuer: "Alibaba Cloud",
    year: "2023",
    level: "Professional",
    icon: <FaCloud className="inline" />,
    gradient: "from-orange-500 to-red-500",
    delay: 0.4
  },
  { 
    title: "Web Developer (BNSP)", 
    issuer: "BNSP Indonesia",
    year: "2023",
    level: "Professional",
    icon: <FaGraduationCap />,
    gradient: "from-indigo-500 to-purple-600",
    delay: 0.5
  }
];

const achievements = [
  { 
    title: "1st Place Best Team Capstone Project MSIB at Telenthub Digital Indonesia (2024)", 
    description: "Led team to develop comprehensive solution judged best among 50+ teams",
    rank: 1,
    icon: <FaCrown />,
    gradient: "from-yellow-500 to-amber-500",
    features: ["Team Leadership", "Full-stack Development", "Project Management"],
    delay: 0.1
  },
  { 
    title: "1st Place Best Individual Capstone Project MSIB at Telenthub Digital Indonesia (2024)", 
    description: "Developed innovative solution recognized as best individual project",
    rank: 1,
    icon: <FaTrophy />,
    gradient: "from-amber-500 to-orange-500",
    features: ["Innovation Award", "Technical Excellence", "Real-world Impact"],
    delay: 0.2
  },
  { 
    title: "3rd Place National Scientific Paper Competition - Infovest (2022)", 
    description: "Competed against 200+ participants in national technology competition",
    rank: 3,
    icon: <FaMedal />,
    gradient: "from-rose-500 to-pink-500",
    features: ["Research Excellence", "Technical Writing", "Public Presentation"],
    delay: 0.3
  }
];

// Variants for scroll animations
const scrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.8
    }
  }
};

const scrollItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut"
    }
  }
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const floatVariants = {
  initial: { y: 0 },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const glowPulseVariants = {
  initial: { opacity: 0.3 },
  pulse: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Certifications() {
  const sectionRef = useRef(null);
  const certificationsRef = useRef(null);
  const achievementsRef = useRef(null);
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Parallax values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.8, 0.2]);
  
  // Check if elements are in view
  const isCertificationsInView = useInView(certificationsRef, { once: false, amount: 0.3 });
  const isAchievementsInView = useInView(achievementsRef, { once: false, amount: 0.3 });
  const isHeaderInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Interactive scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollIndicator = document.getElementById('scroll-indicator');
      if (scrollIndicator) {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = `${scrollPercentage}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black from-gray-900/30 via-black to-gray-900/30 overflow-hidden"
      id="certifications"
    >
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800">
        <motion.div 
          id="scroll-indicator"
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-purple-900/20"
        style={{ y: backgroundY }}
      />
      
      {/* Animated grid background */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
        animate={{ 
          backgroundPosition: ["0px 0px", "0px 3rem", "3rem 3rem", "3rem 0px", "0px 0px"]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      {/* Floating particles with scroll interaction */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, -30, 10, -30],
              x: [null, Math.random() * 20 - 10, Math.random() * 20 - 10],
              opacity: [0, 0.5, 0.2, 0],
              scale: [0.5, 1, 0.8, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            style={{ opacity: particlesOpacity }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with scroll-triggered animation */}
        <motion.div
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="text-center mb-20"
        >
          
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
              Certifications & Achievements
            </span>
          </h2>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isHeaderInView ? { width: 200, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 mx-auto rounded-full mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Professional certifications and notable achievements demonstrating expertise and excellence in technology
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications Section */}
          <motion.div
            ref={certificationsRef}
            initial="hidden"
            animate={isCertificationsInView ? "visible" : "hidden"}
            variants={scrollContainerVariants}
            className="relative"
          >
            {/* Section Header with slide-in */}
            <motion.div
              variants={slideInLeftVariants}
              className="flex items-center gap-4 mb-10"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  variants={glowPulseVariants}
                  initial="initial"
                  animate="pulse"
                  className="absolute -inset-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur"
                />
                <div className="relative p-4 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl">
                  <FaCertificate className="text-2xl text-white" />
                </div>
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold text-white">Certifications</h3>
                <p className="text-gray-400">Professional credentials and qualifications</p>
              </div>
            </motion.div>

            {/* Certifications List with staggered entrance */}
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={scrollItemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  {/* Entry animation line */}
                  <motion.div 
                    className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/0 via-cyan-500 to-purple-500/0"
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={isCertificationsInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.8, delay: cert.delay }}
                  />
                  
                  {/* Card */}
                  <div className="relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 group-hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                    {/* Animated background effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="relative z-10 flex items-start gap-5">
                      {/* Icon with animation */}
                      <motion.div 
                        className={`p-4 rounded-xl bg-gradient-to-br ${cert.gradient} bg-opacity-20`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-xl">
                          {cert.icon}
                        </div>
                      </motion.div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">
                            {cert.title}
                          </h4>
                          <motion.span 
                            className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            {cert.year}
                          </motion.span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400">{cert.issuer}</p>
                          <motion.span 
                            className={`text-xs px-3 py-1 rounded-full ${
                              cert.level === "Professional" 
                                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                                : cert.level === "Advanced"
                                ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30"
                            }`}
                            whileHover={{ y: -2 }}
                          >
                            {cert.level}
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats with scroll animation */}
            <motion.div
              initial="hidden"
              animate={isCertificationsInView ? "visible" : "hidden"}
              variants={scrollContainerVariants}
              className="mt-12 grid grid-cols-3 gap-5"
            >
              {[
                { value: certifications.length, label: "Total Certifications", gradient: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
                { value: 3, label: "Professional Level", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
                { value: 2, label: "Advanced Level", gradient: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scrollItemVariants}
                  custom={index}
                  className={`text-center p-5 rounded-xl border backdrop-blur-sm ${stat.border} bg-gradient-to-b ${stat.gradient}`}
                >
                  <motion.div 
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    animate={isCertificationsInView ? { scale: 1 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      delay: 0.8 + index * 0.1 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            ref={achievementsRef}
            initial="hidden"
            animate={isAchievementsInView ? "visible" : "hidden"}
            variants={scrollContainerVariants}
            className="relative"
          >
            {/* Section Header with slide-in */}
            <motion.div
              variants={slideInRightVariants}
              className="flex items-center gap-4 mb-10"
            >
              <motion.div
                whileHover={{ rotate: -15, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  variants={glowPulseVariants}
                  initial="initial"
                  animate="pulse"
                  className="absolute -inset-3 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur"
                />
                <div className="relative p-4 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl">
                  <FaTrophy className="text-2xl text-white" />
                </div>
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold text-white">Achievements</h3>
                <p className="text-gray-400">Notable accomplishments and awards</p>
              </div>
            </motion.div>

            {/* Achievements List with staggered entrance */}
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={scrollItemVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  {/* Floating rank badge */}
                  <motion.div
                    className="absolute -top-5 -left-5 z-20"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-500/50 to-amber-500/50 rounded-full blur"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.3 
                        }}
                      />
                      <div className={`relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${achievement.gradient} shadow-lg`}>
                        <FaStar className="text-white text-lg" />
                        <span className="absolute text-sm font-bold text-white">
                          {achievement.rank}
                          {achievement.rank === 1 ? "st" : achievement.rank === 2 ? "nd" : "rd"}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Achievement Card */}
                  <div className={`
                    relative bg-gradient-to-br from-gray-900/80 to-black/80
                    backdrop-blur-sm rounded-xl p-7 border border-gray-800
                    transition-all duration-300 overflow-hidden
                    group-hover:border-gray-600 group-hover:shadow-2xl
                    ${achievement.rank === 1 ? "shadow-lg shadow-yellow-500/10" : ""}
                  `}>
                    {/* Animated gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/5 to-cyan-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-[0.03]">
                      <motion.div 
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '60px 60px'
                        }}
                        animate={{ 
                          backgroundPosition: ["0px 0px", "60px 60px"] 
                        }}
                        transition={{ 
                          duration: 20, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                      />
                    </div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-5">
                        <motion.div 
                          className={`p-4 rounded-xl bg-gradient-to-br ${achievement.gradient} bg-opacity-20`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <motion.span 
                          className={`px-4 py-2 rounded-full text-sm font-bold ${
                            achievement.rank === 1 
                              ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30"
                              : achievement.rank === 2
                              ? "bg-gradient-to-r from-gray-400/20 to-gray-500/20 text-gray-300 border border-gray-500/30"
                              : "bg-gradient-to-r from-amber-700/20 to-orange-700/20 text-amber-300 border border-amber-700/30"
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {achievement.rank === 1 ? "🏆 Champion" : achievement.rank === 2 ? "🥈 Runner-up" : "🥉 Third Place"}
                        </motion.span>
                      </div>

                      {/* Title & Description */}
                      <motion.h4 
                        className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {achievement.title}
                      </motion.h4>
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {achievement.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <div className="text-sm text-gray-500 mb-3">Key Highlights</div>
                        <div className="flex flex-wrap gap-3">
                          {achievement.features.map((feature, idx) => (
                            <motion.span 
                              key={idx} 
                              className="px-4 py-2 rounded-full text-sm bg-gray-800/60 text-gray-300 border border-gray-700/50"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={isAchievementsInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ delay: achievement.delay + idx * 0.1 }}
                              whileHover={{ 
                                scale: 1.1, 
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                borderColor: "rgba(59, 130, 246, 0.5)"
                              }}
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Year */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-800">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: index * 0.5 
                            }}
                          >
                            <FaFire className="text-amber-500 text-lg" />
                          </motion.div>
                          <span className="text-sm text-gray-400">Achievement Year</span>
                        </div>
                        <span className="text-base font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                          {achievement.title.includes("2024") ? "2024" : "2022"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Stats */}
            <motion.div
              initial="hidden"
              animate={isAchievementsInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ delay: 0.8 }}
              className="mt-12"
            >
              <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-sm rounded-xl p-7 border border-gray-800 overflow-hidden">
                {/* Animated background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  viewport={{ once: true }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6">
                    <motion.div 
                      className="p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <FaAward className="text-2xl text-amber-400" />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Competition Summary</h4>
                      <p className="text-gray-400">National & Corporate Level</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <motion.div 
                      className="text-center p-5 bg-gray-900/40 rounded-xl border border-gray-800"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="text-3xl font-bold text-amber-400 mb-2">2</div>
                      <div className="text-sm text-gray-300">1st Place Wins</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-5 bg-gray-900/40 rounded-xl border border-gray-800"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="text-3xl font-bold text-amber-400 mb-2">200+</div>
                      <div className="text-sm text-gray-300">Competitors Faced</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}