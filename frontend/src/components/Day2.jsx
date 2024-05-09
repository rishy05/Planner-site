import React from 'react';
import { motion } from 'framer-motion';
import Map from './Map'; // Reusing the Map component from Day 1

const Day2 = () => {
    const locations = [
        { name: 'Jallianwala Bagh', coordinates: [31.620885750105966, 74.88015476768274] },
        { name: 'Partition Museum', coordinates: [31.62584877782326, 74.87905201185691] },
    ];
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="container mx-auto p-12"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-8 text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-3xl"
            >
                Day 2: Jallianwala Bagh, Partition Museum, and Local Cuisine
            </motion.h2>

            {/* Morning: Visit Jallianwala Bagh */}
            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Morning: Jallianwala Bagh</h3>
                <p className="text-white">Start your day with a visit to this historic garden to pay respects and learn about the 1919 massacre. It's a poignant reminder of India's struggle for independence.</p>
                <a href="https://www.jallianwalabagh.ca/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Learn More</a>
            </section>

            {/* Afternoon: Explore the Partition Museum */}
            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Afternoon: Partition Museum</h3>
                <p className="text-white">Dive into the history of the Partition of India, one of the most defining events in the country's history. The museum brings stories of the Partition to life through its exhibits.</p>
                <a href="http://www.partitionmuseum.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Visit Website</a>
            </section>

            {/* Evening: Explore Local Cuisine */}
            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Evening: Local Cuisine</h3>
                <p className="text-white">Amritsar is famous for its rich and flavorful food. End your day with a visit to a local dhaba (roadside restaurant) to experience authentic Punjabi cuisine like Amritsari Kulcha, Butter Chicken, and more.</p>
            </section>

            <Map locations={locations} />


            {/* Note: If you prefer not to have multiple maps, you can adjust the component or use markers to represent multiple locations on a single map. */}
        </motion.div>
    );
};

export default Day2;
