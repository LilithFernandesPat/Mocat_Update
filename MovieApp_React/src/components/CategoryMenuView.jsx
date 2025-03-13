import React from "react";

const CategoryMenuView = ({setGenreId, genreId, categories}) => {
    return(

        <select
            id="sort"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            className="text-white text-center px-4 py-2 font-extralight rounded-full border-2 flex gap-2 appearance-none"
        >
            <option value="">Category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    )
}
export default CategoryMenuView;