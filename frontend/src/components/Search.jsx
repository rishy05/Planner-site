import useStore from "../../useStore.js";

function Search() {
    const setShowForm = useStore((state) => state.setShowForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowForm(true); // This will trigger the navigation to the Form component
    };

    return (
        <div className="flex items-center mt-14">
            <form className="relative flex items-center" onSubmit={handleSubmit}>
                {/* Increase width, padding, and font size */}
                <input
                    type="search"
                    placeholder="Search"
                    className="relative w-64 py-2 px-4 pl-4 pr-10 rounded-full border-2 focus:outline-none focus:border-blue-500 transition-all duration-300 transform focus:scale-110 text-white text-base"
                    style={{ backgroundColor: '#0a0a0a' }}
                />
                <span className="absolute inset-y-0 right-12">
                    <span className="absolute inset-[-1000%] animate-spin_2s_linear_infinite bg-conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)" />
                </span>
                {/* Increase button and icon size */}
                <button type="submit" className="absolute right-0 mr-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        className="w-6 h-6 text-gray-400" // Increased size from w-5 h-5 to w-6 h-6
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default Search;
