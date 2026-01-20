// components/Portfolio/Portfolio.jsx
import React, { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Lazy load heavy icons
const iconComponents = {
  FaExternalLinkAlt: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaExternalLinkAlt }))),
  FaGithub: lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaGithub }))),
  // ... tambahkan ikon lain yang diperlukan
};

// Load images with Intersection Observer
const LazyImage = ({ src, alt, className, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          const img = new Image();
          img.src = src;
          img.onload = () => setIsLoaded(true);
          observer.unobserve(imgRef.current);
        }
      },
      { rootMargin: '100px' }
    );
    
    if (imgRef.current) observer.observe(imgRef.current);
    
    return () => observer.disconnect();
  }, [src, isLoaded]);
  
  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {isLoaded ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onClick={onClick}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 animate-pulse" />
      )}
    </div>
  );
};

// Critical styles - pindahkan ke inline atau CSS module
const criticalStyles = `
  .portfolio-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .portfolio-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Optimized portfolio items data
const portfolioItems = [
  { 
    id: 1,
    name: "Selapura Village", 
    url: "https://desaselapura.site", 
    description: "Village profile website with PHP Native-based CMS",
    category: "Community",
    tech: ["PHP", "MySQL", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", // Reduced size
    // ... other properties
  },
  // ... other items with optimized images (width: 400px, q=80)
];

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState(6); // Initial load
  const observerRef = useRef();
  
  const sectionRef = useRef(null);
  
  // Defer non-critical animations
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 300); // Delay animations slightly
  
    return () => clearTimeout(timer);
  }, []);
  
  // Lazy load more items
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleItems(prev => Math.min(prev + 3, portfolioItems.length));
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Optimize scroll animations - debounce
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Simplified animation variants for better performance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  // Memoize filtered items
  const filteredItems = React.useMemo(() => {
    const items = activeCategory === "All" 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === activeCategory);
    
    return items.slice(0, visibleItems);
  }, [activeCategory, visibleItems]);
  
  // Add critical CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = criticalStyles;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black min-h-screen"
      style={{ contentVisibility: 'auto' }} // Optimize rendering
    >
      {/* Simplified background - remove heavy patterns */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Optimized title - remove heavy animations */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Showcasing innovative digital solutions
          </p>
        </div>
        
        {/* Simplified filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", ...new Set(portfolioItems.map(item => item.category))].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Optimized grid with simpler animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className="portfolio-card bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-colors"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Lazy loaded image */}
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="text-xs font-medium px-2 py-1 bg-gray-800 rounded">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">
                    {project.name}
                  </h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Simplified tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-800 rounded text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-800 rounded text-gray-300">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors"
                >
                  Visit Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Load more observer */}
        {visibleItems < portfolioItems.length && (
          <div ref={observerRef} className="h-10 flex items-center justify-center mt-8">
            <div className="w-6 h-6 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}