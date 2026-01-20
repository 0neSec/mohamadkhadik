// components/Portfolio/Portfolio.jsx
import React, { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FaExternalLinkAlt, 
  FaStar,
  FaPlay,
  FaPause
} from "react-icons/fa";

// Import gambar secara langsung
import Invofest2023 from "../../assets/Invofest2023.webp";
import WisataKesehatanJamu from "../../assets/Wisata-Kesehatan-Jamu.webp";
import WKJKalibakung from "../../assets/WKJ-Kalibakung.webp";
import IIEF from "../../assets/IIEF.webp";

const portfolioItems = [
  { 
    id: 1,
    name: "Selapura Village", 
    url: "https://desaselapura.site", 
    description: "Village profile website with PHP Native-based information & news management system",
    category: "Community",
    status: "Completed",
    tech: ["PHP Native", "MySQL", "Bootstrap", "jQuery", "AdminLTE"],
    gradient: "from-gray-600 to-gray-800",
    isPWA: false,
    features: [
      "News & Articles CMS",
      "Photo & Video Gallery",
      "Village Officials Profile",
      "Population Database",
      "Online Announcements"
    ],
    priority: 1,
    image: null,
    completionDate: "2022"
  },
  { 
    id: 2,
    name: "Infovest 2022", 
    url: "https://infovest.phbtegal.com", 
    description: "Modern technology event profile website with high performance design",
    category: "Event",
    status: "Completed",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    gradient: "from-blue-600 to-cyan-600",
    isPWA: false,
    features: [
      "Single Page Application",
      "Interactive Animations",
      "Responsive Design",
      "Fast Loading",
      "Modern UI/UX"
    ],
    priority: 2,
    image: null,
    completionDate: "2022"
  },
  { 
    id: 3,
    name: "Infovest 2023", 
    url: "https://infovest2023.phbtegal.com", 
    description: "Event platform with competition registration system, user accounts, and participant dashboard",
    category: "Event",
    status: "Live",
    tech: ["React.js", "Firebase", "Tailwind", "Context API"],
    gradient: "from-indigo-600 to-purple-600",
    isPWA: false,
    features: [
      "Authentication System",
      "Real-time Database",
      "Participant Dashboard",
      "Registration Forms",
      "Email Notifications"
    ],
    priority: 1,
    image: Invofest2023, // Menggunakan variabel yang diimpor
    completionDate: "2023",
    showLiveBadge: true
  },
  { 
    id: 4,
    name: "Herbal Health Tourism", 
    url: "https://wisatakesehatanjamu.com", 
    description: "Traditional health platform with AI herbal plant detection, content management, and herbal product e-commerce",
    category: "Health AI",
    status: "Live",
    tech: ["React.js", "Go", "Python",  "PostgreSQL", "TensorFlow"],
    gradient: "from-green-600 to-emerald-600",
    isPWA: false,
    lighthouseScore: { performance: 92, pwa: 100, accessibility: 96 },
    features: [
      "AI Plant Detection",
      "E-commerce Products",
      "Content Management",
      "Booking System",
      "Herbal Database"
    ],
    priority: 1,
    image: WisataKesehatanJamu, // Menggunakan variabel yang diimpor
    completionDate: "2024",
    showLiveBadge: true
  },
  { 
    id: 5,
    name: "Kalibakung Herbal", 
    url: "https://wkjkalibakung.com", 
    description: "Herbal health platform with content management system, AI plant detection, and herbal product catalog",
    category: "Health AI",
    status: "Live",
    tech: ["React.js", "Go", "Python",  "FastAPI"],
    gradient: "from-teal-600 to-cyan-600",
    isPWA: false,
    lighthouseScore: { performance: 94, pwa: 100, accessibility: 95 },
    features: [
      "AI Herbal Detection",
      "Product Catalog",
      "Content Management",
      "User Dashboard",
      "Mobile Optimized"
    ],
    priority: 2,
    image: WKJKalibakung, // Menggunakan variabel yang diimpor
    completionDate: "2024",
    showLiveBadge: true
  },
  { 
    id: 6,
    name: "IIEF 2024", 
    url: "https://iief.co.id", 
    description: "International event platform with competition registration, ticket & booth purchasing, management dashboard, and mobile check-in",
    category: "Enterprise Event",
    status: "Live",
    tech: ["Next.js", "Flutter", "Supabase", "Vercel", "Stripe", "PostgreSQL"],
    gradient: "from-orange-600 to-red-600",
    isPWA: false,
    features: [
      "Multi-role Dashboard",
      "Payment Integration",
      "Mobile Check-in",
      "Real-time Analytics",
      "QR Code System"
    ],
    priority: 1,
    image: IIEF, // Menggunakan variabel yang diimpor
    completionDate: "2024",
    showLiveBadge: true
  }
];

