import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat  } from "lucide-react"; // you can replace this with any icon

export const MenuButton = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Main Course", icon: "🍛" },
    { name: "Desserts", icon: "🍰" },
    { name: "Drinks", icon: "🥤" },
    { name: "Starters", icon: "🍟" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Menu list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 shadow-lg rounded-2xl mb-3 backdrop-blur-md border border-gray-200
                       w-56 sm:w-64 max-h-[70vh] overflow-y-auto p-3"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Menu</h3>
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between px-3 py-2 rounded-xl
                             hover:bg-blue-50 transition-all cursor-pointer text-gray-700 text-base"
                >
                  <span>{item.name}</span>
                  <span>{item.icon}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        className="p-4 sm:p-5 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700
                   transition-all focus:outline-none"
      >
        <ChefHat  size={24} />
      </motion.button>
    </div>
  );
};
