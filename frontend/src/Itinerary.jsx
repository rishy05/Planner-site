import React, { useEffect, useState } from 'react'; // Import React and useState, useEffect hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CollapsibleCard from "./components/CollapsibleCard.jsx";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Adjusting the imports for marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix the default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const handleModifyClick = async (day, data, setData) => {
    try {
        console.log("Button clicked!!!!!!!!!!!!")
        const requestData = {
            oro_ite: data.desc, // Complete itinerary
            speci: data.desc[day - 1], // Detailed description at the clicked card
            sugg: prompt('Please provide your suggestion') // User's suggestion
        };
        console.log(requestData)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };

        const response = await fetch('http://127.0.0.1:8080/modify', options);

        if (!response.ok) {
            throw new Error('Failed to modify itinerary');
        }

        const responseData = await response.json();
        console.log(responseData)
        // Update the summary and detailed places with the response data
        const updatedData = { ...data };
        updatedData.desc[day - 1] = responseData.modified_ite[0];
        updatedData.summarize[day - 1] = responseData.modified_summ[0];
        
        setData(updatedData);
        console.log(updatedData);
    } catch (error) {
        console.error('Error:', error);
    }
};


const Mapss = ({ locations }) => {
    const defaultPosition = locations[0]?.coordinates || [0, 0]; // Default position to first location or [0, 0] if no locations provided

    return (
        <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={[location.latitude, location.longitude]}>
                    <Popup>{location.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

const Itinerary = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [data, setData] = useState({}); // State to store fetched data
    const [selectedDay, setSelectedDay] = useState(null); // State to store selected day

    useEffect(() => {
        // Fetch data function
        const fetchData = async () => {
            try {
                // URL of the endpoint you want to send data to
                const url = 'http://127.0.0.1:8080/info';

                // Data you want to send in the request body
                const requestData = {
                    name: 'John Doe',
                    age: 30,
                    email: 'john@example.com'
                };

                // Options object for the fetch request
                const options = {
                    method: 'POST', // Set the request method to POST
                    headers: {
                        'Content-Type': 'application/json' // Set the appropriate headers
                    },
                    body: JSON.stringify(requestData) // Convert the data to JSON string
                };

                // Make the POST request
                const response = await fetch(url, options);

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Error sending data');
                }

                // Parse the response as JSON
                const responseData = await response.json();

                // Handle the response data
                setData(responseData); 
                console.log(data)
            } catch (error) {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            }
        };

        // Call the fetch data function
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render
    
    // Function to handle card click, navigating to the respective day's URL
    const handleCardClick = (day) => {
        setSelectedDay(day);
    };

    // Function to close the description card
    const handleCloseDescription = () => {
        setSelectedDay(null);
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
                Itinerary for {data.desti} 
                <br></br>
                Safety rating - {data.safety} 
                <br></br>
                (lower the number safer the city)
            </motion.h2>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-14"
            >
                {data.desc && data.desc.map((description, index) => (
                    <div key={index} onClick={() => handleCardClick(index + 1)} style={{ cursor: 'pointer' }}>
                        <motion.div className="w-full">
                            <CollapsibleCard
                                dayNumber={index + 1}
                                imagePath={data.image_links && data.image_links[index]} // Assuming image_links and desc have the same length
                                text={selectedDay === index + 1 ? description : (data.summarize && data.summarize[index])}
                            />
                                <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg" onClick={() => handleModifyClick(index + 1, data, setData)}>Change</button>                            
                        </motion.div>
                    </div>
                ))}
            </motion.div>
            {/* Description card */}
            {selectedDay !== null && (
                <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg max-w-md"> {/* Adjusted width here */}
                        <h3 className="text-xl font-semibold mb-2">Day {selectedDay}</h3>
                        <p>{data.desc[selectedDay - 1]}</p>
                        <button onClick={handleCloseDescription} className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">Close</button>
                    </div>
                    
                </motion.div>
            )}
            {/* Map embed */}

        </>
    );
};

export default Itinerary;