const categoryColors = {
  Development: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Community: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Event: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Health AI": "bg-green-500/10 text-green-400 border-green-500/20",
  "Enterprise Event": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Security: "bg-red-500/10 text-red-400 border-red-500/20"
};

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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 0.8
    }
  },
  hover: {
    y: -15,
    scale: 1.03,
    rotateX: 5,
    rotateY: 5,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: { scale: 0.95 }
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: -50,
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 0.8
    }
  }
};

const glowVariants = {
  initial: { 
    opacity: 0.3,
    scale: 0.8 
  },
  animate: {
    opacity: [0.3, 0.8, 0.3],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const floatingVariants = {
  initial: { y: 0 },
  float: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const waveVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const imageHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [autoRotate, setAutoRotate] = useState(true);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // InView detectors
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isGridInView = useInView(gridRef, { once: false, amount: 0.3 });
  
  const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];
  
  // Filter logic
  let filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  // Sorting by priority only
  filteredItems = [...filteredItems].sort((a, b) => a.priority - b.priority);

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 4 + Math.random() * 4,
    delay: i * 0.2
  }));

  // Fungsi untuk mendapatkan fallback image jika gambar tidak tersedia
  const getImageFallback = (project) => (
    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2 opacity-30">📱</div>
        <p className="text-gray-500 text-sm">Project Preview</p>
        {project.completionDate && (
          <p className="text-gray-600 text-xs mt-1">Completed {project.completionDate}</p>
        )}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/20 to-black overflow-hidden min-h-screen"
    >
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-900"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-cyan-900/20"
        style={{ y: backgroundY }}
      />
      
      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
        animate={{ 
          backgroundPosition: ["0px 0px", "4rem 4rem"]
        }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{ 
              y: [0, -100, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated title with parallax */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-20 relative"
          style={{ y: titleY, scale: titleScale }}
        >
          <div className="relative inline-block mb-8">
            {/* Glow effect */}
            <motion.div
              variants={glowVariants}
              initial="initial"
              animate="animate"
              className="absolute -inset-6 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-3xl rounded-full"
            />
            
            {/* Animated badge */}
            <motion.div
              variants={floatingVariants}
              initial="initial"
              animate="float"
              className="absolute -top-10 -right-10"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"
                />
                <div className="relative px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-full text-white text-sm font-bold flex items-center gap-2">
                  <FaStar className="text-xs" /> {portfolioItems.length} Projects
                </div>
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Portfolio
              </span>
            </h2>
          </div>
          
          {/* Animated underline */}
          <div className="relative h-2 w-64 mx-auto mb-8 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              variants={waveVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed"
          >
            Showcasing innovative digital solutions that blend cutting-edge technology with exceptional user experiences
          </motion.p>

          {/* Live Projects Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gradient-to-r from-green-900/30 via-black/50 to-cyan-900/30 border border-green-500/20">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <span className="text-green-400 font-semibold">
                  {portfolioItems.filter(item => item.status === "Live").length} Live Projects
                </span>
              </div>
              <div className="h-4 w-px bg-gray-700" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <span className="text-gray-400">
                  {portfolioItems.filter(item => item.status === "Completed").length} Completed
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category filters with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16 relative"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl blur-xl"
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const count = category === "All" 
                ? portfolioItems.length 
                : portfolioItems.filter(item => item.category === category).length;
              const liveCount = category === "All"
                ? portfolioItems.filter(item => item.status === "Live").length
                : portfolioItems.filter(item => item.category === category && item.status === "Live").length;
              
              return (
                <motion.button
                  key={category}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    h-14 px-6 rounded-full font-medium transition-all duration-300
                    flex items-center justify-center gap-3 relative overflow-hidden group
                    min-w-[140px]
                    ${activeCategory === category 
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg shadow-purple-500/25"
                      : "bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600"
                    }
                  `}
                  layout
                >
                  <span className="relative z-10 whitespace-nowrap">{category}</span>
                  <div className="flex items-center gap-1 relative z-10">
                    {liveCount > 0 && category !== "All" && (
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                    <motion.span 
                      className={`
                        min-w-[32px] h-8 flex items-center justify-center text-sm rounded-full
                        ${activeCategory === category 
                          ? "bg-white/20" 
                          : "bg-gray-800"
                        }
                      `}
                      whileHover={{ scale: 1.2 }}
                    >
                      {count}
                    </motion.span>
                  </div>
                  
                  {/* Active indicator */}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/10 to-cyan-500/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Auto-rotate toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-700 hover:border-cyan-500/50 transition-colors"
          >
            {autoRotate ? <FaPause /> : <FaPlay />}
            <span className="text-sm text-gray-300">
              {autoRotate ? "Pause Auto-rotate" : "Play Auto-rotate"}
            </span>
          </button>
        </motion.div>

        {/* Portfolio Grid with scroll-triggered animations */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          variants={scrollContainerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredItems.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
              layout
            >
              {/* Entry animation line */}
              <motion.div 
                className="absolute -left-6 top-1/2 w-2 h-0 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full"
                initial={{ height: 0 }}
                animate={isGridInView ? { height: "80%" } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{ y: "-50%" }}
              />

              {/* Card glow effect */}
              {hoveredCard === project.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute -inset-4 rounded-3xl blur-xl bg-gradient-to-br ${project.gradient}`}
                />
              )}

              {/* Main card */}
              <div className={`
                relative rounded-2xl overflow-hidden
                bg-gradient-to-br from-gray-900/90 to-black/90
                backdrop-blur-xl border ${project.status === "Live" ? "border-green-500/30" : "border-gray-800"}
                h-full flex flex-col
                transition-all duration-500
                ${hoveredCard === project.id ? "shadow-2xl shadow-purple-500/20" : "shadow-lg shadow-black/50"}
                ${project.isPWA ? "border-purple-500/30" : ""}
                ${project.category === "Health AI" ? "border-green-500/30" : ""}
              `}>
                
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.03]"
                  animate={{ 
                    backgroundPosition: ["0px 0px", "60px 60px"]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }}
                />

                {/* Card header with gradient background */}
                <div className="relative p-6 pb-4 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
                  
                  {/* Category and Status */}
                  <div className="relative flex justify-between items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                      {project.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        project.status === "Live"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : project.status === "Completed"
                          ? "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                      }`}>
                        {project.status === "Live" && (
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        )}
                        {project.status}
                      </span>
                      {project.showLiveBadge && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                          Live Now
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Image */}
                {project.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      variants={imageHoverVariants}
                      initial="initial"
                      whileHover="hover"
                      className="relative w-full h-full"
                    >
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Failed to load image for ${project.name}:`, project.image);
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
                              <div class="text-center">
                                <div class="text-4xl mb-2 opacity-30">📱</div>
                                <p class="text-gray-500 text-sm">Project Preview</p>
                                <p class="text-gray-600 text-xs mt-1">${project.completionDate ? `Completed ${project.completionDate}` : ''}</p>
                              </div>
                            </div>
                          `;
                        }}
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      
                      {/* Live indicator on image */}
                      {project.status === "Live" && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-green-300">Live</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                ) : (
                  getImageFallback(project)
                )}

                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full p-6 pt-4">
                  {/* Project name and description */}
                  <div className="mb-6">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-3 text-center group-hover:text-cyan-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {project.name}
                    </motion.h3>
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack with scroll animation */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-400 mb-3 text-center">Technologies Used</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.tech.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 + index * 0.1 }}
                          className={`px-3 py-1.5 rounded-full text-xs ${
                            tech === "PWA" 
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                              : tech === "Python" || tech === "TensorFlow" || tech === "FastAPI"
                              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30"
                              : tech === "Go" || tech === "Golang"
                              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-gray-800/50 text-gray-300 border border-gray-700/50"
                          }`}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -2,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  {project.features && (
                    <div className="mb-6 pt-4 border-t border-gray-800">
                      <div className="text-xs text-gray-400 mb-3 text-center">Key Features</div>
                      <ul className="space-y-2">
                        {project.features.slice(0, 4).map((feature, idx) => (
                          <motion.li 
                            key={idx} 
                            className="text-gray-300 text-xs flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 + index * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <motion.div 
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`}
                              whileHover={{ scale: 1.5 }}
                            />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Lighthouse Scores for Health AI projects */}
                  {project.lighthouseScore && (
                    <div className="mb-6 pt-4 border-t border-gray-800">
                      <div className="text-xs text-gray-400 mb-3 text-center">Performance Score</div>
                      <div className="flex justify-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{project.lighthouseScore.performance}</div>
                          <div className="text-xs text-gray-400">Performance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{project.lighthouseScore.pwa}</div>
                          <div className="text-xs text-gray-400">PWA</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-400">{project.lighthouseScore.accessibility}</div>
                          <div className="text-xs text-gray-400">Accessibility</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Button with wave effect */}
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    whileTap="tap"
                    className={`
                      relative h-12 mt-auto w-full rounded-xl font-medium flex items-center justify-center gap-3
                      ${project.status === "Live" 
                        ? "bg-gradient-to-r from-green-600/20 to-cyan-600/20 text-white border border-green-500/30 hover:border-green-400" 
                        : "bg-gradient-to-r from-gray-800 to-gray-900 text-white border border-gray-700 hover:border-gray-600"
                      }
                      transition-all duration-300 group/btn overflow-hidden
                    `}
                  >
                    {/* Wave effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-white/10 to-cyan-500/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <span className="relative z-10 flex items-center gap-2">
                      {project.status === "Live" ? "Visit Live Site" : "View Project"}
                      <FaExternalLinkAlt className="group-hover/btn:translate-x-1 transition-transform text-sm" />
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}