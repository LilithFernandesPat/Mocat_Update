import React, {useEffect, useState} from 'react'
import {useDebounce} from 'react-use';
import {updateSearchCount} from '../appwrite.js'
import {getTrendingMovies} from '../appwrite.js'
import '../App.css'
import Search from '../components/Search.jsx'
import Spinner from '../components/Spinner.jsx'
import MovieCard from '../components/MovieCard.jsx'
import {API_BASE_URL, API_OPTIONS} from '../apiConfig.js';
import SortByMenu from "../components/SortByMenu.jsx";
import CategoryMenu from "../components/CategoryMenu.jsx";
import ShowMoreMovies from "../components/ShowMoreMovies.jsx";
import {useNavigate} from "react-router-dom";
import TrendingMovies from "../components/TrendingMovies.jsx";
import trendingMovies from "../components/TrendingMovies.jsx";
import Carousel from "../components/TrendingMoviesView.jsx";

const App = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovie] = useState([]);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [page, setPage] = useState(1);
    const [genreId, setGenreId] = useState()
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchTrendingMovie = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const TrendingMovieResponse = await fetch(`${API_BASE_URL}/trending/movie/day`, API_OPTIONS);

            if (!TrendingMovieResponse.ok) {
                throw new Error('failed')
            }

            const TrendingMovieData = await TrendingMovieResponse.json();

            if (TrendingMovieData.response === false) {
                setErrorMessage(TrendingMovieData.Error || 'failed to fetch trending movie');
                setTrendingMovie([]);
                return;
            }

            setTrendingMovie(TrendingMovieData.results || []);
        } catch (error) {
            console.log(error);
        }

    }
    const fetchAllMovies = async (query = '', nextPage = 1) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endPoint = genreId
                ? `${API_BASE_URL}/discover/movie?page=${nextPage}&sort_by=${sortBy}&with_genres=${genreId}`
                : query
                    ? `${API_BASE_URL}/search/movie?page=${nextPage}&query=${encodeURIComponent(query)}`
                    : `${API_BASE_URL}/discover/movie?page=${nextPage}&sort_by=${sortBy}`;

            const response = await fetch(endPoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('failed')
            }

            const data = await response.json();

            if (data.response === false) {
                setErrorMessage(data.Error || 'failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(prevMovies => nextPage === 1 ? data.results : [...prevMovies, ...data.results]);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.log("Error fetching api:" + error)
            setErrorMessage("Error searching movies. Please try again later.")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAllMovies(debouncedSearchTerm, page);
    }, [sortBy, page, debouncedSearchTerm, genreId])

    useEffect(() => {
        fetchTrendingMovie();
    }, [])

    useEffect(() => {
        setPage(1);
    }, [sortBy, debouncedSearchTerm]);

    return (
        <main>
            <header className='m-0'>
                <Carousel>
                    {trendingMovies.map((movie) => (
                        <TrendingMovies key={movie.id} movie={movie} />
                    ))}
                </Carousel>
            </header>

            <div className='wrapper pt-0'>

                <section className='all-movies'>

                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    <div className='searchTermsContainer'>
                        <SortByMenu sortBy={sortBy} setSortBy={setSortBy}/>
                        <CategoryMenu genreId={genreId} setGenreId={setGenreId}/>

                    </div>

                    <h2>All Movies</h2>
                    <ul>
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </ul>
                    {isLoading ? (
                            <Spinner />
                        ):
                        errorMessage
                    }
                    <ShowMoreMovies page={page} setPage={setPage}/>
                </section>
            </div>
        </main>
    )
}

export default App
