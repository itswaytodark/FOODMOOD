import { useState } from "react";
import { useFoodItems } from "../Context/FoodItemContext";
import { useCart } from "../Context/CartContext";

export const Homepage = () => {
  const foodItems = useFoodItems();
  const { addToCart } = useCart();
  const [category, setCategory] = useState("All");

  const filteredItems =
    category === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === category);

  const categories = ["All", "Main Course", "Desserts", "Drinks"];

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
     

      {/* Category Filter */}
      <div className="flex space-x-3 mb-6 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              category === cat
                ? "bg-fuchsia-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="shadow-md rounded-2xl p-3 hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl"
            />
            <div className="mt-3">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                🔥 {item.spice} | {item.calories} cal
              </p>
              <p className="text-md font-bold mt-2">₹{item.price}</p>
              <button
  onClick={() => addToCart(item)}
  className="flex items-center justify-center gap-2 mt-3 px-5 py-2 
             bg-gradient-to-r from-fuchsia-500 to-pink-500 
             text-white text-lg font-semibold rounded-full 
             shadow-md hover:shadow-lg hover:scale-105 active:scale-95 
             transition-all duration-200"
>
  Add
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
