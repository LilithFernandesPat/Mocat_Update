import React from "react";

const SortByMenu = ({ sortBy, setSortBy }) => {
    return (
        <div className="sort_by_menu ">
            <label htmlFor="sort">
              Sort By
            </label>
            <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="popularity.desc">Most Popular</option>
                <option value="popularity.asc">Least Popular</option>
                <option value="release_date.desc">Newest</option>
                <option value="release_date.asc">Oldest</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="vote_average.asc">Lowest Rated</option>
            </select>
        </div>

    )}
export default SortByMenu;