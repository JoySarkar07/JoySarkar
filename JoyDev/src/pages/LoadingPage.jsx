import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const LoadingPage = ({ onFinish }) => {
    const [displayedName, setDisplayedName] = useState(Array(10).fill('A'));
    const targetName = ['J', 'O', 'Y', ' ', 'S', 'A', 'R', 'K', 'A', 'R'];
    const [isComplete, setIsComplete] = useState(false);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    useEffect(() => {
        const animateLetters = async () => {
        // Initial delay before starting animation
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Animate each letter individually
        for (let i = 0; i < targetName.length; i++) {
            // Skip animation for spaces
            if (targetName[i] === ' ') {
            setDisplayedName(prev => {
                const newLetters = [...prev];
                newLetters[i] = ' ';
                return newLetters;
            });
            await new Promise(resolve => setTimeout(resolve, 80));
            continue;
            }

            // Cycle through letters for this position
            const targetIndex = alphabet.indexOf(targetName[i]);
            for (let j = 0; j <= targetIndex; j++) {
            await new Promise(resolve => setTimeout(resolve, 40));
            setDisplayedName(prev => {
                const newLetters = [...prev];
                newLetters[i] = alphabet[j];
                return newLetters;
            });
            }
            
            // Slight pause between letters
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        // Mark animation as complete
        setIsComplete(true);
        
        // Wait a moment then notify parent
        setTimeout(() => {
            if (onFinish) onFinish();
        }, 1800);
        };

        animateLetters();
    }, [onFinish]);

    return (
        <AnimatePresence>
        {!isComplete ? (
            <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center z-50 overflow-hidden"
            >
            {/* Animated background elements */}
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-900 opacity-10 blur-2xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-purple-900 opacity-10 blur-2xl animate-pulse"></div>
                <div className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full bg-indigo-900 opacity-10 blur-2xl animate-pulse"></div>
            </motion.div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>

            <div className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider flex flex-wrap justify-center relative z-10">
                {displayedName.map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ y: -120, opacity: 0, rotate: -5 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ 
                    type: "spring", 
                    damping: 12, 
                    stiffness: 150,
                    mass: 0.8
                    }}
                    className="inline-block mx-1 md:mx-2 relative"
                >
                    {letter}
                    {/* Subtle glow effect */}
                    <motion.span 
                    className="absolute inset-0 text-blue-300 opacity-0 blur-md"
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.1 }}
                    >
                    {letter}
                    </motion.span>
                </motion.span>
                ))}
            </div>

            {/* Progress indicator */}
            <motion.div 
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 256, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                />
            </motion.div>
            </motion.div>
        ) : (
            <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-br from-black to-gray-900 flex items-center justify-center z-50"
            >
            {/* Final name display with enhanced animation */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0.7, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ 
                duration: 0.8, 
                ease: [0.17, 0.67, 0.83, 0.67],
                scale: { type: "spring", damping: 15, stiffness: 200 }
                }}
                className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider relative"
            >
                <span className="relative z-10">JOY SARKAR</span>
                
                {/* Glow effect */}
                <motion.div 
                className="absolute inset-0 text-blue-300 opacity-0 blur-xl z-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                >
                JOY SARKAR
                </motion.div>
                
                {/* Subtle shine effect */}
                <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 w-20"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    );
};

export default LoadingPage;