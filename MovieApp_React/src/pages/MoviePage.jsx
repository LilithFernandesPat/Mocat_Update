import React from 'react'
import {useSearchParams} from "react-router-dom";
import app from "./App.jsx";
const MoviePage = () => {
    const [searchParams] = useSearchParams();
    const movie = searchParams.get("movie");
    console.log(movie);
    return(
        <div className=''>

        </div>
    )
}
export default MoviePage;