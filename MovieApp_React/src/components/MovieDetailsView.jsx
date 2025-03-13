import React from "react";

const MovieDetailsView = ({movieDetails, setIsLoading, movieTrailer}) => {
    console.log(movieDetails)




    if (!movieDetails || Object.keys(movieDetails).length === 0 || !movieTrailer) {
        return setIsLoading(true);
    }

    setIsLoading(false);
    return (
        <div
            className='bg-cover bg-center h-auto w-full sm:min-h-[300px] md:min-h-[500px] lg:min-h-[700px] bg-fixed shadow-[inset_0px_-104px_80px_-3px_#000] grid grid-cols-9'
            style={{
            backgroundImage: `url(${movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}` : '/no-movie.png'})`,
        }}>
            <div className='title_box col-span-full self-end flex items-center justify-between px-40 text-white'>
                <h3 className='text-5xl font-extralight'>{movieDetails.title} ({movieDetails.release_date ? movieDetails.release_date.split('-')[0] : 'N/A'})</h3>
                {movieTrailer.key ? <a href={`https://www.youtube.com/watch?v=${movieTrailer.key}`} target={"_blank"}>Watch Trailer</a> : ''}
                {movieDetails.homepage ? <a href={`${movieDetails.homepage}`} target={"_blank"}>Watch Film</a> : ''}
            </div>
        </div>
    )
}
export default MovieDetailsView;