import React from "react";

const CategoryMenu = ({ genreId, setGenreId }) => {
    return (
        <div className="sort_by_menu">
            <label htmlFor="sort">
                Category
            </label>
            <select
                id="sort"
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
            >
                <option value="">Select</option>
                <option value="28">Action</option>
                <option value="12">Adventure</option>
                <option value="16">Animation</option>
                <option value="35">Comedy</option>
                <option value="80">Crime</option>
                <option value="99">Documentary</option>
            </select>
        </div>

    )}
export default CategoryMenu;