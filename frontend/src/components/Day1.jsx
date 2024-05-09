import { motion } from 'framer-motion';
import Map from './Map'; // Assuming you have a Map component

const Day1 = () => {

    const locations = [
        {
            name: 'Golden Temple, Amritsar',
            coordinates: [31.62022688134885, 74.8764956073481] // Latitude and Longitude of the Golden Temple
        }]
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
                Day 1: Arrival and Golden Temple
            </motion.h2>

            {/* Travel from Chandigarh to Amritsar */}
            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Morning: Travel to Amritsar</h3>
                <p className="text-white">Depart early by train or bus. The journey takes approximately 3.5 to 6 hours. Train is recommended for comfort and speed.</p>
                <a href="https://www.irctc.co.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Book Train</a> | <a href="https://www.redbus.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Book Bus</a>
            </section>

            {/* Hotel Check-in */}
            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Afternoon: Hotel Check-in</h3>
                <p className="text-white">Check into a budget hotel near the Golden Temple. Expected check-in by 1:00 PM to rest and freshen up.</p>
                <a href="https://www.booking.com/hotel/golden-heritage.en-gb.html" target="_blank" rel="noopener noreferrer" className="text-blue-500">Book Hotel</a>
            </section>

            {/* Visit to the Golden Temple */}
            <section className="mb-6">
                <h3 className="text-lg text-white mb-2">Evening: Visit the Golden Temple</h3>
                <p className="text-white">Experience the serene beauty of the Golden Temple around 4:00 PM, and partake in the Langar.</p>

            </section>

            {/* Map Component */}
            <Map locations={locations} />


        </motion.div>
    );
};

export default Day1;
