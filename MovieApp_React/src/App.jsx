import {useEffect, useState} from 'react'
import {useDebounce} from 'react-use';
import {updateSearchCount} from './appwrite'
import {getTrendingMovies} from './appwrite'
import './App.css'
import Search from './components/search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import MoreRatedMovieBackdrop from "./components/MoreRatedMovie.jsx";
import {API_BASE_URL, API_OPTIONS} from './apiConfig';
import SortByMenu from "./components/SortByMenu.jsx";
import ShowMoreMovies from "./components/ShowMoreMovies.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [mostTrendingMovie, setMostTrendingMovie] = useState([]);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [page, setPage] = useState(1);

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
    const fetchAllMovies = async (query = '', nextPage = 1) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endPoint = query
                ? `${API_BASE_URL}/search/movie?page=${nextPage}&query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?page=${nextPage}&sort_by=${sortBy}`
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

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    }


    useEffect(() => {
        fetchAllMovies(debouncedSearchTerm, page);
    }, [sortBy, page, debouncedSearchTerm])

    useEffect(() => {
        loadTrendingMovies();
        fetchTrendingMovie();
    }, [])
    useEffect(() => {
        setPage(1);
    }, [sortBy, debouncedSearchTerm]);
    return (
        <main>
            <header className='m-0'>
                < MoreRatedMovieBackdrop movie={mostTrendingMovie}/>
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
                    <div className='searchTermsContainer'>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <SortByMenu sortBy={sortBy} setSortBy={setSortBy}/>
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
