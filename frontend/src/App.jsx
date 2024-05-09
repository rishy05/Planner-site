// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useStore from '../useStore.js'; // Adjust the path as necessary
import Intro from './components/Intro';
import Form from './components/Form';
import Itinerary from './Itinerary.jsx'; // Adjust the path as necessary
import Day1 from './components/Day1'; // Make sure the path is correct
import Day2 from './components/Day2'; // Make sure the path is correct
import Day3 from './components/Day3';
import {Loader} from "./Loader.jsx"; // Make sure the path is correct
import  { useState } from 'react';

export default function App() {
    const [loading, setLoading] = useState(true);

    // Mock loading states
    const loadingStates = [
        { text: 'Loading step 1...' },
        { text: 'Loading step 2...' },
        { text: 'Loading step 3...' },
    ];

    // Simulate loading completion after 5 seconds
    setTimeout(() => {
        setLoading(false);
    }, 5000);
    const showForm = useStore((state) => state.showForm);

    return (
        <Router>
            <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
                <Routes>
                    <Route path="/" element={!showForm ? <Intro /> : <Form />} />
                    <Route path="/itinerary" element={<Itinerary />} />
                    <Route path="/itinerary/day1" element={<Day1 />} />
                    <Route path="/itinerary/day2" element={<Day2 />} />
                    <Route path="/itinerary/day3" element={<Day3 />} />
                    {/* Add other nested routes within itinerary as needed */}
                </Routes>
            </div>
        </Router>



);
}
