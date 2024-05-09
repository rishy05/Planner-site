import Search from "./Search.jsx";
import { motion } from 'framer-motion';

export default function Intro() {
    return (
        <div className="flex flex-col justify-center items-center pt-40 sm:pt-16 md:pt-40 mr-10 ml-10">
            {/* Animated button with gradient */}
            <span className="relative inline-block overflow-hidden rounded-full p-[1px] mb-4">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]"></span>
                {/* Increase padding and text size */}
                <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-6 py-2 text-sm font-medium leading-6 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
                    See where others are going ⚡️
                    <span className="inline-flex items-center pl-2 text-black dark:text-white">
                        {/* Scale up the SVG if needed */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="pl-0.5 text-black dark:text-white">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </span>
        </div>
      </span>

            {/* Title and animated gradient text */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center text-5xl font-medium text-gray-900 dark:text-gray-50 sm:text-8xl"
            >
                Going somewhere, <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">for your next adventure?</span>
            </motion.h2>
            <Search/>


</div>
    );
}
