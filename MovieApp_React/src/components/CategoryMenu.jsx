import React, {useEffect, useState} from "react";
import CategoryMenuMobileView from "./CategoryMenuMobileView.jsx";
import CategoryMenuView from "./CategoryMenuView.jsx";

const CategoryMenu = ({ genreId, setGenreId }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Lista de categorias
    const categories = [
        { id: "28", name: "Action" },
        { id: "12", name: "Adventure" },
        { id: "16", name: "Animation" },
        { id: "35", name: "Comedy" },
        { id: "80", name: "Crime" },
        { id: "99", name: "Documentary" },
    ];

    return (
        <div className="sort_by_menu">
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