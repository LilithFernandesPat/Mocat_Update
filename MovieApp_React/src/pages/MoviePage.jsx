import React, {Fragment, useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";
import app from "./App.jsx";
import {API_BASE_URL, API_OPTIONS} from '../apiConfig.js';
import MovieDetailsView from "../components/MovieDetailsView";
import Spinner from "../components/Spinner.jsx";

const MoviePage = () => {
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get("movie_id");

    const [isLoading, setIsLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [trailerKey, setTrailerKey] = useState('');

    const fetchMovieDetails = async () => {
        if (!movie_id) return;
        setIsLoading(true);
        try {
            const MovieDetailResponse = await fetch(`${API_BASE_URL}/movie/${movie_id}`, API_OPTIONS);
            const responseTrailer = await fetch(`${API_BASE_URL}/movie/${movie_id}/videos?language=en-US`, API_OPTIONS);

            if (!MovieDetailResponse.ok || !responseTrailer.ok) {
                throw new Error('failed');
            }
            const movieDetailsData = await MovieDetailResponse.json();
            const dataTrailer = await responseTrailer.json();
            if (movieDetailsData.response === false) {
                setErrorMessage(movieDetailsData.Error || 'failed to fetch movie details');
                setMovieDetails([]);
                return;
            }
            //Pegando o trailer na Array de vídeos retornados
            const trailer = dataTrailer.results.find(video =>
                video.type === "Trailer" && video.site === "YouTube" && video.official
            );
            const fallbackTrailer = dataTrailer.results.find(video =>
                video.type === "Trailer" && video.site === "YouTube"
            );
            
            setTrailerKey(trailer || fallbackTrailer || []);
            setMovieDetails(movieDetailsData);
            console.log(movieDetails);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchMovieDetails();
    }, [movie_id]);
    return (
        <div>
            {isLoading ? (
                    <Spinner />
                ):
                errorMessage
            }
            <Fragment></Fragment>
            <MovieDetailsView movieDetails={movieDetails} setIsLoading={setIsLoading} movieTrailer={trailerKey} />
            </div>
    )
}
export default MoviePage;