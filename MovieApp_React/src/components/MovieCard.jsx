import React from 'react'
import {useNavigate} from "react-router-dom";

const MovieCard = ({movie
    :{id, title, vote_average, poster_path, release_date, original_language}
}) => {
    const navigate = useNavigate();
    const onMovieClick = (id) => {
        navigate(`/moviepage?movie_id=${id}`);
    }
    return (
        <button onClick={() => onMovieClick(id)}>
        <div className='movie-card '>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />
            <div className='mt-4'>
                <h3>{title}</h3>
            </div>
            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="star_icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>    
                 </div>

                 <span>•</span>
                 <p className='lang'>{original_language}</p>

                 <span>•</span>
                 <p className='year'>
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                 </p>
            </div>
        </div>
        </button>
    )
}

export default MovieCard