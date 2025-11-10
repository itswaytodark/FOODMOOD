import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
// ⭐ Import your custom hook to get the cart count
import { useCart } from '../Context/CartContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // ⭐ Get the dynamic item count from the context!
  const { itemCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Main container */}
      <div className="w-full px-5 sm:px-8 py-4 flex justify-between items-center text-black">

        {/* Left - Logo */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold text-fuchsia-600 tracking-wide"
        >
          FoodMood
        </Link>

        {/* Right - Desktop Nav Links & Mobile Icons */}
        <div className="flex items-center space-x-4 sm:space-x-8 text-lg font-medium">

          {/* Desktop Nav Links (Visible > sm) */}
          <div className="hidden sm:flex items-center space-x-8">
            {/* Cart Link (Desktop) */}
            <Link
              to="/cart"
              className="hover:text-fuchsia-600 transition-colors flex items-center gap-2 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-[-10px] inline-flex items-center justify-center 
                          w-5 h-5 text-xs font-bold leading-none text-white 
                          transform translate-x-1/2 -translate-y-1/2  bg-fuchsia-600 rounded-full 
                          border-2 border-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
              Cart
            </Link>
            <Link
              to="/contact"
              className="hover:text-fuchsia-600 transition-colors"
            >
              Contact
            </Link>
          </div>


          {/* Mobile Icons (Visible < sm) */}
          <div className="sm:hidden flex items-center space-x-4">

            {/* ⭐ 1. Always Visible Cart Icon with Badge */}
            <Link to="/cart" className="relative p-1 text-gray-800 hover:text-fuchsia-600">
              <ShoppingCart className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center 
                              w-5 h-5 text-xs font-bold leading-none text-white 
                              transform translate-x-1/2 -translate-y-1/2 bg-fuchsia-600 rounded-full 
                              border-2 border-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* ⭐ 2. Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none p-1" // Added padding for consistent hit area
            >
              {menuOpen ? (
                <X className="w-7 h-7 text-fuchsia-600" />
              ) : (
                <Menu className="w-7 h-7 text-fuchsia-600" />
              )}
            </button>
          </div>
        </div>


      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden bg-white shadow-lg border-t border-gray-100 text-black"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-lg font-medium">
              {/* Cart Link removed from dropdown as it's now a permanent button */}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};