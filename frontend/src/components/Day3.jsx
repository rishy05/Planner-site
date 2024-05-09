import { motion } from 'framer-motion';
import Map from './Map'; // Reusing the Map component

const Day3 = () => {
    const locations = [
        { name: "Kulcha Land", coordinates: [31.658210541181006, 74.86459153971802] }, // Example coordinates, replace with actual
        { name: "Maharaja Ranjit Singh Museum", coordinates: [31.640266348820642, 74.87827822548032] }, // Example coordinates, replace with actual
        { name: "Kesar Da Dhaba", coordinates: [31.62424592276765, 74.87299474375682] }, // Example coordinates, replace with actual
        { name: "Wagah Border", coordinates: [31.606890458010902, 74.59264036432782] }
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
                Day 3: Historical Landmarks and Wagah Border
            </motion.h2>

            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Morning: Kulcha Land</h3>
                <p className="text-white">Kickstart your day with a visit to Kulcha Land for their iconic Amritsari Kulcha. A delightful breakfast here would cost around INR 100-200 per person.</p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Maharaja Ranjit Singh Museum</h3>
                <p className="text-white">Continue your morning with a cultural dive into Punjab's history at the Maharaja Ranjit Singh Museum. Entry fees are modest, typically under INR 100.</p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Afternoon: Kesar Da Dhaba</h3>
                <p className="text-white">For lunch, head to Kesar Da Dhaba. Known for its authentic Punjabi cuisine, expect to spend about INR 100 to 250 per person for a fulfilling meal.</p>
            </section>

            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Evening: Wagah Border Ceremony</h3>
                <p className="text-white">Conclude your day with the stirring Wagah Border ceremony. It's advisable to book a cab for the day, which might cost around INR 1000-1500. Ensure to reach by 2:30 PM to secure a good viewing spot.</p>
            </section>

            {/* Map Component with Multiple Locations */}
            <Map locations={locations} />
        </motion.div>
    );
};

export default Day3;
