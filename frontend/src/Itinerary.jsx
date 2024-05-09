import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CollapsibleCard from "./components/CollapsibleCard.jsx";
import { motion } from "framer-motion";
import manali from "./components/Images/manali.jpg";
import manali2 from "./components/Images/manali2.jpg";
import manali3 from "./components/Images/manali3.jpg";

const Itinerary = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle card click, navigating to the respective day's URL
    const handleCardClick = (day) => {
        navigate(`/itinerary/day${day}`);
    };

    // Simplified variants for card animation
    const cardVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    // Container variants for staggered children animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2 // Adjust the stagger timing as needed
            }
        }
    };

    return (
        <>
            <div className="pt-14"></div>
            <motion.h2
                initial="hidden"
                animate="visible"
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-8 text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-3xl"
            >
                Itinerary
            </motion.h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-14"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Each card is wrapped in a div with an onClick event for navigation */}
                <div onClick={() => handleCardClick(1)} style={{ cursor: 'pointer' }}>
                    <motion.div variants={cardVariants} className="w-full">
                        <CollapsibleCard
                            dayNumber="1"
                            imagePath={manali}
                            text="Settle into a cozy budget hotel and then be mesmerized by the tranquil Golden Temple."
                        />
                    </motion.div>
                </div>
                <div onClick={() => handleCardClick(2)} style={{ cursor: 'pointer' }}>
                    <motion.div variants={cardVariants} className="w-full">
                        <CollapsibleCard
                            dayNumber="2"
                            imagePath={manali2}
                            text="Discover the poignant history of Jallianwala Bagh and explore the Partition Museum."
                        />
                    </motion.div>
                </div>
                <div onClick={() => handleCardClick(3)} style={{ cursor: 'pointer' }}>
                    <motion.div variants={cardVariants} className="w-full">
                        <CollapsibleCard
                            dayNumber="3"
                            imagePath={manali3}
                            text="Delve into Punjab's history and end the day with the patriotic Wagah Border ceremony."
                        />
                    </motion.div>
                </div>
                {/* More cards can be added here following the same pattern */}
            </motion.div>
        </>
    );
};

export default Itinerary;
