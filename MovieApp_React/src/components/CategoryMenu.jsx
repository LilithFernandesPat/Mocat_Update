import React, {useEffect, useState} from "react";
import CategoryMenuMobileView from "./CategoryMenuMobileView.jsx";
import CategoryMenuView from "./CategoryMenuView.jsx";

//CategoryMenu show genre options then set the genre type to fetch in app
const CategoryMenu = ({ genreId, setGenreId }) => {
    //#region Handle Window Resize

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    //#endregion

    //#region category list
    const categories = [
        { id: "28", name: "Action" },
        { id: "12", name: "Adventure" },
        { id: "16", name: "Animation" },
        { id: "35", name: "Comedy" },
        { id: "80", name: "Crime" },
        { id: "99", name: "Documentary" },
    ];
    //#endregion
    return (
        <div className="sort_by_menu">
            {/*Show different in mobile*/}
            {isMobile ? (
                <>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-white px-4 py-2 font-extralight rounded-full border-2 flex gap-2"
                    >
                        Categories
                        <img className='rotate-90' src="arrow.svg" alt=""/>
                    </button>

                    {isModalOpen && (
                        <CategoryMenuMobileView categories={categories} setGenreId={setGenreId} setIsModalOpen={setIsModalOpen} />
                    )}
                </>
            ) : (
                <CategoryMenuView setGenreId={setGenreId} genreId={genreId} categories={categories} />
            )}
        </div>
    );
};
export default CategoryMenu;