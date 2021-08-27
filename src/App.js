import React, {useState, useEffect, Fragment} from 'react'
import MoviesContext from './store/movies-context'
import MoviesContainer from './components/movies/MoviesContainer'
import SearchBar from './components/search/SearchBar'
import Loader from './components/UI/Loader'
import Message from './components/UI/Message'
import useDebounce from './hooks/useDebounce'
import usePrevious from './hooks/usePrevious'
import {uniqueId} from 'lodash'
import {settings} from './utils/shared'
import client from './utils/client'
import './App.css';

function App() {
  const [movieSearchString, setMovieSearchString] = useState('')
  const [yearSearchString, setYearSearchString] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const debouncedMovieSearchString = useDebounce(movieSearchString, 1000);
  const debouncedYearSearchString = useDebounce(yearSearchString, 1000);
  const prevDebouncedMovieSearchString = usePrevious(debouncedMovieSearchString)
  const prevDebouncedYearSearchString = usePrevious(debouncedYearSearchString)
  
  const providerValue = {
    movieSearchString: movieSearchString,
    yearSearchString: yearSearchString,
    moviesList,
    isLoading,
    page,
    totalPages
  }
  
  const managePages = data => {
    if (page === 1) {
      let pages
      pages = Math.floor(+data.totalResults / data.Search.length)
      if ((+data.totalResults % data.Search.length) > 0) {
        pages += 1
      }
      if (pages > settings.maxPages) {
        pages = settings.maxPages
      }
      setTotalPages(pages)
    }
  }
  
  const callApi = params => {
    if (debouncedMovieSearchString) {
      setIsLoading(true)
      setError('')
      const res = client.get('', {params})
      res.then(({data}) => {
        if (data.Response === settings.responseTypes.true && data.Search.length) {
          // movie property imdbID can be used as key, but I've seen cases where the
          // same movie returns twice in the array, with the same imdbID, which
          // throws a warning in the console and may lead to unexpected behavior
          for (const movie of data.Search) {
            movie.id = uniqueId()
          }
          if (prevDebouncedMovieSearchString !== debouncedMovieSearchString
            || prevDebouncedYearSearchString !== debouncedYearSearchString) {
            setMoviesList(data.Search)
          } else {
            setMoviesList(moviesList => moviesList.concat(data.Search))
          }
          managePages(data)
        } else {
          setMoviesList([])
          setError('No results found')
        }
      })
        .then(() => {
          setIsLoading(false)
        })
    }
  }
  
  useEffect(() => {
    if (!debouncedMovieSearchString
      || prevDebouncedMovieSearchString !== debouncedMovieSearchString
      || prevDebouncedYearSearchString !== debouncedYearSearchString) {
      setMoviesList([])
      setPage(1)
      setTotalPages(0)
    }
    
    const params = {
      apikey: settings.apiKey,
      page
    }
    
    if (movieSearchString.length > 2) {
      params.s = movieSearchString
    }
    
    // This is a very basic check that the entered year is a number
    if (yearSearchString.length === 4 && !isNaN(+yearSearchString)) {
      params.y = yearSearchString
    }
    if (!debouncedYearSearchString || (debouncedYearSearchString.length === 4 && !isNaN(+yearSearchString))) {
      callApi(params);
    }
  }, [debouncedMovieSearchString, debouncedYearSearchString, page]);
  
  const movieInputChangeHandler = string => {
    setMovieSearchString(string)
  }
  
  const yearInputChangeHandler = string => {
    setYearSearchString(string)
    // This is a very basic check that the entered year is a number
    if (string.length === 4 && !isNaN(+string)) {
      setMoviesList([])
    }
  }
  
  const clearMovieInputHandler = () => {
    setMovieSearchString('')
  }
  
  const clearYearInputHandler = () => {
    setYearSearchString('')
  }
  
  const loadMoreHandler = () => {
    setPage(page + 1)
  }
  
  return (
    <MoviesContext.Provider value={providerValue}>
      <Fragment>
        <div className="App d-flex flex-column px-4 py-2">
          <SearchBar
            onMovieInputChange={movieInputChangeHandler}
            onYearInputChange={yearInputChangeHandler}
            onClearMovie={clearMovieInputHandler}
            onClearYear={clearYearInputHandler}
          />
          {error && <Message type={settings.messageTypes.error}>
            {error}
          </Message>}
          <MoviesContainer onLoadMore={loadMoreHandler} />
        </div>
        {isLoading && <Loader/>}
      </Fragment>
    </MoviesContext.Provider>
  );
}

export default App;
