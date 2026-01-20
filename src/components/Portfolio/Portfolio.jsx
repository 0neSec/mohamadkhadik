// components/Portfolio/Portfolio.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FaExternalLinkAlt, 
  FaGithub, 
  FaGlobe, 
  FaRocket,
  FaCode,
  FaLeaf,
  FaRobot,
  FaTicketAlt,
  FaShieldAlt,
  FaBolt,
  FaMobile,
  FaFire,
  FaDatabase,
  FaImage,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
  FaExpand,
  FaRegHeart,
  FaEye,
  FaStar,
} from "react-icons/fa";

// Fungsi untuk optimasi URL gambar Unsplash
const optimizeUnsplashUrl = (url, width = 380, quality = 75) => {
  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    
    // Parameter optimasi
    params.set('w', width.toString());
    params.set('q', quality.toString());
    params.set('auto', 'format');
    params.set('fit', 'crop');
    params.set('crop', 'entropy');
    
    // Hapus parameter yang tidak perlu
    params.delete('h');
    params.delete('dpr');
    
    return `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
  } catch (error) {
    console.error('Error optimizing URL:', error);
    return url;
  }
};

// Fungsi untuk generate srcSet
const generateSrcSet = (url) => {
  const sizes = [180, 380, 768, 1024];
  const qualities = [70, 75, 80, 85];
  
  return sizes.map((size, index) => {
    const quality = qualities[Math.min(index, qualities.length - 1)];
    return `${optimizeUnsplashUrl(url, size, quality)} ${size}w`;
  }).join(', ');
};

// Generate gambar yang sudah dioptimasi
const portfolioItems = [
  { 
    id: 1,
    name: "Selapura Village", 
    url: "https://desaselapura.site", 
    description: "Village profile website with PHP Native-based information & news management system",
    category: "Community",
    status: "Live",
    tech: ["PHP Native", "MySQL", "Bootstrap", "jQuery", "AdminLTE"],
    icon: <FaGlobe />,
    gradient: "from-emerald-600 to-teal-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    imageOptimized: {
      src: optimizeUnsplashUrl("https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 380, 75),
      srcSet: generateSrcSet("https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
    },
    features: [
      "News & Articles CMS",
      "Photo & Video Gallery",
      "Village Officials Profile",
      "Population Database",
      "Online Announcements"
    ],
    views: 1250,
    likes: 89,
    priority: 1
  },
  { 
    id: 2,
    name: "Infovest 2022", 
    url: "https://infovest.phbtegal.com", 
    description: "Modern technology event profile website with high performance design",
    category: "Event",
    status: "Completed",
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion"],
    icon: <FaRocket />,
    gradient: "from-blue-600 to-cyan-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    imageOptimized: {
      src: optimizeUnsplashUrl("https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 380, 75),
      srcSet: generateSrcSet("https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
    },
    features: [
      "Single Page Application",
      "Interactive Animations",
      "Responsive Design",
      "Fast Loading",
      "Modern UI/UX"
    ],
    views: 980,
    likes: 76,
    priority: 2
  },
  { 
    id: 3,
    name: "Infovest 2023", 
    url: "https://infovest2023.phbtegal.com", 
    description: "Event platform with competition registration system, user accounts, and participant dashboard",
    category: "Event",
    status: "Completed",
    tech: ["React.js", "Firebase", "Tailwind", "Context API"],
    icon: <FaCode />,
    gradient: "from-indigo-600 to-purple-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    imageOptimized: {
      src: optimizeUnsplashUrl("https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 380, 75),
      srcSet: generateSrcSet("https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
    },
    features: [
      "Authentication System",
      "Real-time Database",
      "Participant Dashboard",
      "Registration Forms",
      "Email Notifications"
    ],
    views: 1120,
    likes: 94,
    priority: 1
  },
  { 
    id: 4,
    name: "Herbal Health Tourism", 
    url: "https://wisatakesehatanjamu.com", 
    description: "Traditional health platform with AI herbal plant detection, content management, and herbal product e-commerce",
    category: "Health AI",
    status: "Active",
    tech: ["React.js", "Go", "Python",  "PostgreSQL", "TensorFlow"],
    icon: <FaLeaf />,
    gradient: "from-green-600 to-emerald-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    imageOptimized: {
      src: optimizeUnsplashUrl("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 380, 75),
      srcSet: generateSrcSet("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
    },
    lighthouseScore: { performance: 92, pwa: 100, accessibility: 96 },
    features: [
      "AI Plant Detection",
      "E-commerce Products",
      "Content Management",
      "Booking System",
      "Herbal Database"
    ],
    views: 1560,
    likes: 128,
    priority: 1
  },
  { 
    id: 5,
    name: "Kalibakung Herbal", 
    url: "https://wkjkalibakung.com", 
    description: "Herbal health platform with content management system, AI plant detection, and herbal product catalog",
    category: "Health AI",
    status: "Active",
    tech: ["React.js", "Go", "Python",  "FastAPI"],
    icon: <FaRobot />,
    gradient: "from-teal-600 to-cyan-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1585621386289-2c0d5d44b0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    imageOptimized: {
      src: optimizeUnsplashUrl("https://images.unsplash.com/photo-1585621386289-2c0d5d44b0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 380, 75),
      srcSet: generateSrcSet("https://images.unsplash.com/photo-1585621386289-2c0d5d44b0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
    },
    lighthouseScore: { performance: 94, pwa: 100, accessibility: 95 },
    features: [
      "AI Herbal Detection",
      "Product Catalog",
      "Content Management",
      "User Dashboard",
      "Mobile Optimized"
    ],
    views: 1420,
    likes: 112,
    priority: 2
  },
  { 
    id: 6,
    name: "IIEF 2024", 
    url: "https://iief.co.id", 
    description: "International event platform with competition registration, ticket & booth purchasing, management dashboard, and mobile check-in",
    category: "Enterprise Event",
    status: "Active",
    tech: ["Next.js", "Flutter", "Supabase", "Vercel", "Stripe", "PostgreSQL"],
    icon: <FaTicketAlt />,
    gradient: "from-orange-600 to-red-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    imageOptimized: {
      src: optimizeUnsplashUrl("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", 380, 75),
      srcSet: generateSrcSet("https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80")
    },
    features: [
      "Multi-role Dashboard",
      "Payment Integration",
      "Mobile Check-in",
      "Real-time Analytics",
      "QR Code System"
    ],
    views: 1890,
    likes: 156,
    priority: 1
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

const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 1.2,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.15,
    filter: "brightness(1.1) saturate(1.2)",
    transition: {
      duration: 0.4,
      ease: "easeOut"
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

// Komponen OptimizedImage dengan lazy loading dan placeholder
const OptimizedImage = ({ 
  src, 
  srcSet, 
  alt, 
  className, 
  onClick,
  variants,
  initial,
  whileInView,
  whileHover
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preload gambar
    const img = new Image();
    img.src = src;
    if (srcSet) {
      img.srcset = srcSet;
    }
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, srcSet]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Placeholder shimmer effect */}
      {!loaded && !error && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 100%',
            backgroundImage: 'linear-gradient(90deg, #1f2937 0%, #374151 50%, #1f2937 100%)'
          }}
        />
      )}
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <FaImage className="text-gray-600 text-3xl" />
        </div>
      )}
      
      {/* Gambar utama */}
      <motion.img
        variants={variants}
        initial={initial}
        whileInView={whileInView}
        whileHover={whileHover}
        src={loaded ? src : ''}
        srcSet={loaded ? srcSet : ''}
        alt={alt}
        className={`
          ${className}
          ${loaded ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-500
        `}
        onClick={onClick}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPWAOnly, setShowPWAOnly] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [sortBy, setSortBy] = useState("priority");
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
  
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
  
  // Filter and sort logic
  let filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  if (showPWAOnly) {
    filteredItems = filteredItems.filter(item => item.isPWA);
  }

  // Sorting
  filteredItems = [...filteredItems].sort((a, b) => {
    switch(sortBy) {
      case "views": return b.views - a.views;
      case "likes": return b.likes - a.likes;
      case "priority": return a.priority - b.priority;
      default: return 0;
    }
  });

  const pwaProjects = portfolioItems.filter(item => item.isPWA);
  const aiProjects = portfolioItems.filter(item => item.category === "Health AI");
  const totalViews = portfolioItems.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = portfolioItems.reduce((sum, item) => sum + item.likes, 0);

  const toggleLike = (projectId) => {
    const newLikedProjects = new Set(likedProjects);
    if (newLikedProjects.has(projectId)) {
      newLikedProjects.delete(projectId);
    } else {
      newLikedProjects.add(projectId);
    }
    setLikedProjects(newLikedProjects);
  };

  const openImageModal = (imageUrl, index) => {
    setActiveImage(optimizeUnsplashUrl(imageUrl, 1024, 85));
    setImageGalleryIndex(index);
  };

  const closeImageModal = () => {
    setActiveImage(null);
  };

  const navigateGallery = (direction) => {
    const currentIndex = portfolioItems.findIndex(item => 
      optimizeUnsplashUrl(item.image, 1024, 85) === activeImage
    );
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % portfolioItems.length;
    } else {
      newIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    }
    
    setActiveImage(optimizeUnsplashUrl(portfolioItems[newIndex].image, 1024, 85));
    setImageGalleryIndex(newIndex);
  };

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImage) {
        if (e.key === 'Escape') closeImageModal();
        if (e.key === 'ArrowRight') navigateGallery('next');
        if (e.key === 'ArrowLeft') navigateGallery('prev');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 4 + Math.random() * 4,
    delay: i * 0.2
  }));

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
              
              return (
                <motion.button
                  key={category}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -5,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowPWAOnly(false);
                  }}
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
                  <motion.span 
                    className={`
                      min-w-[32px] h-8 flex items-center justify-center text-sm rounded-full relative z-10
                      ${activeCategory === category 
                        ? "bg-white/20" 
                        : "bg-gray-800"
                      }
                    `}
                    whileHover={{ scale: 1.2 }}
                  >
                    {count}
                  </motion.span>
                  
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
              
              {/* PWA Badge */}
              {project.isPWA && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isGridInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", delay: index * 0.2 }}
                  className="absolute -top-4 -right-4 z-20"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity 
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur"
                    />
                    <div className="relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full text-white text-xs font-bold flex items-center gap-2">
                      <FaBolt className="text-xs" /> PWA
                    </div>
                  </div>
                </motion.div>
              )}

              {/* AI Badge */}
              {project.category === "Health AI" && (
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={isGridInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", delay: index * 0.2 }}
                  className="absolute -top-4 -left-4 z-20"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity 
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur"
                    />
                    <div className="relative px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full text-white text-xs font-bold flex items-center gap-2">
                      <FaRobot className="text-xs" /> AI
                    </div>
                  </div>
                </motion.div>
              )}

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
                backdrop-blur-xl border border-gray-800
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

                {/* Project Image with Hover Effect */}
                <div className="relative h-56 overflow-hidden">
                  <OptimizedImage
                    src={project.imageOptimized.src}
                    srcSet={project.imageOptimized.srcSet}
                    alt={project.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openImageModal(project.image, index)}
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                  />
                  
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
                  
                  {/* View Image Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openImageModal(project.image, index)}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all z-10"
                  >
                    <FaExpand className="text-white text-sm" />
                  </motion.button>
                  
                  {/* Like Button */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => toggleLike(project.id)}
                    className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-red-500/20 transition-all z-10"
                  >
                    <FaRegHeart className={`text-sm ${likedProjects.has(project.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                  </motion.button>
                  
                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs text-gray-300">
                        <FaEye /> {project.views}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-300">
                        <FaRegHeart /> {project.likes}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                        {project.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "Active" || project.status === "Live"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : project.status === "Development"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full p-6 pt-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 mt-2">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} bg-opacity-20`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-xl">
                        {project.icon}
                      </div>
                    </motion.div>
                    
                    <div className="flex items-center gap-2">
                      <motion.a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                        title="Visit Website"
                      >
                        <FaExternalLinkAlt className="text-gray-400 hover:text-cyan-400 transition-colors text-sm" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Project name and description */}
                  <div className="mb-4">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {project.name}
                    </motion.h3>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack with scroll animation */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 + index * 0.1 }}
                          className={`px-3 py-1 rounded-full text-xs ${
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
                      <div className="text-xs text-gray-400 mb-2">Key Features</div>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, idx) => (
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
                            <span className="truncate">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
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
                      bg-gradient-to-r from-gray-800 to-gray-900 text-white
                      border ${project.isPWA ? "border-purple-500/30 hover:border-purple-400" : 
                        project.category === "Health AI" ? "border-green-500/30 hover:border-green-400" : 
                        "border-gray-700 hover:border-gray-600"}
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
                      {project.isPWA ? "Install App" : "Visit Site"}
                      <FaExternalLinkAlt className="group-hover/btn:translate-x-1 transition-transform text-sm" />
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal/Image Gallery */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
              onClick={closeImageModal}
            >
              {/* Navigation buttons */}
              <motion.button
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGallery('prev');
                }}
                className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800/80 transition-all z-20"
              >
                <FaChevronLeft className="text-white text-2xl" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateGallery('next');
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800/80 transition-all z-20"
              >
                <FaChevronRight className="text-white text-2xl" />
              </motion.button>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeImageModal}
                className="absolute top-8 right-8 p-4 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800/80 transition-all z-20"
              >
                <FaTimes className="text-white text-2xl" />
              </motion.button>

              {/* Image info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 min-w-[300px] text-center z-20"
              >
                <h3 className="text-white font-bold text-lg">
                  {portfolioItems[imageGalleryIndex]?.name}
                </h3>
                <p className="text-gray-300 text-sm mt-2">
                  Project {imageGalleryIndex + 1} of {portfolioItems.length}
                </p>
              </motion.div>

              {/* Main image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl max-h-[80vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt="Project Preview"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                  initial={{ filter: "blur(20px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  loading="eager"
                />
                
                {/* Loading indicator */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}