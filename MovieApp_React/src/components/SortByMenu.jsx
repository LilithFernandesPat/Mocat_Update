import React, {useEffect, useState} from "react";
import SortByMenuMobileView from "./SortByMenuMobileView.jsx";

const SortByMenu = ({sortBy, setSortBy}) => {

    //#region Handle Window Resize
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    //#endregion

    return (
        <div className="sort_by_menu ">
            {isMobile ? (
                <>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-white px-4 py-2 font-extralight rounded-full border-2 flex gap-2"
                    >
                        Sort By
                        <img className='rotate-90' src="arrow.svg" alt=""/>
                    </button>
                    {isModalOpen && (
                        <SortByMenuMobileView
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            setIsModalOpen={setIsModalOpen}
                        />
                    )}
                </>) : (
               <div> <label htmlFor="sort"></label>
                   <select
                       id="sort"
                       value={sortBy}
                       className='text-white px-4 py-2 font-extralight rounded-full border-2 flex gap-2 appearance-none'
                       onChange={(e) => setSortBy(e.target.value)}
                   >
                       <option value="popularity.desc">Most Popular</option>
                       <option value="popularity.asc">Least Popular</option>
                       <option value="release_date.desc">Newest</option>
                       <option value="release_date.asc">Oldest</option>
                       <option value="vote_average.desc">Top Rated</option>
                       <option value="vote_average.asc">Lowest Rated</option>
                   </select></div>
    )}

</div>
)
    ;
};
export default SortByMenu;