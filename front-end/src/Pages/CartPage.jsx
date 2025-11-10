import { useState } from "react"; // ⭐ Import useState
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../Context/CartContext";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
// ⭐ Import the popup component
import { OrderPlacedPopup } from "../components/OrderPlacedPopup"; // Adjust path as needed

export const CartPage = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();
  
  // ⭐ State to control the popup visibility
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Charges Logic
  const deliveryCharge = totalPrice > 0 ? 40 : 0;
  const gst = +(totalPrice * 0.05).toFixed(2);
  const discount = totalPrice >= 500 ? 150 : 0;
  const grandTotal = totalPrice + deliveryCharge + gst - discount;

  // ⭐ Handler for the button click
  const handlePlaceOrder = () => {
    // 1. You could add final validation here
    
    // 2. Show the confirmation popup
    setShowConfirmation(true);
    // The popup handles clearing the cart and dismissing itself after 4s
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-fuchsia-100 px-4 py-8 sm:px-6 lg:px-12 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-fuchsia-600 mb-10 text-center flex items-center justify-center gap-2">
          <ShoppingBag className="w-8 h-8 text-fuchsia-500" />
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-20"
          >
            <p className="text-gray-600 text-lg mb-4">
              Your cart is empty. Add something delicious! 🍝
            </p>
            
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT: Cart Items */}
            <div className="flex-1 space-y-4 mb-8">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white shadow-md rounded-2xl p-4 sm:p-5 border border-gray-100"
                  >
                    {/* ✅ Top Section: Image + Info */}
                    <div className="flex items-center gap-4">
                      <motion.img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800 break-words">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} • {item.calories || 250} cal
                        </p>
                      </div>
                    </div>

                    {/* ✅ Bottom Section: Controls (on mobile below, on desktop right) */}
                    <div className="flex justify-end sm:justify-between items-center mt-4 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-3 mx-auto sm:mx-0">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition"
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>

                        <motion.span
                          key={item.qty}
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 120 }}
                          className="font-semibold min-w-[20px] text-center"
                        >
                          {item.qty}
                        </motion.span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition"
                        >
                          <Plus className="w-4 h-4 text-gray-700" />
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 p-2 hover:bg-red-100 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

              </AnimatePresence>
            </div>

            {/* RIGHT: Summary Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              // Note: Kept sticky property as you provided it, but be cautious of click issues!
              className="lg:w-[380px] w-full lg:sticky lg:top-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 self-start" 
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bill Summary</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount Applied</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <hr className="my-3 border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total Payable</span>
                  <motion.span
                    key={grandTotal}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                  >
                    ₹{grandTotal}
                  </motion.span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder} // ⭐ Added the click handler
                className="w-full mt-6 bg-fuchsia-600 text-white font-semibold py-3 rounded-xl hover:bg-fuchsia-700 transition-all shadow-md"
              >
                Proceed to Checkout
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
      
      {/* ⭐ Popup Render: This ensures the overlay appears on top of everything */}
      <AnimatePresence>
        {showConfirmation && (
          <OrderPlacedPopup onDismiss={() => setShowConfirmation(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};