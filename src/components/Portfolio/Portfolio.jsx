// components/Portfolio/Portfolio.jsx
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import dynamic from 'next/dynamic';

// Dynamic imports untuk mengurangi bundle size
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import('framer-motion').then(mod => mod.motion.button), { ssr: false });
const MotionImg = dynamic(() => import('framer-motion').then(mod => mod.motion.img), { ssr: false });
const MotionSpan = dynamic(() => import('framer-motion').then(mod => mod.motion.span), { ssr: false });
const MotionH3 = dynamic(() => import('framer-motion').then(mod => mod.motion.h3), { ssr: false });
const MotionLi = dynamic(() => import('framer-motion').then(mod => mod.motion.li), { ssr: false });
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false });

// Icons dinamis - hanya load yang diperlukan
const FaExternalLinkAlt = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaExternalLinkAlt), { ssr: false }
);
const FaExpand = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaExpand), { ssr: false }
);
const FaRegHeart = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaRegHeart), { ssr: false }
);
const FaEye = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaEye), { ssr: false }
);
const FaChevronRight = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaChevronRight), { ssr: false }
);
const FaChevronLeft = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaChevronLeft), { ssr: false }
);
const FaTimes = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaTimes), { ssr: false }
);
const FaStar = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaStar), { ssr: false }
);
const FaRobot = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaRobot), { ssr: false }
);
const FaBolt = dynamic(() => 
  import('react-icons/fa').then(mod => mod.FaBolt), { ssr: false }
);

