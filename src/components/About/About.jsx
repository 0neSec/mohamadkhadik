import React from "react";
import { 
  FaGraduationCap, 
  FaUser     
} from "react-icons/fa";

export default function About() {
  return (
    <section  className="relative bg-black">
      {/* Gradient overlay di atas */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Tetap sebagai statis */}
        <div className="text-center mb-12 cursor-default" >
          <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Profil & Pendidikan
          </span>
        </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Me Section */}
          <div className="space-y-6">
            {/* Header - Tetap statis */}
            <div className="flex items-center gap-3 mb-4 cursor-default">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg">
                <FaUser className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Tentang Saya</h3>
            </div>
            
            {/* Card Tentang Saya - Sekarang sebagai button */}
            <button 
              className="w-full border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 text-left group active:scale-[0.98]"
              aria-label="Buka detail lengkap tentang saya"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    Saya adalah lulusan Sarjana Terapan Teknik Informatika dari Politeknik Harapan Bersama Tegal dengan minat besar di bidang pengembangan web. 
                    Selama masa studi, saya telah menguasai berbagai teknologi dan framework seperti React.js, Next.js, dan Laravel, serta memiliki pengalaman 
                    dalam mengembangkan berbagai proyek berbasis website.
                  </p>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    Saya bersemangat untuk terus belajar dan berkontribusi dalam menciptakan solusi digital yang inovatif dan bermanfaat.
                  </p>
                </div>
                <div className="ml-4 p-2 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 rounded-lg group-hover:from-cyan-500/30 group-hover:to-cyan-500/20 transition-all duration-300">
                  <FaUser className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                </div>
              </div>
            </button>

          </div>

          {/* Education Section */}
          <div className="space-y-6">
            {/* Header - Tetap statis */}
            <div className="flex items-center gap-3 mb-4 cursor-default">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg">
                <FaGraduationCap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Pendidikan</h3>
            </div>

            {/* Education Timeline - Semua card sekarang button */}
            <div className="space-y-6">
              {/* Higher Education Button */}
              <button 
                className="w-full border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 text-left group active:scale-[0.98]"
                aria-label="Detail pendidikan tinggi"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                    Universitas Harkat Negeri
                  </h4>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium group-hover:bg-purple-500/30 group-hover:text-purple-200 transition-colors duration-300">
                    2021 - 2025
                  </span>
                </div>
                <p className="text-cyan-300 font-medium mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                  Sarjana Terapan Teknik Informatika
                </p>
                <p className="text-gray-400 mb-2 group-hover:text-gray-300">IPK: 3.5</p>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                  Lulusan dengan spesialisasi dalam pengembangan web fullstack menggunakan React.js, Next.js, dan Laravel.
                </p>
              </button>

              {/* High School Button */}
              <button 
                className="w-full border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 text-left group active:scale-[0.98]"
                aria-label="Detail pendidikan menengah"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    Madrasah Aliyah Negeri 1 Brebes
                  </h4>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium group-hover:bg-cyan-500/30 group-hover:text-cyan-200 transition-colors duration-300">
                    2018 - 2021
                  </span>
                </div>
                <p className="text-cyan-300 font-medium mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                  Ilmu Pengetahuan Alam
                </p>
                <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                  Jurusan IPA dengan fokus pada matematika dan sains, membangun fondasi untuk studi di bidang teknologi informasi.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}