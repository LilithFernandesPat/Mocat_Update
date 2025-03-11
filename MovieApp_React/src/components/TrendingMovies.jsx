import React, {useEffect, useState} from 'react'
import {API_BASE_URL, API_OPTIONS} from '../apiConfig';
import {useNavigate} from "react-router-dom";
import Carousel from "./TrendingMoviesView.jsx";


const TrendingMovies = ({ movie }) => {
    const { id, title, vote_average, poster_path, release_date, overview, genre_ids, vote_count } = movie;
    const [movieBackdrop, setMovieBackdrop] = useState([]);
    const [genres, setGenres] = useState([]);
    const [trailerId, setTrailerId] = useState([]);
    const navigate = useNavigate();

    const onMovieClick = (id) => {
        navigate(`/moviepage?movie_id=${id}`);
    }

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                // Fetch Images
                const imageResponse = await fetch(`${API_BASE_URL}/movie/${id}/images`, API_OPTIONS);
                const imageData = await imageResponse.json();
                setMovieBackdrop(imageData.backdrops || []);

                // Fetch Genres
                const genreResponse = await fetch(`${API_BASE_URL}/genre/movie/list?language=en`, API_OPTIONS);
                const genreData = await genreResponse.json();
                const movieGenres = genreData.genres.filter((genre) => genre_ids.includes(genre.id));
                setGenres(movieGenres.map((genre) => genre.name));

                // Fetch Trailer
                const trailerResponse = await fetch(`${API_BASE_URL}/movie/${id}/videos?language=en-US`, API_OPTIONS);
                const trailerData = await trailerResponse.json();
                const trailer = trailerData.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube' && video.official
                );
                setTrailerId(trailer || null);
                console.log(trailer);
            } catch (error) {
                console.error('Erro ao buscar dados do filme:', error);
            }
        };

        fetchMovieData();
    }, [id]);


    return (

        <div className="slide"
             style={{
                 backgroundImage: `url(${movieBackdrop?.[0]?.file_path ? `https://image.tmdb.org/t/p/original/${movieBackdrop[0].file_path}` : '/no-movie.png'})`,
             }}>

            <img className='slide_poster'
                 src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                 alt={title}
            />

            <div className='slideContent w-full h-full'>
                <div className='justify-start text-white'>
                    <div className='flex justify-between '>
                        <p className='text-xl font-extrabold hidden sm:block'>
                            {release_date ? release_date.split('-')[0] : 'N/A'}
                        </p>
                        <span className='font-black text-red-900 text-xl uppercase hidden sm:block'>
                            {genres ? genres.join(' • ') : 'N/A'}
                      </span>
                    </div>
                    <h2 className='text-7xl pt-2 pb-2 uppercase line-clamp-1'>
                        <button className='hover:text-8xl hover:text-red-900 transition-all'
                                onClick={() => onMovieClick(id)}>{title}</button>
                    </h2>
                    <p className='text-0.5 hidden lg:block md:block'>
                        {overview ? overview : 'N/A'}
                    </p>
                </div>

                <div className='rating text-white justify-self-end  mt-10 font-extrabold gap-3'>
                    <div className='watch_trailer'>
                        <a href={`https://www.youtube.com/watch?v=${trailerId.key}`} target='_blank'>
                            <button>
                                <img src="play-button.svg" alt=""/>Watch trailer
                            </button>
                        </a>
                    </div>
                    <img src="star.svg" alt="star_icon"/>
                    {vote_average ? vote_average.toFixed(1) : 'N/A'}
                    <span>•</span>
                    {vote_count ? `${vote_count} votes` : 'N/A'}
                </div>
            </div>
            <Carousel images={movieBackdrop} />
        </div>

    )

}

export default TrendingMovies;