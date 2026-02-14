import React, { useRef, useEffect, useState } from "react";
import { FaGraduationCap, FaUser } from "react-icons/fa";

// 🚀 SOLUSI 1: Hapus Framer Motion untuk initial render
// Gunakan CSS transitions sederhana untuk after load

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 🚀 SOLUSI 2: Detect visibility dengan Intersection Observer biasa
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-black overflow-hidden py-12 md:py-16 lg:py-20"
    >
      {/* 🚀 SOLUSI 3: Background sederhana, tanpa animasi */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-black to-purple-900/5" />
      
      {/* Static grid pattern */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60'...")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 🚀 SOLUSI 4: Header langsung tampil, tanpa animation delay */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Profil & Pendidikan
            </span>
          </h2>
          
          <div className="h-0.5 w-20 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
        </div>

        {/* Main Content - Tanpa animation wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* About Me Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg">
                <FaUser className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Tentang Saya
              </h3>
            </div>
            
            {/* 🚀 SOLUSI 5: Card langsung tampil */}
            <div className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-left">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed mb-3 text-sm md:text-base">
                    Saya adalah lulusan Sarjana Terapan Teknik Informatika dari 
                    Universitas Harkat Negeri Tegal dengan minat besar di bidang 
                    pengembangan web. Selama masa studi, saya telah menguasai 
                    berbagai teknologi dan framework seperti React.js, Next.js, dan Laravel.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Saya bersemangat untuk terus belajar dan berkontribusi dalam 
                    menciptakan solusi digital yang inovatif.
                  </p>
                </div>
                <div className="ml-4 p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg flex-shrink-0">
                  <FaUser className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Education Section - Dengan CSS transitions setelah visible */}
          <div className={`space-y-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg">
                <FaGraduationCap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Pendidikan
              </h3>
            </div>

            {/* Education Cards */}
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-left hover:border-purple-500/50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                  <h4 className="text-base md:text-lg font-semibold text-white">
                    Universitas Harkat Negeri
                  </h4>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-300 rounded-full text-xs font-medium">
                    2021 - 2025
                  </span>
                </div>
                <p className="text-purple-300 font-medium mb-2 text-sm md:text-base">
                  Sarjana Terapan Teknik Informatika
                </p>
                <p className="text-gray-400 mb-2 text-sm">IPK: 3.5</p>
                <p className="text-gray-300 text-xs md:text-sm">
                  Lulusan dengan spesialisasi dalam pengembangan web fullstack 
                  menggunakan React.js, Next.js, dan Laravel.
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-full border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-left hover:border-cyan-500/50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-2">
                  <h4 className="text-base md:text-lg font-semibold text-white">
                    Madrasah Aliyah Negeri 1 Brebes
                  </h4>
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 rounded-full text-xs font-medium">
                    2018 - 2021
                  </span>
                </div>
                <p className="text-cyan-300 font-medium mb-2 text-sm md:text-base">
                  Ilmu Pengetahuan Alam
                </p>
                <p className="text-gray-300 text-xs md:text-sm">
                  Jurusan IPA dengan fokus pada matematika dan sains, membangun 
                  fondasi untuk studi di bidang teknologi informasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}