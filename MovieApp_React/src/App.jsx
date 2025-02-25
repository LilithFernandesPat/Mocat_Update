import {useEffect, useState} from 'react'
import './App.css'
import Search from './components/search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import MoreRatedMovieSlide from "./components/MoreRatedMovie.jsx";
import {useDebounce} from 'react-use';
import {updateSearchCount} from './appwrite'
import {getTrendingMovies} from './appwrite'
import {API_BASE_URL, API_OPTIONS} from './apiConfig';


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [mostTrendingMovie, setMostTrendingMovie] = useState([]);

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchTrendingMovie = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const mostTrendingMovieResponse = await fetch(`${API_BASE_URL}/trending/movie/day`, API_OPTIONS);

            if (!mostTrendingMovieResponse.ok) {
                throw new Error('failed')
            }
            const mostTrendingMovieData = await mostTrendingMovieResponse.json();

            if (mostTrendingMovieData.response === 'false') {
                setErrorMessage(mostTrendingMovieData.Error || 'failed to fetch trending movie');
                setMostTrendingMovie([]);
                return;
            }

            setMostTrendingMovie(mostTrendingMovieData.results[0] || []);
        } catch (error) {
            console.log(error);
        }

    }
    const fetchAllMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endPoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
            const response = await fetch(endPoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('failed')
            }

            const data = await response.json();

            if (data.response === 'false') {
                setErrorMessage(data.Error || 'failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);
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
    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    }
    useEffect(() => {
        fetchAllMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm])

    useEffect(() => {
        loadTrendingMovies();
        fetchTrendingMovie();
    }, [])

    return (
        <main>
            <header className='m-0'>
                < MoreRatedMovieSlide movie={mostTrendingMovie}/>
            </header>
            <div className='wrapper pt-0'>


                {/*{trendingMovies.length>0 &&(*/}

                {/*<section className='trending'>*/}
                {/*  <h2>Trending Movies</h2>*/}
                {/*  <ul>*/}
                {/*    {trendingMovies.map((movie, index)=>(*/}
                {/*      <li key={movie.$id}>*/}
                {/*        <p>{index+1}</p>*/}
                {/*        <img src={movie.poster_url} alt={movie.title} />*/}
                {/*      </li>*/}
                {/*    ))}*/}
                {/*  </ul>*/}
                {/*</section>*/}
                {/*)}*/}
                <section className='all-movies'>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>


                    <h2>All Movies</h2>

                    {isLoading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

        </main>
    )
}

export default App
