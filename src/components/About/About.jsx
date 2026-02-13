import React from "react";
import { motion, useInView } from "framer-motion";
import { 
  FaGraduationCap, 
  FaUser     
} from "react-icons/fa";

// Variants untuk animasi
const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const fadeInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 0.8,
    },
  },
};

const fadeInRightVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    rotateY: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 0.8,
    },
  },
};

const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    rotate: 180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 1,
    },
  },
};

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
  },
};

export default function About() {
  // Refs untuk deteksi scroll
  const sectionRef = React.useRef(null);
  const aboutRef = React.useRef(null);
  const educationRef = React.useRef(null);
  const timelineRef = React.useRef(null);

  // InView detectors
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const isAboutInView = useInView(aboutRef, { once: false, amount: 0.5 });
  const isEducationInView = useInView(educationRef, { once: false, amount: 0.5 });
  const isTimelineInView = useInView(timelineRef, { once: false, amount: 0.3 });

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden py-16 md:py-24">
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-black to-purple-900/10"
        initial={{ opacity: 0 }}
        animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      />
      
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0px 0px", "100px 100px"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header dengan animasi */}
        <motion.div
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16 md:mb-20 cursor-default"
        >
          <motion.h2
            variants={fadeInUpVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%]"
              animate={{
                backgroundPosition: ["0% 50%", "200% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Profil & Pendidikan
            </motion.span>
          </motion.h2>
          
          <motion.div
            variants={fadeInUpVariants}
            className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={isSectionInView ? { width: 96 } : { width: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Main Content dengan animasi grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* About Me Section */}
          <motion.div
            ref={aboutRef}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            {/* Header dengan animasi */}
            <motion.div
              variants={fadeInLeftVariants}
              className="flex items-center gap-4 mb-6 cursor-default"
            >
              <motion.div
                className="p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaUser className="w-7 h-7 text-cyan-400" />
              </motion.div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white"
                variants={textRevealVariants}
                custom={0}
              >
                Tentang Saya
              </motion.h3>
            </motion.div>
            
            {/* Card Tentang Saya dengan animasi */}
            <motion.div
              variants={fadeInLeftVariants}
              whileHover="hover"
              whileTap="tap"
              variants={cardHoverVariants}
            >
              <button 
                className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-gradient-to-br hover:from-cyan-900/10 hover:to-gray-900/40 transition-all duration-300 text-left group relative overflow-hidden"
                aria-label="Buka detail lengkap tentang saya"
              >
                {/* Animated background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isAboutInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300 text-base md:text-lg"
                      >
                        Saya adalah lulusan Sarjana Terapan Teknik Informatika dari Universitas Harkat Negeri Tegal dengan minat besar di bidang pengembangan web. Selama masa studi, saya telah menguasai berbagai teknologi dan framework seperti React.js, Next.js, dan Laravel, serta memiliki pengalaman dalam mengembangkan berbagai proyek berbasis website.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isAboutInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-base md:text-lg"
                      >
                        Saya bersemangat untuk terus belajar dan berkontribusi dalam menciptakan solusi digital yang inovatif dan bermanfaat.
                      </motion.p>
                    </div>
                    <motion.div
                      className="ml-6 p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-xl"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaUser className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                    </motion.div>
                  </div>
                  
                  {/* Animated border bottom */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-purple-500/0 rounded-full mt-4"
                    initial={{ width: "0%" }}
                    animate={isAboutInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </div>
              </button>
            </motion.div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            ref={educationRef}
            initial="hidden"
            animate={isEducationInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            {/* Header dengan animasi */}
            <motion.div
              variants={fadeInRightVariants}
              className="flex items-center gap-4 mb-6 cursor-default"
            >
              <motion.div
                className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaGraduationCap className="w-7 h-7 text-purple-400" />
              </motion.div>
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-white"
                variants={textRevealVariants}
                custom={0}
              >
                Pendidikan
              </motion.h3>
            </motion.div>

            {/* Education Timeline dengan animasi stagger */}
            <motion.div
              ref={timelineRef}
              variants={staggerContainerVariants}
              className="space-y-8"
            >
              {/* Higher Education dengan animasi */}
              <motion.div
                variants={fadeInRightVariants}
                whileHover="hover"
                whileTap="tap"
                variants={cardHoverVariants}
                custom={0}
              >
                <button 
                  className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 hover:border-purple-500/50 hover:bg-gradient-to-br hover:from-purple-900/10 hover:to-gray-900/40 transition-all duration-300 text-left group relative overflow-hidden"
                  aria-label="Detail pendidikan tinggi"
                >
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <motion.h4
                        initial={{ opacity: 0, x: 20 }}
                        animate={isEducationInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300"
                      >
                        Universitas Harkat Negeri
                      </motion.h4>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isEducationInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-300 rounded-full text-sm font-medium group-hover:bg-gradient-to-r group-hover:from-purple-500/30 group-hover:to-purple-500/20 group-hover:text-purple-200 transition-all duration-300"
                      >
                        2021 - 2025
                      </motion.span>
                    </div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isEducationInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.5 }}
                      className="text-cyan-300 font-medium mb-3 group-hover:text-cyan-400 transition-colors duration-300 text-base md:text-lg"
                    >
                      Sarjana Terapan Teknik Informatika
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isEducationInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 }}
                      className="text-gray-400 mb-4 group-hover:text-gray-300 text-base"
                    >
                      IPK: 3.5
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isEducationInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 }}
                      className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300"
                    >
                      Lulusan dengan spesialisasi dalam pengembangan web fullstack menggunakan React.js, Next.js, dan Laravel.
                    </motion.p>
                    
                    {/* Animated border bottom */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 rounded-full mt-4"
                      initial={{ width: "0%" }}
                      animate={isEducationInView ? { width: "100%" } : { width: "0%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </div>
                </button>
              </motion.div>

              {/* High School dengan animasi */}
              <motion.div
                variants={fadeInRightVariants}
                whileHover="hover"
                whileTap="tap"
                variants={cardHoverVariants}
                custom={1}
              >
                <button 
                  className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-gradient-to-br hover:from-cyan-900/10 hover:to-gray-900/40 transition-all duration-300 text-left group relative overflow-hidden"
                  aria-label="Detail pendidikan menengah"
                >
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <motion.h4
                        initial={{ opacity: 0, x: 20 }}
                        animate={isEducationInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300"
                      >
                        Madrasah Aliyah Negeri 1 Brebes
                      </motion.h4>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isEducationInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6 }}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 rounded-full text-sm font-medium group-hover:bg-gradient-to-r group-hover:from-cyan-500/30 group-hover:to-cyan-500/20 group-hover:text-cyan-200 transition-all duration-300"
                      >
                        2018 - 2021
                      </motion.span>
                    </div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isEducationInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 }}
                      className="text-cyan-300 font-medium mb-3 group-hover:text-cyan-400 transition-colors duration-300 text-base md:text-lg"
                    >
                      Ilmu Pengetahuan Alam
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={isEducationInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 }}
                      className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300"
                    >
                      Jurusan IPA dengan fokus pada matematika dan sains, membangun fondasi untuk studi di bidang teknologi informasi.
                    </motion.p>
                    
                    {/* Animated border bottom */}
                    <motion.div
                      className="h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 rounded-full mt-4"
                      initial={{ width: "0%" }}
                      animate={isEducationInView ? { width: "100%" } : { width: "0%" }}
                      transition={{ delay: 0.9, duration: 1 }}
                    />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated connection line between sections (desktop only) */}
      <motion.div
        className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={isSectionInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-purple-500/0"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "linear-gradient(90deg, rgba(6,182,212,0) 0%, rgba(6,182,212,0.5) 50%, rgba(168,85,247,0) 100%)",
            backgroundSize: "200% 100%",
          }}
        />
      </motion.div>
    </section>
  );
}