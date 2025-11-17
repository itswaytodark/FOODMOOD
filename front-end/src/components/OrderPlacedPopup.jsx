import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useCart } from '../Context/CartContext'; 


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

    const navigate = useNavigate(); 

    const handleDismissAndNavigate = () => {
     
        onDismiss(); 
        
        navigate('/', { replace: true }); 
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden'; 
        clearCart(); 

       
        const timer = setTimeout(() => {
            handleDismissAndNavigate();
        }, 4000); 

       
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto'; 
        };
    }, [clearCart, onDismiss, navigate]); 


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
                
            
                <motion.div
                   
                    className="text-emerald-400 mb-4" 
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                >
                    <CheckCircle className="w-16 h-16" />
                </motion.div>

               
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
                    Order Placed!
                </h2>
                <p className="text-gray-500 text-center mb-6">
                    Your delicious meal is now being prepared by the chef.
                </p>

             
                <button
                    onClick={handleDismissAndNavigate} 
                    className="px-6 py-2 bg-fuchsia-400 text-white font-semibold rounded-full 
                               hover:bg-fuchsia-500 transition duration-150 shadow-md"
                >
                    Continue Browsing
                </button>
            </motion.div>
        </motion.div>
    );
};