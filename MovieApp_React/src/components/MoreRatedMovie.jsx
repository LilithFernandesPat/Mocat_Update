import React, {useEffect, useState} from 'react'
import {API_BASE_URL, API_OPTIONS} from '../apiConfig';


const MoreRatedMovieSlide = ({
                                 movie: {
                                     id,
                                     title,
                                     vote_average,
                                     poster_path,
                                     release_date,
                                     original_language,
                                     overview,
                                     genre_ids,
                                 }
                             }) => {
    const [movieSlide, setMovieSlide] = useState([])
    const [genres, setGenres] = useState([])

    const fetchImages = async (movieID) => {
        if (!movieID) return;

        try {
            const response = await fetch(`${API_BASE_URL}/movie/${movieID}/images`, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();
            setMovieSlide(data.backdrops[0] || []);
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
        }
    }
    const fetchGenre = async (movieGenreID) => {
        if (!movieGenreID) return;
        try {
            const genreResponse = await fetch(`${API_BASE_URL}/genre/movie/list?language=en`, API_OPTIONS);

            if (!genreResponse.ok) {
                throw new Error('Failed to fetch genres');
            }

            const genreData = await genreResponse.json();
            const movieGenres = genreData.genres.filter(genre => genre_ids.includes(genre.id));

            setGenres(movieGenres.map(genre => genre.name));

        } catch (error) {
            console.error("Erro ao buscar generos:", error);
        }
    }

    useEffect(() => {
        fetchImages(id);
        fetchGenre(genre_ids);
    }, [id]);


    return (

        <div className="slide"
             style={{
                 backgroundImage: `url(${movieSlide.file_path ? `https://image.tmdb.org/t/p/original/${movieSlide.file_path}` : '/no-movie.png'})`,
             }}>

            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title}/>

            <div className='slideContent  '>
                <div className='justify-start text-white order-2'>
                    <div className='flex justify-between '>
                        <p className='text-xl font-extrabold hidden sm:block'>
                            {release_date ? release_date.split('-')[0] : 'N/A'}
                        </p>
                        <p className='font-black text-red-900 text-xl uppercase hidden sm:block'>
                            {genres ? genres.join(' • ') : 'N/A'}
                        </p>
                    </div>
                    <h2 className='text-7xl pt-2 pb-2 uppercase '>{title}</h2>
                    <p className='text-0.5 hidden lg:block md:block'>
                        {overview ? overview : 'N/A'}
                    </p>
                </div>
            </div>

        </div>

    )

}

export default MoreRatedMovieSlide;