import React, { useRef, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FaGraduationCap, FaUser } from "react-icons/fa";

// Simplified animation variants - reduced complexity
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Simplified hover effect - no complex transforms
const cardHoverVariants = {
  hover: { 
    y: -4,
    transition: { duration: 0.2 }
  },
};

// Memoized particle configuration
const particles = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  style: {
    width: Math.random() * 2 + 1,
    height: Math.random() * 2 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  },
  animation: {
    y: [0, -50, 0],
    opacity: [0, 0.3, 0],
  },
  transition: {
    duration: 3 + Math.random() * 2,
    repeat: Infinity,
    delay: i * 0.2,
  }
}));

// Memoized About Card Component
const AboutCard = React.memo(({ isInView, onHoverStart, onHoverEnd }) => (
  <motion.div
    variants={fadeInLeftVariants}
    whileHover="hover"
    variants={cardHoverVariants}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
  >
    <div 
      className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-cyan-500/50 transition-all duration-200 text-left group relative overflow-hidden"
      role="article"
      aria-label="Tentang Saya section"
    >
      {/* Simplified background effect - no animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base"
            >
              Saya adalah lulusan Sarjana Terapan Teknik Informatika dari Universitas Harkat Negeri Tegal dengan minat besar di bidang pengembangan web. Selama masa studi, saya telah menguasai berbagai teknologi dan framework seperti React.js, Next.js, dan Laravel.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 leading-relaxed text-sm md:text-base"
            >
              Saya bersemangat untuk terus belajar dan berkontribusi dalam menciptakan solusi digital yang inovatif.
            </motion.p>
          </div>
          <div className="ml-4 p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg flex-shrink-0">
            <FaUser className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

AboutCard.displayName = 'AboutCard';

// Memoized Education Card Component
const EducationCard = React.memo(({ 
  school, 
  period, 
  degree, 
  gpa, 
  description, 
  color = "purple",
  isInView,
  index 
}) => {
  const isPurple = color === "purple";
  const hoverColor = isPurple ? "purple" : "cyan";
  
  return (
    <motion.div
      variants={fadeInRightVariants}
      whileHover="hover"
      variants={cardHoverVariants}
      custom={index}
    >
      <div 
        className={`w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-${hoverColor}-500/50 transition-all duration-200 text-left group relative overflow-hidden`}
        role="article"
        aria-label={`Pendidikan di ${school}`}
      >
        {/* Simplified background effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-${hoverColor}-500/0 via-${hoverColor}-500/5 to-${hoverColor}-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
            <motion.h4
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="text-base md:text-lg font-semibold text-white"
            >
              {school}
            </motion.h4>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`px-3 py-1 bg-gradient-to-r from-${hoverColor}-500/20 to-${hoverColor}-500/10 text-${hoverColor}-300 rounded-full text-xs font-medium`}
            >
              {period}
            </motion.span>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`text-${hoverColor}-300 font-medium mb-2 text-sm md:text-base`}
          >
            {degree}
          </motion.p>
          
          {gpa && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-gray-400 mb-2 text-sm"
            >
              IPK: {gpa}
            </motion.p>
          )}
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="text-gray-300 text-xs md:text-sm"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
});

EducationCard.displayName = 'EducationCard';

export default function About() {
  // Refs untuk deteksi scroll
  const sectionRef = useRef(null);
  const aboutRef = useRef(null);
  const educationRef = useRef(null);

  // InView detectors - reduced amount for better performance
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.1 });
  const isEducationInView = useInView(educationRef, { once: true, amount: 0.1 });

  // Empty handlers to satisfy props
  const handleHoverStart = useCallback(() => {}, []);
  const handleHoverEnd = useCallback(() => {}, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-black overflow-hidden py-12 md:py-16 lg:py-20"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
    >
      {/* Simplified static background - no animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-black to-purple-900/5" />
      
      {/* Static grid pattern - no animation */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Reduced number of particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            style={particle.style}
            animate={particle.animation}
            transition={particle.transition}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - simplified animation */}
        <motion.div
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Profil & Pendidikan
            </span>
          </motion.h2>
          
          <motion.div
            variants={fadeInUpVariants}
            className="h-0.5 w-20 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* About Me Section */}
          <motion.div
            ref={aboutRef}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="space-y-6"
          >
            {/* Header */}
            <motion.div
              variants={fadeInLeftVariants}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg">
                <FaUser className="w-5 h-5 text-cyan-400" />
              </div>
              <motion.h3 className="text-xl md:text-2xl font-bold text-white">
                Tentang Saya
              </motion.h3>
            </motion.div>
            
            <AboutCard 
              isInView={isAboutInView}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
            />
          </motion.div>

          {/* Education Section */}
          <motion.div
            ref={educationRef}
            initial="hidden"
            animate={isEducationInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="space-y-6"
          >
            {/* Header */}
            <motion.div
              variants={fadeInRightVariants}
              className="flex items-center gap-3 mb-4"
            >
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg">
                <FaGraduationCap className="w-5 h-5 text-purple-400" />
              </div>
              <motion.h3 className="text-xl md:text-2xl font-bold text-white">
                Pendidikan
              </motion.h3>
            </motion.div>

            {/* Education Timeline */}
            <div className="space-y-4">
              <EducationCard
                school="Universitas Harkat Negeri"
                period="2021 - 2025"
                degree="Sarjana Terapan Teknik Informatika"
                gpa="3.5"
                description="Lulusan dengan spesialisasi dalam pengembangan web fullstack menggunakan React.js, Next.js, dan Laravel."
                color="purple"
                isInView={isEducationInView}
                index={0}
              />

              <EducationCard
                school="Madrasah Aliyah Negeri 1 Brebes"
                period="2018 - 2021"
                degree="Ilmu Pengetahuan Alam"
                description="Jurusan IPA dengan fokus pada matematika dan sains, membangun fondasi untuk studi di bidang teknologi informasi."
                color="cyan"
                isInView={isEducationInView}
                index={1}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}