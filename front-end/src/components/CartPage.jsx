import React from "react";
import { useCart } from "../Context/CartContext";

export const CartPage = () => {
  const { items, updateQty, removeItem, subtotal, discount, serviceCharge, gst, total, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-gray-500">Your cart is empty</div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-400">₹{it.price} • {it.calories} kcal</div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-2">-</button>
                <div>{it.qty}</div>
                <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-2">+</button>
                <div className="ml-4 font-semibold">₹{it.price * it.qty}</div>
                <button onClick={() => removeItem(it.id)} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price summary */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow max-w-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex justify-between"><span>Discount</span><span>- ₹{discount}</span></div>
        <div className="flex justify-between"><span>Service charge</span><span>₹{serviceCharge}</span></div>
        <div className="flex justify-between"><span>GST</span><span>₹{gst}</span></div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total}</span></div>

        <button onClick={() => alert("Go to checkout")} className="mt-4 w-full bg-green-600 text-white py-2 rounded">Checkout</button>
        <button onClick={clearCart} className="mt-2 w-full border border-gray-200 py-2 rounded">Clear Cart</button>
      </div>
    </div>
  );
};
