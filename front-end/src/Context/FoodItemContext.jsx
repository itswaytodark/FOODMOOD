import { createContext, useContext } from "react";

export const FoodItemContext = createContext([]); // ✅ Default = empty array

export const FoodItemProvider = ({ children }) => {
  const foodItems = [
    {
      id: "f1",
      name: "Paneer Butter Masala",
      price: 220,
      calories: 420,
      spice: "Medium",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmithakalluraya.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fmango-lassi-recipe.jpg&f=1&nofb=1&ipt=baee858bc9b9e0b5973840ee2be365ee250bcf56a872aacd2ec16ae32be9d5f5",
      category: "Main Course",
    },
    {
      id: "f2",
      name: "Veg Biryani",
      price: 180,
      calories: 520,
      spice: "Low",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmithakalluraya.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fmango-lassi-recipe.jpg&f=1&nofb=1&ipt=baee858bc9b9e0b5973840ee2be365ee250bcf56a872aacd2ec16ae32be9d5f5",
      category: "Main Course",
    },
    {
      id: "f3",
      name: "Chocolate Brownie",
      price: 120,
      calories: 320,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmithakalluraya.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fmango-lassi-recipe.jpg&f=1&nofb=1&ipt=baee858bc9b9e0b5973840ee2be365ee250bcf56a872aacd2ec16ae32be9d5f5",
      category: "Desserts",
    },
    {
      id: "f4",
      name: "Mango Lassi",
      price: 90,
      calories: 200,
      spice: "None",
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsmithakalluraya.com%2Fwp-content%2Fuploads%2F2020%2F05%2Fmango-lassi-recipe.jpg&f=1&nofb=1&ipt=baee858bc9b9e0b5973840ee2be365ee250bcf56a872aacd2ec16ae32be9d5f5",
      category: "Drinks",
    },
  ];

  return (
    <FoodItemContext.Provider value={foodItems}>
      {children}
    </FoodItemContext.Provider>
  );
};

export const useFoodItems = () => useContext(FoodItemContext);
