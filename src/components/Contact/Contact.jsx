// components/Contact/Contact.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaUser,
  FaPaperPlane 
} from "react-icons/fa";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs for animation
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const isInView = useInView(contactRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Form submitted:", formData);
    
    // Animation for button
    setTimeout(() => {
      const mailtoLink = `mailto:mohamadkhadik7@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
      
      // Success notification animation
      const successEl = document.createElement("div");
      successEl.className = "fixed top-8 right-8 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg shadow-xl z-50 animate-fade-in";
      successEl.innerHTML = "Thank you! I'll get back to you soon.";
      document.body.appendChild(successEl);
      
      setTimeout(() => {
        successEl.remove();
      }, 3000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const formItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const contactInfoVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section
      id="contact"
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      ref={contactRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        variants={{
          hidden: { width: 0 },
          visible: { width: "100%", transition: { duration: 1 } }
        }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        variants={{
          hidden: { width: 0 },
          visible: { width: "100%", transition: { duration: 1, delay: 0.5 } }
        }}
      />

      {/* Floating particles */}
      <motion.div 
        className="absolute top-20 left-10 w-2 h-2 bg-cyan-400/20 rounded-full"
        animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-3 h-3 bg-purple-400/20 rounded-full"
        animate={{ y: [0, -30, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's discuss your next project or just say hello!
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            ref={formRef}
            className="relative"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 hover:opacity-70 transition duration-500"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
            
            <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-8 border border-gray-800 shadow-xl">
              <motion.h3 
                className="text-2xl font-bold mb-6 text-white"
                variants={formItemVariants}
                custom={0}
              >
                Send Me a Message
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  variants={formItemVariants}
                  custom={1}
                >
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FaUser className="h-5 w-5 text-gray-500" />
                      </motion.div>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-500/50"
                      placeholder="Enter your name"
                    />
                  </div>
                </motion.div>

                {/* Email Input */}
                <motion.div
                  variants={formItemVariants}
                  custom={2}
                >
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <motion.div
                        whileHover={{ rotate: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FaEnvelope className="h-5 w-5 text-gray-500" />
                      </motion.div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-purple-500/50"
                      placeholder="Enter your email"
                    />
                  </div>
                </motion.div>

                {/* Subject Input */}
                <motion.div
                  variants={formItemVariants}
                  custom={3}
                >
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-500/50"
                    placeholder="What is this regarding?"
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  variants={formItemVariants}
                  custom={4}
                >
                  <label className="block text-gray-300 mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all duration-300 hover:border-purple-500/50"
                    placeholder="Your message here..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={isSubmitting ? { scale: [1, 0.9, 1] } : "initial"}
                  transition={isSubmitting ? { repeat: Infinity, duration: 1 } : {}}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] rounded-lg font-medium hover:shadow-xl transition-all duration-500 flex items-center justify-center gap-3 group relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={isSubmitting ? { x: ["-100%", "100%"] } : {}}
                    transition={isSubmitting ? { repeat: Infinity, duration: 1 } : {}}
                  />
                  
                  <motion.div
                    className="relative z-10 flex items-center gap-2"
                    variants={iconVariants}
                  >
                    <FaPaperPlane className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="font-semibold">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </motion.div>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            ref={infoRef}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Info Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 hover:opacity-50 transition duration-500" />
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-8 border border-gray-800 shadow-xl">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-white"
                  variants={contactInfoVariants}
                  custom={0}
                >
                  Contact Information
                </motion.h3>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <motion.div 
                    className="flex items-center gap-4 group"
                    variants={contactInfoVariants}
                    custom={1}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaPhone className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">Phone</h3>
                      <p className="text-gray-300">+62 8572 723 58999</p>
                      <p className="text-sm text-gray-500">Available 9AM - 5PM WIB</p>
                    </div>
                  </motion.div>
                  
                  {/* Email */}
                  <motion.div 
                    className="flex items-center gap-4 group"
                    variants={contactInfoVariants}
                    custom={2}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: -360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaEnvelope className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <p className="text-gray-300">mohamadkhadik7@gmail.com</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </motion.div>
                  
                  {/* Location */}
                  <motion.div 
                    className="flex items-center gap-4 group"
                    variants={contactInfoVariants}
                    custom={3}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      animate={floatingAnimation}
                    >
                      <FaMapMarkerAlt className="w-5 h-5 text-cyan-300" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">Location</h3>
                      <p className="text-gray-300">Brebes, Jawa Tengah</p>
                      <p className="text-gray-300">Indonesia 52253</p>
                    </div>
                  </motion.div>
                  
                  {/* LinkedIn */}
                  <motion.div 
                    className="flex items-center gap-4 group"
                    variants={contactInfoVariants}
                    custom={4}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <FaLinkedin className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">LinkedIn</h3>
                      <motion.a 
                        href="https://www.linkedin.com/in/mohamad-khadik-6996a6387/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-cyan-400 transition-colors inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        Connect with me on LinkedIn
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mt-8 pt-8 border-t border-gray-800"
                  variants={contactInfoVariants}
                  custom={5}
                >
                  <p className="text-gray-400 text-center mb-4">
                    Available for freelance work and full-time opportunities
                  </p>
                  <div className="flex justify-center">
                    <motion.a 
                      href="mailto:mohamadkhadik7@gmail.com"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Email Directly</span>
                      <motion.span 
                        className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 hover:opacity-50 transition duration-500" />
              
              <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border border-gray-800 shadow-xl">
                <motion.h3 
                  className="text-xl font-bold mb-4 text-white"
                  variants={contactInfoVariants}
                  custom={6}
                >
                  Connect With Me
                </motion.h3>
                
                <div className="flex gap-4">
                  <motion.a 
                    href="https://www.linkedin.com/in/mohamad-khadik-6996a6387/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-transparent transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className="absolute w-full h-full opacity-0 group-hover:opacity-5"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-500 to-transparent" />
                    </motion.div>
                    
                    <FaLinkedin className="w-5 h-5 text-cyan-400 group-hover:scale-125 transition-transform duration-300" />
                    <span className="font-medium">LinkedIn</span>
                  </motion.a>
                  
                  <motion.a 
                    href="https://github.com/onesec" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-transparent transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className="absolute w-full h-full opacity-0 group-hover:opacity-5"
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-transparent" />
                    </motion.div>
                    
                    <FaGithub className="w-5 h-5 text-purple-400 group-hover:scale-125 transition-transform duration-300" />
                    <span className="font-medium">GitHub</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}