import { useContext } from "react"
import { FoodItemContext } from "../Context/FoodItemContext"
import { CartContext } from "../Context/CartContext"
import { MenuButton } from "../components/MenuBtn"

export const Homepage = () => {
  const { foodItems } = useContext(FoodItemContext)
  const { addToCart } = useContext(CartContext)

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-fuchsia-500">FoodMood</h1>
        <MenuButton />
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="relative shadow-md rounded-2xl p-3 hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl"
            />

            {/* Add Button — small and floating */}
            <button
              onClick={() => addToCart(item)}
              className="absolute bottom-4 right-4 bg-fuchsia-500 text-white text-lg rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-fuchsia-600 transition-all"
            >
              +
            </button>

            {/* Food Info */}
            <div className="mt-3">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                🔥 {item.spice} | {item.calories} cal
              </p>
              <p className="text-md font-bold mt-1">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
