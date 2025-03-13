import React, {useEffect} from "react";

const CategoryMenuMobileView = ({categories, setGenreId, setIsModalOpen}) => {

    return(
        <div className="fixed inset-0 bg-black/40 backdrop-filter backdrop-blur-sm rounded-md transform- bg-opacity-50 flex items-center text-center justify-center z-50">
            <div className="  w-11/12 max-w-md p-5 flex flex-col rounded-lg justify-center self-center items-center content-center">
                <h2 className="text-xl  font-semibold mb-4">Choose a Category</h2>
                <ul className="space-y-2">
                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                onClick={() => {
                                    setGenreId(category.id);
                                    setIsModalOpen(false);
                                }}
                                className="block w-full p-3 hover:bg-gray-300/50 rounded-full text-center"
                            >
                                {category.name}
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
    )
}
export default CategoryMenuMobileView;

