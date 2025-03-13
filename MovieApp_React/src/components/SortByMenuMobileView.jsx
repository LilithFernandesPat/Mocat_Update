import React, { useEffect } from "react";

const SortByMenuMobileView = ({ sortBy, setSortBy, setIsModalOpen }) => {

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-filter backdrop-blur-sm rounded-md transform- bg-opacity-50 flex items-center text-center justify-center z-50">
            <div className="w-11/12 max-w-md p-5 rounded-lg justify-center self-center items-center content-center flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Sort By</h2>
                <ul className="space-y-2">
                    {[
                        { value: "popularity.desc", label: "Most Popular" },
                        { value: "popularity.asc", label: "Least Popular" },
                        { value: "release_date.desc", label: "Newest" },
                        { value: "release_date.asc", label: "Oldest" },
                        { value: "vote_average.desc", label: "Top Rated" },
                        { value: "vote_average.asc", label: "Lowest Rated" },
                    ].map((option) => (
                        <li key={option.value}>
                            <button
                                onClick={() => {
                                    setSortBy(option.value);
                                    setIsModalOpen(false);
                                }}
                                className="block w-full p-3 hover:bg-gray-300/50 rounded-full text-center"
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-4 flex text-white hover:bg-red-900/30 rounded-full p-3"
                >
                    <img className='self-center' src="x_icon.svg" alt=""/>
                </button>
            </div>
        </div>
    );
};

export default SortByMenuMobileView;