// Data portfolio yang dioptimalkan (gambar ukuran lebih kecil)
const portfolioItems = [
  { 
    id: 1,
    name: "Selapura Village", 
    url: "https://desaselapura.site", 
    description: "Village profile website with PHP Native-based information & news management system",
    category: "Community",
    status: "Live",
    tech: ["PHP Native", "MySQL", "Bootstrap"],
    gradient: "from-emerald-600 to-teal-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=70",
    features: [
      "News & Articles CMS",
      "Photo & Video Gallery",
      "Village Officials Profile"
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
    tech: ["React.js", "Vite", "Tailwind CSS"],
    gradient: "from-blue-600 to-cyan-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=70",
    features: [
      "Single Page Application",
      "Interactive Animations",
      "Responsive Design"
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
    tech: ["React.js", "Firebase", "Tailwind"],
    gradient: "from-indigo-600 to-purple-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=70",
    features: [
      "Authentication System",
      "Real-time Database",
      "Participant Dashboard"
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
    tech: ["React.js", "Go", "Python", "PostgreSQL"],
    gradient: "from-green-600 to-emerald-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=70",
    features: [
      "AI Plant Detection",
      "E-commerce Products",
      "Content Management"
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
    tech: ["React.js", "Go", "Python"],
    gradient: "from-teal-600 to-cyan-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1585621386289-2c0d5d44b0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=70",
    features: [
      "AI Herbal Detection",
      "Product Catalog",
      "Content Management"
    ],
    views: 1420,
    likes: 112,
    priority: 2
  },
  { 
    id: 6,
    name: "IIEF 2024", 
    url: "https://iief.co.id", 
    description: "International event platform with competition registration, ticket & booth purchasing, management dashboard",
    category: "Enterprise Event",
    status: "Active",
    tech: ["Next.js", "Supabase", "PostgreSQL"],
    gradient: "from-orange-600 to-red-600",
    isPWA: false,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=70",
    features: [
      "Multi-role Dashboard",
      "Payment Integration",
      "Mobile Check-in"
    ],
    views: 1890,
    likes: 156,
    priority: 1
  }
];

const categoryColors = {
  Community: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Event: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Health AI": "bg-green-500/10 text-green-400 border-green-500/20",
  "Enterprise Event": "bg-orange-500/10 text-orange-400 border-orange-500/20"
};

// Komponen gambar lazy loading
const LazyImage = React.memo(({ src, alt, className, onClick, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded && !error) {
            const img = new Image();
            img.src = src;
            img.onload = () => setIsLoaded(true);
            img.onerror = () => setError(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [src, isLoaded, error]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isLoaded ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// Komponen modal terpisah untuk code splitting
const ImageModal = React.memo(({ 
  activeImage, 
  imageGalleryIndex, 
  portfolioItems, 
  onClose, 
  onNavigate 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      {/* Navigation buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('prev');
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800/80 transition-all z-20"
      >
        <FaChevronLeft className="text-white text-xl" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('next');
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800/80 transition-all z-20"
      >
        <FaChevronRight className="text-white text-xl" />
      </button>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full hover:bg-gray-800/80 transition-all z-20"
      >
        <FaTimes className="text-white text-xl" />
      </button>

      {/* Image info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 min-w-[200px] text-center z-20">
        <h3 className="text-white font-bold">
          {portfolioItems[imageGalleryIndex]?.name}
        </h3>
        <p className="text-gray-300 text-sm mt-1">
          {imageGalleryIndex + 1} / {portfolioItems.length}
        </p>
      </div>

      {/* Main image */}
      <div className="relative max-w-5xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={activeImage}
          alt="Project Preview"
          className="w-full h-auto max-h-[70vh] object-contain"
          loading="eager"
        />
      </div>
    </div>
  );
});

ImageModal.displayName = 'ImageModal';

// Main Portfolio Component
export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeImage, setActiveImage] = useState(null);
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [isClient, setIsClient] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  // Set isClient untuk menghindari hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const categories = useMemo(() => 
    ["All", ...new Set(portfolioItems.map(item => item.category))], 
    []
  );

  // Filter and sort logic dengan useMemo
  const filteredItems = useMemo(() => {
    let items = activeCategory === "All" 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === activeCategory);

    // Sort by priority by default
    return [...items].sort((a, b) => a.priority - b.priority);
  }, [activeCategory]);

  const totalViews = useMemo(() => 
    portfolioItems.reduce((sum, item) => sum + item.views, 0), 
    []
  );

  const toggleLike = useCallback((projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  }, []);

  const openImageModal = useCallback((imageUrl, index) => {
    setActiveImage(imageUrl);
    setImageGalleryIndex(index);
  }, []);

  const closeImageModal = useCallback(() => {
    setActiveImage(null);
  }, []);

  const navigateGallery = useCallback((direction) => {
    const currentIndex = portfolioItems.findIndex(item => 
      item.image === activeImage
    );
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % portfolioItems.length;
    } else {
      newIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    }
    
    setActiveImage(portfolioItems[newIndex].image);
    setImageGalleryIndex(newIndex);
  }, [activeImage]);

  // Critical CSS inline
  const criticalCSS = `
    .portfolio-gradient-text {
      background: linear-gradient(90deg, #22d3ee 0%, #ffffff 50%, #a855f7 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      background-size: 200% auto;
      animation: gradient 3s ease infinite;
    }
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .portfolio-card {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .portfolio-card.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  // Add critical CSS to head
  useEffect(() => {
    if (!isClient) return;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [isClient]);

  // Intersection Observer untuk animasi scroll
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
      observer.disconnect();
    };
  }, [isClient, filteredItems]);

  if (!isClient) {
    // Render minimal untuk SSR
    return (
      <section id="portfolio" className="relative py-16 px-4 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="portfolio-gradient-text">Portfolio</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black min-h-screen"
      style={{ contentVisibility: 'auto', contain: 'layout style paint' }}
    >
      {/* Preload first image */}
      <link rel="preload" href={portfolioItems[0].image} as="image" />
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <div 
          ref={titleRef}
          className="text-center mb-12 relative"
        >
          {/* Stats badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-full border border-cyan-500/30 mb-6">
            <FaStar className="text-cyan-400 text-sm" />
            <span className="text-white text-sm font-medium">
              {portfolioItems.length} Projects • {totalViews.toLocaleString()} Views
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="portfolio-gradient-text">Portfolio</span>
          </h2>
          
          <p className="text-xl text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
            Showcasing innovative digital solutions with cutting-edge technology
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const count = category === "All" 
              ? portfolioItems.length 
              : portfolioItems.filter(item => item.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-5 py-2.5 rounded-full font-medium transition-all duration-300
                  flex items-center justify-center gap-2
                  ${activeCategory === category 
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg"
                    : "bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800"
                  }
                `}
              >
                <span>{category}</span>
                <span className={`
                  min-w-[28px] h-7 flex items-center justify-center text-sm rounded-full
                  ${activeCategory === category ? "bg-white/10" : "bg-gray-800"}
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((project, index) => (
            <div
              key={project.id}
              className="portfolio-card bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* AI Badge */}
              {project.category === "Health AI" && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur-sm" />
                    <div className="relative px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                      <FaRobot className="text-xs" /> AI
                    </div>
                  </div>
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-52 overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full"
                  onClick={() => openImageModal(project.image, index)}
                  priority={index < 3} // Prioritize first 3 images
                />
                
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => openImageModal(project.image, index)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all"
                  >
                    <FaExpand className="text-white text-sm" />
                  </button>
                  
                  <button
                    onClick={() => toggleLike(project.id)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-red-500/20 transition-all"
                  >
                    <FaRegHeart className={`text-sm ${likedProjects.has(project.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                  </button>
                </div>
                
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
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} bg-opacity-20 flex items-center justify-center`}>
                    <div className="text-lg text-white opacity-80">
                      {project.category === "Health AI" && <FaRobot />}
                      {project.category === "Event" && <FaStar />}
                      {project.category === "Community" && <FaStar />}
                      {project.category === "Enterprise Event" && <FaBolt />}
                    </div>
                  </div>
                  
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                    title="Visit Website"
                  >
                    <FaExternalLinkAlt className="text-gray-400 hover:text-cyan-400 transition-colors text-sm" />
                  </a>
                </div>

                {/* Project Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className={`
                          px-3 py-1 rounded-full text-xs border
                          ${tech === "Python" || tech === "Go" 
                            ? "bg-green-500/10 text-green-300 border-green-500/30" 
                            : tech === "Next.js" || tech === "React.js"
                            ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                            : "bg-gray-800/50 text-gray-300 border-gray-700/50"
                          }
                        `}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-800/50 text-gray-300 border border-gray-700/50">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                {project.features && (
                  <div className="mb-6 pt-4 border-t border-gray-800">
                    <div className="text-xs text-gray-400 mb-2">Key Features</div>
                    <ul className="space-y-1.5">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-gray-300 text-xs flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Visit Button */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-xl font-medium text-white transition-all duration-300 border border-gray-700 hover:border-gray-600 group/btn"
                >
                  <span className="group-hover/btn:text-cyan-300 transition-colors">
                    {project.status === "Active" || project.status === "Live" ? "Visit Live Site" : "View Project"}
                  </span>
                  <FaExternalLinkAlt className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="text-center pt-8 border-t border-gray-800">
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-white">{portfolioItems.length}</div>
              <div className="text-gray-400 text-sm">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Views</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {portfolioItems.filter(p => p.category === "Health AI").length}
              </div>
              <div className="text-gray-400 text-sm">AI Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {portfolioItems.filter(p => p.status === "Active" || p.status === "Live").length}
              </div>
              <div className="text-gray-400 text-sm">Live Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {activeImage && (
        <ImageModal
          activeImage={activeImage}
          imageGalleryIndex={imageGalleryIndex}
          portfolioItems={portfolioItems}
          onClose={closeImageModal}
          onNavigate={navigateGallery}
        />
      )}
    </section>
  );
}