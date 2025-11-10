import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFoodItems } from "../Context/FoodItemContext"; 
import { useCart } from "../Context/CartContext";         
import { X, Smile } from "lucide-react"; 
import { QuizPopup } from "../components/QuizPopup"
import { LoadingPopup } from "../components/LoadingPopup"; 

// The static quiz data from QuizPopup.jsx is needed to interpret the answers
const QUESTIONS = [
  { id: 1, question: "How’s your mood today?", options: ["Happy", "Tired", "Stressed", "Chill"] },
  { id: 2, question: "What level of spice do you want?", options: ["Mild", "Medium", "Hot"] },
  { id: 3, question: "Are you craving something sweet?", options: ["Yes", "No"]},
  { id: 4, question: "What time of day is it for you?", options: ["Morning", "Afternoon", "Evening", "Late Night"] },
  { id: 5, question: "Would you like something heavy or light?", options: ["Light", "Balanced", "Heavy"] },
];

export const Homepage = () => {
  const foodItems = useFoodItems();
  const { addToCart } = useCart(); 

  const [category, setCategory] = useState("All");
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  // ⭐ CHANGE: Set initial state to TRUE so the quiz always pops up on load
  const [showQuiz, setShowQuiz] = useState(true); 

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // ⭐ REMOVED: useEffect that checked localStorage and set initial showQuiz state

  const categories = [
    "All",
    ...(recommended.length ? ["Recommended"] : []),
    "Main Course",
    "Desserts",
    "Drinks",
  ];

  const filteredItems =
    category === "All"
      ? foodItems
      : category === "Recommended"
      ? recommended
      : foodItems.filter((item) => item.category === category);

  // Helper function to convert question IDs to descriptive text for the prompt
  const formatAnswersForPrompt = (answers) => {
    const formatted = {};
    QUESTIONS.forEach(q => {
        // Use the question text or a simplified version as the key
        formatted[q.question.replace(/[^a-zA-Z0-9 ]/g, '')] = answers[q.id];
    });
    return formatted;
  };

  const handleQuizComplete = (answers) => {
    const formattedAnswers = formatAnswersForPrompt(answers);
    getRecommendations(formattedAnswers);
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
  }

  // --- Gemini REST API Call Function (Unchanged) ---
  const getRecommendations = async (answers) => {
    setLoading(true);
    
    const menuList = foodItems.map((i) => i.name).join(", ");
    
    const prompt = `
        You are a food recommendation AI.
        Based on the user's detailed preferences: ${JSON.stringify(answers)},
        choose three (3) dishes from this menu: ${menuList}.
        
        The three dishes MUST satisfy these constraints:
        - Exactly ONE item must be from the 'Main Course' category.
        - Exactly ONE item must be from the 'Desserts' category.
        - Exactly ONE item must be from the 'Drinks' category.
        
        Return ONLY the three dish names as a JSON array, like ["Main Course Name", "Dessert Name", "Drink Name"].
    `;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: { type: "string" },
          description: "An array containing exactly one Main Course, one Dessert, and one Drink name."
        },
      },
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Details:", JSON.parse(errorText));
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
      const jsonString = text.replace(/```json|```/g, '').trim();
      
      const recommendedNames = JSON.parse(jsonString || "[]");
      
      const filtered = foodItems.filter((f) =>
        recommendedNames.includes(f.name)
      );

      setRecommended(filtered);
      setCategory("Recommended"); 

    } catch (err) {
      console.error("Gemini Catch Error:", err);
      setRecommended([]);
      setCategory("All"); 
    } finally {
      setLoading(false);
    }
  };


  const handleRetakeQuiz = () => {
    // ⭐ CHANGE: Simply set state to true to show the quiz again
    setCategory("All"); 
    setRecommended([]); 
    setShowQuiz(true); 
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-4">
      
      {/* Loading Pop-up */}
      <AnimatePresence>
        {loading && <LoadingPopup />}
      </AnimatePresence>

      {/* Quiz Popup component */}
      <AnimatePresence>
        {/* Quiz always shows on load, and on retake */}
        {showQuiz && <QuizPopup onComplete={handleQuizComplete} onClose={handleQuizClose} />}
      </AnimatePresence>


      {/* Category Filter */}
      <div className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={` px-4 py-2 rounded-full border ${
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
        
        {/* State 1: Empty/No Recommendations */}
        {category === "Recommended" && !loading && filteredItems.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl">
                <Smile className="w-10 h-10 text-gray-400 mb-3" />
                <h3 className="text-xl font-semibold text-gray-600">No Recommendations Found</h3>
                <p className="text-gray-500 mt-1">Try the quiz again!</p>
                <button 
                  onClick={handleRetakeQuiz}
                  className="mt-4 px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition"
                >
                    Retake Quiz
                </button>
            </div>
        )}

        {/* State 2: Display Filtered Items */}
        {filteredItems.length > 0 && filteredItems.map((item) => (
          <div
            key={item.id}
            className={`shadow-md rounded-2xl p-3 transition-all duration-300 border ${
                category === "Recommended" 
                ? "border-fuchsia-300 bg-fuchsia-50/50 hover:shadow-fuchsia-200 shadow-lg" 
                : "border-gray-100 hover:shadow-lg"
            }`}
          >
            {item.img ? (
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover rounded-xl"
              />
            ) : (
                <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    No Image
                </div>
            )}
            
            <div className="mt-3">
              <h2 className="text-lg font-semibold flex items-center">
                {item.name}
                {category === "Recommended" && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-bold text-fuchsia-800 bg-fuchsia-200 rounded-full">
                        AI Pick
                    </span>
                )}
              </h2>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Take Quiz Again Button for Recommended View */}
        {category === "Recommended" && filteredItems.length > 0 && (
            <div className="col-span-full mt-4 flex justify-center">
                <button 
                    onClick={handleRetakeQuiz}
                    className="flex items-center gap-2 px-6 py-3 text-lg font-semibold 
                               bg-white text-fuchsia-600 border-2 border-fuchsia-600 rounded-full 
                               hover:bg-fuchsia-50 transition shadow-md"
                >
                    <X className="w-5 h-5"/>
                    Take Quiz Again
                </button>
            </div>
        )}
      </div>
    </div>
  );
};