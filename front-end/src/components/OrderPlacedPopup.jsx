import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
// ⭐ Import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom"; 
import { useCart } from '../Context/CartContext'; 

// Animation variants for the main container (PopupVariants and IconVariants remain the same)
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

const iconVariants = {
    initial: { rotate: -15, scale: 0.8 },
    animate: {
        rotate: [0, 5, -5, 0], 
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
    // ⭐ Initialize navigate hook
    const navigate = useNavigate(); 

    // Function to handle automatic dismissal and navigation
    const handleDismissAndNavigate = () => {
        // 1. Start dismissal animation/process
        onDismiss(); 
        // 2. Navigate to the homepage (or any route, e.g., '/orders')
        // We use replace: true to prevent the user from navigating back to the cart page
        navigate('/', { replace: true }); 
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden'; 
        clearCart(); 

        // ⭐ Set a timer to automatically dismiss AND navigate after 4 seconds
        const timer = setTimeout(() => {
            handleDismissAndNavigate();
        }, 4000); 

        // Cleanup: Clear timer and re-enable scrolling
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto'; 
        };
    }, [clearCart, onDismiss, navigate]); // Added navigate to the dependency array


    return (
        <motion.div
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
                    // Changed back to fuchsia for consistency, but keeping your preference if needed
                    className="text-fuchsia-600 mb-4" 
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

                {/* Call to Action - Now triggers the navigation */}
                <button
                    onClick={handleDismissAndNavigate} // ⭐ Updated handler
                    className="px-6 py-2 bg-fuchsia-400 text-white font-semibold rounded-full 
                               hover:bg-fuchsia-500 transition duration-150 shadow-md"
                >
                    Continue Browsing
                </button>
            </motion.div>
        </motion.div>
    );
};