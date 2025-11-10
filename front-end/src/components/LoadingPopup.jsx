import { motion } from "framer-motion";
import { Coffee, Soup, Zap } from "lucide-react";
import { useEffect } from "react";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: ["0%", "-50%", "0%"],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const LoadingPopup = () => {
  // ⭐ ROBUST SCROLL LOCK IMPLEMENTATION (Handles both html and body)
  useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        
        // --- 1. Lock Scrolling ---
        
        // Calculate scrollbar width to prevent page jump
        const scrollbarWidth = window.innerWidth - html.clientWidth;
        
        // Apply scroll lock styles to HTML and BODY
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        body.style.paddingRight = `${scrollbarWidth}px`; 

        // --- 2. Cleanup Function: Restore Scrolling ---
        return () => {
            // Restore overflow properties to ensure scrolling returns.
            // Using 'auto' or 'visible' is safer than 'unset' for some browsers/setups.
            html.style.overflow = 'visible'; // Use 'visible' for html
            body.style.overflow = 'auto';    // Use 'auto' for body
            body.style.paddingRight = '0';
        };
    }, []);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 
                 bg-gradient-to-br from-pink-100/80 via-fuchsia-100/90 to-purple-200/90 
                 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-2xl p-8 w-64 shadow-2xl flex flex-col items-center">

        <motion.div
          className="flex space-x-2 mb-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div className="text-pink-500" variants={dotVariants}>
            <Soup className="w-6 h-6" />
          </motion.div>
          <motion.div className="text-fuchsia-500" variants={dotVariants}>
            <Coffee className="w-6 h-6" />
          </motion.div>
          <motion.div className="text-red-500" variants={dotVariants}>
            <Zap className="w-6 h-6" />
          </motion.div>
        </motion.div>

        <h3 className="text-xl font-bold text-gray-800">
          AI Chef is Cooking...
        </h3>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Analyzing your mood for the perfect dish.
        </p>
      </div>
    </motion.div>
  );
};