import { motion } from 'framer-motion';
import useStore from "../../useStore.js"; // Import your Zustand store
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useState, useEffect } from 'react';
import { Loader } from '../Loader'; // Use named import instead.
import 'leaflet/dist/leaflet.css';

// const [da, setDa] = useState('')

// var dat = ''
const Form = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State to control the loader
    const loadingStates = [
        { text: 'Fetching Travel Information' },
        { text: 'Cumulating Information about the destination' },
        { text: 'Finding delicious food havens' },
        { text: 'Finding fun places' },
        { text: 'Finding some activities' },
        { text: 'Creating the itinerary' },
        { text: 'Have Fun!' }
    ];

    // useEffect(() => {
    //     if (loading) {
    //         const timer = setTimeout(() => {
    //             navigate('/itinerary');
    //         }, 14000); // Wait for 5 seconds before navigating

    //         return () => clearTimeout(timer);
    //     }
    // }, [loading, navigate]);

    const handleSubmit = async (e) => {
        setLoading(true); // Show the loader when the form is submitted

        e.preventDefault();
        
        try {
            console.log(originInput, destiInput, numInput, vibeInput)
            const res = await fetch('http://127.0.0.1:8080/all', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({'origin': originInput, 'desti': destiInput, 'vibe': vibeInput, 'num_days': numInput /* optional data to send in the request body */ }),
            });
      
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
      
            const dat = await res.json();
            console.log(dat) 
            navigate('/itinerary');
        } catch (error) {
            console.error('Error:', error);
          }
    };
    const [originInput, setOriginInput] = useState('');

    const handleOriginInputChange = (event) => {
        setOriginInput(event.target.value);
    };
    const [destiInput, setDestiInput] = useState('');

    const handleDestiInputChange = (event) => {
        setDestiInput(event.target.value);
    };

    const [numInput, setNumInput] = useState('');

    const handleNumInputChange = (event) => {
        setNumInput(event.target.value);
    };

    const [vibeInput, setVibeInput] = useState('');

    const handleVibeInputChange = (event) => {
        setVibeInput(event.target.value);
    };



    // Animation settings for each form field
    const fieldVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (custom) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.2, duration: 0.5 }
        })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {loading ? (
                <Loader loading={loading} loadingStates={loadingStates} duration={2000} loop={true} />
            ) : (
                <>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-center mb-8 text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-3xl"
                    >
                        Just a few more <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">details</span>
                    </motion.h2>
                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                        {/* Origin Field */}

                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="flex flex-wrap -mx-3 mb-6"
                        >

                        </motion.div>


                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="flex flex-wrap -mx-3 mb-6"
                        >
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-xs font-bold mb-2" htmlFor="origin">
                                    Origin
                                </label>
                                <input style={{ backgroundColor: '#0a0a0a' }} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 dark:border-gray-700 dark:text-gray-400 dark:focus:bg-gray-700" id="origin" type="text" placeholder="Enter your starting point" value={originInput} onChange={handleOriginInputChange} />
                            </div>
                        </motion.div>
                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="flex flex-wrap -mx-3 mb-6"
                        >
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-xs font-bold mb-2" htmlFor="origin">
                                    Destination
                                </label>
                                <input style={{ backgroundColor: '#0a0a0a' }} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 dark:border-gray-700 dark:text-gray-400 dark:focus:bg-gray-700" id="origin" type="text" placeholder="Enter your destitation."  value ={destiInput} onChange={handleDestiInputChange}/>
                            </div>
                        </motion.div>


                        {/* Number of Days Field */}
                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                            className="flex flex-wrap -mx-3 mb-6"
                        >
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-xs font-bold mb-2" htmlFor="days">
                                    Number of Days
                                </label>
                                <input style={{ backgroundColor: '#0a0a0a' }} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 dark:border-gray-700 dark:text-gray-400 dark:focus:bg-gray-700" id="days" type="text" placeholder="e.g. 5"  value={numInput} onChange={handleNumInputChange}/>
                            </div>
                        </motion.div>


                        {/* Vibe Field */}
                        <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                            className="flex flex-wrap -mx-3 mb-6"
                        >
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 dark:text-gray-200 text-xs font-bold mb-2" htmlFor="vibe">
                                    Vibe
                                </label>
                                <select style={{ backgroundColor: '#0a0a0a' }} className="block w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500 dark:border-gray-700 dark:text-gray-400 dark:focus:bg-gray-700" id="vibe" value={vibeInput} onChange={handleVibeInputChange}>
                                    <option>Adventurous</option>
                                    <option>Relaxing</option>
                                    <option>Cultural</option>
                                    <option>Party</option>
                                </select>
                            </div>
                        </motion.div>

                        <div className="flex items-center justify-center">
                            <button className='relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={handleSubmit}>
                                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl'>
                                    Submit
                                </span>
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

// console.log(da)

// export const fromData = da;
// export const formData = dat;
export default Form;
