// components/Footer/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-8 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Mohamad Khadik
            </span>
            <p className="text-gray-500 text-sm mt-2">
              Fullstack Developer | React.js & Laravel Expert
            </p>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mohamad Khadik Portfolio. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/mohamad-khadik-6996a6387/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/onesec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}