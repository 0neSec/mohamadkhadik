// components/Certifications/Certifications.jsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
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

// Static data - moved outside component to prevent re-creation on every render
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

// Static variants - memoize or keep static
const scrollContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Reduced from 0.15
      delayChildren: 0.1, // Reduced from 0.2
      duration: 0.5 // Reduced from 0.8
    }
  }
};

const scrollItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, // Reduced from 40
    scale: 0.98 // Reduced from 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120, // Increased from 100
      damping: 20, // Increased from 15
      mass: 0.5 // Reduced from 0.8
    }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 }, // Reduced from 30
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4, // Reduced from 0.6
      ease: "easeOut"
    }
  }
};

// Simplified variants to reduce JS execution
const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 }, // Reduced from -50
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5, // Reduced from 0.7
      ease: "easeOut"
    }
  }
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 }, // Reduced from 50
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5, // Reduced from 0.7
      ease: "easeOut"
    }
  }
};

// Memoized particle component to prevent unnecessary re-renders
const Particle = React.memo(({ id, scrollOpacity }) => {
  const xPos = useMemo(() => Math.random() * 100, []);
  const yPos = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => 4 + Math.random() * 2, []); // Reduced from 8-12
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full"
      initial={{ 
        x: `${xPos}%`, 
        y: `${yPos}%`,
        opacity: 0 
      }}
      animate={{ 
        y: [null, -20, 5, -20], // Reduced motion
        x: [null, 5, -5, 5],
        opacity: [0, 0.3, 0.1, 0], // Reduced opacity
        scale: [0.5, 0.8, 0.6, 0.5]
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay: id * 0.2, // Reduced from 0.3
        ease: "linear" // Changed from easeInOut
      }}
      style={{ opacity: scrollOpacity }}
    />
  );
});

Particle.displayName = 'Particle';

