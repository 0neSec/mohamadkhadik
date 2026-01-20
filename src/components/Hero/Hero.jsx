// components/Hero/Hero.jsx
import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import Lanyard from "../Lanyard/Lanyard";
import {
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowDown,
  FaCode,
  FaRocket,
  FaStar,
  FaHeart,
  FaFire,
  FaReact,
} from "react-icons/fa";
import CurvedLoop from "../CurvaLoopText/CurvedLoop";

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

const pulseGlowVariants = {
  initial: {
    opacity: 0.3,
    scale: 0.8,
  },
  animate: {
    opacity: [0.3, 0.8, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 100,
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Variants baru untuk efek React.js khusus
const reactTextVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: "backOut",
    },
  }),
};

const nameGlowVariants = {
  initial: {
    textShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
  },
  animate: {
    textShadow: [
      "0 0 10px rgba(6, 182, 212, 0.3)",
      "0 0 20px rgba(6, 182, 212, 0.6)",
      "0 0 30px rgba(6, 182, 212, 0.8)",
      "0 0 20px rgba(6, 182, 212, 0.6)",
      "0 0 10px rgba(6, 182, 212, 0.3)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const lanyardRef = useRef(null);
  const contactInfoRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const lanyardScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const lanyardRotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

  // InView detectors
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isLanyardInView = useInView(lanyardRef, { once: false, amount: 0.5 });
  const isContactInfoInView = useInView(contactInfoRef, {
    once: false,
    amount: 0.3,
  });

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 3 + Math.random() * 3,
    delay: i * 0.2,
  }));

  // Animate title characters
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement && isTitleInView) {
      const chars = titleElement.querySelectorAll(".char-animate");
      chars.forEach((char, i) => {
        animate(
          char,
          {
            opacity: [0, 1],
            y: [20, 0],
            filter: ["blur(10px)", "blur(0px)"],
          },
          {
            delay: i * 0.05,
            duration: 0.5,
            ease: "easeOut",
          },
        );
      });
    }
  }, [isTitleInView]);

  // Fungsi untuk render teks dengan efek React.js khusus
  const renderReactStyleText = (text) => {
    const gradientColors = [
      "#ffffff", // Putih
    ];

    return text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="react-char inline-block relative"
        initial={{ opacity: 0, y: 30, rotateX: -90 }}
        animate={
          isTitleInView
            ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                color: gradientColors[i % gradientColors.length],
              }
            : {}
        }
        transition={{
          delay: i * 0.08,
          duration: 0.8,
          ease: "backOut",
          type: "spring",
          stiffness: 200,
        }}
        whileHover={{
          y: -8,
          scale: 1.4,
          color: "#61DAFB",
          textShadow: "0 0 20px rgba(97, 218, 251, 0.8)",
          transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
          },
        }}
        style={{
          background: `linear-gradient(45deg, #61DAFB, #ffffff, #61DAFB)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundSize: "200% 200%",
        }}
      >
        {char}
      </motion.span>
    ));
  };

  const renderAnimatedText = (text) => {
    return text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="char-animate inline-block"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={
          isTitleInView
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{ delay: i * 0.05 }}
        whileHover={{
          y: -5,
          scale: 1.2,
          color: "#22d3ee",
          transition: { type: "spring", stiffness: 400 },
        }}
      >
        {char}
      </motion.span>
    ));
  };

  // Nama yang akan ditampilkan
  const fullName = "Mohamad Khadik";
  const titleText = "Fullstack Developer";

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen flex flex-col justify-center"
      style={{ position: 'relative' }} // FIX: Added inline style for non-static position
    >
      {/* Animated background gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20"
        style={{ y: backgroundY }}
      />

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${10 + i * 10}%`,
            top: `${20 + i * 5}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left content - Teks dan informasi */}
          <motion.div
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="lg:w-1/2 lg:pr-8 xl:pr-12 w-full space-y-8"
          >
            <motion.div
              variants={staggerContainerVariants}
              className="space-y-6"
            >
              {/* Badge dengan animasi */}
              <motion.div
                variants={scaleInVariants}
                className="relative inline-block"
              >
                <motion.div
                  variants={pulseGlowVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"
                />
              </motion.div>

              <div ref={titleRef} className="space-y-4">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{ y: titleY, scale: titleScale }}
                >
                  <motion.div
                    className="block leading-[1.1] mb-2"
                    variants={textRevealVariants}
                    custom={0}
                  >
                    {/* NAMA: Mohamad Khadik - Ditampilkan dengan efek React.js khusus */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl text-cyan-400"
                      >
                        <FaReact />
                      </motion.div>
                      <span className="inline-flex items-baseline">
                        {renderReactStyleText(fullName)}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="block mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium"
                    variants={textRevealVariants}
                    custom={1}
                  >
                    <span className="inline-flex items-center gap-2 flex-wrap">
                      <FaRocket className="text-cyan-400 shrink-0" />
                      {/* Judul: React.js & Laravel Expert */}
                      {renderAnimatedText(titleText)}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="shrink-0"
                      >
                        <FaStar className="text-yellow-400" />
                      </motion.div>
                    </span>
                  </motion.div>
                </motion.h1>

                {/* Deskripsi */}
                <motion.p
                  variants={fadeInUpVariants}
                  className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
                >
                  Lulusan Sarjana Terapan Teknik Informatika dengan pengalaman
                  dalam pengembangan web menggunakan React.js, Next.js, dan
                  Laravel. Bersemangat menciptakan solusi digital yang inovatif.
                </motion.p>
              </div>

              {/* Informasi kontak dengan animasi scroll */}
              <motion.div
                ref={contactInfoRef}
                initial="hidden"
                animate={isContactInfoInView ? "visible" : "hidden"}
                variants={staggerContainerVariants}
                className="space-y-4"
              >
                <motion.div
                  variants={fadeInLeftVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                >
                  {[
                    {
                      icon: FaPhone,
                      color: "cyan",
                      label: "Phone",
                      value: "+62 8572 723 58999",
                    },
                    {
                      icon: FaEnvelope,
                      color: "purple",
                      label: "Email",
                      value: "mohamadkhadik7@gmail.com",
                    },
                    {
                      icon: FaMapMarkerAlt,
                      color: "cyan",
                      label: "Location",
                      value: "Brebes, Jawa Tengah",
                    },
                    {
                      icon: FaFire,
                      color: "green",
                      label: "Status",
                      value: "Available for work",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all group"
                      whileHover={{
                        x: 5,
                        scale: 1.02,
                        backgroundColor: `rgba(var(--${item.color}-rgb), 0.1)`,
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-2 bg-${item.color}-500/20 rounded-lg shrink-0`}
                      >
                        <item.icon className={`text-${item.color}-400`} />
                      </motion.div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-400 truncate">
                          {item.label}
                        </div>
                        <div className="text-white font-medium text-sm sm:text-base truncate">
                          {item.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Tautan sosial */}
                <motion.div
                  variants={fadeInUpVariants}
                  className="flex flex-wrap gap-3 mt-6"
                >
                  <motion.a
                    href="https://www.linkedin.com/in/mohamad-khadik-6996a6387/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-cyan-500 transition-all group relative overflow-hidden flex items-center gap-2"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <FaLinkedin className="w-5 h-5 text-cyan-400 relative z-10" />
                    <span className="text-white text-sm font-medium relative z-10 hidden sm:inline">
                      LinkedIn
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/onesec"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-purple-500 transition-all group relative overflow-hidden flex items-center gap-2"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <FaGithub className="w-5 h-5 text-purple-400 relative z-10" />
                    <span className="text-white text-sm font-medium relative z-10 hidden sm:inline">
                      GitHub
                    </span>
                  </motion.a>

                  <motion.button
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.getElementById("contact");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-500/30 hover:border-red-400 transition-all group flex items-center gap-2"
                  >
                    <FaHeart className="w-5 h-5 text-red-400" />
                    <span className="text-white font-medium text-sm sm:text-base">
                      Hire Me
                    </span>
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content (Lanyard) */}
          <motion.div
            ref={lanyardRef}
            initial="hidden"
            animate={isLanyardInView ? "visible" : "hidden"}
            variants={fadeInRightVariants}
            className="lg:w-1/2 w-full flex justify-center lg:justify-end lg:pl-8 xl:pl-12"
            style={{ scale: lanyardScale, rotate: lanyardRotate }}
          >
            <motion.div
              className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Efek glow */}
              <motion.div
                variants={pulseGlowVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl"
              />

              {/* Border animasi */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  borderRadius: ["20%", "50%", "20%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-20 rounded-3xl"
              />

              {/* Kontainer utama */}
              <motion.div
                className="relative rounded-2xl overflow-hidden border-2 border-gray-800/50 bg-gray-900/30 backdrop-blur-sm"
                whileHover={{ borderColor: "rgba(6, 182, 212, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-[350px] md:h-[450px] lg:h-[650px] flex items-center justify-center">
                    <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* CurvedLoop dengan spacing yang lebih baik */}
      <motion.div
        className="relative py-6 md:py-10 overflow-hidden mt-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <CurvedLoop
              marqueeText="⚡ Fullstack Developer • React.js • Laravel • Next.js • TypeScript • Tailwind CSS • "
              speed={2}
              className="text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold"
              curveAmount={0}
              direction="left"
              interactive={true}
              height="small"
              repeatCount={2}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 z-50 hidden md:block"
        style={{ rotate: scrollYProgress }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 border-3 md:border-4 border-gray-800 rounded-full"
            animate={{
              borderColor: ["#374151", "#06b6d4", "#a855f7", "#374151"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}