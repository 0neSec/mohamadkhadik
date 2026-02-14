// components/Contact/Contact.jsx
import React, { useState, useRef, useCallback, useMemo } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaUser,
  FaPaperPlane 
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";

// Move static data outside component
const contactInfo = [
  {
    icon: <FaPhone className="w-4 h-4 text-cyan-400" />,
    title: "Phone",
    value: "+62 8572 723 58999",
    subtext: "Available 9AM - 5PM WIB",
    color: "cyan"
  },
  {
    icon: <FaEnvelope className="w-4 h-4 text-purple-400" />,
    title: "Email",
    value: "mohamadkhadik7@gmail.com",
    subtext: "Response within 24 hours",
    color: "purple"
  },
  {
    icon: <FaMapMarkerAlt className="w-4 h-4 text-cyan-300" />,
    title: "Location",
    value: "Brebes, Jawa Tengah",
    subtext: "Indonesia 52253",
    color: "cyan"
  },
  {
    icon: <FaLinkedin className="w-4 h-4 text-cyan-400" />,
    title: "LinkedIn",
    value: "Connect with me",
    link: "https://www.linkedin.com/in/mohamad-khadik-6996a6387/",
    color: "purple"
  }
];

// Simplified animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const formItemVariants = {
  hidden: { x: -15, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.05, duration: 0.3 }
  })
};

// Extracted FormInput component
const FormInput = React.memo(({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  icon, 
  required = true,
  textarea = false 
}) => {
  const InputComponent = textarea ? 'textarea' : 'input';
  
  return (
    <motion.div variants={formItemVariants} custom={name}>
      <label className="block text-gray-300 mb-1.5 text-xs font-medium">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <InputComponent
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={textarea ? "4" : undefined}
          className={`
            block w-full ${icon ? 'pl-9' : 'px-3'} pr-3 py-2.5
            bg-gray-800/50 border border-gray-700 rounded-lg
            text-white text-sm placeholder-gray-500
            focus:outline-none focus:ring-1 focus:ring-cyan-500
            transition-colors duration-200
          `}
          placeholder={textarea ? "Your message here..." : `Enter your ${label.toLowerCase()}`}
        />
      </div>
    </motion.div>
  );
});

FormInput.displayName = 'FormInput';

// Extracted ContactInfoItem component
const ContactInfoItem = React.memo(({ item }) => {
  const content = (
    <div>
      <h3 className="font-semibold text-white text-sm">{item.title}</h3>
      {item.link ? (
        <a 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-cyan-400 text-sm transition-colors"
        >
          {item.value}
        </a>
      ) : (
        <p className="text-gray-300 text-sm">{item.value}</p>
      )}
      {item.subtext && (
        <p className="text-xs text-gray-500 mt-0.5">{item.subtext}</p>
      )}
    </div>
  );

  return (
    <motion.div 
      className="flex items-start gap-3 group"
      variants={itemVariants}
    >
      <div className={`
        w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
        bg-gradient-to-r from-${item.color}-500/10 to-${item.color}-500/5
      `}>
        {item.icon}
      </div>
      {content}
    </motion.div>
  );
});

ContactInfoItem.displayName = 'ContactInfoItem';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link
    const mailtoLink = `mailto:mohamadkhadik7@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    
    setIsSubmitting(false);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => setShowNotification(false), 3000);
  }, [formData]);

  // Memoize form data for performance
  const memoizedFormData = useMemo(() => formData, [formData]);

  return (
    <section
      id="contact"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-black"
      ref={sectionRef}
      style={{ 
        contentVisibility: 'auto', 
        containIntrinsicSize: '0 500px',
        willChange: 'transform'
      }}
    >
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-black to-gray-900/10" />
      
      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      {/* Minimal floating particles - reduced count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-500/20 rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0, 0.2, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
            style={{ left: `${20 + i * 30}%`, top: `${30 + i * 20}%` }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - simplified */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Let's discuss your next project or just say hello!
            </p>
          </motion.div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-white">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormInput
                    label="Name"
                    name="name"
                    value={memoizedFormData.name}
                    onChange={handleInputChange}
                    icon={<FaUser className="h-4 w-4 text-gray-500" />}
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={memoizedFormData.email}
                    onChange={handleInputChange}
                    icon={<FaEnvelope className="h-4 w-4 text-gray-500" />}
                  />

                  <FormInput
                    label="Subject"
                    name="subject"
                    value={memoizedFormData.subject}
                    onChange={handleInputChange}
                  />

                  <FormInput
                    label="Message"
                    name="message"
                    value={memoizedFormData.message}
                    onChange={handleInputChange}
                    textarea={true}
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FaPaperPlane className="w-3 h-3" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Contact Information */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Contact Info Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-white">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.slice(0, 3).map((item, idx) => (
                    <ContactInfoItem key={idx} item={item} />
                  ))}
                </div>
                
                {/* Quick Email Button */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <a
                    href="mailto:mohamadkhadik7@gmail.com"
                    className="block w-full px-4 py-2.5 bg-gray-800/50 rounded-lg text-sm text-center hover:bg-gray-800 transition-colors"
                  >
                    Email Directly
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-white">
                  Connect With Me
                </h3>
                
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/mohamad-khadik-6996a6387/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-center text-sm"
                  >
                    LinkedIn
                  </a>
                  
                  <a
                    href="https://github.com/onesec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors text-center text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            Thank you! I'll get back to you soon.
          </div>
        </motion.div>
      )}
    </section>
  );
}