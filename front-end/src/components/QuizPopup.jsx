import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const QUESTIONS = [
    { id: 1, question: "How’s your mood today?", options: ["Happy", "Tired", "Stressed", "Chill"] },
    { id: 2, question: "What level of spice do you want?", options: ["Mild", "Medium", "Hot", "Very Hot"] },
    { id: 3, question: "Are you craving something sweet?", options: ["Yes", "No"] },
    { id: 4, question: "What time of day is it for you?", options: ["Morning", "Afternoon", "Evening", "Late Night"] },
    { id: 5, question: "Would you like something heavy or light?", options: ["Light", "Balanced", "Heavy"] },
];

export const QuizPopup = ({ onComplete, onClose }) => {
    const [answers, setAnswers] = useState({});
    const [step, setStep] = useState(0);

    // ⭐ ROBUST SCROLL LOCK FIX
    useEffect(() => {
        const body = document.body;
        
        // 1. Calculate scrollbar width to prevent page jump
        const scrollbarWidth = window.innerWidth - body.clientWidth;
        
        // 2. Apply scroll lock styles
        body.style.overflow = 'hidden';
        body.style.paddingRight = `${scrollbarWidth}px`; // Compensate for removed scrollbar

        // 3. Cleanup function: Restore original styles when component unmounts
        return () => {
            body.style.overflow = 'unset';
            body.style.paddingRight = '0';
        };
    }, []); 


    const handleAnswer = (option) => {
        const q = QUESTIONS[step];
        const newAnswers = { ...answers, [q.id]: option };
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            onComplete(newAnswers);
            onClose();
        }
    };

    const handleDismiss = () => {
        onClose();
    }

    return (
        // The overlay itself maintains 'fixed inset-0' to stick to the viewport
        <motion.div
            className="fixed inset-0 flex justify-center items-center z-50 bg-gradient-to-br from-pink-100/80
            via-fuchsia-100/90 to-purple-200/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white text-gray-900 rounded-3xl shadow-2xl p-6 sm:p-10 w-[90%] sm:w-[480px] relative"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
            >
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold text-fuchsia-600 mb-6 text-center">
                    FOOD MOOD 🍕
                </h2>

                <motion.div key={step} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <p className="text-lg font-semibold text-center mb-6">{QUESTIONS[step].question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {QUESTIONS[step].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleAnswer(option)}
                                className="bg-gray-100 hover:bg-fuchsia-500 hover:text-white 
                                transition-all p-3 rounded-xl text-sm sm:text-base font-medium shadow-md"
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-gray-500 text-sm">
                        Question {step + 1} of {QUESTIONS.length}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};