export default function Certifications() {
  const sectionRef = useRef(null);
  const certificationsRef = useRef(null);
  const achievementsRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  // Use once: true to trigger animations only once
  const isCertificationsInView = useInView(certificationsRef, { once: true, amount: 0.3 });
  const isAchievementsInView = useInView(achievementsRef, { once: true, amount: 0.3 });
  const isHeaderInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Simplified scroll progress - removed complex scroll listener
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Memoized transform values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]); // Reduced from 20%
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]); // Reduced opacity
  
  // Memoize particles array
  const particles = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ( // Reduced from 20 to 10
      <Particle key={i} id={i} scrollOpacity={particlesOpacity} />
    )),
    []
  );

  // Memoize stats to prevent re-calculation
  const certificationStats = useMemo(() => [
    { value: certifications.length, label: "Total Certifications", gradient: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20" },
    { value: 3, label: "Professional Level", gradient: "from-purple-500/20 to-pink-500/20", border: "border-purple-500/20" },
    { value: 2, label: "Advanced Level", gradient: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20" }
  ], []);

  const achievementStats = useMemo(() => [
    { label: "1st Place Wins", value: 2 },
    { label: "Competitors Faced", value: "200+" }
  ], []);

  // Memoize achievement rank labels
  const getRankLabel = useCallback((rank) => {
    switch(rank) {
      case 1: return "🏆 Champion";
      case 2: return "🥈 Runner-up";
      default: return "🥉 Third Place";
    }
  }, []);

  // Memoize achievement rank styles
  const getRankStyles = useCallback((rank) => {
    if (rank === 1) {
      return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30";
    } else if (rank === 2) {
      return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 text-gray-300 border border-gray-500/30";
    }
    return "bg-gradient-to-r from-amber-700/20 to-orange-700/20 text-amber-300 border border-amber-700/30";
  }, []);

  // Set client-side flag for animations that need window
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative sm:px-6 lg:px-8 bg-black from-gray-900/30 via-black to-gray-900/30 overflow-hidden"
      id="certifications"
      style={{ contain: 'layout paint' }} // CSS containment for performance
    >
      {/* Simplified scroll indicator - removed fixed position to reduce compositing */}
      <div className="sticky top-0 left-0 w-full h-1 z-40 bg-gray-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      
      {/* Simplified background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-purple-900/10"
        style={{ y: backgroundY }}
      />
      
      {/* Static grid background - removed animation */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
      
      {/* Reduced number of particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isClient && particles}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with reduced animations */}
        <motion.div
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="text-center mb-16" // Reduced from mb-20
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6"> {/* Reduced sizes */}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Certifications & Achievements
            </span>
          </h2>
          
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isHeaderInView ? { width: 150, opacity: 1 } : {}} // Reduced width
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} // Reduced duration
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 mx-auto rounded-full mb-6" // Reduced mb
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }} // Reduced y
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }} // Reduced delay
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed" // Reduced text size
          >
            Professional certifications and notable achievements demonstrating expertise and excellence in technology
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10"> {/* Reduced gap */}
          {/* Certifications Section */}
          <motion.div
            ref={certificationsRef}
            initial="hidden"
            animate={isCertificationsInView ? "visible" : "hidden"}
            variants={scrollContainerVariants}
            className="relative"
          >
            <motion.div
              variants={slideInLeftVariants}
              className="flex items-center gap-4 mb-8" // Reduced mb
            >
              <div className="relative p-3 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl"> {/* Reduced padding */}
                <FaCertificate className="text-xl text-white" /> {/* Reduced size */}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3> {/* Reduced size */}
                <p className="text-gray-400 text-sm">Professional credentials</p> {/* Reduced text */}
              </div>
            </motion.div>

            {/* Simplified certifications list */}
            <div className="space-y-4"> {/* Reduced spacing */}
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={scrollItemVariants}
                  className="relative bg-gray-900/60 backdrop-blur-sm rounded-lg p-5 border border-gray-800 transition-colors hover:border-cyan-500/50" // Reduced padding, simplified hover
                >
                  <div className="flex items-start gap-4"> {/* Reduced gap */}
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${cert.gradient} bg-opacity-20 flex-shrink-0`}> {/* Reduced padding */}
                      <div className="text-lg"> {/* Reduced size */}
                        {cert.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <h4 className="font-bold text-white text-base leading-tight flex-1 min-w-0"> {/* Reduced size */}
                          {cert.title}
                        </h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 flex-shrink-0">
                          {cert.year}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-gray-400 text-sm">{cert.issuer}</p> {/* Reduced size */}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          cert.level === "Professional" 
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
                            : cert.level === "Advanced"
                            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30"
                        }`}>
                          {cert.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Simplified stats */}
            <motion.div
              initial="hidden"
              animate={isCertificationsInView ? "visible" : "hidden"}
              variants={scrollContainerVariants}
              className="mt-8 grid grid-cols-3 gap-3" // Reduced mt and gap
            >
              {certificationStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scrollItemVariants}
                  custom={index}
                  className={`text-center p-3 rounded-lg border backdrop-blur-sm ${stat.border} bg-gradient-to-b ${stat.gradient}`} // Reduced padding
                >
                  <div className="text-xl font-bold text-white mb-1">{stat.value}</div> {/* Reduced size */}
                  <div className="text-xs text-gray-300 leading-tight">{stat.label}</div> {/* Reduced size */}
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
            <motion.div
              variants={slideInRightVariants}
              className="flex items-center gap-4 mb-8" // Reduced mb
            >
              <div className="relative p-3 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl"> {/* Reduced padding */}
                <FaTrophy className="text-xl text-white" /> {/* Reduced size */}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Achievements</h3> {/* Reduced size */}
                <p className="text-gray-400 text-sm">Notable accomplishments</p> {/* Reduced text */}
              </div>
            </motion.div>

            {/* Simplified achievements list */}
            <div className="space-y-6"> {/* Reduced spacing */}
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={scrollItemVariants}
                  className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-lg p-5 border border-gray-800" // Reduced padding
                >
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${achievement.gradient} bg-opacity-20 flex-shrink-0`}> {/* Reduced padding */}
                        {achievement.icon}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRankStyles(achievement.rank)}`}> {/* Reduced padding */}
                        {getRankLabel(achievement.rank)}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight"> {/* Reduced size */}
                      {achievement.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed"> {/* Reduced size */}
                      {achievement.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {achievement.features.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 rounded-full text-xs bg-gray-800/60 text-gray-300 border border-gray-700/50" // Reduced padding
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Year */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className="flex items-center gap-2">
                        <FaFire className="text-amber-500 text-base" /> {/* Reduced size */}
                        <span className="text-sm text-gray-400">Achievement Year</span>
                      </div>
                      <span className="text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        {achievement.title.includes("2024") ? "2024" : "2022"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Simplified summary */}
            <motion.div
              initial="hidden"
              animate={isAchievementsInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ delay: 0.5 }} // Reduced delay
              className="mt-8" // Reduced mt
            >
              <div className="bg-gradient-to-r from-gray-900/60 to-black/60 backdrop-blur-sm rounded-lg p-5 border border-gray-800"> {/* Reduced padding */}
                <div className="flex items-center gap-4 mb-4"> {/* Reduced gap */}
                  <div className="p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg flex-shrink-0"> {/* Reduced padding */}
                    <FaAward className="text-xl text-amber-400" /> {/* Reduced size */}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Competition Summary</h4> {/* Reduced size */}
                    <p className="text-gray-400 text-sm">National & Corporate Level</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3"> {/* Reduced gap */}
                  {achievementStats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className="text-center p-3 bg-gray-900/40 rounded-lg border border-gray-800" // Reduced padding
                    >
                      <div className="text-xl font-bold text-amber-400 mb-1">{stat.value}</div> {/* Reduced size */}
                      <div className="text-xs text-gray-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}