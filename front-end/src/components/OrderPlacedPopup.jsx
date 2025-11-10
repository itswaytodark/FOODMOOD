import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from '../Context/CartContext'; // ⭐ Adjust path as needed

// Animation variants for the main container
const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 10 }
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } }
};

// Animation variants for the checkmark icon
const iconVariants = {
    initial: { rotate: -15, scale: 0.8 },
    animate: {
        rotate: [0, 5, -5, 0], // Subtle wobble effect
        scale: 1.1,
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const OrderPlacedPopup = ({ onDismiss }) => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Lock background scrolling
        document.body.style.overflow = 'hidden'; 
        
        // ⭐ 1. Clear the cart 
        clearCart(); 

        // ⭐ 2. Set a timer to automatically dismiss the popup after 4 seconds
        const timer = setTimeout(() => {
            onDismiss();
        }, 4000); 

        // Cleanup: Clear timer and re-enable scrolling
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto'; 
        };
    }, [clearCart, onDismiss]);


    return (
        <motion.div
            // ⭐ High z-index and fixed position ensures it overlays everything
            className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-3xl p-8 sm:p-10 w-[90%] max-w-sm flex flex-col items-center 
                           shadow-2xl border-t-4 border-fuchsia-400"
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                
                {/* Checkmark Icon with Animation */}
                <motion.div
                    className="text-green-500 mb-4"
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                >
                    <CheckCircle className="w-16 h-16" />
                </motion.div>

                {/* Content */}
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
                    Order Placed!
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Your delicious meal is now being prepared by the chef.
                </p>

                {/* Call to Action */}
                <button
                    onClick={onDismiss}
                    className="px-6 py-2 bg-fuchsia-400 text-white font-semibold rounded-full 
                               hover:bg-fuchsia-400 transition duration-150 shadow-md"
                >
                    Continue Browsing
                </button>
            </motion.div>
        </motion.div>
    );
};