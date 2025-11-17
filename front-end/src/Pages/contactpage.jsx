import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-fuchsia-100 px-4 py-16 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-t-8 border-fuchsia-600"
      >
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl font-extrabold text-gray-900 mb-4 text-center"
        >
          Get In Touch
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className="text-lg text-gray-500 mb-10 text-center"
        >
          We'd love to hear from you! Reach out for support, feedback, or collaborations.
        </motion.p>

        <div className="space-y-6">
          {/* Email */}
          <motion.div 
            variants={itemVariants} 
            className="flex items-start gap-4 p-4 bg-fuchsia-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <Mail className="w-6 h-6 text-fuchsia-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-gray-800">Email Support</p>
              <a href="mailto:support@foodmood.com" className="text-fuchsia-600 hover:text-fuchsia-700 transition">
                gohilaryan96@gmail.com
              </a>
            </div>
          </motion.div>

         
          <motion.div 
            variants={itemVariants} 
            className="flex items-start gap-4 p-4 bg-fuchsia-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <Phone className="w-6 h-6 text-fuchsia-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-gray-800">GitHub</p>
              <a href="https://github.com/itswaytodark" className="text-fuchsia-600 hover:text-fuchsia-700 transition">
                github.com/itswaytodark
              </a>
            </div>
          </motion.div>

          
          <motion.div 
            variants={itemVariants} 
            className="flex items-start gap-4 p-4 bg-fuchsia-50 rounded-xl hover:shadow-lg transition-shadow"
          >
            <MapPin className="w-6 h-6 text-fuchsia-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-gray-800">Our Kitchen HQ</p>
              <p className="text-gray-600">
                123 Food Street, Tech City, Surat, Gujarat - 395007
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};