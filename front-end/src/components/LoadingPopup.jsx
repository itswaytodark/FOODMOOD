import { motion } from "framer-motion";
import { Coffee, Soup, Zap } from "lucide-react"; // Using icons to represent different food stages

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
    y: ["0%", "-50%", "0%"], // A subtle up-and-down bounce
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const LoadingPopup = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
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