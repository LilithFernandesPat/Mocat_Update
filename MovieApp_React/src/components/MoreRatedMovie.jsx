import React, {useEffect, useState} from 'react'
import { API_BASE_URL, API_OPTIONS } from '../apiConfig';



const MoreRatedMovieSlide = ({movie
    :{id,title, vote_average, poster_path, release_date, original_language}})=> {
    const [movieSlide, setMovieSlide] = useState([])
    console.log(id);
    const fetchImages = async (movieId) => {
        if (!movieId) return;

        try {
            const response = await fetch(`${API_BASE_URL}/movie/${movieId}/images`, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }

            const data = await response.json();
            setMovieSlide(data.backdrops[0] || []);
            console.log("Imagens carregadas:", data.backdrops[0]);
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
        }
    }
    useEffect(() => {
        fetchImages(id);
        }, [id]);




    return (
        <div className="bg-cover bg-center h-auto w-full sm:min-h-[300px] md:min-h-[500px] flex items-center"
             style={{
                 backgroundImage: `url(${movieSlide.file_path ? `https://image.tmdb.org/t/p/original/${movieSlide.file_path}` : '/no-movie.png'})`,
             }}>
            <div className='w-60 m-9 bg'>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
            </div>
        </div>
        )
}

export default MoreRatedMovieSlide;