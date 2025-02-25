import React, {useEffect, useState} from 'react'
import {API_BASE_URL, API_OPTIONS} from '../apiConfig';


const MoreRatedMovieSlide = ({
                                 movie: {id, title, vote_average, poster_path, release_date, original_language, overview}
                             }) => {
    const [movieSlide, setMovieSlide] = useState([])
    const fetchImages = async (movieId) => {
        if (!movieId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/movie/${movieId}/images`, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();
            setMovieSlide(data.backdrops[0] || []);

        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
        }
    }
    useEffect(() => {
        fetchImages(id);
    }, [id]);


    return (

        <div className="bg-cover bg-center h-auto w-full sm:min-h-[300px] md:min-h-[500px] grid grid-cols-4"
             style={{
                 backgroundImage: `url(${movieSlide.file_path ? `https://image.tmdb.org/t/p/original/${movieSlide.file_path}` : '/no-movie.png'})`,
             }}>
            <div className='pl-10 self-end'>
            <img className='sm:min-w-10 md:min-w-56 max-w-2 m-9 rounded-xl p-2 shadow-inner shadow-red-950 '
                 src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                 alt={title}/>
            </div>
            <div className='slideContent col-span-3 content-center max-w-3/4 mb-40'>
                <div className='justify-start text-white'>
                    <p className='text-xl font-extrabold'>
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </p>
                    <h2 className='text-7xl pt-2 pb-2'>{title}</h2>
                    <p className='text-0.5'>
                        {overview ? overview : 'N/A'}
                    </p>
                    <span><a href="">Watch Trailer</a></span>
                </div>
            </div>

        </div>

    )

}

export default MoreRatedMovieSlide;