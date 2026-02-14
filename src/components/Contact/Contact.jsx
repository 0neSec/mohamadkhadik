// components/Contact/Contact.jsx
import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaUser,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';

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
  }
];

// EmailJS Configuration - GANTI DENGAN CREDENTIALS ASLI ANDA
const EMAILJS_CONFIG = {
  publicKey: "RncjFisdSRaPx3oKZ", // Dari Account > API Keys
  serviceId: "service_tc782q9", // Dari Email Services (Gmail)
  templateId: "template_afwrnsp" // Dari Email Templates
};

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

// Extracted FormInput component
const FormInput = React.memo(({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  icon, 
  required = true,
  textarea = false,
  error
}) => {
  const InputComponent = textarea ? 'textarea' : 'input';
  
  return (
    <div>
      <label className="block text-gray-300 mb-1.5 text-xs font-medium">
        {label} {required && <span className="text-red-400">*</span>}
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
            bg-gray-800/50 border rounded-lg
            text-white text-sm placeholder-gray-500
            focus:outline-none focus:ring-1 transition-colors duration-200
            ${error 
              ? 'border-red-500/50 focus:ring-red-500' 
              : 'border-gray-700 focus:ring-cyan-500'
            }
          `}
          placeholder={textarea ? "Your message here..." : `Enter your ${label.toLowerCase()}`}
        />
        {error && (
          <p className="text-red-400 text-xs mt-1">{error}</p>
        )}
      </div>
    </div>
  );
});

FormInput.displayName = 'FormInput';

// Extracted ContactInfoItem component
const ContactInfoItem = React.memo(({ item }) => {
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
      <div>
        <h3 className="font-semibold text-white text-sm">{item.title}</h3>
        <p className="text-gray-300 text-sm">{item.value}</p>
        {item.subtext && (
          <p className="text-xs text-gray-500 mt-0.5">{item.subtext}</p>
        )}
      </div>
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

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Initialize EmailJS dengan public key
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✅ EmailJS initialized with public key');
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  }, [formData]);

  const sendEmail = async (data) => {
    console.log('🚀 Starting email send process via Gmail...');
    console.log('📝 Form data:', data);

    try {
      // Template parameters sesuai dengan template di EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        reply_to: data.email,
        to_email: 'mohamadkhadik7@gmail.com' // Email tujuan
      };

      console.log('📦 Template params:', templateParams);
      console.log('🔧 Service ID:', EMAILJS_CONFIG.serviceId);
      console.log('🔧 Template ID:', EMAILJS_CONFIG.templateId);

      // Kirim email menggunakan EmailJS dengan Gmail service
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log('📡 EmailJS response:', response);

      if (response.status === 200) {
        console.log('✅ Email sent successfully via Gmail!');
        return true;
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('❌ EmailJS error:', error);
      
      // Log detail error
      if (error.text) {
        console.error('Error details:', error.text);
      }
      
      console.log('⚠️ Falling back to mailto...');
      
      // Fallback to mailto if EmailJS fails
      const mailtoLink = `mailto:mohamadkhadik7@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )}`;
      
      window.location.href = mailtoLink;
      return false;
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    console.log('📨 Form submission started');
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('❌ Form validation failed:', errors);
      setFormErrors(errors);
      setNotification({
        show: true,
        type: 'error',
        message: 'Please fix the errors in the form'
      });
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
      return;
    }

    console.log('✅ Form validation passed');
    
    setIsSubmitting(true);
    
    try {
      // Send email via Gmail
      const sent = await sendEmail(formData);
      
      if (sent) {
        console.log('🎉 Email successfully sent via Gmail!');
      } else {
        console.log('📧 Email sent via mailto fallback');
      }
      
      // Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: sent 
          ? 'Message sent successfully! I\'ll get back to you soon.' 
          : 'Message sent via email client. Thank you!'
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setNotification({
        show: true,
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
    }
  }, [formData, validateForm]);

  // Memoize form data for performance
  const memoizedFormData = useMemo(() => formData, [formData]);

  return (
    <section
      id="contact"
      className="relative py-12 px-4 sm:px-6 lg:px-8 bg-black min-h-screen flex items-center"
      ref={sectionRef}
      style={{ 
        contentVisibility: 'auto', 
        containIntrinsicSize: '0 500px',
        willChange: 'transform'
      }}
    >
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 via-black to-gray-900/10" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
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
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <FormInput
                    label="Name"
                    name="name"
                    value={memoizedFormData.name}
                    onChange={handleInputChange}
                    icon={<FaUser className="h-4 w-4 text-gray-500" />}
                    error={formErrors.name}
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={memoizedFormData.email}
                    onChange={handleInputChange}
                    icon={<FaEnvelope className="h-4 w-4 text-gray-500" />}
                    error={formErrors.email}
                  />

                  <FormInput
                    label="Subject"
                    name="subject"
                    value={memoizedFormData.subject}
                    onChange={handleInputChange}
                    error={formErrors.subject}
                  />

                  <FormInput
                    label="Message"
                    name="message"
                    value={memoizedFormData.message}
                    onChange={handleInputChange}
                    textarea={true}
                    error={formErrors.message}
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className={`
                      w-full px-4 py-2.5 rounded-lg text-sm font-medium
                      flex items-center justify-center gap-2
                      transition-all duration-200
                      ${isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:shadow-lg'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-3 h-3" />
                        <span>Send Message</span>
                      </>
                    )}
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
                  {contactInfo.map((item, idx) => (
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

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className={`
              backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg text-sm
              flex items-center gap-3 min-w-[300px]
              ${notification.type === 'success' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
              }
            `}>
              {notification.type === 'success' ? (
                <FaCheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <FaExclamationCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}