import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Right - Nav Links */}
        <div className="hidden sm:flex items-center space-x-8 text-lg font-medium">
          <Link
            to="/cart"
            className="hover:text-fuchsia-600 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" /> Cart
          </Link>
          <Link
            to="/contact"
            className="hover:text-fuchsia-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden focus:outline-none"
        >
          {menuOpen ? (
            <X className="w-7 h-7 text-fuchsia-600" />
          ) : (
            <Menu className="w-7 h-7 text-fuchsia-600" />
          )}
        </button>
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
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-600 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Cart
              </Link>
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
