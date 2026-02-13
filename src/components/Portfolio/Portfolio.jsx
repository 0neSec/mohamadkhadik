import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

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
    image: Invofest2023,
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
    image: WisataKesehatanJamu,
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
    image: WKJKalibakung,
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
    image: IIEF,
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

// Simple animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", ...new Set(portfolioItems.map(item => item.category))];
  
  // Filter and sort logic
  let filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);
  
  filteredItems = [...filteredItems].sort((a, b) => a.priority - b.priority);

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
      id="portfolio" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden min-h-screen"
    >
      {/* Simple static background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-cyan-900/10" />
      
      {/* Static grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-8" />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative digital solutions that blend cutting-edge technology with exceptional user experiences
          </p>

          {/* Project Stats */}
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-green-400">
                {portfolioItems.filter(item => item.status === "Live").length} Live Projects
              </span>
            </div>
            <div className="h-4 w-px bg-gray-700" />
            <span className="text-gray-400">
              {portfolioItems.filter(item => item.status === "Completed").length} Completed
            </span>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
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
                  flex items-center gap-2
                  ${activeCategory === category 
                    ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700"
                  }
                `}
              >
                <span>{category}</span>
                <span className={`
                  text-sm px-2 py-0.5 rounded-full
                  ${activeCategory === category 
                    ? "bg-white/20" 
                    : "bg-gray-800"
                  }
                `}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeInUp}
              onHoverStart={() => setHoveredCard(project.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group"
            >
              {/* Card */}
              <div className={`
                relative rounded-xl overflow-hidden
                bg-gradient-to-br from-gray-900 to-black
                border ${project.status === "Live" ? "border-green-500/30" : "border-gray-800"}
                h-full flex flex-col
                transition-all duration-300
                ${hoveredCard === project.id ? "shadow-xl shadow-purple-500/20 scale-[1.02]" : "shadow-lg"}
              `}>
                
                {/* Project Image */}
                {project.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = getImageFallback(project).props.dangerouslySetInnerHTML.__html;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Status Badge */}
                    {project.status === "Live" && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-green-300">Live</span>
                      </div>
                    )}
                  </div>
                ) : (
                  getImageFallback(project)
                )}

                {/* Content */}
                <div className="p-5">
                  {/* Category */}
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                      {project.category}
                    </span>
                    {project.showLiveBadge && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                        Live Now
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-400">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Lighthouse Score (for Health AI projects) */}
                  {project.lighthouseScore && (
                    <div className="flex gap-3 mb-4 text-xs">
                      <span className="text-green-400">Perf: {project.lighthouseScore.performance}</span>
                      <span className="text-blue-400">PWA: {project.lighthouseScore.pwa}</span>
                      <span className="text-cyan-400">Acc: {project.lighthouseScore.accessibility}</span>
                    </div>
                  )}

                  {/* Visit Button */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center justify-center gap-2 w-full py-2.5 px-4
                      rounded-lg font-medium text-sm transition-all duration-300
                      ${project.status === "Live" 
                        ? "bg-gradient-to-r from-green-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-green-500/25" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }
                    `}
                  >
                    {project.status === "Live" ? "Visit Live Site" : "View Project"}
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}